$(function(){

    // 时间补0
    function putO(d){
         return d = d>9 ? d : '0' + d
    }
    // 定义时间过滤器
    template.defaults.imports.FormDate = function(data){
        var dt = new Date(data)

        var y = dt.getFullYear()
        var m = putO(dt.getMonth() + 1)
        var d = putO(dt.getDate())

        var hh = putO(dt.getHours())
        var mm = putO(dt.getMinutes())
        var ss = putO(dt.getSeconds())

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }

    // 定义一个请求参数
    let q = {
        pagenum:'1', //页码值，默认为1
        pagesize:'2',//每页显示多少条数据，默认为2
        cate_id:'',//文章分类的 Id
        state:''//文章的状态，可选值有：已发布、草稿
    }

    initTable()
    initCate()
    // 初始化列表
    function initTable(){
        $.ajax({
            type:'GET',
            url:'/my/article/list',
            data: q,
            success:res=>{
                if(res.status !== 0) return layui.layer.msg('获取文章列表失败！')
                
                let htmlStr = template('tpl-table',res)
                // console.log(htmlStr)
                $('tbody').html(htmlStr)
                renderPage(res.total)

            }
        })
    }

    // 初始化文章分类
    function initCate(){
        $.ajax({
            type:'GET',
            url:'/my/article/cates',
            success:res=>{
                if(res.status !== 0 ) return layui.layer.msg('获取分类数据失败')

                // console.log(res.data)
                let htmlStr = template('tpl-cate',res)
                $('[name=cate_id]').html(htmlStr)
                // console.log(htmlStr)
                layui.form.render()
            }
        })
    }

    // 筛选
    $('#form-search').on('submit',function(e){
        e.preventDefault()
        
        let cate_id = $('[name=cate_id]').val()
        let state = $('name=[state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable() 
    })
    
    var laypage = layui.laypage
    function renderPage(total){
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID
            count: total ,//数据总数，从服务端得到
            limit:q.pagesize, //每页显示几条数据
            curr:q.pagenum, //默认被选中的分页

            // obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
            // jump触发方式有两种:
            // 1.点击页码的时候
            // 2.调用laypage.render()方法触发
            jump:function(obj,first){
                // console.log(obj)
                // console.log(first)
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if(!first){
                    initTable()
                }

            },
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5,10]
          });
    }  
    
    // 删除弹出层
    let index = null
    $('body').on('click','.btnDelete',function(){
        let len = $('.btnDelete').length
        console.log(len)
        let id = $('.btnDelete').attr('data-id')
        index = layui.layer.confirm('此操作将永久删除该文章，是否继续?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                type:'GET',
                url:'/my/article/delete/' + id,
                success:res=>{
                    if(res.status !== 0 ) return layui.layer.msg('删除文章失败')

                    layui.layer.msg('删除文章成功')
                    
                    // 判断页码 （解决删除小BUG）
                    if(len === 1){
                        q.pagenum = q.pagenum === 1 ? 1:q.pagenum - 1
                    }

                    initTable()
                } 
             })
            layui.layer.close(index);
          });
    })

    // 编辑
    $('body').on('click','.btnEdit',function(){
        location.href = './art_pub.html'
        let id = $(this).attr('data-id')
        $.ajax({
            type:'GET',
            url:'/my/article/' + id,
            success:res=>{
                if(res.status !== 0 ) return layui.layer.msg('初始化文章失败')
                
                console.log(res.data)
            }
        })
    })


})