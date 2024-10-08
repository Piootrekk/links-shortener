import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  anonymousLinkSchema,
  TAnonymousLinkSchema,
} from "@/schemas/anonymousLink";
import ErrorMessage from "../Error/ErrorMessage";
import ConfirmLink from "./ConfirmLink";
import { Button } from "../ui/button";
import { useState } from "react";

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

  return (
    <>
      <form
        className="md:h-16 flex flex-col flex-wrap items-center gap-2 justify-center w-4/5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="Enter your link"
          className="h-full p-4"
          {...register("url")}
        />
        <Button type="submit" variant="outline" className="h-12 md:h-full">
          Short it!
        </Button>
        <ConfirmLink
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          link={getValues("url")}
        />
      </form>
      {errors.url && (
        <ErrorMessage message={errors.url.message} className="text-xl" />
      )}
    </>
  );
};

export default LinkAnonymous;
