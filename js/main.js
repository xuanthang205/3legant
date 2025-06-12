// Header
const $header = $('.header');
const $menuBtn = $('.header .btn_menu');
const $closeHeaderBtn = $('.header .btn_close');
const $main = $('.main');
const $dimmed = $('.dimmed');
const $body = $('body');
// Close menu with slide effect
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
      transform: 'translateX(0)',
      transition: '',
    });
  }, 300);
  $dimmed.removeClass('is_show');
}
// Tự động đóng menu nếu đang mở khi resize lên desktop
function removeIsShowOnLargeScreen(...$elements) {
  function handleResize() {
    if (window.innerWidth > 768) {
      $elements.forEach(($el) => $el.removeClass('is_show'));
      $body.css('overflow', '');
      $main.css('margin', '');
      $header.css({
        transform: '',
        transition: '',
      });
    }
  }
  handleResize();
  $(window).on('resize', handleResize);
}
// Open menu
$menuBtn.on('click', () => {
  $body.css('overflow', 'hidden');
  $main.css('margin', '60px 0 0 0');
  $dimmed.addClass('is_show');
  $header.addClass('is_show');
});
// Close menu
$closeHeaderBtn.on('click', closeMenu);
$dimmed.on('click', closeMenu);
// Handling responsiveness
removeIsShowOnLargeScreen($header, $dimmed);
// Header

// Footer
const footerCols = document.querySelectorAll('.footer_wrap .col');

footerCols.forEach((col) => {
  const title = col.querySelector('.title');
  const list = col.querySelector('.footer_list');
  if (!title || !list) return;
  const titleText = title.textContent.trim();
  const shouldToggle = titleText === 'Page' || titleText === 'Info';
  if (shouldToggle) {
    title.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        title.classList.toggle('is_show');
        list.classList.toggle('is_show');
      }
    });
  }
});
// Use debounce to avoid calling multiple times when resizing
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.innerWidth > 768) {
      document.querySelectorAll('.footer_list.is_show, .footer_wrap .title.is_show').forEach((el) => el.classList.remove('is_show'));
    }
  }, 100); // 100ms delay to avoid lag
});
// Footer

// Notification
const $notification = $('.notification');
const $closeBtn = $notification.find('.btn_close');

$closeBtn.on('click', function () {
  $notification.slideUp(200); // 300ms
});
// Notification



