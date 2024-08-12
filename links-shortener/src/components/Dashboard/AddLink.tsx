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
const AddLink = () => {
  const short = shortUrlGenerate(2, 6);
  const [shortUrl, setShortUrl] = useState<string>(short);
  const onHandleShortUrlGenerate = () => {
    setShortUrl(shortUrlGenerate(2, 6));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new link</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new link.
          </DialogDescription>
          <form>
            <Input type="text" placeholder="Title" />
            <ErrorMessage message="Title is required" />
            <Input type="text" placeholder="URL" />
            <ErrorMessage message="URL is required" />
            <div className="flex items-center gap-2">
              <Card className="p-2">{import.meta.env.VITE_URL || "URL"}</Card>
              <span>{"/"}</span>
              <Input type="text" placeholder="Short URL" value={shortUrl} />
              <Button
                variant="ghost"
                type="button"
                onClick={() => onHandleShortUrlGenerate()}
              >
                <RefreshCcw />
              </Button>
            </div>
            <ErrorMessage message="Short URL is required" />
          </form>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddLink;
