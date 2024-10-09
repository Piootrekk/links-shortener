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
      {errors.url && (
        <ErrorMessage message={errors.url.message} className="text-md" />
      )}
    </>
  );
};

export default LinkAnonymous;
