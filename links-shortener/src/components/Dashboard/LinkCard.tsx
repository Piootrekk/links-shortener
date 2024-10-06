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
      <div className="flex flex-col truncate text-ellipsis sm:order-1 order-2">
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
          className="flex items-center gap-1 hover:underline cursor-pointer text-muted-foreground"
          href={link.original_url}
        >
          {link.original_url}
        </a>
        <span className="flex items-end text-sm flex-1">
          {new Date(link.created_at).toLocaleString()}
        </span>
      </div>
      <div className="flex gap-2 sm:justify-end sm:flex-1 sm:order-2 order-1">
        <DialogCopy shortUrl={link.short_url} />
        <DialogUpdate
          data={{
            title: link.title!,
            url: link.original_url,
            shortUrl: link.short_url,
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
