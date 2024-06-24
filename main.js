import "./index.css";
import Navigo from "navigo";
import loadingPage from "./src/pages/loadingPage";
import "@splidejs/splide/css";
import { signupPage } from "./src/pages/signupPage";
export const root = document.querySelector("#app");
export const router = new Navigo("/");
export const routes = {
  loading: "/",
  signup: "/signup",
};

router.on(routes.loading, loadingPage).on(routes.signup, signupPage).resolve();
