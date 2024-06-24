import "./index.css";
import Navigo from "navigo";
import loadingPage from "./src/pages/loadingPage";

export const router = new Navigo("/");
export const routes = {
  loading: "/",
};

router.on(routes.loading, loadingPage).resolve();
