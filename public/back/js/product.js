$(function () {
  var currentPage = 1;
  var pageSize = 4;
  
  function render() {
    $.ajax({
      url: "/product/queryProductDetailList",
      type: "GET",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        console.log(data);
        $('tbody').html(template('tpl', data));
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
  }

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
        console.log(data);
        $('.dropdown-menu').html(template('tpl2', data));
      }
    })
  });
  $('.dropdown-menu').on('click', 'a', function () {
    $('#dropdownMenu1').text($(this).text());
    //由于上传的时候需要上传dropmenu里边的东西,但是他没有和前边创建一个联系,所以需要在这里获取一下
    
    //拿到a标签标记的categoryId值,把这个值给隐藏域
    $('#brandId').val($(this).data("id"));
    
    //由于这里是个隐藏域,让categoryId的表单校验通过
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  });
  
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      // var src = data.result.picAddr;
      // $('.img img').attr('src', src);
      // $('#brandLogo').val(src);
      // $('#form').data('bootstrapValidator').updateStatus('brandLogo', "VALID");
      $('.img_box').append('<img src="' + data.result.picAddr + '" width="100" height="100">')
    }
  });
  
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          },
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "商品名称不能为空"
          },
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品的原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入现在的价格"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          },
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入尺寸范围"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入正确的格式,例如:32-55"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "商品名称不能为空"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "请填写大于0的数字"
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    e.preventDefault();
    // $.ajax({
    //   type: "post",
    //   url: "/product/addProduct",
    //   data: $('#form').serialize(),
    //   success: function (data) {
    //    
    //   }
    // })
  })
})