window.selects = {};
requirejs.config({
  paths:{
   "jquery" : "js/jquery-1.10.2.min",
   "customselect":"js/customselect",
   "dateselect":"js/dateselect"
  },
  waitSeconds: 20,shim: {}});

 require(['dateselect', 'jquery' ,'customselect'], function(DateSelect, $, CustomSelect) {

     // init params
     var settings = {
         eduOptionsData: {7:'高中以下',6:'高中',1:'专科',2:'本科',3:'硕士研究生',4:'博士研究生',5:'博士以上'},
         industryOptionsData: {1:'计算机、互联网、电子商务',2:'通信',3:'专业服务（咨询、财会、法律等）',4:'金融',5:'贸易',6:'媒体、出版、文化传播',7:'医疗、生化、环保',8:'交通、能源',9:'航空航天',10:'政府、教育等事业单位',11:'农、林、牧、渔',12:'广告、设计、艺术类',13:'娱乐、休闲、服务行业',14:'其他'}
     };

    // Date cascading
    window.selects.dateSelect = new DateSelect({container: $('.js_dateContainer'), initialValue:{year:'年',month:'月',day:'日'} , dataType:'arr'} );


    //  //location cascading
    // window.selects.countrySelect = new CustomSelect( {
    //      container: $('.js_country'), 
    //      optionsData: aNationList, 
    //      selectedVal:{val: '请选择' , txtVal: '请选择'},
    //       tipOption:{ val : '请选择', txtVal: '请选择' }
    //  });

    // window.selects.provinceSelect =  new CustomSelect( {
    //      container: $('.js_province'), 
    //      optionsData: aProvinceList, 
    //      selectedVal:{val: '请选择' , txtVal: '请选择'},
    //      tipOption:{ val : '请选择', txtVal: '请选择' }
    //  } );

    // window.selects.citySelect = new CustomSelect( {
    //      container: $('.js_city'), 
    //      optionsData: oCityList['请选择'], 
    //      selectedVal:{val: '请选择' , txtVal: '请选择'},
    //      tipOption:{ val : '请选择', txtVal: '请选择' }
    //  });

    // // 根据国家选择省区
    // window.selects.countrySelect.selectCallback = function(){

    //  var countryData = [];

    //  if( typeof window.aProvinceList === 'undefined' ) return;

    //      countryData = window.aProvinceList[$.trim( window.selects.countrySelect.selectedVal.txtVal)] || []; 
    //      selects.provinceSelect.selectedVal =  { val : '请选择', txtVal: '请选择' };
    //      selects.provinceSelect.initSelectdVal();
    //      selects.provinceSelect.updateOptionsData(countryData);

    // }

    // // 根据省区选择市区
    // window.selects.provinceSelect.selectCallback = function(){

    //  var cityData = [];

    //  if( typeof window.oCityList === 'undefined' ) return;

    //      cityData = window.oCityList[$.trim( window.selects.provinceSelect.selectedVal.txtVal)] || []; 
    //      selects.citySelect.selectedVal =  { val : '请选择', txtVal: '请选择' };
    //      selects.citySelect.initSelectdVal();
    //      selects.citySelect.updateOptionsData(cityData);

    // }

    //教育程度
     window.selects.eduSelect = new CustomSelect({
     container: $('.js_edu'), 
     optionsData: settings.eduOptionsData, 
     dataType:'obj', 
     // selectedVal:{val: ( window.indexOf(settings.eduOptionsData, '高中') + 1), txtVal:'高中'} 
     selectedVal:{val: 0, txtVal:settings.eduOptionsData[0]}

    })

    //行业类别
     window.selects.industrySelect = new CustomSelect( {
         container: $('.js_industry'), 
         optionsData: settings.industryOptionsData, 
         dataType:'obj',
         // selectedVal:{val: 1, txtVal:'计算机'}
         selectedVal:{val: 0, txtVal:settings.industryOptionsData[0]}
     })  
    //性别选择
    $('.i_radio','.js_genderSelect').on('click', function(){
      $(this).hasClass('i_radio_ckd') ? $(this).removeClass('i_radio_ckd') : $(this).addClass('i_radio_ckd').siblings().removeClass('i_radio_ckd');
    });
 });