import {
  useGoogleLogin as useGLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import { useRef, useState } from "react";
import { type AuthResult, googleOAuth } from "~/api/user";

import { useUserProfile } from "~/contexts/user-profile";

interface UseGoogleLoginOptions {
  useOneTap?: boolean;
  onSuccess?: (result: AuthResult) => void;
}
export function useGoogleLogin(option?: UseGoogleLoginOptions) {
  const { reload: reloadUser } = useUserProfile();

  const { useOneTap = true, onSuccess } = option ?? {};

  const [signing, setSigning] = useState(false);
  const loginResolveRef =
    useRef<(value: AuthResult | PromiseLike<AuthResult>) => void>(null);
  const loginRejectRef = useRef<(reason?: unknown) => void>(null);

  const handleSuccess = async (value: {
    access_token?: string;
    credential?: string;
  }) => {
    const values = {
      type: "google" as const,
      data: value,
    };

    setSigning(true);
    try {
      const loginResult = await googleOAuth(values);
      if (loginResolveRef.current) {
        loginResolveRef.current(loginResult);
      } else onSuccess?.(loginResult);
      reloadUser();
    } catch (e) {
      if (loginRejectRef.current) {
        console.error("Google Login Fail", e);
        loginRejectRef.current(e);
      }
    } finally {
      loginResolveRef.current = null;
      loginRejectRef.current = null;
      setSigning(false);
    }
  };

  useGoogleOneTapLogin({
    onSuccess: ({ credential }) => handleSuccess({ credential }),
    cancel_on_tap_outside: false,
    disabled: !useOneTap,
  });
  const login = useGLogin({
    onSuccess: ({ access_token }) => handleSuccess({ access_token }),
  });

  const handleLogin = (...rest: Parameters<typeof login>) => {
    return new Promise<AuthResult>((resolve, reject) => {
      loginResolveRef.current = resolve;
      loginRejectRef.current = reject;

      login(...rest);
    });
  };

  return { login: handleLogin, isLoging: signing };
}
