function login() {
    window.location.replace('/login.html');
}
function home() {
    window.location.replace('/index.html');
}
function cafe() {
    window.location.replace('/cafe.html');
}
function tea() {
    window.location.replace('/tea.html');
}
function menu() {
    window.location.replace('/menu.html');
}
function pay() {
    window.location.replace('/pay.html');
}
function cart() {
    window.location.replace('/card.html');
}
// Lấy chuỗi JSON từ localStorage
var itemsJSON = localStorage.getItem('currents');
// Chuyển đổi chuỗi JSON thành mảng
var items = JSON.parse(itemsJSON);
if (items == null) {
    const productListCurrent = [];
    localStorage.setItem("currents", JSON.stringify(productListCurrent));
    // Lấy chuỗi JSON từ localStorage
    var itemsJSON = localStorage.getItem('currents');
    // Chuyển đổi chuỗi JSON thành mảng
    var items = JSON.parse(itemsJSON);
}
const cartList = document.querySelector('.cart-list');
const boxLeft = document.getElementById('box-left_show');

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
}
function renderShop(arr) {
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
    renderShop(productListCurrent);
}

renderShop(items);
