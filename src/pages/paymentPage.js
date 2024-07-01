import axios from "./api";
import { router, routes } from "../../main";

export default async function paymentPage() {
  const shipping = await shippingData();
  renderHTML(shipping);
}

function renderHTML(data) {
  document.querySelector("#app").innerHTML = `
      <div class="h-screen flex flex-col items-center bg-gray-50 relative">
    <div class="flex justify-start items-center font-semibold w-full p-5 gap-x-5">
      <i class="fa-solid fa-arrow-left text-[20px]" onclick="backCheck()"></i>
      <p class="text-[25px] font-semibold">Payment Methods</p>
    </div>
    <div class="felx flex-col gap-y-5 w-[380px] overflow-y-scroll no-scrollbar">
    <p class="py-3 text-[14px] text-gray-500">select the payment method you want to use.</p>
      
      ${data
        .map((item) => {
          return `
              <div
        class="flex justify-between items-center mt-4 p-5 bg-white rounded-2xl mb-5"
      >
        <div class="flex gap-x-4 items-center">
          <div
            class="w-12 h-12 bg-black flex justify-center items-center rounded-full "
          >
            <i class="${item.icon}  text-white"></i>
          </div>
          <div class="flex flex-col justify-between w-[150px]">
            <p class="text-[20px] font-semibold">${item.type}</p>
          </div>
        </div>
        <div class="flex items-center gap-x-3">
          <p class="text-[20px] font-semibold">${item.cash}</p>
          <input
            type="radio"
            name="shipping"
            id="shipping"
            value="${item.type}"
            ${item.default}
            class="border-black border-2 bg-black focus:border-black"
          />
        </div>
      </div>
  
          `;
        })
        .join("")}
      
    </div>
    <div
      class="px-6 pt-6 pb-[10px] w-full absolute bottom-0 bg-white left-0 flex flex-col justify-center items-center rounded-t-[35px] border border-gray-200"
    >
      <div class="w-full flex justify-between items-center mb-5 drop-shadow-lg">
        <div
          class="py-5 px-14 w-full flex gap-x-4 items-center justify-center bg-black rounded-[34px] text-white text-[18px]"
          id="cart-btn"
          onclick="confirm()"
        >
          <p>Confirm Payment</p>
        </div>
      </div>
    </div>
  </div>
  
    `;
}

async function shippingData() {
  const data = await axios.get(`/payment`);
  return data.data;
}

window.backCheck = () => {
  router.navigate(routes.checkout);
};

window.confirm = async () => {
  router.navigate(routes.home);
};
