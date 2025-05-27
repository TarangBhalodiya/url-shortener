import { Trash2 } from "lucide-react";

export default function UrlList({ urlList, countHits, setUrlList }) {
  const deleteUrl = (shortUrl) => {
    const updatedUrlList = urlList.filter((url) => url.short_url !== shortUrl);
    setUrlList(updatedUrlList);
    localStorage.setItem("url-list", JSON.stringify(updatedUrlList));
  };
  return (
    <div className="px-10 mt-12 text-white max-h-64 h-full overflow-y-auto">
      {urlList.length > 0 && (
        <table className="">
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>hits</th>
            </tr>
          </thead>
          <tbody>
            {urlList.map((url, index) => (
              <tr key={index} className="border-b border-blue-300 ">
                <td className="py-2 pr-8 text-blue-200/50">
                  {url.original_url}
                </td>
                <td className="py-2 pr-4 text-blue-100/70">
                  <a
                    href={url.original_url}
                    target="_black"
                    onClick={() => countHits(url.short_url)}
                  >
                    {url.short_url}
                  </a>
                </td>
                <td className="py-2 pr-4 text-blue-100/70">{url.hits}</td>
                <td>
                  <button onClick={() => deleteUrl(url.short_url)}>
                    <Trash2 className="text-red-500 px-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
