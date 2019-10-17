
//ajax数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {
        var html = template('usersTpl', { data: res })
        $('#usersBox').html(html)
    }
})
//当表单发生提交行为时
$('#userForm').on('submit', function () {
    //serialize()获取表单元素
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function (res) {
            location.reload()//刷新当前页面
        }
    })
    return false;//兼容性最强的阻止默认事件
})

//上传用户头像
$('#modifyBox').on('change', '#avatar', function () {
    //this.files是用户选择到的文件
    // console.log(this.files);
    // console.log(this.files[0]);
    var fd = new FormData();
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        //固定写法
        //jq默认我们传的是一个对象，它会帮我们转换成key=value&key=value的形式
        //但是我们现在数据文件上传时 multipart/form-data数据分开传
        //告诉$ajax方法不要解析请求参数
        processData: false,
        //jq默认会添加一行代码 xhr.setRequestHeader('content-type')
        contentType: false,
        data: fd,
        success: function (res) {
            console.log(res);
            $('#hiddenImg').val(res[0].avatar);
            $('#preview').attr('src', res[0].avatar)
        }
    })

})

//通过事件委托为编辑按钮添加点击事件
$('#usersBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    //通过id获取当前这一条要编辑的信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (res) {
            var html = template('modifyTpl', res);
            $('#modifyBox').html(html);
        }
    })

})

//通过事件委托为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    //jq中自动收集表单数据
    console.log($(this).serialize())
    var id = $(this).attr('data-id');
    console.log(id);

    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: $(this).serialize(),
        success: function () {
            location.reload()
        }
    })

    return false;
})

//通过事件委托为删除按钮添加删除用户事件
$('#usersBox').on('click', '.delete', function () {
    if (confirm('确定要删除吗？')) {
        //id值
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                location.reload();
            }
        })
    }
})

//批量删除功能的实现
$('#checkAll').on('change', function () {
    var bool = $(this).prop('checked')
    //找到tbody下面所有的checkbox,给他们添加checked效果
    var checkList = $('#usersBox input[type="checkbox"]')//jq对象，把tbody中所有的input找到
    //attr,prop,css只有一个参数就是获取，两个参数就是赋值
    checkList.prop('checked', bool);
    if(bool){
        $('#deleteAll').show()
    }else{
        $('#deleteAll').hide()
    }
})
$('#usersBox').on('change', 'input[type="checkbox"]', function () {
    //只有当tbody中所有的checkbox的数量和所有打钩的checkbox数量一样，说明是全选
    if ($('#usersBox input[type="checkbox"]').length == $('#usersBox input[type="checkbox"]:checked').length) {
        $('#checkAll').prop('checked', true)
    } else {
        $('#checkAll').prop('checked', false)
    }
    if($('#usersBox input[type="checkbox"]:checked').length>0){
        $('#deleteAll').show()
    }else{
        $('#deleteAll').hide()
    }
})
$('#deleteAll').on('click',function(){
    if(confirm('确认要删除吗？')){
    //选出所有的打钩的checkbox
    var checkList = $('#usersBox input[type="checkbox"]:checked');
    var str = ""
    checkList.each(function(index,item){
        str += $(item).attr('data-id')+'-'
    //截取最后面的-
    //str用来收集所有的id，用-拼在一起
    })
    str = str.substr(0,str.length-1)
$.ajax({
    type:'delete',
    url:'/users/'+str,
    success:function(){
        location.reload();
    }
})
    }

    
})