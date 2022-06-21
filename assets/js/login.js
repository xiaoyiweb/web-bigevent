$(()=>{
    // 去注册按钮
    $('#link_reg').click(()=>{
        $('.login-box').hide()
        $('.reg-box').show()
    })
    
    // 去登录按钮
    $('#link_login').click(()=>{
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],

        repwd:function(value){
            let pwd = $('.reg-box [name=password]').val()
            if(pwd!==value){
                return '两次密码不一致'
            }
        }
    })
    
    // 注册请求
    $('.reg-box .layui-form').on('submit',e=>{
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data:{username:$('.reg-box [name=username]').val(),password:$('.reg-box [name=password]').val()},
            success:res=>{
                if(res.status !== 0) return layer.msg(res.message)
                
                layer.msg('注册成功,请登录')
                $('#link_login').click()
            }   
        })
    })

    // 登录请求
    $('.login-box .layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:res=>{
                if(res.status !== 0) return layer.msg('登录失败')

                // console.log(res.token)
                localStorage.setItem('token',res.token)
                layer.msg('登录成功')
                location.href = './index.html'
            }
        })
    })

})