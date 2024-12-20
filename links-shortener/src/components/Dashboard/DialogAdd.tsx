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

import shortUrlGenerate from "@/lib/shortUrlGenerate";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import insertLinkSchema, {
  TInsertLinkSchema,
} from "@/schemas/InsertLinkSchema";
import { useForm } from "react-hook-form";
import LoadingSpin from "../ui/loading-spin";
import useFetchCallback from "@/hooks/useFetchCallback";
import { insertPersonalLink } from "@/api/endpoints";
import { useRefreshData } from "@/context/RefreshDataContext";
import { Plus } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

import DialogAddRefreshShortUrl from "./DialogAddRefreshShortUrl";
import { toast } from "sonner";

type DialogAddFormProps = {};

const DialogAdd: React.FC<DialogAddFormProps> = () => {
  const short = shortUrlGenerate(2, 6);
  const { data, isLoading, error, execute } =
    useFetchCallback(insertPersonalLink);
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const { refreshBoth } = useRefreshData();

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
    setValue("password", undefined);
    setIsPasswordEnabled(false);
  };

  const onSubmit = async (formData: TInsertLinkSchema) => {
    await execute(
      formData.url,
      formData.shortUrl,
      formData.title,
      isPasswordEnabled || formData.password === ""
        ? formData.password
        : undefined
    );

    return;
  };

  useEffect(() => {
    if (data && data.success && !error && !isLoading) {
      formsReset();
      setIsOpen(false);
      toast.success("Link created successfully.");
      refreshBoth();
    }
    if (error) {
      toast.error(error.message);
    }
  }, [data, error]);

  const handleOpenChange = (open: boolean) => {
    if (!isLoading) {
      setIsOpen(open);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus />
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add link</DialogTitle>
          <DialogDescription>Create a new link</DialogDescription>
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

          <div className="flex items-center gap-2 mt-4 mb-4 ">
            <Card className="p-2 text-sm">
              {import.meta.env.VITE_FRONTEND_URL + "/direct" || "URL"}{" "}
            </Card>
            <span>{"/"}</span>
            <Input
              type="text"
              placeholder="Short URL"
              {...register("shortUrl")}
              className="flex-1 md:w-20 w-12"
            />
            <DialogAddRefreshShortUrl
              setShortUrl={(newShortUrl) => setValue("shortUrl", newShortUrl)}
            />
          </div>
          {errors.shortUrl && (
            <ErrorMessage message={errors.shortUrl.message} />
          )}
          <div className="mt-4 mb-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enable-password"
                checked={isPasswordEnabled}
                onClick={() => setIsPasswordEnabled(!isPasswordEnabled)}
              />
              <label htmlFor="enable-password">Enable password</label>
            </div>
            <Input
              type="password"
              placeholder={isPasswordEnabled ? "Password" : "Enter password"}
              {...register("password")}
              className="mt-4"
              disabled={!isPasswordEnabled}
            />
          </div>
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}

          <DialogFooter>
            <Button type="submit" variant={"outline"} disabled={isLoading}>
              {isLoading ? <LoadingSpin /> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAdd;
