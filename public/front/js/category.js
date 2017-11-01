$(function () {
  // console.log(mui('.mui-scroll-wrapper'));
  var sc = mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false, //是否竖向滚动
  });
  
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function (data) {
      console.log(data);
      $('.lt_content_l ul').html(template('tpl', data));
      var id = data.rows[0].id;
      renderSecond(id);
    }
  });

  function renderSecond(id) {
    $.ajax({
      type: "get",
      url: ' /category/querySecondCategory',
      data: {id: id},
      success: function (data) {
        console.log(data);
        var html = template('tpl2', data);
        $('.lt_content_r ul').html(html);
      }
    })
  }

  $('.lt_content_l ul').on('click', 'li', function () {
    $(this).addClass('now').siblings().removeClass('now');
    var id2 = $(this).data('id');
    renderSecond(id2);
    sc[1].scrollTo(0, 0, 100);
  })

  
})