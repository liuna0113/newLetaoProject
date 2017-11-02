$(function () {
  // localStorage.setItem('lt_history', '["李宁","特步","鸿星尔克"]');
  //根据设置的localStorage设置下面的历史框
  // var arr = [];
  
  function getHistory() {
    var lt_history = localStorage.getItem("lt_history") || '[]';
    var arr = JSON.parse(lt_history);
// console.log(data);
    return arr;
  }
  
  function render() {
    //此处需要接收return的arr的值
    var arr = getHistory();
    $('.lt_history').html(template('tpl', {arr: arr}));
  }
  
  //渲染页面
  render();
  
  //设置"清空记录"的点击事件
  $('.lt_history').on('click', '.search_clear', function () {
    localStorage.removeItem('lt_history');
    render();
  });
  
  //点击删除 整条信息
  $('.lt_history').on('click', '.search_del', function () {
    var arr = getHistory();
    var index = $(this).data('index');
    // console.log(arr[index]);
    //删除带这个脚标的数组中的项
    arr.splice(index, 1);
    console.log(arr);
    arr = JSON.stringify(arr);
    localStorage.setItem('lt_history', arr);
    render();
  });
  
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

  
})
