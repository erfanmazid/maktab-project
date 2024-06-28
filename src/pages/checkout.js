import { router, routes } from "../../main";
import axios from "./api";

export default async function checkoutPage() {
  const allProduct = await productData();
  renderHtml(allProduct);
}

function renderHtml(product) {
  const cartList = JSON.parse(localStorage.cartList);
  let total = 0;
  document.querySelector("#app").innerHTML = `
    <div
  class="flex flex-col items-center gap-y-3 w-full h-screen bg-gray-50 relative"
>
  <div class="flex justify-start items-center font-semibold w-full p-5 gap-x-5">
    <i class="fa-solid fa-arrow-left text-[20px]" onclick="backCart()"></i>
    <p class="text-[25px] font-semibold">Checkout</p>
  </div>
  <div
    class="w-[380px] flex flex-col gap-y-2 overflow-y-scroll no-scrollbar pb-10 mb-[123px]"
  >
    <h1 class="text-[20px] font-semibold">Shipping Address</h1>
    <div
      class="flex justify-between items-center mt-4 p-5 bg-white rounded-2xl mb-5"
    >
      <div class="flex gap-x-4 items-center">
        <div
          class="w-12 h-12 bg-black flex justify-center items-center rounded-full border-8 border-gray-300"
        >
          <i class="fa-solid fa-location-dot text-[20px] text-white"></i>
        </div>
        <div class="flex flex-col justify-between w-[220px]">
          <p class="text-[20px] font-semibold">Home</p>
          <p
            class="text-[14px] text-gray-400 mt-1 text-nowrap overflow-hidden text-ellipsis"
          >
            61480 Sunbrook Park, PC 5679
          </p>
        </div>
      </div>
      <div>
        <i class="fa-solid fa-pen-to-square text-[20px]"></i>
      </div>
    </div>
    <div class="border-t border-gray-200 pt-7">
      <div class="mt-2 w-[380px] flex flex-col pb-7">
        <h1 class="text-[20px] font-semibold">Order List</h1>
  <div
    class="flex-grow flex-col space-y-8 w-[380px] mt-5 pb-2"
  >
  ${cartList
    .map((item) => {
      const data = product.find((x) => x.id == item.id);
      const colorNeed = data.colors.find((x) => x.color_code == item.color);
      let sum = item.number * item.price;
      total += sum;

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
          <div class="w-4 h-4 rounded-full ${colorNeed.colorCode} border border-gray-200"></div>
          <p>${colorNeed.color_name}</p>
          <p>|</p>
          <p>Size = ${item.size}</p>
        </div>
        <div class="flex justify-between items-center">
          <p class="text-[20px] font-semibold w-[100px]">$${sum}.00</p>
          <div
            class="w-[35px] bg-gray-100 rounded-full h-[35px] flex justify-center items-center p-4"
          >
            <p class="font-semibold text-[14px] text-center" id="num">${item.number}</p>
          </div>
        </div>
      </div>
    </div>

      `;
    })
    .join("")}
  </div>

      </div>
      <div
        class="mt-2 w-[380px] flex flex-col border-y pt-7 pb-3 border-gray-200"
      >
        <h1 class="text-[20px] font-semibold">Choose Shipping</h1>
        <div
          class="flex justify-between items-center mt-4 p-5 bg-white rounded-2xl mb-5"
        >
          <div class="flex gap-x-4 items-center">
            <div>
              <i class="fa-solid fa-truck text-[20px]"></i>
            </div>
            <div class="flex flex-col justify-between w-[220px]">
              <p class="text-[20px] font-semibold">Choose Shipping Type</p>
            </div>
          </div>
          <div>
            <i class="fa-solid fa-chevron-right text-[20px]"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 flex flex-col gap-y-5">
      <h1 class="text-[20px] font-semibold">Poromo Code</h1>
      <div class="flex justify-between">
        <input
          type="text"
          class="w-[78%] p-5 bg-gray-100 rounded-[20px] placeholder:text-[14px]"
          name=""
          id=""
          placeholder="Enter Poromo Code"
        />
        <div
          class="w-16 h-16 bg-black rounded-full flex justify-center items-center"
        >
          <i class="fa-solid fa-plus text-white text-[20px]"></i>
        </div>
      </div>
      <div class="bg-white p-6 flex flex-col gap-y-7 rounded-[20px]">
        <div class="flex justify-between items-center">
          <p class="text-gray-400">Amount</p>
          <p class="font-semibold">$${total}.00</p>
        </div>
        <div
          class="flex justify-between items-center pb-5 border-b border-gray-200"
        >
          <p class="text-gray-400">Shipping</p>
          <p class="font-semibold">-</p>
        </div>
        <div class="flex justify-between items-center">
          <p class="text-gray-400">Total</p>
          <p class="font-semibold">-</p>
        </div>
      </div>
    </div>
  </div>
  <div
    class="px-6 pt-6 pb-[10px] w-full absolute bottom-0 bg-white left-0 flex flex-col justify-center items-center rounded-t-[35px] border border-gray-200"
  >
    <div class="w-full flex justify-between items-center mb-5 drop-shadow-lg">
      <div
        class="py-5 px-14 w-full flex gap-x-4 items-center justify-center bg-black rounded-[34px] text-white text-[18px]"
        id="cart-btn"
      >
        <p>Continue To Payment</p>
        <i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  </div>
</div>

  `;
}

async function productData() {
  const data = await axios.get(`/products`);
  return data.data;
}

window.backCart = () => {
  router.navigate(routes.cart);
};
