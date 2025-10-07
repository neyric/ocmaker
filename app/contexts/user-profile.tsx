import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { auth } from "~/api/user";
import type { Subscription } from "~/drizzle/schema";

// User profile context data interface
export interface UserProfileContextData {
  user: UserInfo | null;
  credits: number;
  subscription: Subscription | null;
  setUser: (user: this["user"]) => void;
  updateUser: (updates: Partial<UserInfo>) => void;
  setCredits: (credits: number) => void;
  setSubscription: (subscription?: this["subscription"]) => void;
  clear: () => void;
  reload: () => void;
}

// Create context with default values
const UserProfileContext = createContext<UserProfileContextData | undefined>(
  undefined,
);

// Provider component props
interface UserProfileProviderProps {
  children: ReactNode;
  user?: UserInfo | null;
  credits?: number;
  subscription?: Subscription | null;
}

// Provider component
export function UserProfileProvider({
  children,
  user: initUser = null,
  credits: initCredits = 0,
  subscription: initSubscription = null,
}: UserProfileProviderProps) {
  const [user, setUserState] = useState(initUser);
  const [credits, setCreditsState] = useState(initCredits);
  const [subscription, setSubscriptionState] = useState(initSubscription);

  // Set user completely
  const setUser = useCallback((newUser: typeof user) => {
    setUserState(newUser);
  }, []);

  // Update user partially
  const updateUser = useCallback((updates: Partial<UserInfo>) => {
    setUserState((currentUser) =>
      currentUser ? { ...currentUser, ...updates } : null,
    );
  }, []);

  const setCredits = useCallback((value: typeof credits) => {
    setCreditsState(value);
  }, []);

  const setSubscription = useCallback((value?: typeof subscription) => {
    setSubscriptionState(value ?? null);
  }, []);

  // Clear user (logout)
  const clear = useCallback(() => {
    setUserState(null);
    setCreditsState(0);
    setSubscriptionState(null);
  }, []);

  const reload = useCallback(async () => {
    const { profile, credits, subscription } = await auth();
    setUserState(profile);
    setCreditsState(credits);
    setSubscriptionState(subscription ?? null);
  }, []);

  const value: UserProfileContextData = {
    user,
    credits,
    subscription,
    setUser,
    updateUser,
    setCredits,
    setSubscription,
    clear,
    reload,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

// Custom hook to use user profile context
export function useUserProfile() {
  const context = useContext(UserProfileContext);

  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }

  return context;
}

// Optional: Export context for advanced use cases
export { UserProfileContext };
