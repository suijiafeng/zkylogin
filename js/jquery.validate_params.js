$(function(){
  //输入框验证，这些默认是键盘按下并释放或提交表单时触发
  $(".loginBox_form, .fill_accountBox, .fill_accountBox02, .bindEmail_validate, .resetPsw_form, .replacePhone_form, .replacePhone_num_form, .setPsw_form, .register_form, .resetPsw_iframeBox_form, .third_party_loginBox_form, .bingPhone_form").validate({
    rules:{
      username:{
        required:true,
        minlength:2
      },
      password:{
        required:true,
        minlength:5
      },
      confirm_password:{
        required:true,
        minlength:5,
        equalTo:"#password"
      },
      email:{
        required:true,
        email:true
      },
      verification:{
        required:true
      }
    },
    messages:{
      username:{
        required:"请输入您的用户名",
        minlength:"用户名至少由两个字母组成"
      },
      password:{
        required:"请输入密码",
        minlength:"密码长度不能小于5个字母"
      },
      confirm_password:{
        required:"请输入密码",
        minlength:"密码长度不能小于5个字母",
        equalTo:"两次密码输入不一致"
      },
      email:"请输入一个正确的邮箱",
      verification:"请输入验证码"
    }
  });
  //以下是没有提交表单submit按钮，所以设置鼠标离开时触发
  //手机号码
  $(".phone").blur(function(){
    var regu = /^[1][3][0-9]{9}$/;
    var re = new RegExp(regu);
    if(!re.test($(this).val())){
      $(this).nextAll(".msg").show().text("请输入11位手机号码");
    }else{
      $(this).nextAll(".msg").hide();
    }
  });
  //验证码
  $(".verification").blur(function(){
    var regu = /^[^\s?<>\'\"!@%#$~&*():;]*$\S/;
    var re = new RegExp(regu);
    if(!re.test($(this).val())){
      $(this).nextAll(".msg").show().text("请输入验证码");
    }else{
      $(this).nextAll(".msg").hide();
    }
  });
  // 邮箱
  $(".email").blur(function(event) {
    var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    var re = new RegExp(emailReg);
    if (!re.test($(this).val())) {
        $(this).next('.msg').show().text('请输入正确的邮箱！');
    }else{
        $(this).next('.msg').hide();
    }
  });
})