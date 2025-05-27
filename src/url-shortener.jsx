import { useState, useEffect } from "react";
import UrlList from "./url-list";
import QrGenerator from "./qr-generator";
import { createPortal } from "react-dom";
import { QrCode } from "lucide-react";

export default function UrlShortener() {
  const [urlList, setUrlList] = useState(() => {
    const saved = localStorage.getItem("url-list");
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [originalUrl, setOriginalUrl] = useState("");

  const [shortUrl, setShortUrl] = useState("");

  const [customAlias, setCustomAlias] = useState("");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("url-list", JSON.stringify(urlList));
  }, [urlList]);

  // generate random code
  const generateRandomCode = (length = 6) =>
    Math.random()
      .toString(36)
      .substring(2, 2 + length);

  // custom alias
  const addCustomAlias = () => {
    let alias = prompt("Enter your custom alias:");
    if (!alias) {
      return;
    }
    setCustomAlias(alias);
  };

  // shorten url
  const shortenUrl = ({ originalUrl, alias }) => {
    let shortCode;
    if (!alias) {
      shortCode = generateRandomCode();
    } else {
      shortCode = alias;
    }

    for (let i = 0; i < urlList.length; i++) {
      if (urlList[i].short_code === shortCode) {
        alert("Oops😒, Alias already exists! Please try again.");
        return;
      }
    }
    const newEntry = {
      original_url: originalUrl,
      short_code: shortCode,
      short_url: `${window.location.origin}/${shortCode}`,
      hits: 0,
    };

    setUrlList((prev) => [...prev, newEntry]);
    return newEntry;
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;
    setShortUrl("");
    const result = shortenUrl({ originalUrl, alias: customAlias });
    if (result) {
      setShortUrl(result.short_url);
    }
    setOriginalUrl("");
    setCustomAlias("");
  };

  // count hits
  const countHits = (shortUrl) => {
    const updatedUrlList = urlList.map((url) => {
      if (url.short_url === shortUrl) {
        return { ...url, hits: url.hits + 1 };
      }
      return url;
    });
    setUrlList(updatedUrlList);
  };

  // for portal
  const openPortal = () => {
    setOpen(true);
  };
  const closePortal = () => {
    setOpen(false);
  };

  return (
    <div className="h-inherit grow flex flex-col justify-center items-center">
      <div className="flex gap-4">
        <form
          className="bg-blue-900 p-1 rounded-full border-2 flex border-blue-800"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter your URL"
            className="border-none outline-none px-4 py-2 text-white bg-transparent"
          />

          <div className="flex gap-4 flex-wrap">
            <button
              type="submit"
              className="px-4 bg-orange-200 py-2 text-blue-950 font-semibold rounded-full"
            >
              Shorten
            </button>

            <button
              type="submit"
              className="px-4 bg-orange-200 py-2 text-blue-950 font-semibold rounded-full"
              onClick={addCustomAlias}
            >
              Custom Alias
            </button>
          </div>
        </form>

        <button
          onClick={openPortal}
          className="text-blue-950 bg-orange-200 py-2 px-3 rounded-full border hover:bg-transparent hover:text-orange-200 hover:border-orange-200 transition-all duration-300 ease-in-out "
        >
          <QrCode />
        </button>
      </div>

      <div className="mt-8 flex gap-2">
        <h3 className="text-blue-300 text-xl font-semibold">Shortened URL:</h3>

        <a
          onClick={() => countHits(shortUrl)}
          href={originalUrl}
          target="_blank"
          className="text-xl text-white underline"
        >
          {shortUrl}
        </a>

        {open &&
          shortUrl &&
          createPortal(
            <QrGenerator originalUrl={originalUrl} closePortal={closePortal} />,
            document.body
          )}
      </div>

      <UrlList
        urlList={urlList}
        countHits={countHits}
        setUrlList={setUrlList}
      />
    </div>
  );
}
