import { Link } from "react-router-dom";
import { TUrl } from "@/schemas/dbSchema";
import DialogRemove from "./DialogRemove";
import DialogQR from "./DialogQR";
import DialogUpdate from "./DialogUpdate";
import borderplateQR from "@/assets/borderplate.png";
import DialogCopy from "./DialogCopy";
import DialogDownload from "./DialogDownload";

type LinksCardProps = {
  link: TUrl;
};

const LinkCard: React.FC<LinksCardProps> = ({ link }) => {
  const URL = import.meta.env.VITE_FRONTEND_URL;
  if (!URL) throw new Error("VITE_FRONTEND_URL is not defined");

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-secondary rounded-lg w-full">
      <div className="flex items-center justify-center h-32 w-32 min-h-32 min-w-32 md:mx-1 mx-auto">
        {link.qr_code ? (
          <DialogQR qrCode={link.qr_code} />
        ) : (
          <img
            src={borderplateQR}
            alt="QR Code"
            className="h-32 object-contain rounded-md ring ring-blue-500 self-start cursor-not-allowed"
          />
        )}
      </div>
      <div className="flex flex-col truncate text-ellipsis md:order-1 order-3">
        <Link
          to={`/link/${link.id}`}
          className="text-xl font-extrabold truncate break-all"
        >
          {link.title}
        </Link>
        <Link
          to={`/direct/${link.short_url}`}
          className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer truncate break-all"
        >
          {URL}/{link.short_url}
        </Link>
        <a
          className="flex items-center gap-1 hover:underline cursor-pointer text-muted-foreground"
          href={link.original_url}
        >
          {link.original_url}
        </a>
        <span className="flex items-end text-sm flex-1">
          {new Date(link.created_at).toLocaleString()}
        </span>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-2 justify-center md:justify-end md:flex-1 order-1">
        <DialogCopy shortUrl={link.short_url} />
        <DialogUpdate
          data={{
            title: link.title!,
            url: link.original_url,
          }}
          id={link.id}
        />
        <DialogDownload qrCode={link.qr_code!} />
        <DialogRemove title={link.title!} id={link.id} qrPath={link.qr_code!} />
      </div>
    </div>
  );
};

export default LinkCard;
