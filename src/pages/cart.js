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
      console.log(colorNeed);
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
          <i class="fa-solid fa-trash text-[18px]" onclick="removeproduct(${item.id})"></i>
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

<div
  class=" items-center bg-black bg-opacity-50 h-screen absolute top-0 left-0 w-full hidden"
  id="deleteModal"
>
  <div
    class="absolute -bottom-full transition duration-500 flex flex-col items-center w-full bg-gray-50 rounded-t-[40px]"
    id="modal"
  >
    <div class="w-10 mt-3 border-t-4"></div>
    <div class="pt-6">
      <p class="text-[25px] font-semibold">Remove from cart?</p>
    </div>
    <div
      class="flex flex-col space-y-8 w-[380px] mt-5 overflow-y-scroll no-scrollbar py-7 border-y border-gray-200"
    >
      <div
        class="flex bg-white w-full h-[150px] rounded-[30px] gap-x-5 p-5 items-center"
      >
        <div>
          <img
            src="/src/img/nike/21-1.jpg"
            class="w-[120px] rounded-[30px]"
            alt=""
            id="modalImg"
          />
        </div>
        <div class="w-[200px] flex flex-col justify-between gap-y-3">
          <div class="flex justify-between items-center">
            <p
              class="font-semibold text-[20px] text-nowrap text-ellipsis overflow-hidden w-[160px]"
              id="modalTitle"
            >
              Air Jordan 3 Retro
            </p>
          </div>
          <div class="flex gap-x-2 items-center text-[13px] text-gray-500">
            <div class="w-4 h-4 rounded-full bg-black"></div>
            <p id="modalColor">Black</p>
            <p>|</p>
            <p>Size = <span id="modalSize"></span></p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-[20px] font-semibold w-[100px]">$<span id="modalPrice"></span></p>
            <div
              class="w-[100px] bg-gray-100 rounded-full h-[35px] flex justify-between items-center px-4 py-2 text-[14px]"
            >
              <i class="fa-solid fa-minus"></i>
              <p class="font-bold text-[16px]" id="num"><span id="modalNum"></span></p>
              <i class="fa-solid fa-plus"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-[380px] gap-x-3 pt-5 pb-10">
      <button class="w-[49%] bg-gray-200 rounded-full" onclick="cancle()">Cancel</button>
      <button class="w-[49%] bg-black text-white py-4 rounded-full" id="removeConfirm">
        Yes, Remove
      </button>
    </div>
  </div>
</div>


    `;
}

async function productData() {
  const data = await axios.get(`/products`);
  return data.data;
}

window.removeproduct = async (id) => {
  const info = await productData();
  const modal = document.querySelector("#deleteModal");
  const modalDown = document.querySelector("#modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modalDown.classList.remove("-bottom-full");
  modalDown.classList.add("bottom-0");
  const cartList = JSON.parse(localStorage.cartList);
  const product1 = cartList.filter((item) => item.id == id);
  const product2 = info.filter((item) => item.id == id);

  const img = document.querySelector("#modalImg");
  img.src = product2[0].images[0];

  const title = document.querySelector("#modalTitle");
  title.innerHTML = product2[0].title;

  const size = document.querySelector("#modalSize");
  size.innerHTML = product1[0].size;

  const price = document.querySelector("#modalPrice");
  price.innerHTML = product1[0].price * product1[0].number + ".00";

  const num = document.querySelector("#modalNum");
  num.innerHTML = product1[0].number;

  const color = document.querySelector("#modalColor");
  color.innerHTML = product1[0].color;

  const removeYes = document.querySelector("#removeConfirm");
  removeYes.setAttribute("onclick", `remove(${id})`);
};

window.cancle = () => {
  const modal = document.querySelector("#deleteModal");
  const modalDown = document.querySelector("#modal");
  modal.classList.remove("flex");
  modal.classList.add("hidden");
  modalDown.classList.remove("bottom-0");
  modalDown.classList.add("-bottom-full");
};

window.remove = async (id) => {
  const allProduct = await productData();
  const cartList = JSON.parse(localStorage.cartList);
  const newCart = cartList.filter((x) => x.id != id);
  localStorage.cartList = JSON.stringify(newCart);
  renderHtml(allProduct);
};
