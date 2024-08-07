import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <div className="min-h-screen container">
        {/* <ColorsTest /> */}
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      <footer className="p-8 text-center bg-secondary">
        <p className="text-md">&copy; 2024. All rights reserved.</p>
      </footer>
    </>
  );
};

export default DefaultLayout;
