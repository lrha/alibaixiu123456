//首先通过ajax把数据库的数据渲染到页面，这样每次事件完成时，后端的数据会通过ajax被增删改查，再通过location.reload()重新渲染前端页面，这样就能实现数据的增删改查
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
       var html = template('categoriesTpl',{data:res});
       $('#categoryBox').html(html)
    }
})

// 当分类表单发生提交行为时
 $('#addCategory').on('submit',function(){
   $.ajax({
       type:'post',
       url:'/categories',
       data:$(this).serialize(),
       success:function(){
           location.reload();
       }
   })
    return false;
 })

 //通过事件委托为编辑按钮添加点击事件
 $('#categoryBox').on('click','.edit',function(){
     //获取要修改的分类数据的id
     var id = $(this).attr('data-id');
     //编辑功能，获取当前分类数据
     $.ajax({
         type:'get',
         url:'/categories/'+id,
         success:function(res){
             console.log(res);
             var html = template('modifyCategoryTpl',res)
             $('#modifyBox').html(html);
         }
     })
 })

 //通过事件委托处理分类修改表单的数据
 $('#modifyBox').on('submit','#modifyCategory',function(){
     var id= $(this).attr('data-id');
     $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:$(this).serialize(),
        success:function(){
            location.reload();
        }
     })
     return false;
 })