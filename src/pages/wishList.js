import axios from "axios";
import { router } from "../../main";

export default async function wishListPage() {
  const token = localStorage.getItem("accessToken") ?? false;
  const welcome = localStorage.getItem("welcome") ?? false;
  if (token && welcome) {
    const allProduct = await productData();
    renderHtml(allProduct);
    nav();
  } else if (welcome == false) {
    router.navigate(routes.loading);
  } else {
    router.navigate(routes.login);
  }
}

function renderHtml(products) {
  const cartList = JSON.parse(localStorage.wishList);
  document.getElementById("app").innerHTML = `
    <div class="flex flex-col gap-y-3 w-full relative h-screen">
    <div class="flex justify-start items-center font-semibold w-full p-5 gap-x-5">
    <i class="fa-solid fa-arrow-left" onclick="back()"></i>
      <p class="text-[24px] font-semibold">Wish List</p>
    </div>
    <div
      class="flex flex-wrap gap-5 p-5 overflow-y-auto items-center no-scrollbar mb-[79px]"
    >
    ${cartList
      .map((item) => {
        const data = products.find((x) => x.id == item);
        return `
      <div class="w-[182px] h-[244px] flex flex-col gap-y-1 basis-[47%]" onclick="showItemWish(${data.id})">
        <img
          src="${data.images[0]}"
          class="w-[182px] h-[182px] rounded-[24px]"
          alt=""
        />
        <p class="text-[20px] font-bold w-[180px] overflow-hidden text-ellipsis text-nowrap">${data.title}</p>
        <p class="text-[16px] font-semibold">$ ${data.price}</p>
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

async function productData() {
  const data = await axios.get(`/products`);
  return data.data;
}

window.showItemWish = (id) => {
  localStorage.setItem("brand", "wishList");
  document.querySelector("#app").innerHTML = "";
  router.navigate(`/product/${id}`);
};
