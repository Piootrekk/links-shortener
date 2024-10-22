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
import LoadingSpin from "../ui/loading-spin";
import useFetchCallback from "@/hooks/useFetchCallback";

import { deletePersonalLink } from "@/Api/endpoints";
import { useRefreshData } from "@/context/RefreshDataContext";
import { toast } from "sonner";

type DialogRemoveProps = {
  title: string;
  id: string;
  qrPath: string;
};

const DialogRemove: React.FC<DialogRemoveProps> = ({ title, qrPath, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refreshBoth } = useRefreshData();
  const removeSchema = removeLinkSchema(title.trim());
  type TRemoveLinkSchema = z.infer<typeof removeSchema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TRemoveLinkSchema>({
    resolver: zodResolver(removeSchema),
  });

  const { data, isLoading, error, execute } =
    useFetchCallback(deletePersonalLink);

  const onSubmit = async (_: TRemoveLinkSchema) => {
    await execute(id, qrPath);
    if (!error) {
      toast.success("Link removed successfully.");
      return;
    }
  };

  useEffect(() => {
    if (data && data.success) {
      setValue("title", "");
      setIsOpen(false);
      refreshBoth();
    }
  }, [data]);

  const handleOpenChange = (open: boolean) => {
    if (!isLoading) {
      setIsOpen(open);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className=" border text-primary border-transparent hover:border-primary 
          focus:outline-none transition-colors duration-200"
        >
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
        {error && <ErrorMessage message={error.message} />}
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Title"
            className="mt-4"
            {...register("title")}
          />
          {errors.title && <ErrorMessage message={errors.title.message!} />}
          <Button type="submit" variant={"destructive"} className="mt-4">
            {isLoading ? <LoadingSpin /> : "Delete"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRemove;
