import * as crypto from "crypto";

export enum RedirectMethod {
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
  codeChallenge: Promise<string>;
  codeVerifier: string;
  state: string;
  redirectURI: string;
}

export interface AuthorizationRequest extends AuthorizationRequestURLParams {
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

export interface TokenSetOptions {
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
  expiresIn?: number;
  scope?: string;
}

export interface TokenResponse {
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
  // authorizationRequest: (
  //   options: AuthorizationRequestOptions
  // ) => Promise<AuthorizationRequest>;
  // authorize: (
  //   options: AuthorizationRequest | AuthorizationOptions
  // ) => Promise<AuthorizationResponse>;
  // setTokens: (options: TokenSetOptions | TokenResponse) => Promise<void>;
  // getTokens: () => Promise<TokenSet | undefined>;
  // removeTokens(): Promise<void>;
}

// interface OAuth {
//   PKCEClient: (options: PKCEClientConfig) => OAuth["PKCEClient"];
// }

// export const OAuth = {
//   PKCEClient: (options: PKCEClientConfig) => {
//     const {
//       redirectMethod,
//       providerName,
//       providerIcon,
//       providerId,
//       description,
//     } = options;

//     return {
//       redirectMethod,
//       providerName,
//       providerIcon,
//       providerId,
//       description,
//       authorizationRequest: async (options: AuthorizationRequestOptions) => {
//         const { endpoint, clientId, scope, extraParameters } = options;
//         const codeVerifier = generateCodeVerifier();
//         const codeChallenge = generateCodeChallenge(codeVerifier);
//         const state = generateState();
//         const redirectURI = getRedirectURI();
//         const params = new URLSearchParams({
//           response_type: "code",
//           client_id: clientId,
//           scope,
//           code_challenge: await codeChallenge,
//           code_challenge_method: "S256",
//           state,
//           redirect_uri: redirectURI,
//           ...extraParameters,
//         });
//         const url = `${endpoint}?${params.toString()}`;
//         return {
//           codeVerifier,
//           codeChallenge,
//           state,
//           redirectURI,
//           toURL: () => url,
//         };
//       },
//       authorize,
//       setTokens,
//       getTokens,
//       removeTokens,
//     };
//   },
// };

const generateCodeVerifier = () => {
  const array = new Uint32Array(56);
  crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
};

const generateCodeChallenge = (codeVerifier: string) => {
  const buffer = new TextEncoder().encode(codeVerifier);
  return crypto.subtle.digest("SHA-256", buffer).then((hash) => {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(hash)));
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  });
};

const generateState = () => {
  const array = new Uint32Array(56);
  crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
};

const getRedirectURI = () => {
  const { protocol, host } = window.location;
  return `${protocol}//${host}/api/oauth/callback`;
};

export class PKCEClient {
  redirectMethod: RedirectMethod;
  providerName: string;
  providerIcon: string;
  providerId: string | undefined;
  description: string | undefined;

  constructor(options: PKCEClientConfig) {
    this.redirectMethod = options.redirectMethod;
    this.providerName = options.providerName;
    this.providerIcon = options.providerIcon;
    this.providerId = options.providerId;
    this.description = options.description;
  }

  authorizationRequest = async (
    options: AuthorizationRequestOptions
  ): Promise<AuthorizationRequest> => {
    const { endpoint, clientId, scope, extraParameters } = options;

    console.log(typeof window !== "undefined");

    const generateCodeVerifier = () => {
      const array = new Uint32Array(56);
      window.crypto.getRandomValues(array);
      return Array.from(array, (dec) =>
        ("0" + dec.toString(16)).substr(-2)
      ).join("");
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
      return Array.from(array, (dec) =>
        ("0" + dec.toString(16)).substr(-2)
      ).join("");
    };

    const getRedirectURI = () => {
      const { protocol, host } = window.location;
      return `${protocol}//${host}/s`;
    };

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
    console.log(params.toString());

    const url = `${endpoint}?${params.toString()}`;
    return {
      codeVerifier,
      codeChallenge,
      state,
      redirectURI,
      ...extraParameters,
      toURL: () => url,
    };
  };

  authorize = async (options: AuthorizationRequest | AuthorizationOptions): Promise<AuthorizationResponse> => {
    let authorizationRequest: AuthorizationRequest;
    if ("endpoint" in options) {
      // options is an AuthorizationRequestOptions object
      authorizationRequest = this.authorizationRequest(options);
    } else {
      // options is an AuthorizationRequest object
      authorizationRequest = options;
    }

    // Open the login window
    const loginWindow = this.popupWindow(
      authorizationRequest.toURL(),
      "Login",
      600,
      600
    );

    if (!loginWindow) throw new Error("Could not open login window");

    const response = await this.pollForResponse(loginWindow);

    return response;
  };

  private popupWindow(url: string, title: string, w: number, h: number) {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    const left = (width - w) / 2 + dualScreenLeft;
    const top = (height - h) / 2 + dualScreenTop;
    const newWindow = window.open(
      url,
      title,
      `
      scrollbars=yes,
      width=${w}, 
      height=${h}, 
      top=${top}, 
      left=${left}
      `
    );

    return newWindow;
  }

  private pollForResponse = async (
    loginWindow: Window
  ): Promise<{ authorizationCode: string; }> => {
    // Poll for the response from the login window
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        try {
          const queryParams = new URLSearchParams(loginWindow.location.search);
          const authorizationCode = queryParams.get("code");
          if (authorizationCode) {
            resolve({ authorizationCode });
            clearInterval(interval);
          }
        } catch (error) {
          // Ignore the error and continue polling
        }
      }, 1000);
    });
  };
}