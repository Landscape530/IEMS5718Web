document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const productName = params.get("name") || "商品名称未定义";
    const productImage = params.get("img") || "../images/default.jpg";
    const productDescription = params.get("desc") || "该商品暂无详细描述";

    // 更新导航栏面包屑
    const breadcrumb = document.getElementById("breadcrumb");
    let breadcrumbHtml = '<a href="index.html">Home</a>';
    
    if (category) {
        const categoryName = category === "electronics" ? "电子产品" : 
                            category === "clothing" ? "服饰" : "书籍";
        breadcrumbHtml += ` > <a href="index.html?category=${category}">${categoryName}</a>`;
    }
    
    breadcrumbHtml += ` > <span>${productName}</span>`;
    breadcrumb.innerHTML = breadcrumbHtml;

    // 设置商品标题
    document.getElementById("product-title").textContent = productName;

    // 设置商品图片
    const imgElement = document.getElementById("product-image");
    imgElement.src = productImage;
    imgElement.alt = productName;

    // 图片加载失败处理
    imgElement.onerror = function() {
        this.src = "../images/default.jpg";
        console.warn("商品图片加载失败，已使用默认图片");
    };

    // 设置商品描述（带格式化内容）
    const descContainer = document.getElementById("product-description");
    descContainer.innerHTML = `
        <div class="description-section">
            <h3>商品描述</h3>
            <p>${productDescription}</p>
        </div>
        <div class="features-section">
            <h3>服务保障</h3>
            <ul>
                <li>✔ 正品保证</li>
                <li>✔ 七天无理由退换</li>
                <li>✔ 全国包邮</li>
                <li>✔ 专业客服支持</li>
            </ul>
        </div>
    `;

    // 返回按钮功能
    document.getElementById("back-button").addEventListener("click", function() {
        // 保留分类状态返回
        const returnUrl = category ? `index.html?category=${category}` : "index.html";
        window.location.href = returnUrl;
    });

    // 控制台调试信息
    console.log("加载的商品参数：", {
        category,
        productName,
        productImage,
        productDescription
    });
});