import { router, routes } from "../../main";
import axios from "./api";

let b = "";

export default async function productPage(match) {
  b = match.data.id;
  const mmd = await productData(b);
  renderHTML(mmd);
}

async function renderHTML(products) {
  document.getElementById("app").innerHTML = `
    <div class="flex flex-col gap-y-3 w-full">
    <div class="flex justify-start items-center font-semibold w-full p-5 gap-x-5">
    <i class="fa-solid fa-arrow-left" onclick="back()"></i>
      <p class="text-[20px]">${b}</p>
    </div>
    <div
      class="flex flex-wrap gap-5 p-5 overflow-y-auto items-center no-scrollbar"
    >
    ${products
      .map((product) => {
        return `
      <div class="w-[182px] h-[244px] flex flex-col gap-y-1 basis-[47%]" onclick="showItem(${product.id})">
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

`;
}

async function productData(b) {
  const brands = `brand=${b}`;
  const data = await axios.get(`/products?${brands}`);
  return data.data;
}

window.back = () => {
  router.navigate(routes.home);
};

window.showItem = (id) => {
  document.querySelector("#app").innerHTML = "";
  router.navigate(`/product/${id}`);
};
