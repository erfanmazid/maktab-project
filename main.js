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
import searchPage from "./src/pages/search";
import cartPage from "./src/pages/cart";
import checkoutPage from "./src/pages/checkout";
import shippingPage from "./src/pages/shiping";
import shippingTypePage from "./src/pages/shippingType";
import paymentPage from "./src/pages/paymentPage";
import orders from "./src/pages/orders";
import orderShow from "./src/pages/orderShow";
import addAdressPage from "./src/pages/addAddress";
import wishListPage from "./src/pages/wishList";
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
  search: "/search",
  cart: "/cart",
  checkout: "/checkout",
  shipping: "/shipping",
  shippingType: "/shippingType",
  payment: "/payment",
  order: "/orders",
  orderShow: "/orders/:id",
  addAdress: "/shipping/add",
  wishList: "/wishList",
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
  .on(routes.product, (match) => productPage(match))
  .on(routes.productInfo, (match) => productInfoPage(match))
  .on(routes.search, (match) => searchPage(match))
  .on(routes.cart, cartPage)
  .on(routes.checkout, checkoutPage)
  .on(routes.shipping, shippingPage)
  .on(routes.shippingType, shippingTypePage)
  .on(routes.payment, paymentPage)
  .on(routes.order, orders)
  .on(routes.orderShow, (match) => orderShow(match))
  .on(routes.addAdress, addAdressPage)
  .on(routes.wishList, wishListPage)
  .resolve();
