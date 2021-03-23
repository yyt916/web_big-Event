$(function () {
    var form = layui.form
    var layer=layui.layer
    form.verify({
        nickname: function (value) {
            if (value > 6) {
                return '昵称长度必须在1~6之间'
            }
        }
    })


    initUserinfo()
    //初始化用户信息
    function initUserinfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                //form.val()快速为表单赋值
                form.val('form_userinfo',res.data)

            }
        })
    }

    //重置用户信息
    $('#btnreset').on('click', function (e) {
        //阻止表单默认重置行为
        e.preventDefault()
        //只需再次调用initUserinfo()函数，提交ajax请求，初始化用户信息，填充表单
        initUserinfo()
    })
    //监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            //快速获取表单中填写的数据
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                }
                layer.msg('修改用户信息成功')
                window.parent.getUserinfo()
            }
            
        })
    })
})