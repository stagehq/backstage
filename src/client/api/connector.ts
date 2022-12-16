import { URLSearchParams } from "url";

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
  authorizationRequest: (
    options: AuthorizationRequestOptions
  ) => Promise<AuthorizationRequest>;
  authorize: (
    options: AuthorizationRequest | AuthorizationOptions
  ) => Promise<AuthorizationResponse>;
  setTokens: (options: TokenSetOptions | TokenResponse) => Promise<void>;
  getTokens: () => Promise<TokenSet | undefined>;
  removeTokens(): Promise<void>;
}

// interface OAuth {
//   PKCEClient: (options: PKCEClientConfig) => OAuth["PKCEClient"];
// }

export const OAuth = {
  PKCEClient: (options: PKCEClientConfig) => {
    const {
      redirectMethod,
      providerName,
      providerIcon,
      providerId,
      description,
    } = options;
    
    return {
      redirectMethod,
      providerName,
      providerIcon,
      providerId,
      description,
      authorizationRequest: async (options: AuthorizationRequestOptions) => {
        const { endpoint, clientId, scope, extraParameters } = options;
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = generateCodeChallenge(codeVerifier);
        const state = generateState();
        const redirectURI = getRedirectURI();
        const params = new URLSearchParams({
          response_type: "code",
          client_id: clientId,
          scope,
          code_challenge: await codeChallenge,
          code_challenge_method: "S256",
          state,
          redirect_uri: redirectURI,
          ...extraParameters,
        });
        const url = `${endpoint}?${params.toString()}`;
        return {
          codeVerifier,
          codeChallenge,
          state,
          redirectURI,
          toURL: () => url,
        };
      },
      authorize,
      setTokens,
      getTokens,
      removeTokens,
    };
  },
};

/* TODO: Implement this function and place them above */

const authorize = async (
  options: AuthorizationRequest | AuthorizationOptions
) => {
  console.log(options);
};

const setTokens = async (options: TokenSetOptions | TokenResponse) => {
  console.log(options);
};

const getTokens = async () => {
  console.log("getTokens");
};

const removeTokens = async () => {
  console.log("removeTokens");
};

const generateCodeVerifier = () => {
  const array = new Uint32Array(56);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
};

const generateCodeChallenge = (codeVerifier: string) => {
  const buffer = new TextEncoder().encode(codeVerifier);
  return window.crypto.subtle.digest("SHA-256", buffer).then((hash) => {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(hash)));
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  });
};

const generateState = () => {
  const array = new Uint32Array(56);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
};

const getRedirectURI = () => {
  const { protocol, host } = window.location;
  return `${protocol}//${host}/api/oauth/callback`;
};
