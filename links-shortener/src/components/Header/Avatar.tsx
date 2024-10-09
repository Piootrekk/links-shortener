import { UserIcon } from "lucide-react";
import { Avatar } from "../ui/avatar";
const AvatarHeader = () => {
  return (
    <Avatar className="flex justify-center items-center cursor-pointer border focus:outline-none">
      <UserIcon />
    </Avatar>
  );
};
export default AvatarHeader;
