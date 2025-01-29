document.addEventListener("DOMContentLoaded", function () {
    const categoryList = document.getElementById("category-list");
    const productList = document.getElementById("product-list");
    const categoryTitle = document.getElementById("category-title");

    // 商品数据
    const products = {
        electronics: [
            { name: "华为 Mate 70 RS非凡大师", img: "../images/p1.jpg" ,desc: "最新款智能手机,配备6.7英寸OLED屏幕和5G网络支持" },
            { name: "GTX 5090", img: "../images/p2.jpg",desc: "高性能轻薄本,搭载第12代Intel酷睿处理器" },
            { name: "Airpods", img: "../images/p3.jpg",desc: "主动降噪蓝牙耳机,30小时超长续航" }
        ],
        clothing: [
            { name: "现代", img: "../images/p4.jpg" },
            { name: "古风", img: "../images/p5.jpg" },
            { name: "童装", img: "../images/p6.jpg" }
        ],
        books: [
            { name: "Operating System", img: "../images/p7.jpg" },
            { name: "CSApp", img: "../images/p8.jpg" },
            { name: "MyGo", img: "../images/p9.jpg" }
        ]
    };

    function updateBreadcrumb(category) {
        const breadcrumb = document.getElementById("breadcrumb");
        let html = '<a href="index.html">Home</a>';
        
        if (category) {
            const categoryName = category === "electronics" ? "电子产品" : 
                                category === "clothing" ? "服饰" : "书籍";
            html += ` > <a href="index.html?category=${category}">${categoryName}</a>`;
        }
        
        breadcrumb.innerHTML = html;
    }


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
                // 新增 category 参数传递
                const encodedDesc = encodeURIComponent(product.desc);
                window.location.href = `product.html?category=${encodeURIComponent(category)}&name=${encodeURIComponent(product.name)}&img=${encodeURIComponent(product.img)}&desc=${encodedDesc}`;
            });

            productList.appendChild(productItem);
        });

        history.pushState({ category }, "", `?category=${category}`);
        updateBreadcrumb(category);
    }

    categoryList.addEventListener("click", function (event) {
        event.preventDefault();
        if (event.target.tagName === "A") {
            const category = event.target.dataset.category;
            displayProducts(category);
        }
    });

    // 浏览器前进/后退处理
    window.addEventListener("popstate", (event) => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("category");
        if (category) displayProducts(category);
    });

    // 初始化加载（处理带参数的URL）
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get("category");
    if (initialCategory) {
        displayProducts(initialCategory);
    } else {
        updateBreadcrumb(); // 初始化导航栏
    }
});

