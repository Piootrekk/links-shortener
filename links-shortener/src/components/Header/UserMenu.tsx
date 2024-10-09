import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import AvatarHeader from "./Avatar";
import { Link as LinkIcon, LogOut } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const UserMenu: React.FC<{}> = () => {
  const { user, handleLogout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-10 rounded-full overflow-hiddenfocus:outline-none">
        <AvatarHeader />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center text-wrap">
          {user.data?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/dashboard">
          <DropdownMenuItem className="cursor-pointer">
            <LinkIcon className="h-4 w-4" />
            <span className="ml-2">My Links</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="h-4 w-4" />
          <span className="ml-2">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
