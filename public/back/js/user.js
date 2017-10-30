$(function () {
  var currentPage = 1;
  var pageSize = 8;
  
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        var html = template("tpl", data);
        $('tbody').html(html);
        
        //以下是分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,//指定版本,默认版本是2,只有div,如果指定3,div中要放ul
          currentPage: currentPage,//当前的页码
          size: "small",
          totalPages: Math.ceil(data.total / pageSize),
          numberOfPages: 5, //总共显示几个页数在上边
          onPageClicked: function (event, originalEvent, type, page) {
            // console.log(event);
            // console.log(originalEvent);
            // console.log(type);
            // console.log(page);
            currentPage = page;
            render();
          }
        });
      }
      
      
    });
  }
  
  render();
  
  
})