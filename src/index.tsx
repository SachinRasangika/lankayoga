import "./index.css";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import type { StoredContent } from "./admin/content";

declare global {
  interface Window {
    __INITIAL_CONTENT__?: StoredContent;
  }
}

const rootEl = document.getElementById("root");
if (rootEl) {
  const app = <App initialContent={window.__INITIAL_CONTENT__} />;
  if (window.__INITIAL_CONTENT__) {
    ReactDOM.hydrateRoot(rootEl, app);
  } else {
    ReactDOM.createRoot(rootEl).render(app);
  }
}