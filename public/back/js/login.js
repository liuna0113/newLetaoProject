$(function () {
  var $form = $('#form');
  $form.bootstrapValidator({
    //这三个值可以不加
    excluded: [':disabled', ':hidden', ':not(:visible)'],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //fields中添加这些东西用来检验是否为空
    fields: {
      username: {
        /*键名和input name值对应*/
        validators: {
          notEmpty: {
            /*非空提示*/
            message: '用户名不能为空'
          },
          callback: {
            message: "用户名错误"
          }
        }
      },
      password: {
        /*键名和input name值对应*/
        message: "密码错误",
        validators: {
          notEmpty: {
            /*非空提示*/
            message: '密码不能为空'
          },
          stringLength: {
            /*长度提示*/
            min: 6,
            max: 18,
            message: '用户名长度必须在6到18之间'
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    },
    
  }).on('success.form.bv', function (e) {
    e.preventDefault();
    
    // 得到这个事件的实例
    var bv = $form.data('bootstrapValidator');
    
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $form.serialize(),
      success: function (data) {
        // console.log(data);
        if (data.success) {
          location.href = "index.html";
        } else {
          if (data.error === 1000) {
            bv.updateStatus('username', 'INVALID', 'callback');
          }
          if (data.error === 1001) {
            bv.updateStatus('password', 'INVALID', 'callback');
          }
        }
      }
    })
  });
  
  //重置的是验证表单
  $(".reset").on("click", function () {
    bv.resetForm();
  });
});
