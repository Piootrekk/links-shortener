import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserMenu from "./UserMenu";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const loginHandler = () => {
    navigate("/auth");
    setIsAuthorized(true);
  };

  return (
    <nav className="flex justify-between items-center py-4 ">
      <Link to="/">
        <h1 className="text-3xl font-bold">URL Shortener</h1>
      </Link>
      {!isAuthorized ? (
        <Button variant={"outline"} onClick={loginHandler}>
          Authorize
        </Button>
      ) : (
        <UserMenu />
      )}
    </nav>
  );
};

export default Header;
