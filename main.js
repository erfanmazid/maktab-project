import "./index.css";
import Navigo from "navigo";
import loadingPage from "./src/pages/loadingPage";
import "@splidejs/splide/css";
import { signupPage } from "./src/pages/signupPage";
import loginPage from "./src/pages/loginPage";
import homePage from "./src/pages/home";
export const root = document.querySelector("#app");

export const router = new Navigo("/");
export const routes = {
  loading: "/",
  signup: "/signup",
  login: "/login",
  home: "/home",
};

router
  .on(routes.loading, loadingPage)
  .on(routes.signup, signupPage)
  .on(routes.login, loginPage)
  .on(routes.home, homePage)
  .resolve();
