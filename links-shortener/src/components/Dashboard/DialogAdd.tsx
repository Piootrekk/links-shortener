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
import { RefreshCcw } from "lucide-react";
import shortUrlGenerate from "@/lib/shortUrlGenerate";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import insertLinkSchema, {
  TInsertLinkSchema,
} from "@/schemas/InsertLinkSchema";
import { useForm } from "react-hook-form";

import { useAuth } from "@/context/AuthContext";
import useDb from "@/context/DbContext";
import LoadingSpin from "../ui/loading-spin";

type DialogAddFormProps = {};

const DialogAdd: React.FC<DialogAddFormProps> = () => {
  const short = shortUrlGenerate(2, 6);
  const { insert } = useDb();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

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
      shortUrl: short,
    },
  });

  const formsReset = () => {
    setValue("shortUrl", shortUrlGenerate(2, 6));
    setValue("title", "");
    setValue("url", "");
  };

  const onSubmit = async (formData: TInsertLinkSchema) => {
    if (!user) throw new Error("User not found");
    await insert.execute(
      formData.url,
      formData.shortUrl,
      formData.title,
      user?.id
    );
    if (!insert.error) return;
  };

  useEffect(() => {
    if (insert.data?.success) {
      formsReset();
      setIsOpen(false);
    }
  }, [insert.data]);

  const handleOpenChange = (open: boolean) => {
    if (!insert.isLoading) {
      setIsOpen(open);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">Create New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add link</DialogTitle>
          <DialogDescription>Create a new link</DialogDescription>
        </DialogHeader>
        {insert.error && <ErrorMessage message={insert.error.message} />}
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
            <Button type="submit" disabled={insert.isLoading}>
              {insert.isLoading ? <LoadingSpin /> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAdd;