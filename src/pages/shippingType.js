import { router, routes } from "../../main";
import axios from "./api";

export default async function shippingTypePage() {
  const shipping = await shippingData();
  renderHTML(shipping);
}

function renderHTML(data) {
  document.querySelector("#app").innerHTML = `
    <div class="h-screen flex flex-col items-center bg-gray-50 relative">
  <div class="flex justify-start items-center font-semibold w-full p-5 gap-x-5">
    <i class="fa-solid fa-arrow-left text-[20px]" onclick="backCheck()"></i>
    <p class="text-[25px] font-semibold">Shipping Address</p>
  </div>
  <div class="felx flex-col gap-y-5 w-[380px] overflow-y-scroll no-scrollbar">
    
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
          <i class="fa-solid ${item.icon}  text-white"></i>
        </div>
        <div class="flex flex-col justify-between w-[200px]">
          <p class="text-[20px] font-semibold">${item.type}</p>
          <p
            class="text-[14px] text-gray-400 mt-1 text-nowrap overflow-hidden text-ellipsis"
          >
            ${item.time}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-x-3">
        <p class="text-[20px] font-semibold">$${item.cash}</p>
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
        onclick="backCheckout()"
      >
        <p>Apply</p>
      </div>
    </div>
  </div>
</div>

  `;
}

async function shippingData() {
  const data = await axios.get(`/shipping`);
  return data.data;
}

window.backCheck = () => {
  router.navigate(routes.checkout);
};

window.backCheckout = async () => {
  const val = document.querySelector("#shipping:checked").value;
  const data = await shippingData();
  const type = data.find((item) => item.type == val);
  localStorage.removeItem("shippingType");
  localStorage.shippingType = JSON.stringify(type);
  router.navigate(routes.checkout);
};
