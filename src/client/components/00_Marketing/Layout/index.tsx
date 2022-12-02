import Footer from "../../02_AppGlobal/Footer";
import Navbar from "../../02_AppGlobal/Navbar";

interface Props {
  children: React.ReactNode;
}

export function PageLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col justify-between">{children}</div>
  );
}

export function Content({ children }: Props) {
  return <div>{children}</div>;
}

export default function Layout({ children }: Props) {
  return (
    <PageLayout>
      <Content>
        <Navbar />
        {children}
      </Content>
      <Footer />
    </PageLayout>
  );
}
