$(function () {
  //在每次要访问数据之前都传送一下$.ajax请求,但是由于login.html页面是需要直接进的,不需要验证
  if (location.href.indexOf('login.html') < 0) {
    $.ajax({
      type: "get",
      url: "/employee/checkRootLogin",
      success: function (data) {
        if (data.error === 400) {
          // alert('您尚未登录,请登录');
          window.location.href = "login.html";
        }
      }
    })
  }


  $(document).ajaxStart(function () {
    NProgress.start();
  });
  $(document).ajaxStop(function () {
    setTimeout(function () {
      NProgress.done();
    }, 500);
  });
  
  //分类管理被点击的时候 显示孩子们
  // $('.cata').on('click', function () {
  //   $('.child').slideToggle();
  // });
  
  $('.child').prev().on('click', function () {
    $(this).next().slideToggle();
  })

  //点击子分类的时候,上边的也不隐藏
  // $('.child').child.on('click', function () {
  //   // $(this).slideToggle();
  // });

  //左边栏目向左边跑
  $('.lt_menu').on('click', function () {
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
  });

  //下面的退出功能是公用的
  $('.lt_logout').on('click', function () {
    //使用$(myModal)的modal(show)方法,使modal显示出来,而不是直接用show
    $('#myModal').modal("show");
  });

  $('.confirm_logout').on('click', function () {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      success: function (data) {
        console.log(data);
        if (data.success) {
          window.location.href = "login.html";
        }
      }
    })
  })
  

})