import { useEffect, useRef, useState } from 'react';
import CardItem from '../../../../components/cardItem';
import { createChart } from 'lightweight-charts';
import './content.scss';
function ChartContent() {
  const chartContainer = useRef(null);
  const refToolTip = useRef(null);
  const refLegend = useRef(null)
  const [seriesData, setSeriesData] = useState({
    close: "-",
    high: "-",
    low: "-",
    open: "-",
    time: "-"
  });

  useEffect(() => {
    const chart = createChart(chartContainer.current, {
      autoSize: true,
      layout: { backgroundColor: '#ffffff' },
      priceLineVisible: true,
      rightPriceScale: {
        visible: true,
        borderColor: '#cccccc',
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    const generateData = () => {
      const data = [];
      let value = 100;
      for (let i = 0; i < 30; i++) {
        const time = Math.floor((Date.now() - (29 - i) * 86400000) / 1000);
        const open = value;
        const close = open + (Math.random() - 0.5) * 10;
        const high = Math.max(open, close) + Math.random() * 5;
        const low = Math.min(open, close) - Math.random() * 5;
        const volume = Math.floor(Math.random() * 1000); // Dữ liệu volume ngẫu nhiên

        data.push({ time, open, high, low, close, volume });
        value = close;
      }
      return data;
    };

    const datatest = generateData();
    candlestickSeries.setData(datatest);
    chart.timeScale().fitContent();

    chart.subscribeCrosshairMove((param) => {
      const seriesData = param.seriesData.get(candlestickSeries);
      if (!seriesData) {
        refToolTip.current.classList.remove('visible');
        return; 
      }
      console.log(param)
      const { close, high, low, open, time } = seriesData;
      setSeriesData({
        close: close.toFixed(2),
        high: high.toFixed(2),
        low: low.toFixed(2),
        open: open.toFixed(2),
        time: new Date(time * 1000).toLocaleString(),
      });

      refToolTip.current.innerHTML = `
        <div>Time: ${new Date(time * 1000).toLocaleString()}</div>
        <div>Open: ${open.toFixed(2)}</div>
        <div>High: ${high.toFixed(2)}</div>
        <div>Low: ${low.toFixed(2)}</div>
        <div>Close: ${close.toFixed(2)}</div>
      `;
      const { x, y } = param.point;
      refToolTip.current.style.left = `${x + 30}px`; 
      refToolTip.current.style.top = `${y + 10}px`; // Thêm khoảng cách bên dưới
      refToolTip.current.classList.add('visible');
    });

    return () => chart.remove();
  }, []);

  return (
    <>
      <div className='mt-20'></div>
      <CardItem height={470} style={{ padding: 0, margin: 0 }}>
        <div ref={chartContainer} style={{ width: '100%', height: '100%', position: "relative"}  }>
          <div ref={refToolTip} className='BoxToolTip'></div>
          <div ref={refLegend}  className="BoxLegend" style={{display:"flex", position: "absolute", top: 20, left:20,zIndex: 2}}>
                <p style={{ margin: '7px 0', color: '#26a69a' }}>Close: <span style={{ color: '#000' }}>{seriesData.close}</span></p>
                <p style={{ margin: '7px 0', color: '#26a69a' }}>High: <span style={{ color: '#000' }}>{seriesData.high}</span></p>
                <p style={{ margin: '7px 0', color: '#26a69a' }}>Low: <span style={{ color: '#000' }}>{seriesData.low}</span></p>
                <p style={{ margin: '7px 0', color: '#26a69a' }}>Open: <span style={{ color: '#000' }}>{seriesData.open}</span></p>
          </div>
        </div>
      </CardItem>
    </>
  );
}

export default ChartContent;