export default function productInfoPage(match) {
  const id = match.data.id;
  console.log(id);
  document.querySelector("#app").innerHTML = `info`;
}
