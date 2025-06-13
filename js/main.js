const $main = $('.main');
const $dimmed = $('.dimmed');
const $body = $('body');

// Swiper
const swiperSlider = new Swiper('.slider_wrap', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.btn_next',
    prevEl: '.btn_prev',
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

const swiperProduct = new Swiper('.product_slides', {
  slidesPerView: 'auto',
  spaceBetween: 16,
  touchReleaseOnEdges: true,
  breakpoints: {
    768: {
      spaceBetween: 24,
    },
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
});
// Swiper

// Notification
const $notification = $('.notification');
const $closeBtn = $notification.find('.btn_close');

$closeBtn.on('click', function () {
  $notification.slideUp(200); // 300ms
});
// Notification

// Automatically close menu if open when resizing to desktop
let prevIsDesktop = window.innerWidth > 768;
function handleResize() {
  const isDesktop = window.innerWidth > 768;
  const isPopupOpen = $popup.hasClass('is_show');
  const isMenuOpen = $header.hasClass('is_show');

  // Only handle when there is a change between mobile <-> desktop
  if (isDesktop !== prevIsDesktop) {
    // Close popup if open
    if (isPopupOpen) {
      $popup.removeClass('is_show');
      $dimmed.removeClass('is_show');
      $body.css('overflow', '');
    }

    // Close menu if open
    if (isMenuOpen) {
      $header.removeClass('is_show');
      $dimmed.removeClass('is_show_menu');
      $body.css('overflow', '');
      $main.css('margin', '');
    }

    // Update status for later comparison
    prevIsDesktop = isDesktop;
  }
}

// Header
const $header = $('.header');
const $menuBtn = $('.header .btn_menu');
const $closeHeaderBtn = $('.header .btn_close');

function closeMenu() {
  $header.css({
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease',
  });

  setTimeout(() => {
    $header.removeClass('is_show');
    $body.css({
      overflow: '',
      'overscroll-behavior': '',
    });
    $main.css('margin', '');
    $header.css({
      transform: '',
      transition: '',
    });
  }, 300);
  $dimmed.removeClass('is_show_menu');
}

// Open menu
$menuBtn.on('click', () => {
  $body.css({
    overflow: 'hidden',
    'overscroll-behavior': 'none',
  });
  $main.css('margin', '60px 0 0 0');
  $dimmed.addClass('is_show_menu');
  $header.addClass('is_show');
});

// Click dimmed only closes the menu if the menu is open
$dimmed.on('click', () => {
  if ($dimmed.hasClass('is_show_menu')) {
    closeMenu();
  }
});

$closeHeaderBtn.on('click', closeMenu);

// Popup cart
const $cartBtn = $('#btn_cart');
const $popup = $('.popup_wrap');
const $closePopupBtn = $('.popup_wrap > .btn_close');
const $cartItem = $('.popup_wrap .cart_item');

$cartBtn.on('click', () => {
  if ($header.hasClass('is_show')) {
    closeMenu();
  }
  $popup.addClass('is_show');
  $dimmed.addClass('is_show');
  $body.css({
    overflow: 'hidden',
    'overscroll-behavior': 'none',
  });
});

function closePopup(...elements) {
  elements.forEach(($el) => {
    $el.on('click', () => {
      $popup.removeClass('is_show');
      $dimmed.removeClass('is_show');
      $body.css({
        overflow: '',
        'overscroll-behavior': '',
      });
    });
  });
}

closePopup($dimmed, $closePopupBtn);

$cartItem.each(function () {
  const $item = $(this);
  const $btnDeleteCart = $item.find('.btn_close');

  $btnDeleteCart.on('click', () => {
    $item.css('display', 'none');
  });
});

$(window).on('resize', handleResize).trigger('resize');
