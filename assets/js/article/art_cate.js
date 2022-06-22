$(function(){


    initArtCateList()

    // 获取文章类目
    function initArtCateList(){
        $.ajax({
            type:'GET',
            url:'/my/article/cates',
            success:res=>{
                let htmlStr = template('tpl-table',res)

                $('tbody').html(htmlStr)
            }
        })
    }
    
    let indexAdd = null
    // 添加类目弹出层
    $('#btnAddCate').click(()=>{
        indexAdd=layer.open({
            type:'1',
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
          });  
    })

    // 添加类目AJAX请求
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:res=>{
                if(res.status!==0) return layui.layer.msg('添加失败')

                initArtCateList()
                layui.layer.msg('添加成功')
                layui.layer.close(indexAdd)
            }
        })
    })

    let indexEdit = null
    // 修改类目弹出层
    $('body').on('click','#btn-edit',function(){
        indexEdit=layer.open({
            type:'1',
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html()
          });  

          let id = $(this).attr('data-id')
          $.ajax({
            type:'GET',
            url:'/my/article/cates/'+id,
            success:res=>{
                console.log(res)
                layui.form.val('form-edit',res.data)
            }
          })
    })

    // 修改类目AJAX请求
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:res=>{
                if(res.status!==0) return layui.layer.msg('修改失败')

                initArtCateList()
                layui.layer.msg('修改成功')
                layui.layer.close(indexEdit)
            }
        })
    })

    // 删除类目
    let index = null
    $('body').on('click','#btn-delete',function(){
        let id = $(this).attr('data-id')
        layer.confirm('确认删除此分类？', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                type:'GET',
                url:'/my/article/deletecate/' + id,
                success:res=>{
                    if(res.status!==0) return layui.layer.msg('删除失败')

                    layui.layer.msg('删除成功')
                    layer.close(index)
                    initArtCateList()
                }
            })
            
          });
    })
})