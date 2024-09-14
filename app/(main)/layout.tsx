import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
  return (

    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow mt-12 bg-black text-white">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
