

const products = [
    {
        id: 683,
        img: "https://phuclong.com.vn/uploads/dish/c4692e6548c0af-65000306hngtrcarameldaxay.png",
        name: "Hồng trà caramel dừa đá xay",
        desc: "",
        quantity: 1,
        price: 70000
    },
    {
        id: 684,
        img: "https://phuclong.com.vn/uploads/dish/1fc4620223d5c3-6500030265000303hngtrsacaramel.png",
        name: "Hồng trà sữa Caramel",
        desc: "",
        quantity: 1,
        price: 55000
    },
    {
        id: 685,
        img: "https://phuclong.com.vn/uploads/dish/437b59a57e7efd-6500030465000305trlongdacaramel.png",
        name: "Trà Ô long dừa Caramel",
        desc: "",
        quantity: 1,
        price: 55000
    },
    {
        id: 687,
        img: "https://phuclong.com.vn/uploads/dish/37702760a2b2e3-65000309nhnxay.png",
        name: "Nhãn Đá Xay",
        desc: "",
        quantity: 1,
        price: 70000
    },
    {
        id: 667,
        img: "https://phuclong.com.vn/uploads/dish/a66aecd5b760eb-traolongmangcau.png",
        name: "Trà Ô Long Mãng Cầu",
        desc: "",
        quantity: 1,
        price: 50000
    },
    {
        id: 512,
        img: "https://phuclong.com.vn/uploads/dish/4d247cffb2c4d5-hngtrchanh.png",
        name: "Hồng Trà Chanh",
        desc: "Lime Black Tea",
        quantity: 1,
        price: 35000
    },
    {
        id: 132,
        img: "https://phuclong.com.vn/uploads/dish/d1cd8bafdefe9d-matchalattephclong.png",
        name: "Trà Sữa Matcha",
        desc: "Matcha Milk Tea",
        quantity: 1,
        price: 40000
    },
    {
        id: 121,
        img: "https://phuclong.com.vn/uploads/dish/a75db2931ab34c-hngtrsaphclongtrosaphclong.png",
        name: "Hồng Trà Đào Sữa",
        desc: "Peach Black Milk Tea",
        quantity: 1,
        price: 50000
    },
    {
        id: 137,
        img: "https://phuclong.com.vn/uploads/dish/64bd44180be24c-sinhtchanh.png",
        name: "Chanh Đá Xay",
        desc: "Lime Ice Blended",
        quantity: 1,
        price: 50000
    },
    {
        id: 235,
        img: "https://phuclong.com.vn/uploads/dish/5db8d7830383fe-trxanhxay.png",
        name: "Matcha Đá Xay",
        desc: "Matcha Ice Blended",
        quantity: 1,
        price: 60000
    }
];

const productsEle = document.querySelector('.product-list-item');
const modal = document.getElementById('exampleModal');
const cartList = document.querySelector('.cart-list');
const show = (id) => {
    const find = products.find(item => item.id === id);
    localStorage.setItem("current", JSON.stringify(find));
    const dataProduct = localStorage.getItem('current');
    renderProduct(find);
}

function renderUI(arr) {
    productsEle.innerHTML = '';

    if (arr.length == 0) {
        productsEle.insertAdjacentHTML(
            'afterbegin',
            '<li>Không có sản phẩm nào trong giỏ hàng</li>'
        );
        document.querySelector('.option-container').style.display = 'none';
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        productsEle.innerHTML += `
        <div class=" col-sm-6 col-md-4 col-lg-3  product-item ">
        <a class="item-wrapper">
            <img class="item-img img-responsive center-block lazy"
                data-original="${p.img}"
                alt="${p.name}"
                src="${p.img}"
                style="">

            <div class="item-info">
                <div class="item-name">${p.name}</div>

                <div class="item-desc">
                ${p.desc}
                </div>
                <div class="item-price">${p.price.toLocaleString()} đ </div>
                <!-- Test modal -->
                <button type="button" class="btn btn-default add-to-cart" data-id="${p.id}"
                    data-name="${p.name}" data-price="${p.price.toLocaleString()} " data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onclick="show(${p.id})" >Đặt hàng</button>
            </div>
        </a>
    </div>
        `;
    }
    renderShopData()
}

// Event handler for price range selection
const priceRangeSelect = document.getElementById('price-range-select');
priceRangeSelect.addEventListener('change', function () {
    const selectedOption = priceRangeSelect.value;
    const copiedArray = [...products];
    if (selectedOption === 'asc') {
        copiedArray.sort(function (a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
        });
    } else if (selectedOption === 'desc') {
        copiedArray.sort(function (a, b) {
            return parseFloat(b.price) - parseFloat(a.price);
        });
    } else if (selectedOption === '') {
        renderUI(products);
    }
    renderUI(copiedArray);
});

const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search-term');
searchButton.addEventListener('click', function (event) {
    const keyword = searchInput.value.trim().toLowerCase();
    if (keyword === '') {
        renderUI(products);
    } else {
        const filteredProducts = products.filter(function (product) {
            const productName = product.name.toLowerCase();
            return productName.includes(keyword);
        });


        renderUI(filteredProducts);
    }
    searchInput.value = '';
});
function renderShopData() {
    var itemsJSON = localStorage.getItem('currents');
    var items = JSON.parse(itemsJSON);
    renderShop(items);
}
function renderTotal(arr) {
    var allTotal = document.getElementById('all-total');
    var total = 0;
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
function renderProduct(product) {
    modal.innerHTML = `
        <div class="modal-dialog">
                        <div class="modal-content" ng-show="isTab(1)">
                            <div class="modal-body product-modal">
                                <button style="float: right;position: absolute;right: 12px;" type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                                <div class="row">
                                    <div class="col-md-5">
                                        <img style="display: block;
                                        max-width: 80%;
                                        height: auto;" class="item-img img-responsive center-block"
                                            ng-src="${product.img}"
                                            src="${product.img}">
    
                                        <div class="item-price ng-binding"> ${product.price.toLocaleString()} đ </div>
                                    </div>
                                    <div class="col-md-7" style="padding-top: 40px;">
                                        <div class="item-info">
                                            <div
                                                class="item-info__name hidden-xs hidden-sm visible-md visible-lg ng-binding">
                                                ${product.name}
                                            </div>
                                            <div class="item-info__excerpt ng-binding">
                                                ${product.desc}
                                            </div>                                       
                                            <div class="item-info__size ng-scope" ng-if="productSizes.length > 0">
                                                <label for="size">Kích cỡ</label>
                                                <ul class="list-inline">
                                                    <!-- ngRepeat: size in productSizes --><!-- ngIf: size.price >= 0 -->
                                                    <li ng-if="size.price >= 0" ng-repeat="size in productSizes"
                                                        ng-class="{active : productSize === size }"
                                                        ng-click="changeSize(size)" class="ng-scope active">
                                                        <a href="javascript:void(0);" class="ng-binding">Ice regular size
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="item-info__quantity">
                                                <label for="qty">Số lượng</label>
    
                                                <div class="add-item" style="display: flex;">
                                                <span class="change-qty decrease"
                                                    >-</span>
                                                <span class="quantity" id="quantity-modal">1</span>
                                                <span class="change-qty increase"
                                                    >+</span>
                                            </div>
    
                                            </div>
                                            <div class="item-info__price">
                                                <label for="">Giá</label>
                                                <div class="color-primary ng-binding"> ${product.price.toLocaleString()} đ </div>
                                            </div>
                                        </div>
                                        <div class="product-action">
                                            <button id="add-to-cart-dh" class="btn btn-default add-to-cart single" data-id="${product.id}"
                                            data-bs-dismiss="modal" >Đặt hàng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
    var quantityElement = document.querySelector('.quantity');
    var decrease = document.querySelector('.decrease');
    var increase = document.querySelector('.increase');
    var currentQuantity = 1;

    decrease.addEventListener('click', function () {
        if (currentQuantity > 1) {
            currentQuantity--;
            quantityElement.textContent = currentQuantity;
            const quantityLabel = document.getElementById("quantity-modal");
            quantityLabel.innerText = quantityElement.textContent
            updatePrice(quantityElement.textContent);
        }
    })

    increase.addEventListener('click', function () {
        currentQuantity++;
        quantityElement.textContent = currentQuantity;
        const quantityLabel = document.getElementById("quantity-modal");
        quantityLabel.innerText = quantityElement.textContent
        updatePrice(quantityElement.textContent);
    })

    const button = document.getElementById('add-to-cart-dh');
    button.addEventListener('click', function () {
        var storedObject = localStorage.getItem('current');
        var retrievedObject = JSON.parse(storedObject);
        retrievedObject.quantity = currentQuantity;
        // Lưu trữ chuỗi JSON vào localStorage
        const productListCurrent = JSON.parse(localStorage.getItem('currents')) || [];
        if (productListCurrent.length == 0) {
            productListCurrent.push(retrievedObject)
        } else {
            let isPresent = false;
            let index = null;
            for (let i = 0; i < productListCurrent.length; i++) {
                if (productListCurrent[i].id == retrievedObject.id) {
                    isPresent = true;
                    index = i;
                };
            };
            if (isPresent == true) {
                productListCurrent[index].quantity += currentQuantity;
            } else {
                productListCurrent.push(retrievedObject)
            }
        }
        localStorage.setItem("currents", JSON.stringify(productListCurrent));
        // modal.style.display = 'none';
        renderShopData()
    });

}

function updatePrice(quantity) {
    var priceElement = document.querySelector('.item-info__price .ng-binding');
    var storedObject = localStorage.getItem('current');
    var retrievedObject = JSON.parse(storedObject);
    var price = retrievedObject.price
    var totalPrice = price * quantity;
    priceElement.textContent = totalPrice.toLocaleString() + ' đ';
}



const remove = (id) => {
    var itemsJSON = localStorage.getItem('currents');
    // Chuyển đổi chuỗi JSON thành mảng
    var items = JSON.parse(itemsJSON);
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
    renderShop(productListCurrent)
}

renderUI(products);


