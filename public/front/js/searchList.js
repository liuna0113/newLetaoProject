$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false, //是否竖向滚动
  });
  
  //得到历史信息的数组
  function getHistory() {
    var lt_history = localStorage.getItem("lt_history") || '[]';
    var arr = JSON.parse(lt_history);
// console.log(data);
    return arr;
  }
  
  //渲染页面
  function render() {
    //此处需要接收return的arr的值
    var arr = getHistory();
    $('.lt_history').html(template('tpl', {arr: arr}));
  }
  
  
  var key = tools.getObjContent("key");
  console.log(key);
  $.ajax({
    url: "/product/queryProduct",
    type: "get",
    data: {
      page: 1,
      pageSize: 5,
      proName: key
    },
    success: function (data) {
      console.log(data);
      $('.lt_product').html(template('tpl', data));
    }
  })
  
  //关键词搜索
  $('.search_btn').on('click', function () {
    var text = $('.search_text').val().trim();
    // console.log(text);
    //把数组先拿到
    // 实现在数组中查找这个text,如果有的话,删除下标较大的,把这个加到新的里面
    // 如果数组的长度超过10.删除最后一个,把这个加到第一个
    //如果没有的话就加到第一个
    console.log(text);
    var arr = getHistory();
    var num = arr.indexOf(text);
    console.log(num);
    if (num > -1) {
      arr.splice(num, 1);
      // arr.unshift(text);
    }
    if (arr.length >= 10) {
      arr.pop();
      
    }
    arr.unshift(text);
    arr = JSON.stringify(arr);
    localStorage.setItem('lt_history', arr);
    // render();
    
    location.href = "searchList.html?key=" + text;
    
  })
  
  $('.lt_nav a[data-type]').on('click', function () {
    // console.log("hehe");
    $this = $(this);
    $span = $this.find("span");
    //
    
  })
  
  
})
