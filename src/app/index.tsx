import ReactDOM from "react-dom/client";
import "./globals.css";
import { Provider } from "./providers";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider />,
);
