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
  setTimeout(router.navigate(routes.welcom), 3000);
}
