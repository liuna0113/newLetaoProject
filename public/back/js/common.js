$(function () {
  $(document).ajaxStart(function () {
    NProgress.start();
  });
  
  setTimeout(function () {
    NProgress.done();
  }, 500);
  
  
  $('.cata').on('click', function () {
    $('.child').slideToggle();
  });

  $('.lt_menu').on('click', function () {
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
  });

  // $('.lt_logout').on('click', function () {
  //   $.ajax({
  //     type: "get",
  //     url: "/employee/checkRootLogin",
  //     success: function (data) {
  //       if (data.success) {
  //         window.location.href = "login.html";
  //       }
  //     }
  //   })
  // });















})