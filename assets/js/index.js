$(function () {
    var layer=layui.layer
    getUserinfo()
    

    //退出后台主页
    $('#btnlogout').on('click', function () {
        
        layer.confirm('确认是否退出?', {icon: 3, title:'提示'}, function(index){
            //1.清除本地存储的token
            localStorage.removeItem('token')
            //2.跳转到login登陆页面
            location.href='/login.html'
            layer.close(index);
          });
    })

})
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //有权限的须在请求头中携带Authorization
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
         
            if (res.status !==0) {
                return layer.msg('获取资料失败')
            }
           
            renderAvatar(res.data)

        }
      
    })
}
//渲染用户的头像
function renderAvatar(user){
    var name = user.nickname || user.username
    $('#weluser').html('欢迎&nbsp;&nbsp;' + name)
    //渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first=name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
