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
  
  //首先需要摁到启用或者禁用按钮,但是由于这个东西他不是直接就有的,所以需要用委托事件来渲染
  $('tbody').on('click', '.btn', function () {
    // console.log(1);
    $('#userModal').modal('show');
    var id = $(this).parent().data('id');
    var isDelete = $(this).parent().data('isDelete');
    // console.log(isDelete);
    isDelete = (isDelete === 1) ? 0 : 1;
    // console.log(id);
    $('.confirm_modify').off().on('click', function () {
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: id,
          isDelete: isDelete
        },
        success: function (data) {
          // console.log(data);
          if (data.success) {
            $('#userModal').modal('hide');
            render();
          }
        }
      })
    })
  })
  
  
})