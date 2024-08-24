import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";
import removeLinkSchema from "@/schemas/removeLinkSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "../Error/ErrorMessage";
import { useEffect, useState } from "react";
import useDb from "@/context/DbContext";
import LoadingSpin from "../ui/loading-spin";
import { useAuth } from "@/context/AuthContext";

type DialogRemoveProps = {
  title: string;
  id: string;
  qrPath: string;
};

const DialogRemove: React.FC<DialogRemoveProps> = ({ title, qrPath, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const removeSchema = removeLinkSchema(title.trim());
  const { del } = useDb();
  const { user } = useAuth();
  type TRemoveLinkSchema = z.infer<typeof removeSchema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TRemoveLinkSchema>({
    resolver: zodResolver(removeSchema),
  });

  const onSubmit = async (_: TRemoveLinkSchema) => {
    await del.execute(user?.session.access_token, id, qrPath);
    if (!del.error) return;
  };

  useEffect(() => {
    if (del.data?.success) {
      setValue("title", "");
      setIsOpen(false);
    }
  }, [del.data]);

  const handleOpenChange = (open: boolean) => {
    if (!del.isLoading) {
      setIsOpen(open);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Trash className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete: {title}</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this link? Type the title of the
            link to confirm.
          </DialogDescription>
        </DialogHeader>
        {del.error && <ErrorMessage message={del.error.message} />}
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Title"
            className="mt-4"
            {...register("title")}
          />
          {errors.title && <ErrorMessage message={errors.title.message!} />}
          <Button type="submit" variant={"destructive"} className="mt-4">
            {del.isLoading ? <LoadingSpin /> : "Delete"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRemove;
