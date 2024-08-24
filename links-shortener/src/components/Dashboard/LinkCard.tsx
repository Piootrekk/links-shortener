import { Link } from "react-router-dom";
import { TUrl } from "@/schemas/dbSchema";
import { Button } from "../ui/button";
import { Copy, CopyCheck, Download } from "lucide-react";
import { useState } from "react";
import DialogRemove from "./DialogRemove";
import DialogQR from "./DialogQR";
import DialogUpdate from "./DialogUpdate";
import borderplateQR from "@/../public/borderplate.png";

type LinksCardProps = {
  link: TUrl;
};

const LinkCard: React.FC<LinksCardProps> = ({ link }) => {
  const URL = import.meta.env.VITE_FRONTEND_URL;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${URL}/${link.short_url}`);
    setCopied(true);
  };

  const handleDownload = () => {};

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-secondary rounded-lg w-full">
      {link.qr_code ? (
        <DialogQR qrCode={link.qr_code} />
      ) : (
        <img
          src={borderplateQR}
          alt="QR Code"
          className="h-32 object-contain rounded-md ring ring-blue-500 self-start cursor-not-allowed"
        />
      )}

      <div className="flex flex-col truncate text-ellipsis">
        <Link
          to={`/link/${link.id}`}
          className="text-xl font-extrabold truncate break-all"
        >
          {link.title}
        </Link>
        <Link
          to={`/${link.short_url}`}
          className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer truncate break-all"
        >
          {URL}/{link.short_url}
        </Link>
        <a
          className="flex items-center gap-1 hover:underline cursor-pointer"
          href={link.original_url}
        >
          {link.original_url}
        </a>
        <span className="flex items-end text-sm flex-1">
          {new Date(link.created_at).toLocaleString()}
        </span>
      </div>

      <div className="flex gap-2 justify-end flex-1">
        <Button variant={"ghost"} onClick={handleCopy}>
          {copied ? (
            <CopyCheck className="w-6 h-6" />
          ) : (
            <Copy className="w-6 h-6" />
          )}
        </Button>
        <DialogUpdate
          data={{
            title: link.title!,
            url: link.original_url,
            shortUrl: link.short_url,
          }}
          id={link.id}
        />
        <Button variant={"ghost"} onClick={handleDownload}>
          <Download className="w-6 h-6" />
        </Button>
        <DialogRemove title={link.title!} id={link.id} qrPath={link.qr_code!} />
      </div>
    </div>
  );
};

export default LinkCard;
