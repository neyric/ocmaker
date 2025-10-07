import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { UserProfileProvider } from "~/contexts/user-profile";
import { queryClient } from "~/lib/react-query";

import { useRootLoader } from "~/root";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * 应用程序的全局 Provider 组件
 * 集中管理所有需要的 context providers
 */
export function Providers({ children }: ProvidersProps) {
  const root = useRootLoader();
  const googleClientId = root?.GOOGLE_CLIENT_ID ?? "";
  return (
    <UserProfileProvider
      user={root?.user.profile}
      credits={root?.user.credits}
      subscription={root?.user.subscription}
    >
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={googleClientId}>
          {children}
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </UserProfileProvider>
  );
}
