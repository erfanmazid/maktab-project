import axios from "./api";
import { router, routes } from "../../main";

export default async function homePage() {
  const token = localStorage.getItem("accessToken") ?? false;
  if (token) {
    const data = await productData();
    renderHTML(data);
    nav();
    opt();
    icon();
  } else {
    router.navigate(routes.login);
  }
}

export function renderHTML(products) {
  const email = localStorage.getItem("email");
  document.getElementById("app").innerHTML = `
<div class="flex flex-col items-center h-screen relative">
  <div class="h-[80px] p-7 flex justify-between items-center w-full">
    <div class="flex gap-x-4">
      <div>
        <img src="src/img/home/profile.png" alt="" class="w-12" />
      </div>
      <div class="flex flex-col justify-between">
        <p class="text-[#757475]">Good Morning 👋</p>
        <p class="pt-1 w-[130px] overflow-hidden text-ellipsis text-nowrap">${email}</p>
      </div>
    </div>
    <div class="w-16 h-6 flex justify-between">
      <img src="src/img/home/alert.png" alt="" />
      <img src="src/img/home/heartIcon.png" alt="" />
    </div>
  </div>
  <div class="w-[380px] h-[37px] mt-2 relative flex items-center">
    <input
      type="text"
      id="searchInp"
      class="bg-gray-100/85 w-full h-full rounded py-2 px-10 placeholder:text-[14px] placeholder:text-[#BAB8BC]"
      placeholder="Search"
    />
    <i
      class="fa-solid fa-magnifying-glass absolute left-[14px] text-[#6C757D] text-[18px]"
    ></i>
    <i class="fa-solid fa-bars-progress absolute right-[14px]" onclick="search()"></i>
  </div>
  <div class="flex flex-wrap p-4 gap-x-[35px] gap-y-[28px] w-[380px] h-[234px]">
    <div class="w-[61px] h-[91px] flex flex-col justify-between basis-[16%]">
      <a href="/products/Nike" data-navigo class="icons">
        <div
          class="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center"
        >
          <img src="src/img/home/brands/nike.png" class="w-[30px]" alt="" />
        </div>
        <p class="text-center text-[14px] font-semibold">Nike</p>
      </a>
    </div>
    <div class="w-[61px] h-[91px] flex flex-col justify-between basis-[16%]">
      <a href="/products/Adidas" data-navigo class="icons">
        <div
          class="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center"
        >
          <img src="src/img/home/brands/adidas.png" class="w-[30px]" alt="" />
        </div>
        <p class="text-center text-[14px] font-semibold">Adidas</p>
      </a>
    </div>
    <div class="w-[61px] h-[91px] flex flex-col justify-between basis-[16%]">
      <a href="/products/Puma" data-navigo class="icons">
        <div
          class="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center"
        >
          <img src="src/img/home/brands/puma.png" class="w-[30px]" alt="" />
        </div>
        <p class="text-center text-[14px] font-semibold">Puma</p>
      </a>
    </div>
    <div class="w-[61px] h-[91px] flex flex-col justify-between basis-[16%]">
      <a href="/products/Reebok" data-navigo class="icons">
        <div
          class="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center"
        >
          <img src="src/img/home/brands/reebok.png" class="w-[30px]" alt="" />
        </div>
        <p class="text-center text-[14px] font-semibold">Reebok</p>
      </a>
    </div>
    <div class="w-[61px] h-[91px] flex flex-col justify-between basis-[16%]">
      <a href="/products/Asics" data-navigo class="icons" onclick="icon()">
        <div
          class="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center"
        >
          <img src="src/img/home/brands/asics.png" class="w-[30px]" alt="" />
        </div>
        <p class="text-center text-[14px] font-semibold">Asics</p>
      </a>
    </div>
  </div>
  <div class="flex flex-col gap-y-3 w-full">
    <div class="flex justify-between items-center font-semibold w-full p-5">
      <p class="text-[20px]">Most Popular</p>
      <a href="/products" class="text-[16px]" data-navigo>See All</a>
    </div>
    <div
      class="flex gap-x-3 pl-5 overflow-x-scroll h-[39px] w-full items-center no-scrollbar"
    >
      <a href="/products" data-navigo>
      <div
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt active-option"
      >
        <p>All</p>
      </div>
      </a>
      <a href="/products/Nike" data-navigo>
      <div
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt"
      >
         <p>Nike</p>
      </div>
      </a>
      <a href="/products/Adidas" data-navigo>
      <div
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt"
      >
         <p>Adidas</p>
      </div>
      </a>
      <a href="/products/Puma" data-navigo>
      <div
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt"
      >
         <p>Puma</p>
      </div>
      </a>
      <a href="/products/Reebok" data-navigo>
      <div
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt"
      >
         <p>Reebok</p>
      </div>
      </a>
      <a href="/products/Asics" data-navigo>
      <div
        onclick="opt()"
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt"
      >
         <p>Asics</p>
      </div>
      </a>
    </div>
    <div
      class="flex flex-wrap gap-5 p-5 h-[290px] overflow-y-scroll items-center no-scrollbar"
    >
    ${products
      .map((product) => {
        return `
    <a href="/product/${product.id}" data-navigo>
      <div class="w-[182px] h-[244px] flex flex-col gap-y-1 basis-[47%]">
        <img
          src="${product.images[0]}"
          class="w-[182px] h-[182px] rounded-[24px]"
          alt=""
        />
        <p class="text-[20px] font-bold w-[180px] overflow-hidden text-ellipsis text-nowrap">${product.title}</p>
        <p class="text-[16px] font-semibold">$ ${product.price}</p>
      </div>
    </a>
        `;
      })
      .join("")}
    </div>
  </div>
  <div
    class="h-[66px] w-full absolute bottom-0 left-0 flex justify-center items-center"
  >
    <nav>
      <ul class="flex gap-x-[44px]">
        <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar active">
            <i class="fa-solid fa-house text-[24px]"></i>
            <p class="text-[10px] font-semibold">Home</p>
        </li>
        <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar">
            <i class="fa-solid fa-bag-shopping text-[24px]"></i>
            <p class="text-[10px] font-semibold">cart</p>
        </li>
        <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar">
            <i class="fa-solid fa-cart-shopping text-[24px]"></i>
            <p class="text-[10px] font-semibold">Orders</p>
        </li>
        <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar">
            <i class="fa-solid fa-wallet text-[24px]"></i>
            <p class="text-[10px] font-semibold">Wallet</p>
        </li>
        <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar">
            <i class="fa-solid fa-user text-[24px]"></i>
            <p class="text-[10px] font-semibold">Profile</p>
        </li>
      </ul>
    </nav>
  </div>
</div>

  `;
}

window.nav = () => {
  const bars = document.querySelectorAll(".bar");
  bars.forEach((items) => {
    items.addEventListener("click", () => {
      document.querySelector(".active").classList.remove("active");
      items.classList.add("active");
      const pageName = items.querySelector("p").innerHTML;
      const newPage = pageName.toLocaleLowerCase();
      router.navigate(`/${newPage}`);
    });
  });
};

window.opt = () => {
  const items = document.querySelectorAll(".opt");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelector(".active-option")
        .classList.remove("active-option");
      item.classList.add("active-option");
    });
  });
};

async function productData() {
  const respons = await axios.get("/products?_limit=6");
  return respons.data;
}

window.icon = () => {
  const icons = document.querySelectorAll(".icons");
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      localStorage.setItem("brand", icon.querySelector("p").innerHTML);
    });
  });
};

window.search = () => {
  const inp = document.querySelector("#searchInp").value;
  router.navigate(routes.search + `?q=${inp}`);
};
