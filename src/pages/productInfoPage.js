import axios from "./api";
import Splide from "@splidejs/splide";
import { productSlider } from "./productSlider";
import { router, routes } from "../../main";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

window.Toastify = Toastify;

let count = 0;
let allCash = 0;

export default async function productInfoPage(match) {
  const token = localStorage.getItem("accessToken") ?? false;
  const welcome = localStorage.getItem("welcome") ?? false;
  if (token && welcome) {
    const id = match.data.id;
    const data = await productData(id);
    const slid = productSlider(data[0].images);
    renderHTML(slid, data[0], id);
    stylecolor();
    styleSize();
    addToCart(id, data[0]);
    checkWish(id);
  } else if (welcome == false) {
    router.navigate(routes.loading);
  } else {
    router.navigate(routes.login);
  }
}

function renderHTML(slider, info, id) {
  count = 0;
  document.querySelector("#app").innerHTML += `
  <div class="flex flex-col items-center gap-y-4 relative h-screen">
  ${slider}
  <div class=" absolute left-6 top-8 text-xl">
  <i class="fa-solid fa-arrow-left" onclick="backTo()"></i>
  </div>
  <div class="flex w-[380px] justify-between items-center">
    <p class="text-[20px] font-bold">${info.title}</p>
    <i class="fa-regular fa-heart text-[30px] bg-black bg-clip-text text-transparent" id="heartIcon" onclick="wishlist(${id})"></i>
  </div>
  <div class="w-[380px] flex items-center justify-start gap-x-3 border-b pb-4">
    <div class="rounded-lg px-3 py-1 bg-gray-100">
      <p class="text-[14px]">${info.sold} sold</p>
    </div>
    <i class="fa-solid fa-star-half-stroke"></i>
    <div class="flex gap-x-1">
      <p>${info.vote}</p>
      <p>(5684 reviwos)</p>
    </div>
  </div>
  <div class="flex flex-col mt-2 w-[380px] h-[200px] overflow-y-scroll no-scrollbar">
    <div class="flex flex-col items-start">
      <p class="font-semibold text-[20px]">Description</p>
      <p class="text-gray-500 mt-2 h-12 overflow-hidden text-ellipsis line-clamp-2">
        ${info.description}
      </p>
    </div>
    <div class="flex gap-x-3">
      <div class="flex flex-col gap-y-2 mt-4 w-[40%]">
        <p class="font-semibold text-[20px]">Size</p>
        <div class="flex gap-x-3">
        ${info.sizes
          .map((item) => {
            return `
          <div
            class="w-10 h-10 rounded-full border-[2px] text-[14px] border-gray-500 text-gray-500 flex justify-center items-center si"
          >
            <p>${item}</p>
          </div>
          `;
          })
          .join("")}
          
        </div>
      </div>
      <div class="flex flex-col gap-y-2 mt-4 w-[60%]">
        <p class="font-semibold text-[20px]">Color</p>
        <div class="flex gap-x-3 overflow-y-scroll no-scrollbar">
        ${info.colors
          .map((item) => {
            return `
          <div
            class="w-10 h-10 rounded-full text-black flex justify-center items-center coll border co"
            style="background-color: ${item["color_code"]}"
          >
            <p class="text-xl font-bold hidden"color="${item["color_code"]}" id="tik">✓</p>
          </div>
            
          `;
          })
          .join("")}
        </div>
      </div>
    </div>
    <div class="flex gap-x-5 items-center justify-start mt-5 pb-4">
      <p class="font-semibold text-[20px]">Quantity</p>
      <div class="flex gap-x-6 bg-gray-100 py-3 rounded-3xl px-8 items-center">
        <i class="fa-solid fa-minus" onclick="minus(${info.price})"></i>
        <p class="font-bold" id="num">${count}</p>
        <i class="fa-solid fa-plus" onclick="plus(${info.price})"></i>
      </div>
    </div>
  </div>
  <div
    class="absolute bottom-0 left-0 w-full px-6 py-4 flex justify-between items-center border-t bg-white"
  >
    <div class="flex flex-col gap-y-1 pr-5">
      <p class="text-[14px] text-gray-500">Total price</p>
      <p class="text-[25px] font-bold" id="total">$0.00</p>
    </div>
    <div
      class="py-5 px-14 w-[65%] flex gap-x-4 items-center justify-center bg-black rounded-[34px] text-white text-[18px]" id="cart-btn"
    >
      <i class="fa-solid fa-bag-shopping"></i>
      <p>Add to cart</p>
    </div>
  </div>
</div>

  `;
  const splide = new Splide(".splide", {
    classes: {
      // arrows: "splide__arrows hidden",
    },
  }).mount();
}

async function productData(id) {
  const serch = `id=${id}`;
  const data = await axios.get(`/products?${serch}`);
  return data.data;
}

window.plus = (p) => {
  count++;
  let all = count * p;
  document.querySelector("#total").innerHTML = "$" + all + ".00";
  document.querySelector("#num").innerHTML = count;
};

window.minus = (p) => {
  if (count > 0) count--;
  let all = count * p;
  document.querySelector("#total").innerHTML = "$" + all + ".00";
  document.querySelector("#num").innerHTML = count;
};

window.stylecolor = () => {
  const btns = document.querySelectorAll(".co");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (document.querySelector(".tick-active"))
        document.querySelector(".tick-active").classList.remove("tick-active");
      btn.querySelector("p").classList.add("tick-active");
    });
  });
};

function styleSize() {
  const btns = document.querySelectorAll(".si");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (document.querySelector(".size-active"))
        document.querySelector(".size-active").classList.remove("size-active");
      btn.classList.add("size-active");
    });
  });
}

function addToCart(id, info) {
  const cartList = JSON.parse(localStorage.cartList);
  const btn = document.querySelector("#cart-btn");
  btn.addEventListener("click", () => {
    const color = document.querySelector(".tick-active");
    const size = document.querySelector(".size-active");
    console.log();
    const order = {
      id,
      color: color.getAttribute("color"),
      size: size.querySelector("p").innerHTML,
      number: count,
      price: info.price,
    };
    cartList.push(order);
    localStorage.cartList = JSON.stringify(cartList);

    Toastify({
      text: "Your Shoa add to cart successfuly",
      duration: 3000,
      destination: "",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#6b7280",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  });
}

window.backTo = () => {
  const brand = localStorage.getItem("brand");
  if (brand == "home") {
    router.navigate(routes.home);
  } else if (brand == "cart") {
    router.navigate(routes.cart);
  } else if (brand == "wishList") {
    router.navigate(routes.wishList);
  } else {
    router.navigate(`/products/${brand}`);
  }
};

window.wishlist = (id) => {
  const heartIcon = document.querySelector("#heartIcon");
  heartIcon.classList.toggle("fa-regular");
  heartIcon.classList.toggle("bg-black");
  heartIcon.classList.toggle("fa-solid");
  heartIcon.classList.toggle("bg-red-500");
  const classes = heartIcon.classList.value;

  if (classes.includes("bg-red-500")) {
    let wishList = JSON.parse(localStorage.wishList);
    wishList.push(id);
    localStorage.wishList = JSON.stringify(wishList);
  } else {
    let wishListremove = JSON.parse(localStorage.wishList);
    const newWish = wishListremove.filter((x) => x != id);
    localStorage.wishList = JSON.stringify(newWish);
  }
};

function checkWish(id) {
  const newId = +id;
  let wishList = JSON.parse(localStorage.wishList);
  let checking = wishList.includes(newId);
  if (checking) {
    const heartIcon = document.querySelector("#heartIcon");
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.remove("bg-black");
    heartIcon.classList.add("fa-solid");
    heartIcon.classList.add("bg-red-500");
  }
}
