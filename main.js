import "./index.css";
import Navigo from "navigo";
import loadingPage from "./src/pages/loadingPage";
import "@splidejs/splide/css";
import { signupPage } from "./src/pages/signupPage";
import loginPage from "./src/pages/loginPage";
import homePage from "./src/pages/home";
import productInfoPage from "./src/pages/productInfoPage";
import productsPage from "./src/pages/products";
import productPage from "./src/pages/product";
export const root = document.querySelector("#app");

export const router = new Navigo("/");
export const routes = {
  loading: "/",
  signup: "/signup",
  login: "/login",
  home: "/home",
  products: "/products",
  product: "/products/:id",
  productInfo: "/product/:id",
};

function render(children, click) {
  document.getElementById("app").innerHTML = children;
  click();
}

router
  .on(routes.loading, loadingPage)
  .on(routes.signup, signupPage)
  .on(routes.login, loginPage)
  .on(routes.home, homePage)
  .on(routes.products, productsPage)
  .on(routes.product, productPage)
  .on(routes.productInfo, (match) => productInfoPage(match))
  .resolve();
