import { router, routes } from "../../main";

export default function homePage() {
  const token = localStorage.getItem("accessToken") ?? false;
  if (token) {
    renderHTML();
    nav();
    opt();
  } else {
    router.navigate(routes.login);
  }
}

function renderHTML() {
  document.getElementById("app").innerHTML = `
<div class="flex flex-col items-center h-screen relative">
  <div class="h-[80px] p-7 flex justify-between items-center w-full">
    <div class="flex gap-x-4">
      <div>
        <img src="src/img/home/profile.png" alt="" class="w-12" />
      </div>
      <div class="flex flex-col justify-between">
        <p class="text-[#757475]">Good Morning 👋</p>
        <p class="pt-1">Saeed Abdilar</p>
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
      class="bg-gray-100/85 w-full h-full rounded py-2 px-10 placeholder:text-[14px] placeholder:text-[#BAB8BC]"
      placeholder="Search"
    />
    <i
      class="fa-solid fa-magnifying-glass absolute left-[14px] text-[#6C757D] text-[18px]"
    ></i>
  </div>
  <div class="flex flex-wrap p-4 gap-x-[35px] gap-y-[28px] w-[380px] h-[234px]">
    <div class="w-[61px] h-[91px] flex flex-col justify-between basis-[16%]">
      <a href="/products/nike" data-navigo>
        <div
          class="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center"
        >
          <img src="src/img/home/brands/nike.png" class="w-[30px]" alt="" />
        </div>
        <p class="text-center text-[14px] font-semibold">Nike</p>
      </a>
    </div>
    <div class="w-[61px] h-[91px] flex flex-col justify-between basis-[16%]">
      <a href="/products/adidas" data-navigo>
        <div
          class="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center"
        >
          <img src="src/img/home/brands/adidas.png" class="w-[30px]" alt="" />
        </div>
        <p class="text-center text-[14px] font-semibold">Adidas</p>
      </a>
    </div>
    <div class="w-[61px] h-[91px] flex flex-col justify-between basis-[16%]">
      <a href="/products/puma" data-navigo>
        <div
          class="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center"
        >
          <img src="src/img/home/brands/puma.png" class="w-[30px]" alt="" />
        </div>
        <p class="text-center text-[14px] font-semibold">Puma</p>
      </a>
    </div>
    <div class="w-[61px] h-[91px] flex flex-col justify-between basis-[16%]">
      <a href="/products/reebok" data-navigo>
        <div
          class="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center"
        >
          <img src="src/img/home/brands/reebok.png" class="w-[30px]" alt="" />
        </div>
        <p class="text-center text-[14px] font-semibold">Reebok</p>
      </a>
    </div>
    <div class="w-[61px] h-[91px] flex flex-col justify-between basis-[16%]">
      <a href="/products/asics" data-navigo>
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
        <p>all</p>
      </div>
      </a>
      <a href="/products/nike" data-navigo>
      <div
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt"
      >
         <p>Nike</p>
      </div>
      </a>
      <a href="/products/adidas" data-navigo>
      <div
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt"
      >
         <p>Adidas</p>
      </div>
      </a>
      <a href="/products/puma" data-navigo>
      <div
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt"
      >
         <p>Puma</p>
      </div>
      </a>
      <a href="/products/reebok" data-navigo>
      <div
        class="border-2 py-1 px-4 rounded-[25px] border-[#343A40] text-[#343A40] opt"
      >
         <p>Reebok</p>
      </div>
      </a>
      <a href="/products/asics" data-navigo>
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
      <div class="w-[182px] h-[244px] flex flex-col gap-y-1 basis-[47%]">
        <img
          src="src/img/nike/21-1.jpg"
          class="w-[182px] h-[182px] rounded-[24px]"
          alt=""
        />
        <p class="text-[20px] font-bold">Title</p>
        <p class="text-[16px] font-semibold">$ 85.00</p>
      </div>
      <div class="w-[182px] h-[244px] flex flex-col gap-y-1 basis-[47%]">
        <img
          src="src/img/nike/21-1.jpg"
          class="w-[182px] h-[182px] rounded-[24px]"
          alt=""
        />
        <p class="text-[20px] font-bold">Title</p>
        <p class="text-[16px] font-semibold">$ 85.00</p>
      </div>
      <div class="w-[182px] h-[244px] flex flex-col gap-y-1 basis-[47%]">
        <img
          src="src/img/nike/21-1.jpg"
          class="w-[182px] h-[182px] rounded-[24px]"
          alt=""
        />
        <p class="text-[20px] font-bold">Title</p>
        <p class="text-[16px] font-semibold">$ 85.00</p>
      </div>
    </div>
  </div>
  <div
    class="h-[66px] w-full absolute bottom-0 left-0 flex justify-center items-center"
  >
    <nav>
      <ul class="flex gap-x-[44px]">
        <li>
          <a
            href="/home"
            data-navigo
            class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar active"
          >
            <i class="fa-solid fa-house text-[24px]"></i>
            <p class="text-[10px] font-semibold">Home</p>
          </a>
        </li>
        <li>
          <a
            href="/home"
            data-navigo
            class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar"
          >
            <i class="fa-solid fa-bag-shopping text-[24px]"></i>
            <p class="text-[10px] font-semibold">cart</p>
          </a>
        </li>
        <li>
          <a
            href="/home"
            data-navigo
            class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar"
          >
            <i class="fa-solid fa-cart-shopping text-[24px]"></i>
            <p class="text-[10px] font-semibold">Orders</p>
          </a>
        </li>
        <li>
          <a
            href="/home"
            data-navigo
            class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar"
          >
            <i class="fa-solid fa-wallet text-[24px]"></i>
            <p class="text-[10px] font-semibold">Wallet</p>
          </a>
        </li>
        <li>
          <a
            onclick="nav()"
            href="/home"
            data-navigo
            class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar"
          >
            <i class="fa-solid fa-user text-[24px]"></i>
            <p class="text-[10px] font-semibold">Profile</p>
          </a>
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
