export function productSlider(info) {
  document.querySelector("#app").innerHTML = `
  <section class="splide -mt-8" aria-label="Splide Basic HTML Example">
    <div class="splide__track ">
          <ul class="splide__list h-full">
            ${info
              .map((item) => {
                return `
                              <li class="splide__slide">
                  <img src="${item}"alt="">
              </li>

              `;
              })
              .join("")}
          </ul>
    </div>
  </section>
      `;
}
