$(function () {
  var currentPage = 1;
  var pageSize = 20;

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pagesize: pageSize
      },
      success: function (data) {
        // console.log(data);
        //调用artTemplate方法,第一个参数是id号,第二个参数是数据
        var html = template('tpl', data);
        $('.lt_content tbody').html(html);
        
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,//指定版本,默认版本是2,只有div,如果指定3,div中要放ul
          currentPage: currentPage,//当前的页码
          size: "small",
          totalPages: Math.ceil(data.total / pageSize),
          numberOfPages: 5, //总共显示几个页数在上边
          onPageClicked: function (event, originalEvent, type, page) {
            currentPage = page;
            render();
          }
        });
      }
    });
  }

  render();
  

  $('.myaddBtn').on('click', function () {
    $('#myModal2').modal('show');
  });
  //先进行表单验证
  var $form = $('#form');
  $form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类名不能为空",
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    e.preventDefault();
    var bv = $form.data('bootstrapValidator');
    //这个提交按钮不用点击事件,在上边表单验证的时候,其实已经进行了点击验证,下面再去验证就会重叠
    // $('.addCate').on('click', function () {

    //获取表单里的内容
    // var val = $('#myModal2 input').val();
    // console.log(val);
    $.ajax({
      type: "POST",
      url: "/category/addTopCategory",
      data: $form.serialize(),
      success: function (data) {
        // console.log(data);
        $('#myModal2').modal('hide');
        render();
        //重置表单
        bv.resetForm();
        //表单有一个reset方法,会把表单中所有的值都清空,这是js对象的方法
        $form[0].reset();
      }
    });
    //重置表单不能用 设置为空,这样的话,如果表单很多的话,就会很坑
    // val = "";
    // });


  });
  
  
})