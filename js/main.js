const App = (() => {

  const getItems = () => document.querySelectorAll(".accordion button");

  const toggleAccordion = ev => {
    ev.stopPropagation();
    ev.preventDefault();

    const item = ev.currentTarget;
    const items = getItems();
    const itemToggle = item.getAttribute('aria-expanded');

    for (let i = 0; i < items.length; i++) {
      items[i].setAttribute('aria-expanded', 'false');
    }

    if (itemToggle === 'false') {
      item.setAttribute('aria-expanded', 'true');
    }
  };

  const initAccordion = () => {
    const items = getItems();

    items.forEach(item => item.addEventListener('click', toggleAccordion));
  };

  const initQuantifiers = () => {
    const input = document.querySelector('#qty');
    const btnminus = document.querySelector('.qtyminus');
    const btnplus = document.querySelector('.qtyplus');

    if (input !== undefined && btnminus !== undefined && btnplus !== undefined && input !== null && btnminus !== null && btnplus !== null) {

      const min = Number(input.getAttribute('min'));
      const max = Number(input.getAttribute('max'));
      const step = Number(input.getAttribute('step'));

      function qtyminus(e) {
        const current = Number(input.value);
        let newval = (current - step);
        if (newval < min) {
          newval = min;
        } else if (newval > max) {
          newval = max;
        }
        input.value = Number(newval);
        e.preventDefault();
      }

      function qtyplus(e) {
        const current = Number(input.value);
        let newval = (current + step);
        if (newval > max) newval = max;
        input.value = Number(newval);
        e.preventDefault();
      }

      btnminus.addEventListener('click', qtyminus);
      btnplus.addEventListener('click', qtyplus);
    }
  };

  const getMain = () => document.querySelector('#main__container')

  const toggleSidebar = () => {
    const $main = getMain();
    const $sidebarContainer = document.querySelector('.sidebar');
    const $sidebarItems = document.querySelectorAll('.sidebar-item');

    $main.classList.toggle('move-to-left');
    $sidebarContainer.classList.toggle('active');


    Array.prototype.forEach.call($sidebarItems, (el, i) => {
      el.classList.toggle('active');
    });
  };

  const getCart = () => document.querySelector('.cart');

  const initCart = () => {
    const $btns = document.querySelectorAll('.add-to-cart');
    const $qty = document.querySelector('#qty');
    const $cart = getCart();
    const $checkout = document.querySelector('#checkout');
    const $continue = document.querySelector('#continue');
    const $removeButton = document.querySelectorAll('.item-remove-btn');

    Array.prototype.forEach.call($btns, (el, i) => {
      el.addEventListener('click', () => {
        $cart.classList.add('add');
        $cart.querySelector('span.badge__value').innerText = $qty.value;
        setTimeout(() => {
          $cart.classList.remove('add');
        }, 1500);
      });
    });

    Array.prototype.forEach.call($removeButton, (el, i) => {
      el.addEventListener('click', (e) => {
        const $currentItem = e.currentTarget.parentNode.parentNode.parentNode;
        $currentItem.classList.add('hide-hard');
      });
    });

    $cart.addEventListener('click', toggleSidebar);
    $checkout.addEventListener('click', toggleSidebar);
    $continue.addEventListener('click', toggleSidebar);
  };

  const toggleNavigation = (e) => {
    const $main = getMain();
    const $sidebarContainer = document.querySelector('.sidebar');
    $main.classList.remove('move-to-left');
    $sidebarContainer.classList.remove('active');

    e.currentTarget.nextElementSibling.classList.toggle('active');
  }

  const initHeaderNav = () => {
    const navItem = document.querySelector('a.toggle-nav');
    navItem.addEventListener('click', toggleNavigation);
  };

  const changeImage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const activeImage = document.querySelector(".product-image .active");
    activeImage.src = e.target.src;
  };

  const initItemsGallery = () => {

    const productImages = document.querySelectorAll(".image-list img");

    productImages.forEach(image => image.addEventListener("click", changeImage));
  };

  const init = () => {
    initHeaderNav();
    initItemsGallery();
    initAccordion();
    initQuantifiers();
    initCart();
  };

  return {
    init: init
  };

})();
