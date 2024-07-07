import axios from "axios";
import { router, routes } from "../../main";

export default async function orders() {
  const token = localStorage.getItem("accessToken") ?? false;
  const welcome = localStorage.getItem("welcome") ?? false;
  if (token && welcome) {
    const carts = await cartData();
    renderHtmlActive(carts);
    nav();
    click();
  } else if (welcome == false) {
    router.navigate(routes.loading);
  } else {
    router.navigate(routes.login);
  }
}

function renderHtmlActive(carts) {
  document.querySelector("#app").innerHTML = `
          <div class="flex flex-col items-center h-screen bg-gray-50 px-[6%]">
    <div class="flex justify-between items-center w-full py-4">
      <div class="flex gap-x-5 items-center">
        <img src="/src/img/logo/logoBlack.png" class="w-5" alt="" />
        <p class="text-[24px] font-semibold">My Order</p>
      </div>
      <div>
        <i class="fa-solid fa-magnifying-glass text-[26px]"></i>
      </div>
    </div>
    <div class="flex justify-between items-center w-full py-4">
        <div class="w-[50%] text-center border-b pb-2 border-black  order" style="border-width:0px 0px 3px 0px">
            <p>Active</p>
        </div>
        <div class="w-[50%] text-center border-b pb-2 border-black orderDisable" onclick="compliteClick()" style="border-width:0px 0px 3px 0px">
            <p>Completed</p>
        </div>
    </div>
      <div
    class="flex-grow flex-col space-y-8 w-full mt-5 overflow-y-scroll no-scrollbar mb-[79px] pb-2"
  >
  ${carts
    .map((cart) => {
      if (!cart.isdone)
        return `
          <div
      class="flex bg-white w-full h-[150px] rounded-[30px] gap-x-5 p-5 items-center relative"
    >
      <div class="flex flex-col gap-y-1">
        <p>ID: ${cart.id}</p>
        <p>Date: ${cart.date}</p>
        <p>Time: ${cart.time}</p>
      </div>
      <div class="flex flex-col gap-y-1">
        <p>Number of Shoes: ${cart.cartList.length}</p>
        <p>Shiping Type: ${cart.shippingType.type}</p>
        <button class="border-2 border-black px-4 py-1 rounded-xl" onclick="orderShow(${cart.id})">Viwe all result</button>
      </div>
    </div>

      `;
    })
    .join("")}
  </div>
    <div
      class="px-6 pt-6 pb-[10px] w-full absolute bottom-0 bg-white left-0 flex flex-col justify-center items-center rounded-t-[35px] border border-gray-200"
    >
      <nav>
        <ul class="flex gap-x-[44px]">
          <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar">
              <i class="fa-solid fa-house text-[24px]"></i>
              <p class="text-[10px] font-semibold">Home</p>
          </li>
          <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar">
              <i class="fa-solid fa-bag-shopping text-[24px]"></i>
              <p class="text-[10px] font-semibold">cart</p>
          </li>
          <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar active">
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

function renderHtmlDone(carts) {
  document.querySelector("#app").innerHTML = `
          <div class="flex flex-col items-center h-screen bg-gray-50 px-[6%]">
    <div class="flex justify-between items-center w-full py-4">
      <div class="flex gap-x-5 items-center">
        <img src="/src/img/logo/logoBlack.png" class="w-5" alt="" />
        <p class="text-[24px] font-semibold">My Order</p>
      </div>
      <div>
        <i class="fa-solid fa-magnifying-glass text-[26px]"></i>
      </div>
    </div>
    <div class="flex justify-between items-center w-full py-4">
        <div class="w-[50%] text-center border-b pb-2 border-black orderDisable" onclick="activeClick()" style="border-width:0px 0px 3px 0px">
            <p>Active</p>
        </div>
        <div class="w-[50%] text-center border-b pb-2 border-black order" style="border-width:0px 0px 3px 0px">
            <p>Completed</p>
        </div>
    </div>
      <div
    class="flex-grow flex-col space-y-8 w-full mt-5 overflow-y-scroll no-scrollbar mb-[79px] pb-2"
  >
  ${carts
    .map((cart) => {
      if (cart.isdone)
        return `
          <div
      class="flex bg-white w-full h-[150px] rounded-[30px] gap-x-5 p-5 items-center relative"
    >
      <div class="flex flex-col gap-y-1">
        <p>ID: ${cart.id}</p>
        <p>Date: ${cart.date}</p>
        <p>Time: ${cart.time}</p>
      </div>
      <div class="flex flex-col gap-y-1">
        <p>Number of Shoes: ${cart.cartList.length}</p>
        <p>Shiping Type: ${cart.shippingType.type}</p>
        <button class="border-2 border-black px-4 py-1 rounded-xl" onclick="orderShow(${cart.id})">Viwe all result</button>
      </div>
    </div>

      `;
    })
    .join("")}
  </div>
    <div
      class="px-6 pt-6 pb-[10px] w-full absolute bottom-0 bg-white left-0 flex flex-col justify-center items-center rounded-t-[35px] border border-gray-200"
    >
      <nav>
        <ul class="flex gap-x-[44px]">
          <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar">
              <i class="fa-solid fa-house text-[24px]"></i>
              <p class="text-[10px] font-semibold">Home</p>
          </li>
          <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar">
              <i class="fa-solid fa-bag-shopping text-[24px]"></i>
              <p class="text-[10px] font-semibold">cart</p>
          </li>
          <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar active">
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

function click() {
  const bars = document.querySelectorAll(".click");
  bars.forEach((items) => {
    items.addEventListener("click", () => {
      document.querySelector(".order").classList.add("orderDisable");
      document.querySelector(".order").classList.remove("order");
      items.classList.add("order");
    });
  });
}

async function cartData() {
  const data = await axios.get(`/cart`);
  return data.data;
}

window.orderShow = (id) => {
  router.navigate(`/orders/${id}`);
};

window.activeClick = async () => {
  const carts = await cartData();
  renderHtmlActive(carts);
  nav();
};

window.compliteClick = async () => {
  const carts = await cartData();
  renderHtmlDone(carts);
  nav();
};
