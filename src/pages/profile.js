import axios from "./api";
import { router, routes } from "../../main";

export default async function profilePage() {
  const token = localStorage.getItem("accessToken") ?? false;
  const welcome = localStorage.getItem("welcome") ?? false;
  if (token && welcome) {
    const users = await usersData();
    renderHtml(users[0]);
    nav();
  } else if (welcome == false) {
    router.navigate(routes.loading);
  } else {
    router.navigate(routes.login);
  }
}

function renderHtml(user) {
  document.querySelector("#app").innerHTML = `
            <div class="flex flex-col gap-y-5 items-center h-screen bg-gray-50 px-[6%]">
      <div class="flex justify-between items-center w-full py-4 mb-[20px]">
        <div class="flex gap-x-5 items-center">
          <img src="/src/img/logo/logoBlack.png" class="w-5" alt="" />
          <p class="text-[24px] font-semibold">Profile</p></p>
        </div>
        <div>
          <p class="text-red-500 text-2xl font-semibold" onclick="logout()">Logout</p>
        </div>
      </div>
      <div class="flex flex-col gap-y-4 w-[380px]">
      <div class="mt-10 flex justify-between items-center">
        <p class="text-[18px] font-medium">First Name: <span>${user["First Name"]}</span></p>
        <i class="fa-solid fa-pen-to-square" onclick="editUser('First Name')"></i>
      </div>
            <div class="mt-10 flex justify-between items-center">
        <p class="text-[18px] font-medium">Last Name: <span>${user["Last Name"]}</span></p>
        <i class="fa-solid fa-pen-to-square" onclick="editUser('Last Name')"></i>
      </div>
      <div class="mt-10 flex justify-between items-center">
        <p class="text-[18px] font-medium">Email: <span>${user["Email"]}</span></p>
        <i class="fa-solid fa-pen-to-square" onclick="editUser('Email')"></i>
      </div>
            <div class="mt-10 flex justify-between items-center">
        <p class="text-[18px] font-medium">Phone Number: <span>${user["Phone Number"]}</span></p>
        <i class="fa-solid fa-pen-to-square" onclick="editUser('Phone Number')"></i>
      </div>


      </div>
      <div
        class="px-6 pt-6 pb-[10px] w-full absolute bottom-0 bg-white left-0 flex flex-col justify-center items-center rounded-t-[35px] border border-gray-200"
      >
        <nav>
          <ul class="flex gap-x-[44px]">
            <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar">
                <i class="fa-solid fa-house text-[24px]"></i>
                <p class="text-[10px] font-semibold">Home</p>
            </li>
            <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar">
                <i class="fa-solid fa-bag-shopping text-[24px]"></i>
                <p class="text-[10px] font-semibold">cart</p>
            </li>
            <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar">
                <i class="fa-solid fa-cart-shopping text-[24px]"></i>
                <p class="text-[10px] font-semibold">Orders</p>
            </li>
            <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar">
                <i class="fa-solid fa-wallet text-[24px]"></i>
                <p class="text-[10px] font-semibold">Wallet</p>
            </li>
            <li class="flex flex-col justify-center items-center gap-y-1 text-gray-400 bar active">
                <i class="fa-solid fa-user text-[24px]"></i>
                <p class="text-[10px] font-semibold">Profile</p>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    
    <div
  class="h-screen w-full bg-black bg-opacity-30 fixed top-0 left-0 justify-center items-center hidden"
  id="editModal"
>
  <div
    class="w-[80%] h-[60%] rounded-[45px] bg-white p-6 flex flex-col justify-between gap-y-4 items-center"
  >
    <div class="w-full flex flex-col gap-y-3">
    <p>Enter New Value:</p>
    <input type="text" id="newValue" class="w-full py-3 pl-5 rounded-2xl border border-gray-300 mb-5" placeholder="Type hear">
    </div>
    <button
      class="w-full bg-black text-white py-3 rounded-3xl font-semibold mt-3"
      onclick="btnClick()"
    >
      Edit
    </button>
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
      const pageName = items.querySelector("p").innerHTML;
      const newPage = pageName.toLocaleLowerCase();
      router.navigate(`/${newPage}`);
    });
  });
};

async function usersData() {
  const data = await axios.get(`/users`);
  return data.data;
}

let inputVal = "";
window.editUser = async (nameOf) => {
  inputVal = nameOf;
  const modal = document.querySelector("#editModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

window.btnClick = async () => {
  const input = document.querySelector("#newValue");
  const users = await usersData();
  users[0][`${inputVal}`] = input.value;
  const newData = await axios.delete("/users/1");
  const data = await axios.post("/users", users[0]);
  const modal = document.querySelector("#editModal");
  modal.classList.remove("flex");
  modal.classList.add("hidden");
  profilePage();
};

window.logout = () => {
  localStorage.removeItem("accessToken");
  router.navigate(routes.login);
};
