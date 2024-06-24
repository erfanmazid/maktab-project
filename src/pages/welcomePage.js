export default function welcomePage() {
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
}
