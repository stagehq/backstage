import Footer from "../../02_AppGlobal/Footer";
import Navbar from "../../02_AppGlobal/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
