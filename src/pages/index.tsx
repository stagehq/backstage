import Link from "next/link";

export default function HomepagePage() {
  return (
    <span>
      Redirecting via middleware to <Link href="/auth/login">/auth/login</Link>
    </span>
  );
}
