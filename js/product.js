const cart = {
    items: JSON.parse(localStorage.getItem('cart')) || [],

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        window.dispatchEvent(new Event('cartUpdate')); // 触发跨页面同步
    },

    add(product,quantity) {
        try {
            console.info("trying to add product 2",product)
            if (!product?.price || isNaN(product.price)) {
                throw new Error(`无效商品数据: ${JSON.stringify(product)}`);
            }

            quantity = parseInt(quantity) || 1;
            if (quantity < 1) quantity = 1;

            const existItem = this.items.find(item => item.name === product.name);
            if (existItem) {
                existItem.quantity += quantity;
            } else {
                this.items.push({
                    ...product,
                    price: Number(product.price),
                    quantity: quantity
                });
            }
            this.update();
            this.save();
        } catch (error) {
            console.error('加入购物车失败:', error);
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

    checkout(){
        if(confirm('确定要提交购物车吗?')){
            this.items = [];
            this.update();
            this.save();
        }
    },
    
    init() {
        // 事件委托处理所有购物车操作
        document.addEventListener('click', e => {
            const addBtn = e.target.closest('#product-add-to-cart');
            const removeBtn = e.target.closest('.remove-item');
            const clearBtn = e.target.matches('#clear-cart');
            const checkoutBtn = e.target.matches('#checkout-btn');

            if (addBtn) {
                const quantityInput = document.getElementById('product-quantity').value;
                const quantity = parseInt(quantityInput) || 1;
                this.add({
                    name: name1,
                    price: price1,
                    img: addBtn.dataset.img,
                    category: category1
                },quantity);
            }

            if (removeBtn) {
                this.remove(removeBtn.dataset.name);
            }

            if (clearBtn) {
                this.clear();
            }

            if(checkoutBtn){
                this.checkout();
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

var name1 = "";
var price1 = 0;
var category1 = "";

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const product = {
        name: params.get('name') || '未命名商品',
        price: parseFloat(params.get('price')) || 0,
        img: params.get('img') || '../images/default.jpg',
        desc: params.get('desc') || '暂无商品描述',
        category: category
    };

    name1 = params.get('name');
    price1 = parseFloat(params.get('price'));
    category1 = category;


    // 修复面包屑导航（显示分类层级）
    const breadcrumb = document.getElementById('breadcrumb');
    let breadcrumbHtml = '<a href="index.html">Home</a>';
    const categoryName = category === "电子产品" ? "electronics" : 
                            category === "服饰" ? "clothing" : "books";

    if (category) {
        
        breadcrumbHtml += ` > <a href="index.html?category=${categoryName}">${category}</a>`;
    }
    
    breadcrumbHtml += ` › <span>${product.name}</span>`;
    breadcrumb.innerHTML = breadcrumbHtml;

    // 设置商品信息
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-price').textContent = `￥${product.price.toFixed(2)}`;
    document.getElementById('product-image').src = product.img;

    const descContainer = document.getElementById("product-description");
    descContainer.innerHTML = `
        <div class="description-section">
            <h3>商品描述</h3>
            <p>${product.desc}</p>
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

    // 图片加载失败处理
    document.getElementById('product-image').onerror = function() {
        this.src = '../images/default.jpg';
        console.warn('商品图片加载失败，已使用默认图片');
    };

    // 返回按钮携带分类状态
    document.getElementById('back-button').addEventListener('click', function() {
        const returnUrl = category ? `index.html?category=${categoryName}` : "index.html";
        window.location.href = returnUrl;
    });

});

