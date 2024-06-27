export default async function searchPage(e) {
  console.log(e);
  renderHTML();
}

function renderHTML() {
  document.querySelector("#app").innerHTML = `
  <div class="flex flex-col justify-start items-center h-screen pt-4">
  <div class="w-[380px] mt-2 relative flex items-center">
    <input
      type="text"
      id="searchInp"
      class="bg-gray-100/85 w-full rounded-xl border border-black py-4 px-10 placeholder:text-[14px] placeholder:text-[#BAB8BC]"
      placeholder="Search"
    />
    <i
      class="fa-solid fa-magnifying-glass absolute left-[14px] text-[#6C757D] text-[18px]"
    ></i>
    <i
      class="fa-solid fa-bars-progress absolute right-[14px]"
      onclick="search()"
    ></i>
  </div>
  <div class="flex justify-between pt-4 w-[380px] items-center">
    <p class="text-[20px] font-bold">
      Result for <span id="inp-search">""</span>
    </p>
    <p><span id="num"></span> found</p>
  </div>
  <div class="flex flex-col items-center mt-24">
    <img
      src="/src/img/home/clipboard-307332_1280.webp"
      class="w-[50%]"
      alt=""
    />
    <p class="mt-7 font-bold text-[20px]">Not Found</p>
    <p class="text-center w-[345px] mt-3">
      Sorry, the keyword you entered cannot be found, pleas check again or
      search with another keyword.
    </p>
  </div>
</div>

    `;
}

window.search = () => {
  const inp = document.querySelector("#searchInp").value;
  router.navigate(routes.search + `?q=${inp}`);
};
