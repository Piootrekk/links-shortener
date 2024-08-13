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

type DialogRemoveProps = {
  title: string;
};

const DialogRemove: React.FC<DialogRemoveProps> = ({ title }) => {
  const removeSchema = removeLinkSchema(title);
  type TRemoveLinkSchema = z.infer<typeof removeSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRemoveLinkSchema>({
    resolver: zodResolver(removeSchema),
  });

  const onSubmit = (formData: TRemoveLinkSchema) => {
    console.log(formData);
  };
  return (
    <Dialog>
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
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Title"
            className="mt-4"
            {...register("title")}
          />
          {errors.title && <ErrorMessage message={errors.title.message!} />}
          <Button type="submit" className="mt-4">
            Remove
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRemove;
