$(function () {
    //点击了去注册账号触发的事件
    $("#login-a").on("click", function () {
        // $(".login-box").css('display', 'none')
        // $(".reg-box").css('display', 'block')
        $(".login-box").hide()
        $(".reg-box").show()
    })
    //点击了去登陆触发的事件
    $("#reg-a").on("click", function () {
       
        // $(".reg-box").css('display', 'none')
        // $(".login-box").css('display', 'block')
        $(".login-box").show()
        $(".reg-box").hide()
    })
    //正则表达式验证表单
    //从layui中获取form元素
    var form = layui.form
    var layer=layui.layer
//自定义验证规则
    form.verify({
        //[\S]表示不能为空
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验2次密码是否一致
        repwd: function (value) {
            var pwdvalue = $("#pwd").val()
            if (pwdvalue !== value) {
                return '2次密码不一致'
            }
        }
    })
    //监听注册表单的提交请求
    $("#form-reg").on("submit", function (e) {
        //阻止提交默认行为
        e.preventDefault();
        var date= { username: $("#form-reg [name=username]").val(), password: $("#form-reg [name=password]").val() }
        //发起ajax的post请求
        $.post('/api/reguser',date,function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录');
            //模拟人的点击行为
             $("#reg-a").click()
        } )
        
    })
    //监听登录提交请求
    $('#form-login').on('submit', function (e) {
        e.preventDefault()
        var data={ username:$('#form-login [name=username]').val(),password:$('#form-login [name=password]').val()}
        $.post('/api/login', data, function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('登陆失败')
            }
            layer.msg('登陆成功')
            //将登陆成功的token字符串，放到localstorages
            localStorage.setItem('token',res.token)
            //跳转到后台页面
            location.href='/index.html'
        }
        )
    })
})