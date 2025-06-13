const $toggleBtn = $('.btn_show_password');
const $passwordInput = $('#password');

$toggleBtn.on('mousedown touchstart', function (e) {
  e.preventDefault(); // Prevent losing focus on mobile
  $passwordInput.attr('type', 'text').trigger('focus');
});

$toggleBtn.on('mouseup mouseleave touchend', function () {
  $passwordInput.attr('type', 'password').trigger('focus');
});
