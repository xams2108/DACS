import { useEffect, useRef, useState, useMemo } from 'react';
import CardItem from '../../../../components/cardItem';
import { createChart } from 'lightweight-charts';
import getChartData from '../../../../services/api/getChartData';
import './content.scss';
import { useChartProvider } from '../../../../providers/chartProvider';

function ChartContent() {
  const chartContainer = useRef(null);
  const refToolTip = useRef(null);
  const refLegend = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [skip, setSkip] = useState(0)
  const { symbol, interval } = useChartProvider();
  const fetchData = async ({ symbol, interval,skip= 0 }) => {
    try {
      const response = await getChartData({ symbol, interval,skip });
      setChartData(prevData => [...response.data, ...prevData]);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };
  useEffect(() => {
    setChartData([]); 
    setSkip(0);
    fetchData({ symbol, interval, skip: 0 });
  }, [symbol, interval]); 
  useEffect(() => {
    if (skip > 0) {
      fetchData({ symbol, interval, skip });
    }
  }, [skip]);
  const transformedData = useMemo(() => {
    return chartData.map(item => ({
      time: Math.floor(item.openTime / 1000),
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseFloat(item.volume)
    }));
  }, [chartData]);

  const [seriesData, setSeriesData] = useState({
    close: "-",
    high: "-",
    low: "-",
    open: "-",
    time: "-"
  });

  useEffect(() => {
    if (!chartContainer.current || transformedData.length === 0) return;

    const chart = createChart(chartContainer.current, {
      autoSize: true,
      layout: { 
        backgroundColor: '#ffffff',
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      priceLineVisible: true,
      rightPriceScale: {
        visible: true,
        borderColor: '#cccccc',
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 12, 
        rightBarStaysOnScroll: true, 
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    const volumeSeries = chart.addHistogramSeries({
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    candlestickSeries.setData(transformedData);
    volumeSeries.setData(transformedData.map(item => ({
      time: item.time,
      value: item.volume,
      color: item.close >= item.open ? 'rgba(38, 166, 154, 0.3)' : 'rgba(239, 83, 80, 0.3)'
    })));


    const handleCrosshairMove = (param) => {
      const seriesData = param.seriesData.get(candlestickSeries);
      if (!seriesData || !refToolTip.current) {
        refToolTip.current?.classList.remove('visible');
        return;
      }

      const { close, high, low, open, time } = seriesData;
      const formattedTime = new Date(time * 1000).toLocaleString();
      
      setSeriesData({
        close: close.toFixed(2),
        high: high.toFixed(2),
        low: low.toFixed(2),
        open: open.toFixed(2),
        time: formattedTime,
      });


      refToolTip.current.innerHTML = `
        <div class="tooltip-row"><strong>Time:</strong> ${formattedTime}</div>
        <div class="tooltip-row"><strong>Open:</strong> ${open.toFixed(2)}</div>
        <div class="tooltip-row"><strong>High:</strong> ${high.toFixed(2)}</div>
        <div class="tooltip-row"><strong>Low:</strong> ${low.toFixed(2)}</div>
        <div class="tooltip-row"><strong>Close:</strong> ${close.toFixed(2)}</div>
      `;

      const { x, y } = param.point;
      Object.assign(refToolTip.current.style, {
        left: `${x + 30}px`,
        top: `${y + 10}px`,
      });
      refToolTip.current.classList.add('visible');
    };
    

    const handleVisibleRangeChange = (newRange) => {
      if (!newRange) return;
      
      const barsInfo = candlestickSeries.barsInLogicalRange(newRange);
      if (barsInfo?.barsBefore < -3) {
        console.log()
        setSkip(skip +1)
      }
    };
    chart.timeScale().subscribeVisibleLogicalRangeChange(handleVisibleRangeChange);
    chart.subscribeCrosshairMove(handleCrosshairMove);
    chart.timeScale().fitContent();
    return () => {
      chart.unsubscribeCrosshairMove(handleCrosshairMove);
      chart.remove();
    };
  }, [transformedData]); 

  return (
    <>
      <div className='mt-20'></div>
      <CardItem height={470} style={{ padding: 0, margin: 0 }}>
        <div 
          ref={chartContainer} 
          style={{ 
            width: '100%', 
            height: '100%', 
            position: 'relative'
          }}
        >
          <div ref={refToolTip} className='BoxToolTip' />
          <div 
            ref={refLegend} 
            className="BoxLegend" 
            style={{
              display: 'flex',
              position: 'absolute',
              top: 20,
              left: 20,
              zIndex: 2,
              gap: '16px',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '8px 12px',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {['close', 'high', 'low', 'open'].map((key) => (
              <p 
                key={key} 
                style={{ 
                  margin: 0,
                  color: '#26a69a',
                  fontSize: '14px'
                }}
              >
                {`${key.charAt(0).toUpperCase() + key.slice(1)}: `}
                <span style={{ color: '#000' }}>{seriesData[key]}</span>
              </p>
            ))}
          </div>
        </div>
      </CardItem>
    </>
  );
}

export default ChartContent;