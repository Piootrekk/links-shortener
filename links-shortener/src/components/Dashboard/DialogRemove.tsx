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

type DialogRemoveProps = {
  title: string;
  id: string;
  qrPath: string;
};

const DialogRemove: React.FC<DialogRemoveProps> = ({ title, qrPath, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const removeSchema = removeLinkSchema(title);
  const { del } = useDb();
  type TRemoveLinkSchema = z.infer<typeof removeSchema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TRemoveLinkSchema>({
    resolver: zodResolver(removeSchema),
  });

  const onSubmit = async (formData: TRemoveLinkSchema) => {
    console.log(formData);
    await del.execute(id, qrPath);
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
          <Button type="submit" className="mt-4">
            {del.isLoading ? "Loading..." : "Delete"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRemove;
