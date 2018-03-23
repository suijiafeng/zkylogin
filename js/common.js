$(function(){
  //密码找回方式
  $(".fill_accountBox01 .way").find("a").click(function(){
    $(this).addClass("active").siblings().removeClass("active");

    var $index = $(this).index() - 1;
    $(".fill_accountBox01 .findway li").eq($index).show().siblings().hide();
    if($index == 1){
      $(".fill_accountBox01 .verification02").show();
    } else {
      $(".fill_accountBox01 .verification02").hide();
    }
  })
  //注册方式的切换
  $(".register form p.first a").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    var index = $(this).index() - 1;
    $(".register ul li").eq(index).show().siblings().hide();
  })
  //使用帮助页点击展开
  $(".problem_cont .list a").toggle(function(){
    $(this).parent().find(".sub_list").slideDown(300);
    $(this).addClass("active");
  },function(){
    $(this).parent().find(".sub_list").slideUp(300);
    $(this).removeClass("active");
  })
  //基础设置和安全设置切换
  $(".set a").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    var $this = $(this).index();
    if($this == 0){
      $(".tabs > ul > li").first().show().siblings().hide();
    }
    if($this == 2){
      $(".tabs > ul > li").last().show().siblings().hide();
    }
  })
  //兴趣图谱页中的tab选择
  $(".interest_tabs .hd_tabs li").click(function(){
    $(this).addClass("on").siblings().removeClass("on");
    var $i = $(this).index();
    $(this).parent().next().find("li").eq($i).show().siblings().hide();
  })
  //点击选择不感兴趣的标签
  $(".not_interestImg .list ul li a").click(function(){
    if(!$(this).hasClass("active")){
      $(this).addClass("active");
    }else{
      $(this).removeClass("active");
    }
  });
});

$(function(){
  //layer弹框
  //首页登录弹框
  $("#index_login").click(function(){
    layer.open({
      type:2,
      title:false,
      area:['520px', '445px'],
      content:'loginBox.html'
    });
    return false;
  });
  //第三方登录窗弹框
  $(".thirdParty_login").click(function(){
    parent.layer.open({
      type:2,
      title:false,
      area:['647px', '412px'],
      content:'third_party_loginBox.html'
    });
    return false;
  });
  $(".thirdParty_loginBox .bind").click(function(){
    parent.layer.open({
      type:2,
      title:false,
      area:['647px', '412px'],
      content:'third_party_loginBox01.html'
    });
    return false;
  });
  //修改密码的弹框
  $(".resetPsw_iframe").click(function(){
    layer.open({
      type:2,
      title:"修改密码",
      area:['599px', '341px'],
      content:'resetPsw_iframe.html'
    });
    return false;
  });
  $(".resetPsw_iframeBox .nextStep").click(function(){
    parent.layer.open({
      type:2,
      title:"修改密码",
      area:['599px', '341px'],
      content:'resetPsw_iframe_success.html'
    });
    return false;
  });
  //更换手机的弹框
  $(".replacePhone_valification_iframe").click(function(){
    layer.open({
      type:2,
      title:"更换手机",
      area:['599px', '412px'],
      content:'replacePhone_valification.html'
    });
    return false;
  });
  $(".replacePhone_valification .firstStep").click(function(){
    parent.layer.open({
      type:2,
      title:"更换手机",
      area:['599px', '482px'],
      content:'replacePhone_num.html'
    });
    return false;
  });
  $(".replacePhone_num .nextStep").click(function(){
    parent.layer.open({
      type:2,
      title:"更换手机",
      area:['599px', '412px'],
      content:'replacePhone_success.html'
    });
    return false;
  });
  $(".replacePhone_failure .backTo_valification").click(function(){
    parent.layer.open({
      type:2,
      title:"更换手机",
      area:['599px', '412px'],
      content:'replacePhone_valification.html'
    });
    return false;
  });
  //更换邮箱的弹框
  $(".replaceEmail_valification_iframe").click(function(){
    layer.open({
      type:2,
      title:"更换邮箱",
      area:['599px', '490px'],
      content:'replaceEmail_valification.html'
    });
    return false;
  });
  $(".replaceEmail_valification .Email_nextStep").click(function(){
    parent.layer.open({
      type:2,
      title:"更换邮箱",
      area:['599px', '490px'],
      content:'replaceEmail_num.html'
    });
    return false;
  });
  $(".replaceEmail_num .Email_send").click(function(){
    parent.layer.open({
      type:2,
      title:"更换邮箱",
      area:['599px', '490px'],
      content:'replaceEmail_success.html'
    });
    return false;
  });
  $(".replacePhone_failure .backToEmail_valification").click(function(){
    parent.layer.open({
      type:2,
      title:"更换手机",
      area:['599px', '490px'],
      content:'replaceEmail_valification.html'
    });
    return false;
  });
  //不感兴趣图谱的弹框
  $(".not_interest").click(function(){
    layer.open({
      type:2,
      title:false,
      area:['634px', '391px'],
      content:'not_interest.html'
    });
    return false;
  })

  //弹窗的返回，即关闭
  var index = parent.layer.getFrameIndex(window.name);
  $(".thirdParty_login").click(function(){
    parent.layer.close(index);
  });
  $(".not_interestImg .closeIcon,.not_interestImg .confirm,.not_interestImg .cancel").click(function(){
    parent.layer.close(index);
  });
  $(".thirdParty_loginBox .turnback").click(function(){
    parent.layer.close(index);
  });
  $(".replacePhone_valification .firstStep").click(function(){
    parent.layer.close(index);
  });
  $(".replacePhone_num .nextStep").click(function(){
    parent.layer.close(index);
  });
  $(".replacePhone_failure .backTo_valification").click(function(){
    parent.layer.close(index);
  });
  $(".replaceEmail_valification .Email_nextStep").click(function(){
    parent.layer.close(index);
  });
  $(".replaceEmail_num .Email_send").click(function(){
    parent.layer.close(index);
  });
  $(".replacePhone_failure .backToEmail_valification").click(function(){
    parent.layer.close(index);
  });
  $(".resetPsw_iframeBox_success a").click(function(){
    parent.layer.closeAll();
  });
  $(".replacePhone_success .turnback").click(function(){
    parent.layer.closeAll();
  });
  $(".replacePhone_failure .turnback").click(function(){
    parent.layer.closeAll();
  })
});


$(function(){
  //安全中心滚动条
  $(".registerSetting .progressBar").jQMeter({
    goal:"$100",
    raised:"$80",
    width:"437px",
    height:"11px",
    bgColor:"#d9dde1",
    barColor:"#1da609",
    displayTotal:false
  });
  //个人中心滚动条
  $(".progressBar_big").jQMeter({
    goal:"$100",
    raised:"$80",
    width:"437px",
    height:"11px",
    bgColor:"#d9dde1",
    barColor:"#1fad00",
    displayTotal:false
  });
  $(".progressBar_sm").jQMeter({
    goal:"$100",
    raised:"$80",
    width:"93px",
    height:"11px",
    bgColor:"#d9dde1",
    barColor:"#1fad00",
    displayTotal:false
  });
  //成长页滚动条
  $(".progressBar_gradeLevel").jQMeter({
    goal:"$100",
    raised:"$50",
    width:"289px",
    height:"11px",
    bgColor:"#d9dde1",
    barColor:"#2371b1",
    displayTotal:false
  });
  $(".progressBar_taskLevel").jQMeter({
    goal:"$100",
    raised:"$50",
    width:"289px",
    height:"11px",
    bgColor:"#d9dde1",
    barColor:"#2371b1",
    displayTotal:false
  });
  $(".bindPhone_success .progressBar").jQMeter({
    goal:"$100",
    raised:"$60",
    width:"532px",
    height:"11px",
    bgColor:"#d9dde1",
    barColor:"#fca534",
    displayTotal:false
  });
});




