import axios from "./api";
import { router, routes } from "../../main";

export default async function productsPage(dataBrand) {
  const token = localStorage.getItem("accessToken") ?? false;
  if (token) {
    const data = await productData();
    try {
      renderHTML(dataBrand);
      opt();
    } catch (e) {
      renderHTML(data);
      opt();
    }
    renderHTML(dataBrand);
    opt();
  } else {
    router.navigate(routes.login);
  }
}

function renderHTML(products) {
  document.getElementById("app").innerHTML = `
    <div class="flex flex-col gap-y-3 w-full">
    <div class="flex justify-between items-center font-semibold w-full p-5">
      <p class="text-[20px]">Most Popular</p>
    </div>
    <div
      class="flex gap-x-3 pl-5 overflow-x-scroll h-[39px] w-full items-center no-scrollbar"
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
        onclick="opt()"
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt"
      >
         <p>Asics</p>
      </div>
    </div>
    <div
      class="flex flex-wrap gap-5 p-5 overflow-y-auto items-center no-scrollbar"
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

`;
}

async function productData() {
  const respons = await axios.get("/products");
  return respons.data;
}

async function productDataBrand(brand = "") {
  const brands = `brand=${brand}`;
  const respons = await axios.get(`/products?${brands}`);
  productsPage(respons.data);
  return respons.data;
}

window.opt = () => {
  const items = document.querySelectorAll(".opt");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelector(".active-option")
        .classList.remove("active-option");
      item.classList.add("active-option");
      const brand = item.querySelector("p").innerHTML;
      if (brand == "All") {
        productsPage(productData());
      } else {
        productDataBrand(brand);
      }
    });
  });
};
