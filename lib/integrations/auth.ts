// Auth contract owned by the DB/auth team. We import the interface; they
// supply the implementation. Do NOT inline auth logic here — keep this file
// interface-only so swapping providers (Cognito, Auth0, custom) is a config
// change, not a refactor.

export interface AuthenticatedUser {
  id: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
  jurisdictionId?: string;
  deviceCount: number;
}

export interface AuthProvider {
  getCurrentUser(request: Request): Promise<AuthenticatedUser | null>;
  requireAdmin(request: Request): Promise<AuthenticatedUser>;
  // Per the BIDIRECTIONALITY doc: limit each admin account to 10 devices.
  canRegisterDevice(userId: string): Promise<boolean>;
}

let provider: AuthProvider | null = null;

export function registerAuthProvider(impl: AuthProvider): void {
  provider = impl;
}

export function getAuthProvider(): AuthProvider {
  if (!provider) {
    throw new Error(
      "No AuthProvider registered. The auth/DB team must call registerAuthProvider() at startup.",
    );
  }
  return provider;
}
