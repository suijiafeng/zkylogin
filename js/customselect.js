/*
* @description  CustomSelect
* @date     2015-02-06
* @author     Nancy.C
* 
* @how to use 

new CustomSelect({

  container: $('.js_dateContainer'),  //必选 plugin dom container
  selectedVal:{val:1, txtVal:'hello'}, //非必选 初始化默认值
  dataType:'arr', //数据格式非必须 默认'arr'  'obj'->{9:'北京', '4':'四川','3':'湖北'} | 'arr' -> ['北京', '四川', '湖北'] | 'orderarr' -> {1:'高中', 2:'专科',3:本科}
  optionsData:[], //select的option数据  依据情况需与dateType结合使用
  selectCallback: function(){}, //针对日期选择，城市选择等这类级联的select相当于onchange的回调一般用于改变关联select的option
  tipOption:{ val : 0, txtVal: '请选择' } // 无默认值时候的提示值

});

* @the plugin dom like
<div class="select_dft js_industry">
    <a href="##" class="select_val js_select">
        <em class="js_selectval">计算机</em>
        <span class="arr i_icon_arrow"></span>
    </a>
    <ul class="select_ul js_optionswrap" style="display: none;">
      <li data-value="0"><a href="##">请选择</a></li>
      <li data-value="1"> <a href="##">计算机  </a></li>
      <li data-value="2"> <a href="##">金融 </a></li>
      <li data-value="3"> <a href="##">贸易 </a></li>
      <li data-value="4"> <a href="##">其他 </a></li>
    </ul>
</div>

* @update 2015/03/10
* 增加默认值设置 selectedVal
* 增加提示值设置 tipOption
*
*/

define('customselect', ['jquery'], function($){

  window.indexOf = [].indexOf ?
    function(arr, item) {
      return arr.indexOf(item)
    } :
    function indexOf(arr, item) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
          return i
        }
      }
      return -1
    };

  var CustomSelect = function(options){

       var config = {optionsData:[], selectCallback: function(){}, dataType:'arr', tipOption:{ val : 0, txtVal: '请选择' } }; //dataType: arr|obj| orderarr

       this.settings = $.extend({}, config, options); //params merge

       this.selectValNode = $('.js_selectval', this.settings.container);
       this.optionWrapNode = $('.js_optionswrap', this.settings.container);
       this.selectedVal = this.settings.selectedVal; //defualt value 
       this.selectCallback = this.settings.selectCallback; //callback after select 
       this.tipOption = this.settings.tipOption; // tipOption

       this.init();
  }

  CustomSelect.prototype.init  = function (){

    this.initSelectdVal();
    this.updateOptionsData();
    this.bindDomEvent();
  } 

  CustomSelect.prototype.initSelectdVal = function( selectedVal ){
    var val =  selectedVal || this.selectedVal || this.tipOption;
    this.selectedVal = {val:val.val, txtVal:val.txtVal};

    if( typeof val !== 'undefined' && typeof val.val !== 'undefined' &&  typeof val.txtVal !== 'undefined') {

      this.selectValNode.text( val.txtVal ); 
      this.selectValNode.data('value', val);

    }else {

      this.selectValNode.text( this.tipOption.txtVal);
      this.selectValNode.data( 'value', this.tipOption.val);
    }
  }

  CustomSelect.prototype.bindDomEvent = function(){

    var container = this.settings.container,
      _this = this;

    // toggle show/hide
    container.on('click','.js_select', function( event ){

      event.stopPropagation();
      //hide other optionwrap nodes
      $('.js_optionswrap').each(function(){
        if($(this) != $('.js_optionswrap', _this.container)){
          $(this).hide();
        } 
      });


      _this.optionWrapNode.is(':hidden') ? _this.optionWrapNode.show() : _this.optionWrapNode.hide();

      // return false;
    });

    // select option
    container.on('click','.js_optionswrap li', function(event){

      event.stopPropagation();

      var val = $(this).data('value'),
        txtVal = $.trim( $('a', this).text()) ;

      _this.selectedVal = { val : val, txtVal: txtVal };

      _this.selectValNode.text( txtVal );
      _this.selectValNode.data('value', val);

      _this.optionWrapNode.hide();

      _this.selectCallback();// use for cascading 

      return false;
    });

    //hide options when click other nodes
    $(document).on('click',function(event){
      
      _this.optionWrapNode.hide();

    });
  }


  CustomSelect.prototype.updateOptionsData = function( optionsData ){
    var temp = [],
      i = 0,
      data  = optionsData || this.settings.optionsData || [],
      length = 0;

    // Object eg{9:'北京', '4':'四川','3':'湖北'}
    if(  this.settings.dataType == 'obj' ) {

      for (var item in data){
        temp.push('<li data-value="'+item+'">');
        temp.push(' <a href="##" >'+ data[item]);
        temp.push(' </a>');
        temp.push('</li>');
      }


    //Array eg ['北京', '四川', '湖北']
    } else{

      length = data.length;

      if( length === 0){
        this.optionWrapNode.html('');
        return;
      }

      for( ; i< length; i++) {

        temp.push('<li data-value="'+ ((this.settings.dataType == 'arr') ? data[i] : (i+1))+'">');
        temp.push(' <a href="##" >'+ data[i]);
        temp.push(' </a>');
        temp.push('</li>');
      }

    }

    temp.unshift('<li data-value="'+this.tipOption.val+'"><a href="##">'+this.tipOption.txtVal+'</a></li>')
    temp = temp.join('');

    this.optionWrapNode.html( temp );

  }

  return CustomSelect;

});





