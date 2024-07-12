import { menu } from './dom.js';


document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    menuButton.addEventListener('click', function () {
        menu();
    });

    const containerMenu = document.querySelector('.background');
    containerMenu.addEventListener('click', function () {
        menu();
    });

});
