const usename = document.getElementById('usename');
const currentUser = localStorage.getItem('currentUser');
const currentUserSub = JSON.parse(currentUser);

const requireAuthPaths = ["pay"];
const path = window.location.pathname.replaceAll(".html","").replaceAll("/","");
if (!currentUser) {
    if(requireAuthPaths.includes(path)) {
        window.location.replace('/login.html')
    }
} else {
    renderCart(currentUserSub);
}
function renderCart(arr) {
    usename.innerHTML = `
    <img style="width: 30px; height: 30px; border-radius: 50%; margin-right: 5px;"
                        src="https://antimatter.vn/wp-content/uploads/2022/07/hinh-anh-hoat-hinh-3d-de-thuong.jpg"
                        alt="">
    <strong>${arr.name}</strong>
         `;
}
