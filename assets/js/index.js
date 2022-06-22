$(function(){
    // 调用getUserInfo函数获取用户信息
    getUserInfo()

    let layer = layui.layer
    $('#btnLogout').click(()=>{
        layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空本地存储的token
            localStorage.removeItem('token')
            //跳转到login.html 
            location.href = './login.html'
            // 关闭弹出层
            layer.close(index);
          });
    })

})

// 获取信息请求
function getUserInfo(){
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || []
        // },
        success:res=>{
            if(res.status !== 0) return layui.layer.msg('获取用户信息失败')
            
            renderAvator(res.data)
        },
    })
}

function renderAvator(user){
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 渲染头像
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avator').hide()
    }else{
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avator').html(first).show()
    }
}
