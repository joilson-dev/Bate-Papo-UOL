export function menu() {
    const menuRight = document.querySelector('.container-menu');
    if (menuRight.style.display === 'flex') {
        menuRight.style.display = 'none';
    } else {
        menuRight.style.display = 'flex';
    }
}
