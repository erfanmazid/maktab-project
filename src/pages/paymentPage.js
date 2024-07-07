import axios from "./api";
import { router, routes } from "../../main";

export default async function paymentPage() {
  const token = localStorage.getItem("accessToken") ?? false;
  const welcome = localStorage.getItem("welcome") ?? false;
  if (token && welcome) {
    const shipping = await shippingData();
    renderHTML(shipping);
  } else if (welcome == false) {
    router.navigate(routes.loading);
  } else {
    router.navigate(routes.login);
  }
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
  const data = await axios.get("/cart");
  const dataNeed = data.data;

  const cartList = JSON.parse(localStorage.cartList);
  const shippingType = JSON.parse(localStorage.shippingType);
  const address = JSON.parse(localStorage.address);
  const allcost = JSON.parse(localStorage.allcost);
  const email = localStorage.getItem("email");

  const showTime = time();
  const showDate = date();

  const cart = {
    id: dataNeed.length + 1,
    date: showDate,
    time: showTime,
    isdone: false,
    cartList: cartList,
    shippingType: shippingType,
    address: address,
    allcost: allcost,
    email: email,
  };
  try {
    const cartPush = await axios.post("/cart", cart);
    console.log(cartPush);
    localStorage.removeItem("cartList");
    localStorage.removeItem("address");
    localStorage.removeItem("shippingType");
    localStorage.removeItem("allcost");
    localStorage.cartList = JSON.stringify([]);
    localStorage.orderNum = JSON.stringify(dataNeed.length + 1);
  } catch (e) {
    console.log(e);
  }
  router.navigate(routes.home);
};

function time() {
  let date = new Date();
  let hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  let second = date.getSeconds();
  if (second < 10) {
    second = "0" + second;
  }

  const time = hour + ":" + minute + ":" + second;
  return time;
}

function date() {
  let date = new Date();

  let year = date.getFullYear();

  let month = date.getMonth();
  if (month < 10) {
    month = "0" + month;
  }

  let day = date.getDay();
  if (day < 10) {
    day = "0" + day;
  }

  const time = day + "/" + month + "/" + year;
  return time;
}
