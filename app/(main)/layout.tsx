import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

const MainLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="w-screen">
        <Header/>
        <main className="h-80 flex-1 bg-black text-white">{children}</main>
        <Footer/>
    </div>
  )
}

export default MainLayout