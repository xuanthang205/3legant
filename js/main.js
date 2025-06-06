const header = document.querySelector('.header');
const menuBtn = document.querySelector('.header .btn_menu');
const closeBtn = document.querySelector('.header .btn_close');
const main = document.querySelector('.main');
const dimmed = document.querySelector('.dimmed');
const body = document.body;
// Function close menu
function closeMenu() {
  Object.assign(header.style, {
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease',
  });
  setTimeout(() => {
    header.classList.remove('is_show');
    body.style.overflow = '';
    main.style.margin = '';
    Object.assign(header.style, {
      transform: 'translateX(0)',
      transition: '',
    });
  }, 300);
  dimmed.classList.remove('is_show');
}
// Function remove class is_show
function removeIsShowOnLargeScreen(...elements) {
  function handleResize() {
    if (window.innerWidth > 768) {
      elements.forEach((el) => el.classList.remove('is_show'));
      body.style.overflow = '';
      main.style.margin = '';
    }
  }
  handleResize();
  window.addEventListener('resize', handleResize);
}

menuBtn.addEventListener('click', () => {
  body.style.overflow = 'hidden';
  main.style.margin = '60px 0 0 0';
  dimmed.classList.add('is_show');
  header.classList.add('is_show');
});

closeBtn.addEventListener('click', closeMenu);
dimmed.addEventListener('click', closeMenu);
removeIsShowOnLargeScreen(header, dimmed);
