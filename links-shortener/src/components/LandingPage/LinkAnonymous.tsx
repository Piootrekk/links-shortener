import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  anonymousLinkSchema,
  TAnonymousLinkSchema,
} from "@/schemas/anonymousLink";
import ConfirmLink from "./ConfirmLink";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";

const LinkAnonymous = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TAnonymousLinkSchema>({
    resolver: zodResolver(anonymousLinkSchema),
  });

  const onSubmit = async (formData: TAnonymousLinkSchema) => {
    setIsOpen(true);
    console.log(formData);
  };

  if (errors.url) {
    toast.error(errors.url.message);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-2 sm:gap-0"
      >
        <Input
          placeholder="Enter your link"
          className="flex-grow p-2 border rounded-md sm:rounded-r-none"
          {...register("url")}
        />
        <Button
          type="submit"
          variant="outline"
          className=" rounded-md sm:rounded-l-none"
        >
          Short
        </Button>
        <ConfirmLink
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          link={getValues("url")}
        />
      </form>
    </>
  );
};

export default LinkAnonymous;
