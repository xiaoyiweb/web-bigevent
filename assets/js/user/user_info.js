$(()=>{

    let form = layui.form
    form.verify({
        nickname:function(value){
            if(value.length > 6) return '昵称必须在1~6个字符之间！'
        }
    })

    initUserInfo()

    // 获取用户信息
    function initUserInfo(){
        $.ajax({
            type:'GET',
            url:'/my/userinfo',
            success:res=>{
                if(res.status !== 0) return layui.layer.msg('获取用户信息失败')
                form.val('formUserInfo',res.data)
                console.log(res)
            }
        })
    }

    // 重置按钮
    $('#btnReset').click(e=>{
        e.preventDefault()
        initUserInfo()
    })
    
    // 修改按钮
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        // console.log($(this).serialize())
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:res=>{
                if(res.status !== 0) return layui.layer.msg('更新用户信息失败')

                layui.layer.msg('更新用户信息成功') 
                // 调用index页面的函数更新信息
                window.parent.getUserInfo()
                console.log(res)
            }
        })
    })


})





