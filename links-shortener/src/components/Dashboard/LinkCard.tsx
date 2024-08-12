import { Link } from "react-router-dom";
import { TUrl } from "@/schemas/dbSchema";
import { Button } from "../ui/button";
import { Copy, CopyCheck, Download, Edit, Trash } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type LinksCardProps = {
  link: TUrl;
};

const LinkCard: React.FC<LinksCardProps> = ({ link }) => {
  const URL = import.meta.env.VITE_URL;
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${URL}/${link.short_url}`);
    setCopied(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {};

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-primary rounded-lg">
      <img
        src={link.qr_code}
        alt="QR Code"
        className="h-32 object-contain rounded-md ring ring-blue-500 self-start"
      />
      <Link to="/dashboard/1" className="flex flex-col flex-1">
        <span className=" text-xl font-extrabold text-white">{link.title}</span>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer text-clip">
          {URL}/{link.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer text-white">
          {link.original_url}
        </span>
        <span className="flex text-white items-end text-sm flex-1">
          {new Date(link.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button variant={"ghost"} onClick={handleCopy}>
          {copied ? (
            <CopyCheck className="w-6 h-6" />
          ) : (
            <Copy className="w-6 h-6" />
          )}
        </Button>
        <Button variant={"ghost"}>
          <Edit className="w-6 h-6" />
        </Button>
        <Button variant={"ghost"} onClick={handleDownload}>
          <Download className="w-6 h-6" />
        </Button>
        <Button variant={"ghost"}>
          <Trash className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
