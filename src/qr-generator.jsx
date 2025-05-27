import { QRCodeSVG } from "qrcode.react";
import { X } from "lucide-react";

export default function QrGenerator({ originalUrl, closePortal }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2">
      <div className="bg-blue-300/70 p-10 rounded-md">
        <X onClick={closePortal} className="text-blue-950 mb-2" />
        <QRCodeSVG value={originalUrl} />
      </div>
    </div>
  );
}
