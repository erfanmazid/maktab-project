import axios from "./api";

export default async function cartPage() {
  const allProduct = await productData();
  renderHtml(allProduct);
}

function renderHtml(product) {
  const cartList = JSON.parse(localStorage.cartList);
  let total = 0;
  document.querySelector("#app").innerHTML = `
        <div class="flex flex-col items-center h-screen bg-gray-50">
  <div class="flex justify-between items-center w-[380px] py-4">
    <div class="flex gap-x-5 items-center">
      <img src="/src/img/logo/logoBlack.png" class="w-5" alt="" />
      <p class="text-[24px] font-semibold">My Cart</p>
    </div>
    <div>
      <i class="fa-solid fa-magnifying-glass text-[26px]"></i>
    </div>
  </div>
  <div
    class="flex-grow flex-col space-y-8 w-[380px] mt-5 overflow-y-scroll no-scrollbar mb-[178px] pb-2"
  >
  ${cartList
    .map((item) => {
      const data = product.find((x) => x.id == item.id);
      const colorNeed = data.colors.find((x) => x.color_code == item.color);
      let sum = item.number * item.price;
      total += sum;

      return `
          <div
      class="flex bg-white w-full h-[150px] rounded-[30px] gap-x-5 p-5 items-center"
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
          <i class="fa-solid fa-trash text-[18px]" id="${item.id}"></i>
        </div>
        <div class="flex gap-x-2 items-center text-[13px] text-gray-500">
          <div class="w-4 h-4 rounded-full bg-[${item.color}] border border-gray-200"></div>
          <p>${colorNeed.color_name}</p>
          <p>|</p>
          <p>Size = ${item.size}</p>
        </div>
        <div class="flex justify-between items-center">
          <p class="text-[20px] font-semibold w-[100px]">$${sum}.00</p>
          <div
            class="w-[100px] bg-gray-100 rounded-full h-[35px] flex justify-between items-center px-4 py-2 text-[14px]"
          >
            <i class="fa-solid fa-minus"></i>
            <p class="font-bold text-[16px]" id="num">${item.number}</p>
            <i class="fa-solid fa-plus"></i>
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
    <div class="w-full flex justify-between items-center mb-8 drop-shadow-lg">
      <div class="flex flex-col gap-y-1 pr-5">
        <p class="text-[14px] text-gray-500">Total price</p>
        <p class="text-[25px] font-bold" id="total">$${total}.00</p>
      </div>
      <div
        class="py-5 px-14 w-[65%] flex gap-x-4 items-center justify-center bg-black rounded-[34px] text-white text-[18px]"
        id="cart-btn"
      >
      <p>Check out</p>
      <i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
    <nav>
      <ul class="flex gap-x-[44px]">
        <li>
          <a
            href="/home"
            data-navigo
            class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar"
          >
            <i class="fa-solid fa-house text-[24px]"></i>
            <p class="text-[10px] font-semibold">Home</p>
          </a>
        </li>
        <li>
          <a
            href="/cart"
            data-navigo
            class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar active"
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

async function productData() {
  const data = await axios.get(`/products`);
  return data.data;
}
