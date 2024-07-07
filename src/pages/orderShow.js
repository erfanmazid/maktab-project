import { router, routes } from "../../main";
import axios from "./api";

export default async function orderShow(match) {
  const token = localStorage.getItem("accessToken") ?? false;
  const welcome = localStorage.getItem("welcome") ?? false;
  if (token && welcome) {
    const data = await productData(match.data.id);
    const allData = await productAllData();
    renderHtml(data, allData);
    nav();
  } else if (welcome == false) {
    router.navigate(routes.loading);
  } else {
    router.navigate(routes.login);
  }
}

function renderHtml(nmd, product) {
  document.querySelector("#app").innerHTML = `
        <div class="flex flex-col items-center h-screen bg-gray-50">
  <div class="flex justify-between items-center w-[380px] py-4">
    <div class="flex gap-x-5 items-center">
      <img src="/src/img/logo/logoBlack.png" class="w-5" alt="" />
      <p class="text-[24px] font-semibold">My Order</p>
    </div>
    <div>
      <i class="fa-solid fa-magnifying-glass text-[26px]"></i>
    </div>
  </div>
    <div class="flex justify-start items-center font-semibold w-full p-2 gap-x-5">
    <i class="fa-solid fa-arrow-left pl-5" onclick="backOrders()"></i>
    </div>
  <div
    class="flex-grow flex-col space-y-8 w-[380px] mt-5 overflow-y-scroll no-scrollbar mb-[79px] pb-2"
  >
  ${nmd.cartList
    .map((item) => {
      const data = product.find((x) => x.id == item.id);
      const colorNeed = data.colors.find((x) => x.color_code == item.color);
      let sum = item.number * item.price;

      return `
          <div
      class="flex bg-white w-full h-[150px] rounded-[30px] gap-x-5 p-5 items-center relative"
    >
      <div>
        <img
          src="${data.images[0]}"
          class="w-[120px] rounded-[30px]"
          alt=""
        />
      </div>
      <div class="w-[200px] flex flex-col justify-between gap-y-3">
        <div class="flex justify-between items-center">
          <p
            class="font-semibold text-[20px] text-nowrap text-ellipsis overflow-hidden w-[160px]"
          >
            ${data.title}
          </p>
        </div>
        <div class="flex gap-x-2 items-center text-[13px] text-gray-500">
          <p>${colorNeed.color_name}</p>
          <p>|</p>
          <p>Size = ${item.size}</p>
          <p>|</p>
          <p>Qty = ${item.number}</p>
        </div>
        <div class="flex justify-between items-center">
          <p class="text-[20px] font-semibold w-[100px]">$${sum}.00</p>
          <div
            class="w-[100px] bg-gray-100 rounded-full h-[35px] flex justify-between items-center px-4 py-2 text-[14px]"
          >
            <p class="font-semibold text-[12px]" id="num">In Delivery</p>
          </div>
        </div>
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

async function productData(id) {
  const data = await axios.get(`/cart/${id}`);
  return data.data;
}

async function productAllData() {
  const data = await axios.get(`/products`);
  return data.data;
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

window.backOrders = () => {
  router.navigate(routes.order);
};
