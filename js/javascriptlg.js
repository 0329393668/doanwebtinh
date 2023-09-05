const form = document.querySelector('form');
var itemsJSON = localStorage.getItem('newAccount');
// Chuyển đổi chuỗi JSON thành mảng
var use = JSON.parse(itemsJSON);
if (use == null) {
    const productUse = [];
    localStorage.setItem("newAccount", JSON.stringify(productUse));
}

function createAccount(username, password) {
    const newAccount = {
        username: username,
        password: password,
    };
    const newAccounts = JSON.stringify(newAccount);
    localStorage.setItem('newAccount', newAccounts);
}

function login() {
    window.location.replace('/login.html');
}

function sign() {
    window.location.replace('/signup.html');
}
function home() {
    window.location.replace('/index.html');
}


form.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const newAccount = localStorage.getItem('newAccount');
    const data = JSON.parse(newAccount);
    if (data.username === username && data.password === password) {
        swal("Đăng nhập thành công!", "", "success");
        localStorage.setItem('currentUser', JSON.stringify({
            username,
            name: 'Đức Anh'
        }));
        setTimeout(function () {
            window.location.replace('/index.html');
        }, 1500);
    } else {
        swal("Tên đăng nhập hoặc mật khẩu không chính xác!", "", "error");
    }
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.querySelector('#username1').value;
    const password = document.querySelector('#password1').value;
    const password1 = document.querySelector('#password2').value;
    if (username.length !== 0 && password === password1 && password.length > 5) {
        createAccount(username, password);
        swal("Tài khoản đã được tạo thành công!", "", "success");
        setTimeout(function () {
            window.location.replace('/login.html');
            form.reset();
        }, 1500);
    } else if (password.length < 6) {
        swal("Mật khẩu phải có độ dài ít nhất 6 kí tự. Vui lòng thử lại!", "", "error");
    } else if (username.length === 0 || password.length === 0) {
        swal("Tên đăng nhập hoặc mật khẩu không hợp lệ. Vui lòng thử lại!", "", "error");
    } else {
        swal("Tên đăng nhập hoặc mật khẩu không hợp lệ. Vui lòng thử lại!", "", "error");
    }
});


