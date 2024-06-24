export function slider() {
  document.querySelector("#app").innerHTML = `
<section class="splide h-screen -mt-8" aria-label="Splide Basic HTML Example">
  <div class="splide__track ">
		<ul class="splide__list h-full">
			<li class="splide__slide">
                <img src="src/img/welcom/1.png" class="-mt-5" alt="">
                <div class="p-6 flex justify-center items-center">
                  <p class="font-semibold text-[32px] text-center">We provide high quality products just for you</p>
                </div>
            </li>
			<li class="splide__slide">
                <img src="src/img/welcom/2.png" class="-mt-5" alt="">
                <div class="p-6 flex justify-center items-center">
                  <p class="font-semibold text-[32px] text-center">Your satisfaction is our number one periority</p>
                </div>
            </li>
			<li class="splide__slide">
                <img src="src/img/welcom/3.png" class="-mt-5" alt="">
                <div class="p-6 flex justify-center items-center">
                  <p class="font-semibold text-[32px] text-center">Let’s fulfill your fashion needs with shoearight now!</p>
                </div>
            </li>
		</ul>
  </div>
  <div class=" p-4 flex flex-col ">
  <button id="next-btn" class="text-[14px] w-full bg-[#212529] rounded-full h-[50px] flex justify-center items-center text-white">Next</button>
  </div>
</section>
    `;
}
