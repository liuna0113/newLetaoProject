$(function () {
  $form = $('#form');
  $form.bootstrapValidator({
    excluded: [':disabled', ':hidden', ':not(:visible)'],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          callback: {
            message: "用户名错误"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 18,
            message: "请输入6-18位密码串"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $form.serialize(),
      success: function (data) {
        if (data.success) {
          window.location.href = "index.html"
        } else {
          if (data.error == 1000) {
            bv.updataStatus('username', 'INVALID', callback)
          }
          if (data.error == 1001) {
            bv.updataStatus('password', 'INVALID', callback)
          }
        }
      }
    })
  });
  $('.reset').on('click', function () {
    bv.resetForm();
  })


})