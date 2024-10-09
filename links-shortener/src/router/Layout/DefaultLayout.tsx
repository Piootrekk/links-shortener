import Header from "@/components/Header/Header";

import { Outlet } from "react-router-dom";

const DefaultLayout: React.FC = () => {
  return (
    <>
      <div className="min-h-screen container">
        <header>
          <Header />
        </header>
        <main className="container mx-auto px-4 py-12">
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
