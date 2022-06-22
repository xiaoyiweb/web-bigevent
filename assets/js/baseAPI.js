// 每次调用ajax的时候，会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(options){
    options.url = 'http://big-event-api-t.itheima.net' + options.url
    // console.log(options.url)

    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization:localStorage.getItem('token') || []
        }
    }

    options.complete = res=>{
        // console.log(res)
        if(res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败！' ){
            localStorage.removeItem('token')
            location.href = './login.html'
        }
    }
 
})