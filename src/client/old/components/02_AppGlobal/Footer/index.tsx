import Link from "next/link";

const links = [
  { name: "Twitter", href: "https://twitter.com/zirkular_os" },
  { name: "Manifesto", href: "/manifesto" },
  { name: "Privacy", href: "/privacy" },
];

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="absolute -z-50 h-[462px] -translate-y-[calc(462px_-_112px)] sm:-translate-y-[calc(462px_-_88px)] w-full footer-gradient"></div>
      <div className="transparent py-6">
        <div className="relative max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center flex-1">
            <div className="flex items-center w-full md:w-auto">
              <Link href="/">
                <img
                  className="h-8 w-auto sm:h-10 cursor-pointer"
                  src="/images/logo.svg"
                  alt="Zirkular Logo"
                />
              </Link>
            </div>
            <div className="flex space-x-4 sm:space-x-8 sm:ml-10">
              {links.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a className="text-base font-medium text-black hover:text-indigo-600">
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
