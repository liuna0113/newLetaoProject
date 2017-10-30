$(function () {
  var currentPage = 1;
  var pageSize = 20;

  $('#paginator2').bootstrapPaginator({
    bootstrapMajorVersion: 3,//指定版本,默认版本是2,只有div,如果指定3,div中要放ul
    currentPage: currentPage,//当前的页码
    size: "small",
    totalPages: Math.ceil(data.total / pageSize),
    numberOfPages: 5, //总共显示几个页数在上边
    onPageClicked: function (event, originalEvent, type, page) {
      currentPage = page;
      $.ajax({
        url:"",
        type:"",
        data:"",
        success:function(data){
          
        }
      })
    }
  });
  
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pagesize: pageSize
      },
      success: function (data) {
        console.log(data);
        //调用artTemplate方法,第一个参数是id号,第二个参数是数据
        var html = template('tpl', data);
        $('.lt_content tbody').html(html);
        
        $('.myaddBtn').on('click', function () {
          $('#myModal2').modal('show');
        });
        $('.addCate').on('click', function () {
          var val = $('#myModal2 input').val();
          console.log(val);
          $.ajax({
            type: "POST",
            url: "/category/addTopCategory",
            data: {categoryName: val},
            success: function (data) {
              console.log(data);
              render();
              $('#myModal2').modal('hide');
            }
          });
          val = "";
        });
      }
    });
  }
  
  render();
  
  
})