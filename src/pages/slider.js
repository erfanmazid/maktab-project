export function slider() {
  document.querySelector("#app").innerHTML = `
<section class="splide h-screen -mt-8" aria-label="Splide Basic HTML Example">
  <div class="splide__track ">
		<ul class="splide__list h-full">
			<li class="splide__slide">
                <img src="src/img/welcom/1.png" alt="">
            </li>
			<li class="splide__slide">
                <img src="src/img/welcom/2.png" alt="">
            </li>
			<li class="splide__slide">
                <img src="src/img/welcom/3.png" alt="">
            </li>
		</ul>
  </div>
  <div class=" p-6 flex flex-col gap-8">
  <button id="next-btn" class="text-[14px] w-full bg-[#212529] rounded-full h-[50px] flex justify-center items-center mt-12 text-white">Next</button>
  </div>
</section>
    `;
}
