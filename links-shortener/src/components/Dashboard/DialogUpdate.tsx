import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import ErrorMessage from "../Error/ErrorMessage";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import updateSchema, { TUpdateLinkSchema } from "@/schemas/updateLinkSchema";
import { useForm } from "react-hook-form";
import LoadingSpin from "../ui/loading-spin";
import useFetchCallback from "@/hooks/useFetchCallback";
import { updatePersonalLink } from "@/Api/endpoints";
import { useRefreshData } from "@/context/RefreshDataContext";
import { toast } from "sonner";

type DialogUpdateFormProps = {
  data?: TUpdateLinkSchema;
  id: string;
};

const DialogUpdate: React.FC<DialogUpdateFormProps> = ({ data, id }) => {
  const { refreshBoth } = useRefreshData();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateLinkSchema>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      title: data?.title,
      url: data?.url,
    },
  });
  const {
    data: update,
    isLoading,
    error,
    execute,
  } = useFetchCallback(updatePersonalLink);

  const onSubmit = async (formData: TUpdateLinkSchema) => {
    await execute(id, formData.url, formData.title);
    if (!error) return;
  };

  useEffect(() => {
    if (update && update.success && !error && !isLoading) {
      setIsOpen(false);
      toast.success("Link updated successfully.");
      refreshBoth();
    }
    if (error) {
      toast.error(error.message);
    }
  }, [update, error]);

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
          className=" border border-transparent text-primary
          hover:border-primary focus:outline-none transition-colors duration-200"
        >
          <Edit className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit link</DialogTitle>
          <DialogDescription>Edit your link</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input type="text" placeholder="Title" {...register("title")} />
          {errors.title && <ErrorMessage message={errors.title.message} />}
          <Input type="text" placeholder="URL" {...register("url")} />
          {errors.url && <ErrorMessage message={errors.url.message} />}
          <DialogFooter>
            <Button type="submit" disabled={isLoading} variant={"outline"}>
              {isLoading ? <LoadingSpin /> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdate;
