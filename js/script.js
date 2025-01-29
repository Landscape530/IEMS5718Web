document.addEventListener("DOMContentLoaded", function () {
    const categoryList = document.getElementById("category-list");
    const productList = document.getElementById("product-list");
    const categoryTitle = document.getElementById("category-title");

    // 商品数据
    const products = {
        electronics: [
            { name: "智能手机", img: "../images/p1.jpg" },
            { name: "笔记本电脑", img: "../images/p2.jpg" },
            { name: "无线耳机", img: "../images/p3.jpg" }
        ],
        clothing: [
            { name: "T恤", img: "../images/p4.jpg" },
            { name: "牛仔裤", img: "../images/p5.jpg" },
            { name: "运动鞋", img: "../images/p6.jpg" }
        ],
        books: [
            { name: "小说", img: "../images/p7.jpg" },
            { name: "科技书籍", img: "../images/p8.jpg" },
            { name: "漫画", img: "" }
        ]
    };


    categoryList.addEventListener("click", function (event) {
        event.preventDefault();
        if (event.target.tagName === "A") {
            const category = event.target.dataset.category;
            displayProducts(category);
        }
    });

    // 更新商品列表
    function displayProducts(category) {
        productList.innerHTML = ""; // 清空之前的内容
        categoryTitle.textContent = `当前分类: ${category === "electronics" ? "电子产品" : category === "clothing" ? "服饰" : "书籍"}`;

        products[category].forEach(product => {
            const productItem = document.createElement("div");
            productItem.classList.add("product-item");

            productItem.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <p>${product.name}</p>
            `;
            
            productItem.addEventListener("click", () => {
                window.location.href = `product.html?name=${encodeURIComponent(product.name)}&img=${encodeURIComponent(product.img)}&desc=${encodeURIComponent(product.desc)}`;
            });

            productList.appendChild(productItem);
        });
    }

    

});
