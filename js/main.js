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

const images = [
  "../images/product_page/img_product_page_01.png",
  "../images/product_page/img_product_page_05.png",
  "../images/product_page/img_product_page_03.png",
  "../images/product_page/img_product_page_02.png"
];

function updateThumbnails(swiperElement) {
  const $thumbList = $(".product_thumb_list");
  const currentIndex = swiperElement.realIndex;

  $thumbList.empty(); // Delete old content

  // Get 3 other photos than the active photo
  const thumbIndexes = images
    .map((img, i) => i)
    .filter(i => i !== currentIndex)
    .slice(0, 3);

  // Create HTML
  thumbIndexes.forEach((imgIndex) => {
    const $li = $("<li>").addClass("product_thumb_item");
    const $img = $("<img>")
      .addClass("img")
      .attr("src", images[imgIndex])
      .attr("alt", `thumb ${imgIndex}`)
      .prop("draggable", false);

    $li.append($img);
    $li.on("click", function () {
      swiperElement.slideToLoop(imgIndex);
    });

    $thumbList.append($li);
  });
}

const mainSwiper = new Swiper(".product_page_area .main-swiper", {
  loop: true,
  navigation: {
    nextEl: ".btn_next",
    prevEl: ".btn_prev",
  },
  on: {
    init: function () {
      updateThumbnails(this); // this = Swiper instance
    },
    slideChange: function () {
      updateThumbnails(this);
    }
  }
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

// Countdown
function startCountdown(endTime) {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;
      // If time runs out → stop
      if (distance <= 0) {
        clearInterval(countdown);
        $(".countdown_value").text("00");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      $("#days").text(String(days).padStart(2, "0"));
      $("#hours").text(String(hours).padStart(2, "0"));
      $("#minutes").text(String(minutes).padStart(2, "0"));
      $("#seconds").text(String(seconds).padStart(2, "0"));
    }, 1000);
  }

  function createNewEndTime() {
    const now = new Date();
    now.setDate(now.getDate() + 2);        // +2 days
    now.setHours(now.getHours() + 12);     // +12 hours
    now.setMinutes(now.getMinutes() + 45); // +45 minutes
    now.setSeconds(now.getSeconds() + 5);  // +5 seconds
    return now.getTime();
  }

  $(document).ready(function () {
    let savedEndTime = localStorage.getItem("countdown_end");

    if (!savedEndTime || parseInt(savedEndTime) < Date.now()) {
      // If not available or expired → create new
      savedEndTime = createNewEndTime();
      localStorage.setItem("countdown_end", savedEndTime);
    }

    startCountdown(parseInt(savedEndTime));
  });
  // Countdown

  $(document).ready(function () {
  $(".color_item").on("click", function () {
    // 1. Bỏ class active cũ
    $(".color_item").removeClass("is_active");

    // 2. Gán class active mới
    $(this).addClass("is_active");

    // 3. Lấy màu từ data-color và cập nhật <p class="color">
    const selectedColor = $(this).data("color");
    $(".color").text(selectedColor);
  });
});

$(document).on("click", ".btn_plus", function () {
  const $wrap = $(this).closest(".btn_quantity");
  const $qty = $wrap.find(".quantity");
  let current = parseInt($qty.text());

  $qty.text(current + 1);
});

$(document).on("click", ".btn_minus", function () {
  const $wrap = $(this).closest(".btn_quantity");
  const $qty = $wrap.find(".quantity");
  let current = parseInt($qty.text());

  if (current > 1) {
    $qty.text(current - 1);
  }
});

