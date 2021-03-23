$(function () {
    var form = layui.form
    var layer=layui.layer
    form.verify({
      //[\S]表示不能为空
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //检测新旧密码是否详细
        samepwd: function (value) {
            var oldpwdvalue = $('#oldpwd').val()
            if (oldpwdvalue === value) {
                return '与原密码相同，请重新输入'
            }
        },
      //校验2次密码是否一致
      repwd: function (value) {
          var newpwdvalue = $("#newpwd").val()
          if (newpwdvalue !== value) {
              return '2次密码不一致'
          }
      }
    
    })
    //监听密码修改的表单提交时间
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改秘密失败，请重试')
                }
                layer.msg('修改密码成功')
                //重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})