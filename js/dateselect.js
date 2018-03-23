/*
* @description    A date Select plugin
* @Date         2015-02-06
* @author       Nancy.C

* @how to use 


new DateSelect({

  yearMax:new Date().getFullYear(), //最大年份(默认系统时间的当年年份)
  yearMin: 1900,//最小年份
  container: $('.js_dateContainer'),  //必选 plugin dom container
  initialValue:{year:2015,month:2,day:10}, //非必选 初始化默认值
  tipOption:{ val : 0, txtVal: '请选择' } // 无默认值时候的提示值

});

*/


define('dateselect',['customselect', 'jquery'],function(CustomSelect, $){
  'use strict';
  var config = {
    yearMax : new Date().getFullYear(),
    yearMin: 1900,
    container: $('.container'),
    optionsData:[], 
    selectCallback: function(){}
  }


  function initYear(){
    var years = [];
    for (var i = config.yearMax ; i >=config.yearMin ; i--) {
      years.push(i);
    }
    return years;
  }

  function initMonth(){
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }

  function initDay(){

    var allDays = [];
    for (var ii=1;ii<=31;ii++) {
      allDays.push(ii);
    }

    return allDays;
  }


  function isLeapYear( selected ) {
    return  ( ( selected % 4 === 0 ) && ( selected % 100 !== 0 ) ) || ( selected % 400 === 0) ;
  }

  function updateDays( currentMonth, isLeapYear ) {

    var month = currentMonth || 1, days = [], ii = 1, febDays, lastDay = 28;

    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        lastDay = 31;

      break;
      case 2:
        lastDay = isLeapYear ? 29 : 28;

      break;
      case 4:
      case 6:
      case 9:
      case 11:
        lastDay = 30;

      break;
    }

    for (ii=1;ii<=lastDay;ii++) {
      days.push(ii);
    }

    return days;

  }

  function packHtmStr( arr ){
    var html = [];

    for (var i = arr.length - 1; i >= 0; i--) {

      html.push('<li>');
      html.push('   <a href="##">'+arr[i]+'</a>');
      html.push('</li>');
      
    };

    return html.join('');
  }


  function DateSelect(options){

      this.settings = $.extend({}, config, options); //params merge
      var _this = this;
      _this.selectedVal = {};

    var years = initYear(),
      months = initMonth(),
      allDays = initDay();
    if('undefined' != typeof this.settings.initialValue){

      var yearInit = { val : this.settings.initialValue.year, txtVal: this.settings.initialValue.year },
        monthInit = { val : this.settings.initialValue.month, txtVal: this.settings.initialValue.month },
        dayInit = { val : this.settings.initialValue.day, txtVal: this.settings.initialValue.day }
    }
    
    this.yearSelect = new CustomSelect({
      container: $('.js_selectYear', this.settings.container),
      optionsData:years,
      selectedVal:yearInit || undefined,
      tipOption:{ val : '年', txtVal: '年' }
    })  

    this.monthSelect = new CustomSelect({
      container: $('.js_selectMonth', this.settings.container),
      optionsData:months,
      selectedVal:monthInit || undefined,
      tipOption:{ val : '月', txtVal: '月' }
    })

    this.daySelect = new CustomSelect({
      container: $('.js_selectDay', this.settings.container),
      optionsData:allDays,
      selectedVal:dayInit || undefined,
      tipOption:{ val : '日', txtVal: '日' }
    })  

    this.selectedVal = {
      year: yearInit ? yearInit.val : 0,
      month:monthInit ? monthInit.val : 0,
      day:dayInit ? dayInit.val : 0
    }


    this.yearSelect.selectCallback = function(){

       var days = [], 
         year = parseInt(_this.yearSelect.selectedVal.val),
         currentMonth = parseInt(_this.monthSelect.selectedVal.val),
         isLeap = isLeapYear( _this.yearSelect.selectedVal.val);

       if(year === 0 || currentMonth === 0) {return ;}

       days = updateDays(currentMonth, isLeap);
      
       _this.daySelect.updateOptionsData( days );

       _this.selectedVal.year = _this.yearSelect.selectedVal.val;
    }

    this.monthSelect.selectCallback = function(){
      
       var days = [], 
         year = parseInt(_this.yearSelect.selectedVal.val),
         currentMonth = parseInt(_this.monthSelect.selectedVal.val),
         isLeap = isLeapYear( _this.yearSelect.selectedVal.val);

       if(year === 0 || currentMonth === 0) {return ;}

       days = updateDays(currentMonth, isLeap);

       _this.daySelect.updateOptionsData( days );
       
       _this.selectedVal.month = _this.monthSelect.selectedVal.val;
    }

    this.daySelect.selectCallback = function(){
       _this.selectedVal.day = _this.daySelect.selectedVal.val;
    }

  } 

  return DateSelect;
})