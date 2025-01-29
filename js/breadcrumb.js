document.addEventListener("DOMContentLoaded", function () {
    // 获取导航栏元素
    const breadcrumb = document.getElementById("breadcrumb");

    // 根据页面不同更新导航栏
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const productName = params.get("name");

    let breadcrumbText = '<a href="index.html" id="home-link">Home</a>';

    // 更新导航栏
    if (category) {
        breadcrumbText += ' -> <a href="index.html?category=' + category + '">' + category + '</a>';
    }

    if (productName) {
        breadcrumbText += ' -> ' + productName;
    }

    breadcrumb.innerHTML = breadcrumbText;

    // 分类点击事件
    const categoryLinks = document.querySelectorAll("#category-list a");
    categoryLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const selectedCategory = this.getAttribute("data-category");
            window.location.href = "index.html?category=" + selectedCategory;
        });
    });
});
