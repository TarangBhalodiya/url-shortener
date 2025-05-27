import Navbar from "./navbar";
import UrlShortener from "./url-shortener";

export default function App() {
  return (
    <div className="relative bg-blue-950 h-screen flex flex-col">
      <Navbar />
      <UrlShortener />
    </div>
  );
}
