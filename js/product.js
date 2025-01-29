document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get("name") || "商品名称未定义";
    const productImage = params.get("img");
    const productDescription = params.get("desc") || "商品描述未定义";

    document.getElementById("product-title").textContent = productName;
    document.getElementById("product-image").src = productImage;
    document.getElementById("product-description").textContent = productDescription;

    document.getElementById("back-button").addEventListener("click", function () {
        window.location.href = "../html/index.html";
    });
});
