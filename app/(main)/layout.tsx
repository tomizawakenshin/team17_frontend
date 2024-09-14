import Footer from "@/components/Footer/Footer";
// import Header from "@/components/Header/Header";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
  return (

    <div className="flex flex-col min-h-screen">
      <Header />
      {/* <div className="p-4 bg-gray-800 text-white fixed w-full top-0 left-0 z-50">ヘッダー</div> */}
      <main className="flex-grow mt-12 bg-black text-white">

        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
