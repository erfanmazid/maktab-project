import axios from "./api";
import { router, routes } from "../../main";

export default async function addAdressPage() {
  const token = localStorage.getItem("accessToken") ?? false;
  const welcome = localStorage.getItem("welcome") ?? false;
  if (token && welcome) {
    renderHTML();
  } else if (welcome == false) {
    router.navigate(routes.loading);
  } else {
    router.navigate(routes.login);
  }
}

function renderHTML() {
  document.querySelector("#app").innerHTML = `
      <div class="h-screen flex flex-col items-center bg-gray-50 relative">
    <div class="flex justify-start items-center font-semibold w-full p-5 gap-x-5">
      <i class="fa-solid fa-arrow-left text-[20px]" onclick="backAddress()"></i>
      <p class="text-[25px] font-semibold">Adding Address</p>
    </div>
    <div class="felx flex-col gap-y-5 w-[380px] overflow-y-scroll no-scrollbar">
      <input type="text" id="title" class="w-full py-3 pl-5 rounded-2xl border border-gray-300 mb-5" placeholder="Title of address">
      <input type="text" id="addres" class="w-full py-3 pl-5 rounded-2xl border border-gray-300" placeholder="Full address">
    </div>
    <div
      class="px-6 pt-6 pb-[10px] w-full absolute bottom-0 bg-white left-0 flex flex-col justify-center items-center rounded-t-[35px] border border-gray-200"
    >
      <div class="w-full flex justify-between items-center mb-5 drop-shadow-lg">
        <div
          class="py-5 px-14 w-full flex gap-x-4 items-center justify-center bg-black rounded-[34px] text-white text-[18px]"
          id="cart-btn"
          onclick="addAddressBtn()"
        >
          <p>Add</p>
        </div>
      </div>
    </div>
  </div>
  
    `;
}
window.backAddress = () => {
  router.navigate(routes.shipping);
};

window.addAddressBtn = async () => {
  const title = document.querySelector("#title").value;
  const addres = document.querySelector("#addres").value;
  console.log(title, addres);
  const Alladdress = await axios.get("/address");
  const newAddress = {
    title: title,
    address: addres,
    default: "",
    id: Alladdress.data.length + 1,
  };
  console.log(newAddress);

  if (title && addres) {
    const data = await axios.post("/address", newAddress);
    router.navigate(routes.shipping);
  }
};
