import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";

import TransformLinkVisualize from "./TransformLinkVisualize";
import { QrCode, BarChart2, UserCircle, Lock, FilePlus } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";

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
      <DialogContent className="sm:max-w-[425px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Link Anonymously</DialogTitle>
          <DialogDescription>
            Are you sure you want to create a link anonymously? Without logging
            in, you will not have access to features like:
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          <Card className="flex flex-col items-center justify-center h-24">
            <QrCode className="mb-2" />
            QR Codes
          </Card>
          <Card className="flex flex-col items-center justify-center h-24">
            <Lock className="mb-2" />
            Password Protect
          </Card>
          <Card className="flex flex-col items-center justify-center h-24">
            <BarChart2 className="mb-2" />
            Private analytics
          </Card>
          <Card className="flex flex-col items-center justify-center h-24">
            <UserCircle className="mb-2" />
            Profiled all links
          </Card>
        </div>
        {user.data && (
          <div className="space-y-2 flex flex-col">
            <p className="text-sm  text-muted-foreground">
              You are currently logged as:{" "}
              <span className="font-semibold">{user.data.email}. </span>
              You can create custom links via personal dashboard.
            </p>

            <Button asChild variant="link" className="p-0 h-auto ">
              <Link to="/dashboard" className="text-center">
                Dashboard personal links
              </Link>
            </Button>
          </div>
        )}
        <TransformLinkVisualize link={link} />
        <Button variant={"outline"} className="w-2/3 self-center gap-2">
          <FilePlus /> Generate Link
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmLink;
