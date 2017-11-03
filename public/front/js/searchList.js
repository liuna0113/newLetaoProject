$(function () {
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      indicators: false, //是否竖向滚动
    });

    //自定义一个可以对象,来传递后台接收的参数
    var data = {
      proName: "",
      brandId: "",
      price: "",
      num: "",
      page: 1,
      pageSize: 100
    };

    function render(data) {
      $.ajax({
        url: "/product/queryProduct",
        type: "get",
        data: data,
        success: function (data) {
          console.log(data);
          $('.lt_product').html(template('tpl', data));
        }
      })
    }

    var key = tools.getObjContent("key");
    $('.search_text').val(key);
    data.proName = key;
    render(data);

    $('.search_btn').on('click', function () {
      //把所有a的now样式全部清掉
      $('.lt_nav a').removeClass("now");
      $('.lt_nav span').removeClass("fa-angle-up").addClass("fa-angle-down");
      data.price = "";
      data.num = "";
      console.log(data);
      var key = $('.search_text').val().trim();
      if (key === "") {
        mui.toast('请输入搜索的内容');
      }
      $("lt_nav").html("<div class='loading'><div>");
      data.proName = key;
      render(data);
    })

    $('.lt_nav a[data-type]').on('click', function () {
      data.price = "";
      data.num = "";
      $this = $(this);
      $span = $this.find("span");
      //如果本身本来就是黄色的话,只需要切换他的span的方向
      //如果本身不是黄色的话,把自己变黄,需要切换其余的span的方向向下
      if ($this.hasClass('now')) {
        $span.toggleClass('fa-angle-down').toggleClass('fa-angle-up');
      } else {
        $this.addClass('now').siblings().removeClass('now');
        $('.lt_nav span').addClass('fa-angle-down');
      }

      //判断是哪个排序
      var type = $this.data("type");
      var value = $span.hasClass("fa-angle-down") ? 2 : 1;
      console.log(value);
      //设置num或者price,在这之前需要保证之前的清空
      data[type] = value;
      console.log(data);
      render(data);
    })
  }
)
