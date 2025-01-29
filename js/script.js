document.addEventListener("DOMContentLoaded", function () {
    const breadcrumb = document.getElementById("breadcrumb");
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    let breadcrumbText = '<a href="index.html" id="home-link">主页</a>';
    if (category) {
        breadcrumbText += ' -> <a href="index.html?category=' + category + '">' + category + '</a>';
    }
    breadcrumb.innerHTML = breadcrumbText;

    const productList = document.getElementById("product-list");

    // 商品数据
    const products = {
        electronics: [
            { name: "智能手机", img: "../images/p1.jpg",description: "高清音质，无线便捷1" },
            { name: "笔记本电脑", img: "../images/p2.jpg",description: "高性能智能手机" },
            { name: "无线耳机", img: "../images/p3.jpg" }
        ],
        clothing: [
            { name: "T恤", img: "../images/p4.jpg", description: "舒适透气" },
            { name: "牛仔裤", img: "../images/p5.jpg" , description: "经典款式，舒适穿着"},
            { name: "运动鞋", img: "../images/p6.jpg" }
        ],
        books: [
            { name: "小说", img: "../images/p7.jpg", description: "适合初学者" },
            { name: "科技书籍", img: "../images/p8.jpg" , description: "进阶学习必备"},
            { name: "漫画", img: "" }
        ]
    };

    // 点击类别时加载商品
    const categoryLinks = document.querySelectorAll("#category-list a");
    categoryLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const selectedCategory = this.getAttribute("data-category");
            window.location.href = "index.html?category=" + selectedCategory;
        });
    });

    // 更新商品列表
    function updateProductList(category) {
        productList.innerHTML = ''; // 清空当前商品列表
        const categoryProducts = products[category];

        categoryProducts.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.name;

            const productTitle = document.createElement("h3");
            productTitle.textContent = product.name;

            const productDescription = document.createElement("p");
            productDescription.textContent = product.description;

            productDiv.appendChild(productImage);
            productDiv.appendChild(productTitle);
            productDiv.appendChild(productDescription);

            productList.appendChild(productDiv);
        });
    }

    if (category) {
        updateProductList(category);
    }
});
