export function signupPage() {
  document.querySelector("#app").innerHTML = `
  <div class="h-screen">
  <div class="h-[56px] flex items-center pl-7">
    <i class="fa-solid fa-arrow-left text-xl"></i>
  </div>
  <div class="flex justify-center items-center py-16 mb-5">
    <img src="./src/img/logo/logoBlack.png" class="w-[54px]" alt="" />
  </div>
  <div class="flex flex-col items-center justify-center gap-10">
    <p class="text-[32px] font-semibold mt-8">Signup New Account</p>
    <div class="flex flex-col gap-y-5">
      <div class="relative flex justify-center items-center text-[#6C757D]">
        <i class="fa-solid fa-envelope absolute left-[14px]"></i>
        <input
          type="email"
          placeholder="Email"
          class="bg-gray-100/50 h-[37px] w-[380px] py-2 px-10 placeholder:text-[14px] rounded"
        />
      </div>
      <div class="relative flex justify-center items-center text-[#6C757D]">
        <i class="fa-solid fa-lock absolute left-[14px]"></i>
        <input
          type="password"
          placeholder="Password"
          class="bg-gray-100/50 h-[37px] w-[380px] py-2 px-10 placeholder:text-[14px] rounded focus-visible:border-black"
        />
        <!-- <i class="fa-solid fa-eye absolute"></i> -->
        <i class="fa-solid fa-eye-slash absolute right-[14px]"></i>
      </div>
      <div class="items-center flex justify-center">
        <label
          class="relative flex items-center p-3 rounded-full cursor-pointer"
          htmlFor="check"
        >
          <input
            type="checkbox"
            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
            id="check"
          />
          <span
            class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
        <label
          class="mt-px font-light text-gray-700 cursor-pointer select-none"
          htmlFor="check"
        >
          Remember Me
        </label>
      </div>
    </div>
  </div>
  <div class="flex justify-center mt-52">
    <button class="w-[380px] h-[47px] rounded-[30px] bg-[#868d93] text-white">
      Sign up
    </button>
  </div>
</div>

  `;
}
