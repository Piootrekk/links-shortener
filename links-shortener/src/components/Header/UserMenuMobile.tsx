import { useAuth } from "@/context/AuthContext";
import {
  DrawerTrigger,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "../ui/drawer";
import AvatarHeader from "./Avatar";
import { Link } from "react-router-dom";
import { LinkIcon, LogOut } from "lucide-react";
import { Button } from "../ui/button";

const UserMenuMobile: React.FC<{}> = () => {
  const { user, handleLogout } = useAuth();
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <AvatarHeader />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{user.data?.email}</DrawerTitle>
            <DrawerDescription>Manage your account</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col justify-center">
            <DrawerClose asChild>
              <Button asChild variant="link" className="cursor-pointer">
                <Link to="/dashboard">
                  <LinkIcon className="h-4 w-4" />
                  <span className="ml-2">My Links</span>
                </Link>
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                onClick={handleLogout}
                className="cursor-pointer"
                variant="link"
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-2">Logout</span>
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UserMenuMobile;
