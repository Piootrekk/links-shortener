import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar } from "../ui/avatar";
import { Link as LinkIcon, LogOut, User as UserIcon } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { TUserCredentials } from "@/schemas/authSchema";

type UserMenuProps = {
  user: TUserCredentials;
  logout: () => void;
};

const UserMenu: React.FC<UserMenuProps> = ({ user, logout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-10 rounded-full overflow-hiddenfocus:outline-none">
        <Avatar className="flex justify-center items-center cursor-pointer border focus:outline-none">
          <UserIcon />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center text-wrap">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/dashboard">
          <DropdownMenuItem className="cursor-pointer">
            <LinkIcon className="h-4 w-4" />
            <span className="ml-2">My Links</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          <LogOut className="h-4 w-4" />
          <span className="ml-2">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
