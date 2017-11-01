$(function () {
  var currentPage = 1;
  var pageSize = 5;
  
  //先创建一个render函数
  function render() {
    //先渲染页面
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        // console.log(data);
        var html = template('tpl', data);
        // console.log($('.lt_content tbody'));
        $('.lt_content tbody').html(html);
        
        $('#paginator3').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(data.total / pageSize),
          numberOfPages: 3,
          onPageClicked: function (event, originalEvent, type, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  };
  render();
  $('.myaddBtn').on('click', function () {
    $('#myModal2').modal('show');
    //渲染ul中的二级分类
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (data) {
        // console.log(data);
        $('.dropdown-menu').html(template('tpl2', data));
      }
    })
  });
  $('.dropdown-menu').on('click', 'a', function () {
    $('#dropdownMenu1').text($(this).text());
    //由于上传的时候需要上传dropmenu里边的东西,但是他没有和前边创建一个联系,所以需要在这里获取一下
    
    //拿到a标签标记的categoryId值,把这个值给隐藏域
    $('#categoryId').val($(this).data("id"));
    
    //由于这里是个隐藏域,让categoryId的表单校验通过
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  });
  
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      var src = data.result.picAddr;
      $('.img img').attr('src', src);
      $('#brandLogo').val(src);
      $('#form').data('bootstrapValidator').updateStatus('brandLogo', "VALID");
    }
  });

//  表单重置
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请输入一级分类名"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请插入图片"
          }
        }
      }
    }
  })
    .on('success.form.bv', function (e) {
      e.preventDefault();
      // console.log($('#form').serialize());
      $.ajax({
        type: "post",
        url: "/category/addSecondCategory",
        data: $('#form').serialize(),
        success: function (data) {
          console.log(data);
          if (data.success) {
            // 关闭模态框, 渲染第一页, 重置表单, 手动把表单重置, 把图片的地址重置
            $('#myModal2').modal('hide');
            currentPage = 1;
            render();
            $('#form')[0].reset();
            $('#form').data('bootstrapValidator').resetForm();
            $('#dropdownMenu1').val('请选择');
            $('#brand-img').attr('src', "./images/none.png");
          }
        }
      })
    })
  
})