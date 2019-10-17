//向服务器发送请求，获取文章列表数据
$.ajax({
    type:'get',
    url:'/posts',
    success:function(res){
        console.log(res);
       var html = template('postsTpl',res);
       console.log(html);
       
       $('#postsBox').html(html);
    }
})
function dateFormat(date){
    date = new Date(date);
    return date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日';
}

// template.defaults.imports.dateFormat = dateFormat;