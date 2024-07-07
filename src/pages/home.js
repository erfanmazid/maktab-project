import axios from "./api";
import { router, routes } from "../../main";

export default async function homePage(match, brand) {
  const token = localStorage.getItem("accessToken") ?? false;
  const welcome = localStorage.getItem("welcome") ?? false;
  if (token && welcome) {
    const data = await productData(brand);
    localStorage.setItem("brand", ["home"]);
    renderHTML(data);
    nav();
    optHome();
    icon();
    orderShow();
    searchHistory();
  } else if (welcome == false) {
    router.navigate(routes.loading);
  } else {
    router.navigate(routes.login);
  }
}

export function renderHTML(products) {
  const email = localStorage.getItem("email");
  const historySearch = JSON.parse(localStorage.searchHistory);
  document.getElementById("app").innerHTML = `
<div class="flex flex-col items-center h-screen relative px-[6%]">
  <div class="h-[80px] py-7 flex justify-between items-center w-full">
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
  <div class="w-full h-[37px] mt-2 relative flex items-center" id="mmdf">
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
    <div class="absolute w-full z-10 bg-gray-300 top-[37px] hidden flex-col gap-y-3 p-3" id="searchMod">
    ${historySearch
      .map((item) => {
        return `
      <div onclick="gotoSearch(${item})">
        <p>${item}</p>
      </div>
      `;
      })
      .join("")}
    </div>
  </div>
  <div class="flex flex-wrap py-4 px-2 gap-x-[35px] gap-y-[28px] w-full h-[234px] justify-between">
    <div class="w-[61px] h-[91px] flex flex-col justify-between basis-[16%] brandIcon">
        <div
          class="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center"
        >
          <img src="src/img/home/brands/nike.png" class="w-[30px]" alt="" />
        </div>
        <p class="text-center text-[14px] font-semibold">Nike</p>
    </div>
    <div class="w-[61px] h-[91px] flex flex-col justify-between basis-[16%] brandIcon">
        <div
          class="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center"
        >
          <img src="src/img/home/brands/adidas.png" class="w-[30px]" alt="" />
        </div>
        <p class="text-center text-[14px] font-semibold">Adidas</p>
    </div>
    <div class="w-[61px] h-[91px] flex flex-col justify-between basis-[16%] brandIcon">
        <div
          class="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center"
        >
          <img src="src/img/home/brands/puma.png" class="w-[30px]" alt="" />
        </div>
        <p class="text-center text-[14px] font-semibold">Puma</p>
    </div>
    <div class="w-[61px] h-[91px] flex flex-col justify-between basis-[16%] brandIcon">
        <div
          class="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center"
        >
          <img src="src/img/home/brands/reebok.png" class="w-[30px]" alt="" />
        </div>
        <p class="text-center text-[14px] font-semibold">Reebok</p>
    </div>
    <div class="w-[61px] h-[91px] flex flex-col justify-between basis-[16%] brandIcon">
        <div
          class="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center"
        >
          <img src="src/img/home/brands/asics.png" class="w-[30px]" alt="" />
        </div>
        <p class="text-center text-[14px] font-semibold">Asics</p>
    </div>
  </div>
  <div class="flex flex-col gap-y-3 w-full">
    <div class="flex justify-between items-center font-semibold w-full py-5">
      <p class="text-[20px]">Most Popular</p>
      <a href="/products" class="text-[16px]" data-navigo>See All</a>
    </div>
    <div
      class="flex gap-x-3 overflow-x-scroll h-[39px] w-full items-center no-scrollbar"
    >
      <div
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt active-option"
      >
        <p>All</p>
      </div>
      <div
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt"
      >
         <p>Nike</p>
      </div>
      <div
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt"
      >
         <p>Adidas</p>
      </div>
      <div
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt"
      >
         <p>Puma</p>
      </div>
      <div
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt"
      >
         <p>Reebok</p>
      </div>
      <div
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt"
      >
         <p>Asics</p>
      </div>
      </a>
    </div>
    <div
      class="flex flex-wrap gap-3 py-5 h-[290px] overflow-y-scroll items-center justify-center no-scrollbar"
    >
    ${products
      .map((product) => {
        return `
      <div class="h-[244px] flex flex-col gap-y-1 basis-[47%]" onclick="showItem(${product.id})">
        <img
          src="${product.images[0]}"
          class="w-[182px] h-[182px] rounded-[24px]"
          alt=""
        />
        <p class="text-[20px] font-bold w-[180px] overflow-hidden text-ellipsis text-nowrap">${product.title}</p>
        <p class="text-[16px] font-semibold">$ ${product.price}</p>
      </div>
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

<div
  class="h-screen w-full bg-black bg-opacity-30 fixed top-0 left-0 justify-center items-center hidden"
  id="orderModal"
>
  <div
    class="w-[80%] h-[60%] rounded-[45px] bg-white p-6 flex flex-col gap-y-4 items-center"
  >
    <img src="/src/img/home/order.png" class="w-[80%]" alt="" />
    <h1 class="font-bold text-[24px]">Order Successful!</h1>
    <p>You have Successfuly made order</p>
    <button
      class="w-full bg-black text-white py-3 rounded-3xl font-semibold mt-3"
      onclick="viweOrder()"
    >
      View Order
    </button>
    <button
      class="w-full bg-gray-300 text-black py-3 rounded-3xl font-semibold -mt-2"
      onclick="orderModalClose()"
    >
      close
    </button>
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

window.optHome = () => {
  const items = document.querySelectorAll(".opt");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelector(".active-option")
        .classList.remove("active-option");
      item.classList.add("active-option");
      let x = 0;
      homePage(x, item.querySelector("p").innerHTML);
    });
  });
};

async function productData(brand) {
  if (brand == undefined) brand = "All";
  if (brand == "All") {
    const respons = await axios.get(`/products?_limit=6`);
    return respons.data;
  } else {
    const respons = await axios.get(`/products?_limit=6&brand=${brand}`);
    return respons.data;
  }
}

window.icon = () => {
  const icons = document.querySelectorAll(".brandIcon");
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      localStorage.setItem("brand", icon.querySelector("p").innerHTML);
      router.navigate(`/products/${icon.querySelector("p").innerHTML}`);
    });
  });
};

window.search = () => {
  const inp = document.querySelector("#searchInp").value;
  router.navigate(routes.search + `?q=${inp}`);
};

window.showItem = (id) => {
  document.querySelector("#app").innerHTML = "";
  router.navigate(`/product/${id}`);
};

function orderShow() {
  const orderNum = localStorage.getItem("orderNum") ?? false;
  if (orderNum) {
    const modal = document.querySelector("#orderModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

window.orderModalClose = () => {
  const modal = document.querySelector("#orderModal");
  modal.classList.remove("flex");
  modal.classList.add("hidden");
  localStorage.removeItem("orderNum");
};

window.viweOrder = () => {
  const orderNum = localStorage.getItem("orderNum") ?? false;
  router.navigate(`/orders/${orderNum}`);
  localStorage.removeItem("orderNum");
};

function searchHistory() {
  const input = document.querySelector("#mmdf");
  const search = document.querySelector("#searchMod");
  input.querySelector("input").addEventListener("focus", () => {
    search.classList.remove("hidden");
    search.classList.add("flex");
  });
  input.addEventListener("focusout", () => {
    search.classList.remove("flex");
    search.classList.add("hidden");
  });
}

window.gotoSearch = (search) => {
  console.log(search);
};
// addEventListener("");
