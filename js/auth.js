const $toggleBtn = $('.btn_show_password');
const $passwordInput = $('#password');

const showPassword = () => {
  $passwordInput.attr('type', 'text').trigger('focus');
};

const hidePassword = () => {
  $passwordInput.attr('type', 'password').trigger('focus');
};

$toggleBtn.on('mousedown touchstart', function (e) {
  e.preventDefault(); // Prevent losing focus on mobile
  showPassword();
});

$toggleBtn.on('mouseup mouseleave touchend', function () {
  hidePassword();
});
