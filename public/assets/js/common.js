$('#logout').on('click',function(){
  var isConfirm = confirm('真的要退出吗？')
  if(isConfirm){
    // alert('用户要退出')
    $.ajax({
      type:'post',
      url:'/logout',
      success:function(){
        location.href = 'login.html';
      },
    })
  }
})
