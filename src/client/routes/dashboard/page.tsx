import useSWR from "swr";
import { AuthorizationRequest, PKCEClient, RedirectMethod, TokenResponse } from "../../api/connector";
import Banner from "../../components/Banner";
import Container from "../../components/Container";
import Content from "../../components/Content";
import More from "../../components/More";
import Title from "../../components/Title";

const useLinkedin = (url: string) => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `/api/linkedin?url=` + url,
    fetcher
  );
  return {
    user: data,
    isLoading,
    isError: error,
  };
};

const Dashboard = () => {
  // const { user, isLoading, isError } = useLinkedin(
  //   "https://linkedin.com/in/brunocampos01"
  // );

  const handleClick = async () => {
    async function fetchTokens(
      authRequest: AuthorizationRequest,
      authCode: string
    ): Promise<TokenResponse> {
      const data = new URLSearchParams();
      data.append("client_id", "d088936f563ce38a44a1");
      data.append("client_secret", "505290532c232f369bd09218477840fd64976a37");
      data.append("code", authCode);
      // data.append("code_verifier", authRequest.codeVerifier);
      // data.append("grant_type", "authorization_code");
      data.append("redirect_uri", authRequest.redirectURI);

      const response = await fetch("https://github.com/login/oauth/access_token", {
        mode: "no-cors",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Control-Allow-Origin": "*", "Accept": "*/*" },
        body: data,
      });
      
      if (!response.ok) {
        console.error("fetch tokens error:", await response.text());
        throw new Error(response.statusText);
      }
      return (await response.json()) as TokenResponse;
    }

    const client = new PKCEClient({
      redirectMethod: RedirectMethod.Local,
      providerName: "GitHub",
      providerIcon: "https://github.githubassets.com/favicon.ico",
      providerId: "gitHub",
      description: "GitHub OAuth",
    });

    const authRequest = await client
      .authorizationRequest({
        endpoint: "https://github.com/login/oauth/authorize",
        clientId: "d088936f563ce38a44a1",
        scope: "read:user,repo",
      });

    const { authorizationCode } = await client.authorize(authRequest);
    console.log(authorizationCode);

    const response = await fetchTokens(authRequest, authorizationCode);
    console.log(response);
  };

  return (
    <>
      <Content>
        <Container>
          <Banner />
          <Title />
          <More />
          <span onClick={handleClick}>Connect GitHub</span>
        </Container>
      </Content>
    </>
  );
};

export default Dashboard;
