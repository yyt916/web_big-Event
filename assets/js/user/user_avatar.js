$(function () {
      // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
    $image.cropper(options)
    
    //为上传绑定点击事件
    $('#btnchooseiamge').on('click', function () {
        $('#file').click()
    })

    //为文件选择框绑定change事件
    $('#file').on('change', function (e){
        var FileList = e.target.files
        console.log(FileList);
        if (FileList.length === 0) {
            return layui.layer.msg('请上传图片')
        }
        //1.拿到用户选择的图片
        var file = e.target.files[0]
        //2.根据选择的图片，拿到图片的URL地址
        var imageurl = URL.createObjectURL(file)
        //3.先销毁旧的裁剪区域，再设置新的图片路径，再设置新的裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imageurl)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    //位确定按钮绑定点击事件，上传图片到服务器
    $('#btnupload').on('click', function () {
        //拿到裁剪后的头像
        var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新头像失败')
                }
                layui.layer.msg('更新头像成功')
                window.parent.getUserinfo()
            }
        })
        
    })
})


