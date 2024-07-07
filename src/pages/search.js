import axios from "./api";
import { router, routes } from "../../main";
import debounce from "lodash.debounce";

export default async function searchPage(e) {
  const token = localStorage.getItem("accessToken") ?? false;
  const welcome = localStorage.getItem("welcome") ?? false;
  if (token && welcome) {
    const searchs = JSON.parse(localStorage.searchHistory);
    searchs.push(e.params.q);
    localStorage.searchHistory = JSON.stringify(searchs);
    const prod = await productData(e.params.q);
    if (prod.length == 0) {
      renderHTML(e, prod);
      let inp = document.querySelector("#searchInp");
      inp.value = e.params.q;
    } else {
      renderHTMLFound(e, prod);
      let inp = document.querySelector("#searchInp");
      inp.value = e.params.q;
    }
  } else if (welcome == false) {
    router.navigate(routes.loading);
  } else {
    router.navigate(routes.login);
  }
}

function renderHTML(e, prod) {
  document.querySelector("#app").innerHTML = `
  <div class="flex flex-col justify-start items-center h-screen pt-4">
  <div class="w-[380px] mt-2 relative flex items-center">
    <input
    oninput="inpType()"
      type="text"
      id="searchInp"
      class="bg-gray-100/85 w-full rounded-xl border border-black py-4 px-10 placeholder:text-[14px] placeholder:text-[#BAB8BC]"
      placeholder="Search"
    />
    <i
      class="fa-solid fa-magnifying-glass absolute left-[14px] text-[#6C757D] text-[18px]"
    ></i>
    <i
      class="fa-solid fa-bars-progress absolute right-[14px]"
      onclick="search()"
    ></i>
  </div>
  <div class="flex justify-between pt-4 w-[380px] items-center">
    <p class="text-[20px] font-bold">
      Result for <span>"${e.params.q}"</span>
    </p>
    <p><span>${prod.length}</span> found</p>
  </div>
  <div class="flex flex-col items-center mt-24">
    <img
      src="/src/img/home/clipboard-307332_1280.webp"
      class="w-[50%]"
      alt=""
    />
    <p class="mt-7 font-bold text-[20px]">Not Found</p>
    <p class="text-center w-[345px] mt-3">
      Sorry, the keyword you entered cannot be found, pleas check again or
      search with another keyword.
    </p>
  </div>
</div>

    `;
}

function renderHTMLFound(e, prod) {
  document.querySelector("#app").innerHTML = `
    <div class="flex flex-col justify-start items-center h-screen pt-4">
    <div class="w-[380px] mt-2 relative flex items-center">
      <input
        type="text"
        id="searchInp"
        class="bg-gray-100/85 w-full rounded-xl border border-black py-4 px-10 placeholder:text-[14px] placeholder:text-[#BAB8BC]"
        placeholder="Search"
        oninput="inpType()"
      />
      <i
        class="fa-solid fa-magnifying-glass absolute left-[14px] text-[#6C757D] text-[18px]"
      ></i>
      <i
        class="fa-solid fa-bars-progress absolute right-[14px]"
        onclick="search()"
      ></i>
    </div>
    <div class="flex justify-between pt-4 w-[380px] items-center">
      <p class="text-[20px] font-bold">
        Result for <span>"${e.params.q}"</span>
      </p>
      <p><span>${prod.length}</span> founds</p>
    </div>
    <div class="flex flex-col gap-y-3 w-full">
    <div
      class="flex flex-wrap gap-5 p-5 overflow-y-auto items-center no-scrollbar"
    >
    ${prod
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
  </div>
  
      `;
}

window.search = () => {
  const inp = document.querySelector("#searchInp").value;
  router.navigate(routes.search + `?q=${inp}`);
  //   localStorage.serchHistory= JSON.
};

window.inpType = () => {
  let nmd = document.querySelector("#searchInp").value;
};

async function productData(b) {
  const serch = `q=${b}`;
  const data = await axios.get(`/products?${serch}`);
  return data.data;
}
