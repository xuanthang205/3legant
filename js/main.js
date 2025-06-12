const $main = $('.main');
const $dimmed = $('.dimmed');
const $body = $('body');
// Notification
const $notification = $('.notification');
const $closeBtn = $notification.find('.btn_close');

$closeBtn.on('click', function () {
  $notification.slideUp(200); // 300ms
});
// Notification

// Header
const $header = $('.header');
const $menuBtn = $('.header .btn_menu');
const $closeHeaderBtn = $('.header .btn_close');

// Đóng menu với hiệu ứng
function closeMenu() {
  $header.css({
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease',
  });

  setTimeout(() => {
    $header.removeClass('is_show');
    $body.css('overflow', '');
    $main.css('margin', '');
    $header.css({
      transform: '',
      transition: '',
    });
  }, 300);
  $dimmed.removeClass('is_show_menu');
}

// Tự động đóng menu nếu đang mở khi resize lên desktop
function handleResize() {
  if (window.innerWidth > 768 && $header.hasClass('is_show')) {
    // closeMenu();
    $dimmed.removeClass('is_show_menu');
    $header.removeClass('is_show');
    $body.css('overflow', '');
    $main.css('margin', '');
  }
}
handleResize();
$(window).on('resize', handleResize);

// Mở menu
$menuBtn.on('click', () => {
  $body.css('overflow', 'hidden');
  $main.css('margin', '60px 0 0 0');
  $dimmed.addClass('is_show_menu');
  $header.addClass('is_show');
});

// Click dimmed chỉ đóng menu nếu đang mở menu
$dimmed.on('click', () => {
  if ($dimmed.hasClass('is_show_menu')) {
    closeMenu()
  }
});

// Nút đóng trong header
$closeHeaderBtn.on('click', closeMenu);

const $cartBtn = $('.action_item:not(.mobile_hide)');
const $popup = $('.popup_wrap');
const $closePopupBtn = $('.popup_wrap > .btn_close');

$cartBtn.on('click', () => {
  if ($header.hasClass('is_show')) {
    closeMenu();
  }
  $popup.addClass('is_show');
  $dimmed.addClass('is_show');
  $body.css('overflow', 'hidden');
});

function closePopup(...elements) {
  elements.forEach(($el) => {
    $el.on('click', () => {
      $popup.removeClass('is_show');
      $dimmed.removeClass('is_show');
      $body.css('overflow', '');
    });
  });
}

// Gọi:
closePopup($dimmed, $closePopupBtn);

