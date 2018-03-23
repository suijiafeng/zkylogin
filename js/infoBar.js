/* infoBar 1.0
   By: Alex Barberis
   Created on 3.11.2009 */

function showInfoBar(caption,type){
  hideInfoBar();
  $("#msg").css("display","");
  var imgUrl;
  if(type){
    imgUrl="http://mypic.ifeng.com/static/images/right.gif";
  } else {
    imgUrl="http://mypic.ifeng.com/static/images/wrong.gif";
  }
  var caption = '<img src="'+imgUrl+'" width="13" height="13"/>'+'&nbsp;'+caption;
  $(document.body).append("<div id=infoBar><table width=100%><tr nowrap id=infoContent><td align=center>" + caption + "</td></tr></table></div>");
  $("#infoClose").click(hideInfoBar);
  $("#infoClose").css("border-color","#ffffff");
  $("#infoClose").css("border","7");
  $("#infoClose").css("cursor","hand");
  $("#infoBar").hide();
  $("#infoContent").css("font-weight","bold");
  $("#infoContent").css("font","14px Arial,Verdana,sans-serif;");
  $("#infoContent").css("color","#022017");
  $("#infoBar").css("background","#FFFADC");
  $("#infoBar").css("line-height","30px");
  $("#infoBar").css("text-align","center");
  $("#infoBar").css("margin","2px 0 15px");
  $("#infoBar").css("border","1px solid #FAF3CA");
  $("#infoBar").css("position","absolute");

    $(window).resize(info_position);
    $(window).scroll(info_position);
  info_position();
  $('html,body').animate({scrollTop: '0px'}, 0);
  $("#infoBar").slideDown(400); //i like sliding in more than fade in this case. i think it catches the users attention more effectively
  //$("#infoBar").fadeIn(800); //if you like this more remark the previous line

}

function hideInfoBar(){
  $("#infoBar").fadeOut(400);
  $("#infoBar").remove();
}

function info_position() {
  $(".mesBox").css("padding-top","0");
  $("#infoBar").css("left",$("#msg").offset().left); 
  $("#infoBar").css("top",$("#msg").offset().top); 
  $("#infoContent").css("height","35px");
  $("#infoBar").css("width","777px");
  $("#infoBar").css("height","31px");
  $("#infoBar").show();
}
