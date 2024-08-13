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
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import insertLinkSchema, {
  TInsertLinkSchema,
} from "@/schemas/InsertLinkSchema";
import { useForm } from "react-hook-form";
import insertUrl from "@/supabase/db/inserts";
import { useAuth } from "@/context/AuthContext";

type DialogAddFormProps = {
  data?: TInsertLinkSchema;
};

const DialogUrlForm: React.FC<DialogAddFormProps> = () => {
  const short = shortUrlGenerate(2, 6);
  const [shortUrl, setShortUrl] = useState<string>(short);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const onHandleShortUrlGenerate = () => {
    setShortUrl(shortUrlGenerate(2, 6));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<TInsertLinkSchema>({
    resolver: zodResolver(insertLinkSchema),
  });

  const onSubmit = async (formData: TInsertLinkSchema) => {
    console.log(formData);
    if (!user) throw new Error("User not found");
    const data = await insertUrl(
      formData.url,
      formData.shortUrl,
      formData.title,
      user?.id
    );
    console.log(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new link</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new link.
          </DialogDescription>
        </DialogHeader>
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
              value={shortUrl}
              onChangeCapture={(e) => setShortUrl(e.currentTarget.value)}
              {...register("shortUrl")}
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
            <Button type="submit">
              {isLoading ? "Loading" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUrlForm;
