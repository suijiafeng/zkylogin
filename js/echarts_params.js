$(function(){
  //兴趣图谱的参数和设置
  var myChart1 = echarts.init(document.getElementById('intrs_chart'));
  option = {
      legend: {
          data: ['']
      },
      radar: {
          // shape: 'circle',
          indicator: [
             { name: '娱乐', max: 6500},
             { name: '文艺', max: 16000},
             { name: '政治', max: 30000},
             { name: '军事', max: 38000},
             { name: '教育', max: 52000},
             { name: '科技', max: 25000}
          ]
      },
      series: [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          // areaStyle: {normal: {}},
          data : [
              {
                  value : [4300, 10000, 28000, 35000, 50000, 19000],
                  name : '关注度'
              }
               
          ]
      }]
  };
  myChart1.setOption(option);
  var myChart2 = echarts.init(document.getElementById('read_chart'));
  option = {
      legend: {
          data:[]
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : ['5月1日','5月2日','5月3日','5月4日','5月5日','5月6日','5月7日']
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : [{
              name:'邮件营销',
              type:'line',
              stack: '总量',
              data:[120, 132, 101, 114, 110,130, 110]
      }]
  };
  myChart2.setOption(option);
  window.onresize =  function(){
    myChart1.resize();
    myChart2.resize();
  }
})