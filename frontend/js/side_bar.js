// Cập nhật lại hàm toggleActive
function toggleActive(element) {
    // Tìm tất cả các phần tử nav_menu
    const allNavItems = document.querySelectorAll('.nav_menu');

    // Loại bỏ lớp 'nav_menu-active' khỏi tất cả các phần tử nav_menu
    allNavItems.forEach(item => {
        item.classList.remove('nav_menu-active');
    });

    // Tìm phần tử cha gần nhất có class 'nav_menu' hoặc phần tử cha đầu tiên nếu không có
    const parentMenu = element.closest('.nav_menu');
    
    if (parentMenu) {
        // Nếu là menu thông thường có class nav_menu, thêm lớp active vào nó
        parentMenu.classList.add('nav_menu-active');
    } else {
        // Nếu là menu đặc biệt (ví dụ: đăng xuất) không có class nav_menu
        // Tìm phần tử cha đầu tiên (có thể là thẻ div không có class nav_menu)
        const parentDiv = element.parentElement;
        if (parentDiv) {
            // Thêm class nav_menu và nav_menu-active vào phần tử cha
            parentDiv.classList.add('nav_menu', 'nav_menu-active');
        }
    }
}
