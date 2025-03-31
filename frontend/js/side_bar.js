function toggleActive(element) {
    // Tìm tất cả các button trong nav_menu
    const allNavItems = document.querySelectorAll('.nav-item');
    // Loại bỏ lớp 'nav_menu-active' khỏi tất cả các button
    allNavItems.forEach(item => {
        const parentMenu = item.closest('.nav_menu');
        parentMenu.classList.remove('nav_menu-active');
    });
    
    // Thêm lớp 'nav_menu-active' cho button vừa được nhấn
    const parentMenu = element.closest('.nav_menu');
    parentMenu.classList.add('nav_menu-active');
}
