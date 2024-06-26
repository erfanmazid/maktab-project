export default async function productsPage() {
  const token = localStorage.getItem("accessToken") ?? false;
  if (token) {
    const data = await productData();
    renderHTML(data);
  } else {
    router.navigate(routes.login);
  }
}
