import Splide from "@splidejs/splide";
import { slider } from "./slider";
import { root, router, routes } from "../../main";

export default function loadingPage() {
  const welcome = localStorage.getItem("welcome") ?? false;
  if (welcome) {
    router.navigate(routes.login);
  } else {
    localStorage.setItem("searchHistory", "");
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
  setTimeout(option, 5000);
}

function option() {
  //   document.querySelector("#app").innerHTML = `
  // <div class="flex flex-col h-screen font-inter" id="mmd">
  //   <div class="-mt-6 flex " >
  //     <div id="nmd" class="-mt-16 flex w-[300%] overflow-hidden" >
  //       <img src="./src/img/welcom/1.png" alt="" class="w-full"/>
  //       <img src="./src/img/welcom/2.png" alt="" class="w-full"/>
  //       <img src="./src/img/welcom/3.png" alt="" class="w-full"/>
  //     </div>
  //   </div>
  //   <div class="p-6 flex flex-col justify-between">
  //     <p class="text-[32px] font-semibold text-center">
  //       We provide high quality products just for you
  //     </p>
  //     <div class="flex gap-3 justify-center items-center mt-[68px]">
  //       <div class="bg-black w-[30px] h-[3px]"></div>
  //       <div class="bg-gray-500 w-[30px] h-[3px]"></div>
  //       <div class="bg-gray-500 w-[30px] h-[3px]"></div>
  //     </div>
  //     <div
  //       onclick="test()"
  //       class="w-full bg-[#212529] rounded-full h-[50px] flex justify-center items-center mt-12"
  //     >
  //       <p class="text-[14px] text-white">next</p>
  //     </div>
  //   </div>
  // </div>

  //     `;
  slider();
  const splide = new Splide(".splide", {
    classes: {
      arrows: "splide__arrows hidden",
      page: "splide__pagination__page custom-page",
    },
  }).mount();

  splide.on("pagination:updated", () => {
    if (splide.index + 1 == 3) {
      root.querySelector("#next-btn").innerHTML = "Get Started";
    } else {
      root.querySelector("#next-btn").innerHTML = "Next";
    }
  });

  root.querySelector("#next-btn").addEventListener("click", () => {
    if (splide.index + 1 == 3) {
      router.navigate(routes.signup);
      localStorage.setItem("welcome", true);
    } else {
      splide.go(splide.index + 1);
    }
  });
}

window.test = () => {
  console.log("hi");
  const nmd = document.querySelector("#nmd");
  nmd.classList.add("-ml-[100%]");
};
