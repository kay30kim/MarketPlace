const mobileMenuBtnElement = document.getElementById('mobile-menu-btn');
const mobileMenuElement = document.getElementById('mobile-menu');

function toggleMobileMenu() {
	// mobileMenuElement.style.display = 'block'
	// mobileMenuElement.classList.add or revmove
	mobileMenuElement.toggleAttribute('open');
}

mobileMenuBtnElement.addEventListener('click', toggleMobileMenu);
