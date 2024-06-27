import axios from "./api";
import Splide from "@splidejs/splide";
import { productSlider } from "./productSlider";

export default async function productInfoPage(match) {
  const id = match.data.id;
  const data = await productData(id);
  productSlider(data[0].images);
  const splide = new Splide(".splide", {
    classes: {
      arrows: "splide__arrows hidden",
    },
  }).mount();

  // document.querySelector("#app").innerHTML = `info`;
}

async function productData(id) {
  const serch = `id=${id}`;
  const data = await axios.get(`/products?${serch}`);
  return data.data;
}
