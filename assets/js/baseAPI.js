// 每次调用ajax的时候，会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(options){
    options.url = 'http://big-event-api-t.itheima.net' + options.url
    console.log(options.url)
})