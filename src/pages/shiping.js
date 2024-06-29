import axios from "axios";
import { router, routes } from "../../main";

export default async function shippingPage() {
  const address = await addressData();
  renderHTML(address);
}

function renderHTML(address) {
  document.querySelector("#app").innerHTML = `
    <div class="h-screen flex flex-col items-center bg-gray-50 relative">
  <div class="flex justify-start items-center font-semibold w-full p-5 gap-x-5">
    <i class="fa-solid fa-arrow-left text-[20px]" onclick="backCheck()"></i>
    <p class="text-[25px] font-semibold">Shipping Address</p>
  </div>
  <div class="felx flex-col gap-y-5 w-[380px] overflow-y-scroll no-scrollbar">
    
    ${address
      .map((item) => {
        return `
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
          <p class="text-[20px] font-semibold">${item.title}</p>
          <p
            class="text-[14px] text-gray-400 mt-1 text-nowrap overflow-hidden text-ellipsis"
          >
            ${item.address}
          </p>
        </div>
      </div>
      <div>
        <input
          type="radio"
          name="shipping"
          id="shipping"
          ${item.default}
          value="${item.title}"
          class="border-black border-2 bg-black focus:border-black"
        />
      </div>
    </div>

        `;
      })
      .join("")}
    
    <div class="w-full flex justify-center items-center mt-5">
      <button
        class="bg-gray-200 w-full rounded-[30px] py-[14px] font-semibold text-[14px]"
      >
        Add New Address
      </button>
    </div>
  </div>
  <div
    class="px-6 pt-6 pb-[10px] w-full absolute bottom-0 bg-white left-0 flex flex-col justify-center items-center rounded-t-[35px] border border-gray-200"
  >
    <div class="w-full flex justify-between items-center mb-5 drop-shadow-lg">
      <div
        class="py-5 px-14 w-full flex gap-x-4 items-center justify-center bg-black rounded-[34px] text-white text-[18px]"
        id="cart-btn"
        onclick="backCheckOut()"
      >
        <p>Apply</p>
      </div>
    </div>
  </div>
</div>

  `;
}

async function addressData() {
  const data = await axios.get(`/address`);
  return data.data;
}

window.backCheck = () => {
  router.navigate(routes.checkout);
};

window.backCheckOut = async () => {
  const val = document.querySelector("#shipping:checked").value;
  const data = await addressData();
  const type = data.find((item) => item.title == val);
  localStorage.removeItem("address");
  localStorage.address = JSON.stringify(type);
  router.navigate(routes.checkout);
};
