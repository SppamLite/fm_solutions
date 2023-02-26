// deno-lint-ignore-file ban-ts-comment
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

// @ts-ignore
import QRCode from "../third-party-packages/qrcode.js";

type Props = {
  query?: string;
  urls: string[];
};

const QrCodeGenerator = ({
  query,
  urls = ["https://www.frontendmentor.io/"],
}: Props) => {
  const initUrl = query ? query : urls[0];
  const codeGenRef = useRef(null);
  const qrcodeRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState<string>(initUrl);

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

  return (IS_BROWSER
    ? (
      <div
        style={{
          width: 160,
          display: "flex",
          cursor: "pointer",
        }}
        onClick={handleChangeCode}
        ref={qrcodeRef}
      />
    )
    : (
      <div>
        <img
          src="/images/qr-code-component/qr-code.svg"
          alt="QR Code place holder"
        />
      </div>
    ));
};

export default QrCodeGenerator;
