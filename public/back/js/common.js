$(document).ajaxStart(function () {
  NProgress.start();
});
setTimeout(function () {
  NProgress.stop();
}, 500)