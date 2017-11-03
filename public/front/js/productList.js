$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false, //是否竖向滚动
  });
  var productId = tools.getObjContent('productId');
  $.ajax({
    url: "/product/queryProductDetail",
    type: 'GET',
    data: {id: productId},
    success: function (data) {
      console.log(data);
      $('.mui-scroll').html(template('tpl', data));
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 200//自动轮播周期，若为0则不自动播放，默认为0；
      });
      mui(".mui-numbox").numbox();
    }
    
  })
  
})