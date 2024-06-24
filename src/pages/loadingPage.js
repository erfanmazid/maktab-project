import { router, routes } from "../../main";

export default function loadingPage() {
  document.querySelector("#app").innerHTML = `
        <div class="flex flex-col items-center h-screen">
        <div class="flex items-center gap-x-2 mt-[360px] mb-[250px]">
          <div
            class="w-[59px] h-[59px] rounded-full bg-black flex justify-center items-center"
          >
            <img
              src="./src/img/logo/logoWhite.png"
              alt=""
              class="w-[27px] h-[39px]"
            />
          </div>
          <p class="font-bold text-[48px]">Shoea</p>
        </div>
        <div>
          <img
            src="./src/img/welcom/spiner.png"
            alt=""
            class="animate-spin w-12"
          />
        </div>
      </div>

  `;
  setTimeout(welcomePage, 3000);
}
function welcomePage() {
  document.querySelector("#app").innerHTML = `
      <div class="relative h-screen">
    <div>
      <img src="./src/img/welcom/bg.png" class=" h-screen w-full object-cover " alt="" />
    </div>
    <div
      class="bg-gradient-to-t from-black/80 to-transparent w-full h-full absolute top-0"
    ></div>
    <div class="absolute text-white bottom-[70px] ml-7">
      <h2 class="font-semibold text-[40px]">Welcome to 👋</h2>
      <h1 class="text-[72px] font-bold mb-4">Shoea</h1>
      <p class="font-semibold text-[16px]">
        The best sneakers & shoes e-commerse app of<br />
        the century for your fashion needs!
      </p>
    </div>
  </div>
  
      `;
  setTimeout(welcomePage, 10000);
}
