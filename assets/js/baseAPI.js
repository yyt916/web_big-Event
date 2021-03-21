//每次调用post(),get(),ajax()前，会先调用这个函数
//拿个给ajax提供的内置对象，统一拼接请求的根路径
$.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url
    console.log(option.url);
})