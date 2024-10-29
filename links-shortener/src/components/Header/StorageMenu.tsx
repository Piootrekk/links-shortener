import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { toast } from "sonner";
import useLocalStorage from "@/hooks/useLocalStorage";
import { anonLinksSchema, key } from "@/schemas/localStorageSchema";
import { Link } from "react-router-dom";
import { ChartNoAxesCombined, ExternalLink, LinkIcon } from "lucide-react";

const StorageMenu = () => {
  const { value, error } = useLocalStorage(key, anonLinksSchema, null);
  if (error) {
    return toast.error(
      "There was an error loading data from LocalStorage:" + { error }
    );
  }

  if (!value) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>Storage</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center text-wrap">
          Stored link
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link
            to={`${import.meta.env.VITE_FRONTEND_URL}/direct/${
              value.short_url
            }`}
          >
            <LinkIcon className="h-4 w-4" />
            <span className="ml-2">Short url</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to={`${import.meta.env.VITE_FRONTEND_URL}/p/${value.id}`}>
            <ChartNoAxesCombined className="h-4 w-4" />
            <span className="ml-2">Analytics</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <a
            href={value.original_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="ml-2">Original URL</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StorageMenu;
