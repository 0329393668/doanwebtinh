const cardRender = document.querySelector('.card_render');
const itemsJSON = localStorage.getItem('currents');
const items = JSON.parse(itemsJSON);

function renderCart(arr) {
    cardRender.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        cardRender.innerHTML += `
        <div class="row col-12 cart__show">
        <div class="carl__product col-3">
            <img src="${p.img}"
                width="30%" alt="Ảnh">
            <strong>${p.name} <br> Ice regular size </strong>
        </div>
        <div class="cart__price col-9 card__sub">
            <div class="cart__price-item col-3">${p.price.toLocaleString()} đ</div>
            <div class="cart__price-item col-3 ">
                <button class="decrease" onclick="show(${p.id})"> - </button>
                <span style="margin: 0 10px;" class="quantity" id="quantity-modal" >${p.quantity}</span>
                <button class="increase" onclick="show(${p.id})"> + </button>
            </div>
            <div class="cart__price-item col-3">${(p.quantity * p.price).toLocaleString()} đ</div>
            </div>
            <div class="closesub" style="width: auto !important;">
                <i onclick="remove1(${p.id})" class="fa-solid fa-x"></i>
            </div>
        </div>
         `;
    }
    renderShop(arr);
    const cards = document.querySelectorAll('.cart__show');
    cards.forEach((card) => {
        // Lấy phần tử nút tăng, nút giảm và số lượng trong card hiện tại
        const increaseBtn = card.querySelector('.increase');
        const decreaseBtn = card.querySelector('.decrease');
        const quantityElement = card.querySelector('.quantity');

        // Lấy giá trị số lượng ban đầu từ thuộc tính "value" của phần tử số lượng
        let quantity = parseInt(quantityElement.textContent);

        // Xử lý sự kiện khi nhấn vào nút tăng
        increaseBtn.addEventListener('click', () => {
            quantity++; // Tăng số lượng lên 1
            localStorage.setItem('quantity', quantity.toString());
            quantityElement.textContent = quantity; // Cập nhật giá trị số lượng mới

        });

        // Xử lý sự kiện khi nhấn vào nút giảm
        decreaseBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--; // Giảm số lượng xuống 1 (nếu số lượng > 0)
                quantityElement.textContent = quantity; // Cập nhật giá trị số lượng mới
                localStorage.setItem('quantity', quantityElement.textContent.toString());
            }
        });
    });
}
const show = (id) => {
    setTimeout(() => {
        const find = items.find(item => item.id === id);
        const quantity = parseInt(localStorage.getItem('quantity'));
        const productListCurrent = JSON.parse(localStorage.getItem('currents')) || [];
        let isPresent = false;
        let index = null;
        for (let i = 0; i < productListCurrent.length; i++) {
            if (productListCurrent[i].id == find.id) {
                isPresent = true;
                index = i;
            };
        };
        if (isPresent == true) {
            productListCurrent[index].quantity = quantity;
        }
        localStorage.setItem("currents", JSON.stringify(productListCurrent));
        renderCart(productListCurrent);
    }, 50);
}
const remove = (id) => {

    const find = items.find(item => item.id === id);
    const productListCurrent = JSON.parse(localStorage.getItem('currents')) || [];
    let isPresent = false;
    let index = null;
    for (let i = 0; i < productListCurrent.length; i++) {
        if (productListCurrent[i].id == find.id) {
            isPresent = true;
            index = i;
        };
    };
    if (isPresent == true) {
        productListCurrent.splice(index, 1);
    }
    localStorage.setItem("currents", JSON.stringify(productListCurrent));
    renderCart(productListCurrent);
}
const remove1 = (id) => {
    console.log(id);
    const find = items.find(item => item.id === id);
    const productListCurrent = JSON.parse(localStorage.getItem('currents')) || [];
    let isPresent = false;
    let index = null;
    for (let i = 0; i < productListCurrent.length; i++) {
        if (productListCurrent[i].id == find.id) {
            isPresent = true;
            index = i;
        };
    };
    if (isPresent == true) {
        productListCurrent.splice(index, 1);
    }
    localStorage.setItem("currents", JSON.stringify(productListCurrent));
    renderCart(productListCurrent);
}
function renderTotal(arr) {
    var allTotal = document.getElementById('all-total');
    var total = 0; // Khởi tạo biến total trước vòng lặp
    if (arr.length === 0) {
        var totalsub = '';
        allTotal.innerHTML = totalsub;
    } else {
        for (let i = 0; i < arr.length; i++) {
            const p = arr[i];
            total += p.quantity * p.price; // Cộng dồn tổng tiền

            // Gán giá trị tổng vào biến totalsub
            var totalsub = `${total.toLocaleString()} đ`;

            // Cập nhật giá trị tổng trên giao diện sau mỗi lần tính toán
            allTotal.innerHTML = totalsub;
        }
    }
    renderTotalSub(arr)
}

function renderTotalSub(arr) {
    var allTotal = document.getElementById('all-total-sub');
    var total = 0; // Khởi tạo biến total trước vòng lặp
    if (arr.length === 0) {
        var totalsub = '0 đ';
        allTotal.innerHTML = totalsub;
    } else {
        for (let i = 0; i < arr.length; i++) {
            const p = arr[i];
            total += p.quantity * p.price; // Cộng dồn tổng tiền

            // Gán giá trị tổng vào biến totalsub
            var totalsub = `${total.toLocaleString()} đ`;

            // Cập nhật giá trị tổng trên giao diện sau mỗi lần tính toán
            allTotal.innerHTML = totalsub;
        }
    }
}
function renderShop(arr) {
    const cartList = document.querySelector('.cart-list')
    cartList.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        cartList.innerHTML += `
    <!-- ngRepeat: product in products -->
                                        <li class="cart-list__item ng-scope first" ng-repeat="product in products"
                                            ng-class="{ first: $index === 0 }">
                                            <div class="item-thumb">
                                                <a href="#" title="" class="">
                                                    <img ng-src="${p.img}"
                                                        alt=""
                                                        src="${p.img}">
                                                </a>
                                            </div>
                                            <div class="item-title">
                                                <a style="color: black;" href="#" ng-bind="getTranslate(product.title)"
                                                    class="ng-binding">${p.name}</a>
                                                <div class="item-extra note ng-binding">Ice regular size </div>
                                                <!-- ngRepeat: option in product.options.extra -->
                                                <div class="item-qty">
                                                    <span class="quantity ng-binding"
                                                        data-id="613d8ff12a6dae739d7d9858b4ee04b9"
                                                        ng-bind="product.qty">${p.quantity}</span>x
                                                    <span class="price ng-binding"
                                                        ng-bind="product.price.toMoney()">${p.price.toLocaleString()} đ</span>
                                                </div>
                                            </div>
                                            <div class="item-action" ng-hide="getDone()"
                                                ng-click="delete($index, product)">
                                                <a class="btn-remove" onclick="remove(${p.id})" href="javascript:void(0)">
                                                    <i style="color: black;" class="fa fa-times"></i></a>
                                            </div>
                                        </li>
    `;
    }
    renderTotal(arr);
}


renderCart(items)
