export default async function wishListPAge() {
  const token = localStorage.getItem("accessToken") ?? false;
  const welcome = localStorage.getItem("welcome") ?? false;
  if (token && welcome) {
    renderHtml(allProduct);
    nav();
  } else if (welcome == false) {
    router.navigate(routes.loading);
  } else {
    router.navigate(routes.login);
  }
}
