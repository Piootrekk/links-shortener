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
import { Card } from "../ui/card";
import { Edit, RefreshCcw } from "lucide-react";
import shortUrlGenerate from "@/lib/shortUrlGenerate";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import insertLinkSchema, {
  TInsertLinkSchema,
} from "@/schemas/InsertLinkSchema";
import { useForm } from "react-hook-form";
import LoadingSpin from "../ui/loading-spin";
import useFetchMultiple from "@/hooks/useFetchCallback";
import { TCrud } from "@/schemas/dbSchema";
import { updatePersonalLink } from "@/Api/endpoints";

type DialogUpdateFormProps = {
  data?: TInsertLinkSchema;
  id: string;
};

const DialogUpdate: React.FC<DialogUpdateFormProps> = ({ data, id }) => {
  const short = shortUrlGenerate(2, 6);

  const [isOpen, setIsOpen] = useState(false);

  const onHandleShortUrlGenerate = () => {
    setValue("shortUrl", shortUrlGenerate(2, 6));
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TInsertLinkSchema>({
    resolver: zodResolver(insertLinkSchema),
    defaultValues: {
      shortUrl: data?.shortUrl || short,
      title: data?.title,
      url: data?.url,
    },
  });
  const { data: insert, isLoading, error, execute } = useFetchMultiple<TCrud>();

  const onSubmit = async (formData: TInsertLinkSchema) => {
    await execute(
      updatePersonalLink,
      id,
      formData.url,
      formData.title,
      formData.shortUrl
    );

    if (!error) return;
  };

  useEffect(() => {
    if (insert && insert.success) {
      setIsOpen(false);
    }
  }, [insert]);

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
          className=" border border-transparent 
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
        {error && <ErrorMessage message={error.message} />}
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="mt-4"
          />
          {errors.title && <ErrorMessage message={errors.title.message} />}
          <Input
            type="text"
            placeholder="URL"
            {...register("url")}
            className="mt-4"
          />
          {errors.url && <ErrorMessage message={errors.url.message} />}
          <div className="flex items-center gap-2 mt-4 mb-4">
            <Card className="p-2">{import.meta.env.VITE_URL || "URL"}</Card>
            <span>{"/"}</span>
            <Input
              type="text"
              placeholder="Short URL"
              {...register("shortUrl")}
              className="flex-1"
            />
            <Button
              variant="ghost"
              type="button"
              onClick={() => onHandleShortUrlGenerate()}
            >
              <RefreshCcw />
            </Button>
          </div>
          {errors.shortUrl && (
            <ErrorMessage message={errors.shortUrl.message} />
          )}
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <LoadingSpin /> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdate;
