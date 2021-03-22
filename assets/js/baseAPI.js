//每次调用post(),get(),ajax()前，会先调用这个函数
//拿个给ajax提供的内置对象，统一拼接请求的根路径
$.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url
    console.log(option.url);

//统一为有权限的接口设置headers请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers= {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局统一挂载complete函数
    option.complte = function (res) {
          //无论成功还是失败，都会调用complete函数
        //会拿到返回的responseJSON数据
        
            if (res.responseJSON.status !== 0 && res.responseJSON.message === '身份认证失败！') {
                //强制清空
                localStorage.removeItem('token')
                //跳转登陆页面
                location.href='/login.html'
                
            }
            
       
    }
    
})