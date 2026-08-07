/* Vietnam E-Visa Iteration — charts & diagrams */
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var amber = style.getPropertyValue('--amber').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var bg = style.getPropertyValue('--bg').trim();

  /* ---------- Mermaid init ---------- */
  if (window.mermaid) {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        primaryColor: bg2,
        primaryTextColor: ink,
        primaryBorderColor: rule,
        lineColor: muted,
        fontSize: '15px',
        fontFamily: "'PingFang SC','Noto Sans CJK SC','Microsoft YaHei',sans-serif"
      },
      flowchart: { curve: 'basis', padding: 16 },
      securityLevel: 'loose'
    });
  }

  /* ---------- ECharts: progress curve (5 iterations) ---------- */
  var el = document.getElementById('chart-progress');
  if (el && window.echarts) {
    var chart = echarts.init(el, null, { renderer: 'svg' });

    var stages = [
      'v1.0\n首次填写',
      'v2.0\n深夜崩溃',
      'v3.0\n支付地狱',
      'v4.0\n自动化尝试',
      'v5.0\n邮件破局'
    ];
    var progress = [40, 35, 55, 45, 100];
    var status = ['fail', 'fail', 'fail', 'detour', 'win'];
    var colorMap = { fail: accent, detour: amber, win: accent2 };
    var labels = [
      '填完付不了 · 啥都不懂',
      '心态崩了 · 凌晨搜索',
      '两家银行都付不了',
      '折返放弃 · Automa 太难',
      '支付成功 · 邮件破局'
    ];

    chart.setOption({
      animation: false,
      grid: { left: 18, right: 36, top: 60, bottom: 50, containLabel: true },
      tooltip: {
        trigger: 'axis',
        appendToBody: true,
        backgroundColor: bg2,
        borderColor: rule,
        textStyle: { color: ink, fontSize: 13 },
        formatter: function (p) {
          var i = p[0].dataIndex;
          return '<b>' + stages[i].replace('\n', ' ') + '</b><br/>完成度：' + progress[i] + '%<br/><span style="color:' + colorMap[status[i]] + '">' + labels[i] + '</span>';
        }
      },
      xAxis: {
        type: 'category',
        data: stages,
        boundaryGap: true,
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 12, lineHeight: 16, interval: 0 }
      },
      yAxis: {
        type: 'value',
        max: 110,
        min: 0,
        splitLine: { lineStyle: { color: rule, type: 'dashed' } },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' }
      },
      series: [{
        type: 'line',
        data: progress,
        smooth: true,
        symbol: 'circle',
        symbolSize: function (_, params) {
          return status[params.dataIndex] === 'win' ? 20 : 13;
        },
        itemStyle: {
          color: function (p) { return colorMap[status[p.dataIndex]]; },
          borderColor: bg2,
          borderWidth: 2
        },
        lineStyle: { color: accent, width: 3, shadowColor: 'rgba(194,59,46,0.15)', shadowBlur: 10 },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(194,59,46,0.18)' },
              { offset: 1, color: 'rgba(194,59,46,0.02)' }
            ]
          }
        },
        markLine: {
          symbol: 'none',
          silent: true,
          lineStyle: { color: accent2, type: 'dashed', width: 1.5 },
          label: { formatter: '支付成功线 100%', color: accent2, fontSize: 11, position: 'insideEndTop' },
          data: [{ yAxis: 100 }]
        },
        label: {
          show: true,
          position: 'top',
          distance: 10,
          color: function (p) { return colorMap[status[p.dataIndex]]; },
          fontSize: 13,
          fontWeight: 700,
          formatter: function (p) { return p.value + '%'; }
        }
      }]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }
})();
