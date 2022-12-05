import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NavbarStandard from "../../00_Marketing/NavbarStandard";
// import { useGetCurrentUserQuery } from "../../../graphql/getCurrentUser.generated";

function Navbar() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <NavbarStandard />;
  }

  if (
    status === "unauthenticated" ||
    router.route === "/" ||
    router.route === "/manifesto" ||
    router.route === "/legal" ||
    router.route === "/privacy"
  ) {
    return <NavbarStandard />;
  }

  if (status === "authenticated") {
    return <div></div>;
  }

  return null;
}

export default Navbar;
