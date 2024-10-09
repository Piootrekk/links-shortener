import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useAuth } from "@/context/AuthContext";
import useMediaQuery from "@/hooks/useMediaQuery";
import UserMenuMobile from "./UserMenuMobile";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isNotMobile = useMediaQuery("small");
  const loginHandler = () => {
    navigate("/auth");
  };

  return (
    <>
      {user.data !== undefined && (
        <nav className="flex justify-between items-center py-4 ">
          <Link to="/">
            <h1 className="text-3xl  font-bold">URL Shortener</h1>
          </Link>
          {user.data === null ? (
            <Button variant={"outline"} onClick={loginHandler}>
              Authorize
            </Button>
          ) : isNotMobile ? (
            <UserMenu />
          ) : (
            <UserMenuMobile />
          )}
        </nav>
      )}
    </>
  );
};

export default Header;
