const cart = {
    items: JSON.parse(localStorage.getItem('cart')) || [],

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        window.dispatchEvent(new Event('cartUpdate')); // 触发跨页面同步
    },

    add(product) {
        try {
            console.info("cart加入购物车ing",product)
            if (!product?.price || isNaN(product.price)) {
                throw new Error(`无效商品数据: ${JSON.stringify(product)}`);
            }

            const existItem = this.items.find(item => item.name === product.name);
            if (existItem) {
                existItem.quantity++;
            } else {
                this.items.push({
                    ...product,
                    price: Number(product.price),
                    quantity: 1
                });
            }
            this.update();
            this.save();
        } catch (error) {
            console.error('加入购物车失败1:', error);
            alert(error.message);
        }
    },

    remove(name) {
        this.items = this.items.filter(item => item.name !== name);
        this.update();
        this.save();
    },

    clear() {
        if (confirm('确定要清空购物车吗？')) {
            this.items = [];
            this.update();
            this.save();
        }
    },

    update() {
        // 跨页面更新UI
        const updateUI = () => {
            // 更新购物车数量
            document.querySelectorAll('#cart-count').forEach(el => {
                el.textContent = this.items.reduce((sum, item) => sum + item.quantity, 0);
            });

            // 更新购物车列表
            document.querySelectorAll('#cart-items').forEach(container => {
                container.innerHTML = this.items.map(item => `
                    <li>
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>￥${item.price.toFixed(2)} × ${item.quantity}</p>
                        </div>
                        <button class="remove-item" data-name="${item.name}">×</button>
                    </li>
                `).join('');
            });

            // 更新总价
            const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            document.querySelectorAll('#cart-total').forEach(el => {
                el.textContent = `总价：￥${total.toFixed(2)}`;
            });
        };
        requestAnimationFrame(updateUI);
    },

    init() {
        // 事件委托处理所有购物车操作
        document.addEventListener('click', e => {
            const addBtn = e.target.closest('.add-to-cart');
            const removeBtn = e.target.closest('.remove-item');
            const clearBtn = e.target.matches('#clear-cart');

            if (addBtn) {
                this.add({
                    name: addBtn.dataset.name,
                    price: parseFloat(addBtn.dataset.price),
                    img: addBtn.dataset.img,
                    category: addBtn.dataset.category
                });
            }

            if (removeBtn) {
                this.remove(removeBtn.dataset.name);
            }

            if (clearBtn) {
                this.clear();
            }
        });

    
        // 监听跨页面数据变化
        window.addEventListener('storage', (e) => {
            if (e.key === 'cart') {
                this.items = JSON.parse(e.newValue);
                this.update();
            }
        });

        window.addEventListener('cartUpdate', () => {
            this.items = JSON.parse(localStorage.getItem('cart')) || [];
            this.update();
        });

        this.update();
    }
};

cart.init();
window.cart = cart;

document.addEventListener("DOMContentLoaded", function () {
    const categoryList = document.getElementById("category-list");
    const productList = document.getElementById("product-list");
    const categoryTitle = document.getElementById("category-title");

    // 商品数据
    const products = {
        electronics: [
            { name: "华为 Mate 70 RS非凡大师", img: "../images/p1.jpg", price:11888.00 ,desc: "最新款智能手机,配备6.7英寸OLED屏幕和5G网络支持" },
            { name: "GTX 5090", img: "../images/p2.jpg", price: 10000.00,desc: "高性能轻薄本,搭载第12代Intel酷睿处理器" },
            { name: "Airpods", img: "../images/p3.jpg", price: 2888.00,desc: "主动降噪蓝牙耳机,30小时超长续航" }
        ],
        clothing: [
            { name: "现代", img: "../images/p4.jpg" , price: 2888.00 ,desc: "雅戈尔西装"},
            { name: "古风", img: "../images/p5.jpg" , price: 3888.00 ,desc: "逍遥灵儿"},
            { name: "童装", img: "../images/p6.jpg" , price: 288.00  ,desc: "小可爱"}
        ],
        books: [
            { name: "Operating System", img: "../images/p7.jpg", price: 99.00  ,desc: "操作系统"},
            { name: "CSApp", img: "../images/p8.jpg", price:88.00  ,desc: "程序员必学经典"},
            { name: "MyGo", img: "../images/p9.jpg", price:999.00   ,desc:"二次元必看番"}
        ]
    };

    function updateBreadcrumb(category) {
        const breadcrumb = document.getElementById("breadcrumb");
        let html = '<a href="index.html">Home</a>';
        
        if (category) {
            const categoryName = {
                electronics: "电子产品",
                clothing: "服饰",
                books: "书籍"
            }[category];
            html += ` > <a href="index.html?category=${category}">${categoryName}</a>`;
        }
        
        breadcrumb.innerHTML = html;
    }


    // 更新商品列表
    function displayProducts(category) {
        productList.innerHTML = ""; // 清空之前的内容

        // console.warn("111",category);

        const categoryName = {
            electronics: "电子产品",
            clothing: "服饰",
            books: "书籍"
        }[category];
        categoryTitle.textContent = categoryName;

        products[category].forEach(product => {
            const item = document.createElement("div");
            item.className = "product-item";
            item.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">￥${product.price.toFixed(2)}</p>
                <button class="add-to-cart" 
                        data-name="${product.name}"
                        data-price="${product.price}"
                        data-img="${product.img}"
                        data-category="${product.category}">
                    加入购物车
                </button>
            `;
            
            item.addEventListener("click", (e) => {
                if (!e.target.closest('.add-to-cart')) {
                    const params = new URLSearchParams({
                        category: categoryName,
                        name: product.name,
                        img: product.img,
                        price: product.price,
                        desc: product.desc
                    });
                    console.info("111111")
                    window.location.href = `product.html?${params.toString()}`;
                }
            });

            productList.appendChild(item);
        })

        history.replaceState({ category }, "", `?category=${category}`);
        updateBreadcrumb(category);
    }

    categoryList.addEventListener("click",e => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const category = e.target.dataset.category;
            // console.warn(category);
            displayProducts(category);
        }
    });

     // 初始化
    const params = new URLSearchParams(location.search);
    const initialCategory = params.get('category');
    initialCategory ? displayProducts(initialCategory) : updateBreadcrumb();

});


