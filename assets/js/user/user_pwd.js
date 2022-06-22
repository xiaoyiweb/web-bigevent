$(function(){

    let form = layui.form

    form.verify({
        pwd:[/^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格！'],
        samePwd:value=>{
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不相同!'

            }
        },
        rePwd:value=>{
            if(value !== $('[name=newPwd]').val()){
                return '两次密码输入不一致!'
            }
        }
    })


    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:res=>{
                if(res.status !== 0) return layui.layer.msg('重置密码失败！')

                layui.layer.msg('重置密码成功！')
                $('.layui-form')[0].reset()
            }
        })
    })
})