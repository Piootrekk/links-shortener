import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import TransformLinkVisualize from "./TransformLinkVisualize";

type ConfirmLinkProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  link: string;
};

const ConfirmLink: React.FC<ConfirmLinkProps> = ({
  isOpen,
  setIsOpen,
  link,
}) => {
  const handleButtonClick = (open: boolean) => {
    setIsOpen(open);
  };
  const { user } = useAuth();
  return (
    <Dialog open={isOpen} onOpenChange={handleButtonClick}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Link Anonymously</DialogTitle>
          <DialogDescription>
            <p className="text-lg">
              <p className="indent-4 pb-2">
                Are you sure you want to create a link anonymously? Without
                logging in, you will not have access to features like:
              </p>
              <div className="space-x-2">
                <Badge variant={"default"}>QR Codes</Badge>
                <Badge variant={"default"}>Custom Links</Badge>
                <Badge variant={"default"}>Passwords Protect</Badge>
                <Badge variant={"default"}>Private analitycs</Badge>
                <Badge variant={"default"}>Profiled all</Badge>
              </div>
            </p>
            {user.data && (
              <p className="mt-4 indent-4 text-lg text-center">
                Your are currently logged as:{" "}
                <span className="font-bold text-center">{user.data.email}</span>
                <span>
                  . You can create custom link via personal dashboard.{" "}
                </span>
                <br />
                <Link className="underline" to="/dashboard">
                  Dashboard personal links
                </Link>
              </p>
            )}
          </DialogDescription>
        </DialogHeader>
        <TransformLinkVisualize link={link} />
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmLink;
