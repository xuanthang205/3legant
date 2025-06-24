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

const swiperProductCard = new Swiper('.product_slides', {
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

// 01 Product Slider
const images = ['../images/product_page/img_product01.png', '../images/product_page/img_product02.png', '../images/product_page/img_product03.png', '../images/product_page/img_product04.png'];

function updateThumbnails(swiperElement) {
  const $thumbList = $('.product_thumb_list');
  const currentIndex = swiperElement.realIndex;

  $thumbList.empty(); // Delete old content

  // Get 3 other photos than the active photo
  const thumbIndexes = images
    .map((img, i) => i)
    .filter((i) => i !== currentIndex)
    .slice(0, 3);

  // Create HTML
  thumbIndexes.forEach((imgIndex) => {
    const $li = $('<li>').addClass('product_thumb_item');
    const $img = $('<img>').addClass('img').attr('src', images[imgIndex]).attr('alt', `thumb ${imgIndex}`).prop('draggable', false);

    $li.append($img);
    $li.on('click', function () {
      swiperElement.slideToLoop(imgIndex);
    });

    $thumbList.append($li);
  });
}

const swiperProductSlide = new Swiper('.product_area .product_slide_wrap', {
  loop: true,
  navigation: {
    nextEl: '.btn_next',
    prevEl: '.btn_prev',
  },
  on: {
    init: function () {
      updateThumbnails(this); // this = Swiper instance
    },
    slideChange: function () {
      updateThumbnails(this);
    },
  },
});
// 01 Product Slider

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
    if (!$('.popup_wrap').hasClass('is_show')) {
      $body.css({
        overflow: '',
        'overscroll-behavior': '',
      });
    }
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
  const $btnDeleteCart = $item.find('.btn_remove');

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
      $('.countdown_value').text('00');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    $('#days').text(String(days).padStart(2, '0'));
    $('#hours').text(String(hours).padStart(2, '0'));
    $('#minutes').text(String(minutes).padStart(2, '0'));
    $('#seconds').text(String(seconds).padStart(2, '0'));
  }, 1000);
}

function createNewEndTime() {
  const now = new Date();
  now.setDate(now.getDate() + 2); // +2 days
  now.setHours(now.getHours() + 12); // +12 hours
  now.setMinutes(now.getMinutes() + 45); // +45 minutes
  now.setSeconds(now.getSeconds() + 5); // +5 seconds
  return now.getTime();
}

$(document).ready(function () {
  let savedEndTime = localStorage.getItem('countdown_end');

  if (!savedEndTime || parseInt(savedEndTime) < Date.now()) {
    // If not available or expired → create new
    savedEndTime = createNewEndTime();
    localStorage.setItem('countdown_end', savedEndTime);
  }

  startCountdown(parseInt(savedEndTime));
});
// Countdown

// Choose product color
$(document).ready(function () {
  $('.color_item').on('click', function () {
    $('.color_item').removeClass('is_active');
    $(this).addClass('is_active');
    // Get color from data-color and update <p class="color">
    const selectedColor = $(this).data('color');
    $('.color').text(selectedColor);
  });
});

// Btn quantity
$(document).on('click', '.btn_plus', function () {
  const $wrap = $(this).closest('.btn_quantity');
  const $qty = $wrap.find('.quantity');
  let current = parseInt($qty.text());

  $qty.text(current + 1);
});

$(document).on('click', '.btn_minus', function () {
  const $wrap = $(this).closest('.btn_quantity');
  const $qty = $wrap.find('.quantity');
  let current = parseInt($qty.text());

  if (current > 1) {
    $qty.text(current - 1);
  }
});

// Select
$(function () {
  // Initialize each custom select block independently
  $('.select').each(function () {
    const $select = $(this);
    const $btn = $select.find('.btn_option'); // The button that shows the selected value
    const $menu = $select.find('.select_option'); // The dropdown list container
    const $items = $select.find('.select_item'); // All selectable items

    // If there's an item marked active in HTML, set its text on the button
    const $active = $select.find('.select_item.is_active');
    if ($active.length) {
      $btn.text($active.find('.select_link').text());
    }

    // Toggle dropdown visibility when clicking the button
    $btn.on('click', function (e) {
      e.stopPropagation(); // Prevent click from bubbling up to document
      $btn.toggleClass('is_show'); // Toggle button open state
      $menu.toggleClass('is_show'); // Toggle dropdown open state
    });

    // Handle clicking on an item in the dropdown
    $items.on('click', function (e) {
      e.preventDefault(); // Prevent link navigation
      const $this = $(this);

      // Remove existing active state and mark this item active
      $select.find('.select_item.is_active').removeClass('is_active');
      $this.addClass('is_active');

      // Update button text to match selected item and close dropdown
      $btn.text($this.find('.select_link').text());
      $btn.removeClass('is_show');
      $menu.removeClass('is_show');
    });
  });

  // Clicking anywhere outside a select will close all dropdowns
  $(document).on('click', function () {
    $('.btn_option, .select_option').removeClass('is_show');
  });

  // Close dropdowns when resizing wider than mobile breakpoint
  $(window).on('resize', function () {
    if ($(window).width() > 768) {
      $('.btn_option, .select_option').removeClass('is_show');
    }
  });
});

// Select

// Emoji
$(document).ready(function () {
  $('.emoji_wrap').each(function () {
    const $wrap = $(this);
    const $btn = $wrap.find('.btn_emoji');
    const $popup = $wrap.find('.emoji_popup');
    let holdTimer = null;
    let popupShown = false;
    let holdStarted = false;
    let currentEmoji = null;

    function startHold(e) {
      e.preventDefault(); // Default action (can select text or scroll)
      holdStarted = true;
      popupShown = false;

      holdTimer = setTimeout(() => {
        $popup.css('display', 'flex');
        popupShown = true;
      }, 300);
    }

    function endHold(e) {
      clearTimeout(holdTimer);
      if (!holdStarted) return;
      holdStarted = false;

      // Get finger/click coordinates: use changedTouches for mobile, or e (mouse)
      const touch = e.changedTouches ? e.changedTouches[0] : e;
      const x = touch.clientX;
      const y = touch.clientY;
      const $target = $(document.elementFromPoint(x, y)); // Find the element just below the touch point

      // If the popup is open, select the emoji at the finger position
      if (popupShown) {
        $popup.hide();
        popupShown = false;
        $popup.find('.emoji').removeClass('is_hover');

        if ($target.hasClass('emoji')) {
          const label = $target.data('label');
          const src = $target.attr('src');

          if (label === currentEmoji) {
            $btn.text('Like');
            currentEmoji = null;
          } else {
            $btn.html(`<img src="${src}" alt="${label}" class="emoji">`);
            currentEmoji = label;
          }
        }
        return;
      }

      // If you quickly click on the emoji button itself
      if ($target.closest('.btn_emoji')[0] === $btn[0]) {
        if (currentEmoji !== null) {
          $btn.text('Like');
          currentEmoji = null;
        } else {
          const $likeEmoji = $popup.find('.emoji[data-label="Like"]');
          const src = $likeEmoji.attr('src');
          $btn.html(`<img src="${src}" alt="Like" class="emoji">`);
          currentEmoji = 'Like';
        }
      }
    }

    // Touch move → hover emoji on mobile
    $(document).on('touchmove', function (e) {
      if (!popupShown) return;

      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      const $target = $(document.elementFromPoint(x, y));

      $popup.find('.emoji').removeClass('is_hover');
      if ($target.hasClass('emoji')) {
        $target.addClass('is_hover');
      }
    });

    // Assign event to each emoji_wrap
    $btn.on('mousedown touchstart', startHold);
    $(document).on('mouseup touchend', endHold);
  });
});
// Emoji

// Change tab
$(document).ready(function () {
  const $menuItems = $('.tabs .menu .menu_item'); // PC tab
  const $tabContents = $('.tab_content_wrap');
  const $tabHeaders = $('.tab_content_wrap .menu_item'); // Mobile tab

  let wasMobile = window.innerWidth <= 768;
  let lastActiveIndex = -1;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function resetAllTabs() {
    $tabContents.removeClass('is_active');
    $menuItems.removeClass('is_active');
    $tabHeaders.removeClass('is_active');

    if (isMobile()) {
      $tabContents.find('.tab_content').stop(true, true).slideUp(300);
    } else {
      $tabContents.find('.tab_content').hide();
    }
  }

  function activateTab(index) {
    lastActiveIndex = index;
    $tabContents.eq(index).addClass('is_active');

    if (isMobile()) {
      $tabHeaders.eq(index).addClass('is_active');
      $tabContents.eq(index).find('.tab_content').stop(true, true).slideDown(300);
    } else {
      $menuItems.eq(index).addClass('is_active');
      $tabContents.eq(index).find('.tab_content').show();
    }
  }

  // PC: click menu item
  $menuItems.each(function (index) {
    $(this).on('click', function () {
      if (!isMobile()) {
        resetAllTabs();
        activateTab(index);
      }
    });
  });

  // Mobile: click item in content
  $tabHeaders.each(function () {
    $(this).on('click', function () {
      if (isMobile()) {
        const $wrap = $(this).closest('.tab_content_wrap');
        const $content = $wrap.find('.tab_content');
        const index = $tabContents.index($wrap);

        if ($content.is(':visible')) {
          $(this).removeClass('is_active');
          $wrap.removeClass('is_active');
          $content.stop(true, true).slideUp(300);
          lastActiveIndex = -1;
        } else {
          resetAllTabs();
          activateTab(index);
          setTimeout(() => {
            $wrap[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 310);
        }
      }
    });
  });

  function adjustOnResize() {
    const nowMobile = isMobile();

    if (nowMobile && !wasMobile) {
      // PC → mobile: hide all
      resetAllTabs();
    }

    if (!nowMobile && wasMobile) {
      // Mobile → PC: active tab (if any)
      resetAllTabs();
      if (lastActiveIndex !== -1) {
        activateTab(lastActiveIndex);
      } else {
        activateTab(0);
      }
    }

    // Toggle the interface
    if (nowMobile) {
      $menuItems.parent().hide();
      $tabHeaders.show();
    } else {
      $menuItems.parent().show();
      $tabHeaders.hide();
    }

    wasMobile = nowMobile;
  }

  $(window).on('resize', adjustOnResize);
  adjustOnResize();
});
// Change tab

// Load comment
$(document).ready(function () {
  const $comments = $('.comments .comment_box');
  const $btnMore = $('.comments + .btn_more');
  const maxToShow = 5;
  let isExpanded = false;

  function collapseComments() {
    $comments.each(function (i) {
      if (i < maxToShow) {
        $(this).stop(true, true).slideDown(300);
      } else {
        $(this).stop(true, true).slideUp(300);
      }
    });
    $btnMore.text('Load more');
    isExpanded = false;
  }

  function expandComments() {
    $comments.stop(true, true).slideDown(300);
    $btnMore.text('Collapse');
    isExpanded = true;
  }

  // Initial setup
  if ($comments.length > maxToShow) {
    collapseComments();
    $btnMore.show();
  } else {
    $btnMore.hide();
  }

  $btnMore.on('click', function () {
    if (isExpanded) {
      collapseComments();
    } else {
      expandComments();
    }
  });
});
// Load comment

// Shop sidebar
$(function () {
  $('.sidebar_list').on('click', '.sidebar_item', function () {
    // Get the correct parent list
    const $list = $(this).closest('.sidebar_list');
    // Remove active only in that list
    $list.find('.sidebar_item').removeClass('is_active');
    // Add active to the item just clicked
    $(this).addClass('is_active');
  });
});
// Shop sidebar

// Shop change layout
$(function () {
  const $prodArea = $('.product_card_area');
  const BREAKPOINT = 768;

  $('.btn_layout_wrap').each(function () {
    const $wrap = $(this);
    const $buttons = $wrap.find('.btn_layout');
    const $shop = $wrap.closest('.shop_area');
    const isToolbar = $buttons.length === 4;
    // save initial index and will be updated every time the mouse is clicked on the screen
    const initialIdx = $buttons.index($buttons.filter('.is_active'));
    let currentIdx = initialIdx;

    // Update only product_area
    function updateProduct(idx) {
      const cls = isToolbar ? ['', 'is_large', 'is_vertical', 'is_horizontal'][idx] : ['is_vertical', 'is_horizontal'][idx];
      $prodArea.removeClass('is_large is_vertical is_horizontal').toggleClass(cls, !!cls);
    }

    // When clicked on desktop: active + update shop_area + product_area
    function applyClick($btn) {
      const idx = $buttons.index($btn);
      currentIdx = idx;

      $buttons.removeClass('is_active');
      $btn.addClass('is_active');

      updateProduct(idx);

      if (isToolbar) {
        if (idx === 0) $shop.removeClass('is_change');
        else $shop.addClass('is_change');
      }
    }

    // When switching to mobile: map from currentIdx → mobileIdx
    function applyMobile() {
      const mobileIdx = isToolbar ? (currentIdx < 2 ? 2 : currentIdx) : 0; // sidebar always maps to idx0 (vertical)

      $buttons.removeClass('is_active').eq(mobileIdx).addClass('is_active');
      updateProduct(mobileIdx);
      // Do not touch shop_area.is_change here
    }

    // Initialize with available HTML
    if (initialIdx >= 0) {
      applyClick($buttons.eq(initialIdx));
    }

    // Handle clicks
    $buttons.on('click', function (e) {
      e.preventDefault();
      applyClick($(this));
    });

    // Change mode when crossing breakpoint
    let mode = $(window).width() < BREAKPOINT ? 'mobile' : 'desktop';
    if (mode === 'mobile') applyMobile();

    $(window).on('resize', function () {
      const newMode = $(this).width() < BREAKPOINT ? 'mobile' : 'desktop';
      if (newMode === mode) return;
      mode = newMode;
      if (mode === 'mobile') applyMobile();
      else applyClick($buttons.eq(currentIdx));
    });
  });
});
