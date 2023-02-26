// deno-lint-ignore-file ban-ts-comment
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

// @ts-ignore
import QRCode from "../third-party-packages/qrcode.js";

type Props = {
  urls: string[];
};

const QrCodeGenerator = ({
  urls = ["https://www.frontendmentor.io/"],
}: Props) => {
  const qrcodeRef = useRef(null);
  const codeGenRef = useRef(null);
  const [url, setUrl] = useState<string>(urls[0]);

  useEffect(() => {
    if (codeGenRef.current) {
      // @ts-ignore
      codeGenRef.current.clear();
      // @ts-ignore
      codeGenRef.current.makeCode(url);
    } else {
      // @ts-ignore
      codeGenRef.current = new QRCode(qrcodeRef.current, {
        text: url,
        // @ts-ignore
        correctLevel: QRCode.CorrectLevel.M,
      });
    }
  }, [url]);

  const handleChangeCode = useCallback(() => {
    const currentIndex = urls.indexOf(url);
    const totalUrls = urls.length - 1;
    const nextIndex = currentIndex === totalUrls ? 0 : currentIndex + 1;
    setUrl(urls[nextIndex]);
  }, [urls, url]);

  return (
    <div
      style={{
        width: 160,
        display: "flex",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={handleChangeCode}
      ref={qrcodeRef}
    />
  );
};

export default QrCodeGenerator;
