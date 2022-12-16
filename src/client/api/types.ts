enum RedirectMethod {
  Web = "web",
  Local = "local",
} 
interface AuthorizationRequestOptions {
  endpoint: string;
  clientId: string;
  scope: string;
  extraParameters?: Record<string, string>;
}

interface AuthorizationRequestURLParams {
  codeChallenge: string;
  codeVerifier: string;
  state: string;
  redirectURI: string;
}

interface AuthorizationRequest extends AuthorizationRequestURLParams {
  toURL(): string;
}

interface AuthorizationOptions {
  url: string;
}

interface AuthorizationResponse {
  authorizationCode: string;
}

interface TokenSet {
  accessToken: string;
  updatedAt: Date;
  isExpired(): boolean;
  refreshToken?: string;
  idToken?: string;
  expiresIn?: number;
  scope?: string;
}

interface TokenSetOptions {
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
  expiresIn?: number;
  scope?: string;
}

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  expires_in?: number;
  scope?: string;
}

interface PKCEClientConfig {
  redirectMethod: RedirectMethod;
  providerName: string;
  providerIcon: string;
  providerId?: string;
  description?: string;
  authorizationRequest: (options: AuthorizationRequestOptions) => Promise<AuthorizationRequest>;
  authorize: (options: AuthorizationRequest | AuthorizationOptions) => Promise<AuthorizationResponse>;
  setTokens: (options: TokenSetOptions | TokenResponse) => Promise<void>;
  getTokens: () => Promise<TokenSet | undefined>;
  removeTokens(): Promise<void>;
}

interface OAuth {
  PKCEClient: (options: PKCEClientConfig) => OAuth["PKCEClient"];
}

export default OAuth;