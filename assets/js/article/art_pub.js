$(function(){

    initCate()
    initEditor()
    // 文章类别AJAX
    function initCate(){
        $.ajax({
            type:'GET',
            url:'/my/article/cates',
            success:res=>{
                if(res.status !== 0) return layui.layer.msg('初始化文章类别失败')
                
                // 调用模板引擎渲染
                let htmlStr = template('tpl-cate',res)
                $('[name=cate_id]').html(htmlStr)
                layui.form.render()
            }
        })
    }


    // 1. 初始化图片裁剪器
    var $image = $('#image')
  
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    
    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 选择文件按钮
    $('#btnChooseImage').click(function(){
        $('#coverfile').click()
    })

    // 监听coverfile的change事件
    $('#coverfile').on('change',function(e){
    
        let files = e.target.files
        // 判断是否选择了文件
        if(files.length === 0) return

        var newImgURL = URL.createObjectURL(files[0])

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    let art_state = '已发布'

    $('#btnSave').click(function(){
        art_state = '草稿'

    })

    $('#form-pub').on('submit',function(e){
        e.preventDefault()

        // 创建FormData对象 $(this)[0]将JQ对象转换为DOM对象
        let fd = new FormData($(this)[0])
        fd.append('state',art_state)

        // fd.forEach(function(v,k){
        //     console.log(k,v)
        // })

        // 将裁剪后的区域输出为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
            })
            .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
             // 得到文件对象后，进行后续的操作
             fd.append('cover_img',blob)
             publishArticle(fd)
            })
    })


      //  发起AJAX请求
      function publishArticle(fd){
        $.ajax({
            type:'POST',
            url:'/my/article/add',
            data:fd,
            // 必须含有contentType和processDate属性
            contentType:false,
            processData:false,
            success:res=>{
                if(res.status !== 0 ) return layui.layer.msg('发表文章失败！')
                
                layui.layer.msg('发表文章成功！')   
                location.href = './art_list.html'

            }
        })
    }

})