import { useEffect, useRef, useState, useMemo } from 'react';
import CardItem from '../../../cardItem';
import { createChart } from 'lightweight-charts';
import getChartData from '../../../../services/api/getChartData';
import './content.scss';
import { useChartProvider } from '../../../../providers/chartProvider';
import usePriceCoin from '../../../../hooks/usePriceCoin';

function Content() {
  const chartContainer = useRef(null);
  const refToolTip = useRef(null);
  const refLegend = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [skip, setSkip] = useState(0);
  const { symbol, interval } = useChartProvider();
  const { data: steamdata } = usePriceCoin(symbol, `kline_${interval}`);

  const candlestickSeriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Fetch historical data from API
  const fetchData = async ({ symbol, interval, skip = 0 }) => {
    try {
      const response = await getChartData({ symbol, interval, skip });
      setChartData((prevData) => [...response.data, ...prevData]);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  // Reset data when symbol or interval changes
  useEffect(() => {
    setChartData([]);
    setSkip(0);
    fetchData({ symbol, interval, skip: 0 });
  }, [symbol, interval]);

  // Load more data when skip changes
  useEffect(() => {
    if (skip > 0) {
      fetchData({ symbol, interval, skip });
    }
  }, [skip]);

  // Transform historical data for lightweight-charts
  const transformedData = useMemo(() => {
    return chartData.map((item) => ({
      time: Math.floor(item.openTime / 1000),
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseFloat(item.volume),
    }));
  }, [chartData]);

  // Update lastTimeRef when transformedData changes
  useEffect(() => {
    if (transformedData.length > 0) {
      lastTimeRef.current = transformedData[transformedData.length - 1].time;
    }
  }, [transformedData]);

  // State for tooltip and legend data
  const [seriesData, setSeriesData] = useState({
    close: "-",
    high: "-",
    low: "-",
    open: "-",
    time: "-",
  });

  // Initialize and configure the chart
  useEffect(() => {
    if (!chartContainer.current || transformedData.length === 0) return;

    const chart = createChart(chartContainer.current, {
      autoSize: true,
      layout: {
        background: { color: '#1E1E2F' },
        textColor: '#c9d1d9',
      },
      grid: {
        vertLines: { color: '#30363d' },
        horzLines: { color: '#30363d' },
      },
      priceLineVisible: true,
      rightPriceScale: {
        visible: true,
        borderColor: '#30363d',
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 12,
        rightBarStaysOnScroll: true,
        borderColor: '#30363d',
      },
    });

        candlestickSeriesRef.current = chart.addCandlestickSeries({
      upColor: '#66bb6a',
      downColor: '#f44336',
      borderVisible: false,
      wickUpColor: '#66bb6a',
      wickDownColor: '#f44336',
    });

    volumeSeriesRef.current = chart.addHistogramSeries({
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: 'volume',
      color: '#26a69a',
      scaleMargins: {
        top: 0.85,
        bottom: 0.0,
      },
    });


    // Set initial data
    candlestickSeriesRef.current.setData(transformedData);
    volumeSeriesRef.current.setData(
      transformedData.map((item) => ({
        time: item.time,
        value: item.volume,
        color: item.close >= item.open ? 'rgba(102, 187, 106, 0.3)' : 'rgba(244, 67, 54, 0.3)',
      }))
    );

    // Handle crosshair movement for tooltip
    const handleCrosshairMove = (param) => {
      const seriesData = param.seriesData.get(candlestickSeriesRef.current);
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

    // Handle loading more data on scroll
    const handleVisibleRangeChange = (newRange) => {
      if (!newRange) return;

      const barsInfo = candlestickSeriesRef.current.barsInLogicalRange(newRange);
      if (barsInfo?.barsBefore < -3) {
        setSkip(skip + 1);
      }
    };

    chart.timeScale().subscribeVisibleLogicalRangeChange(handleVisibleRangeChange);
    chart.subscribeCrosshairMove(handleCrosshairMove);
    chart.timeScale().fitContent();

    // Cleanup on unmount
    return () => {
      chart.unsubscribeCrosshairMove(handleCrosshairMove);
      chart.timeScale().unsubscribeVisibleLogicalRangeChange(handleVisibleRangeChange);
      chart.remove();
    };
  }, [transformedData]);

  // Update real-time data
  useEffect(() => {
    if (steamdata && candlestickSeriesRef.current && volumeSeriesRef.current) {
      const klineData = steamdata.data.k;
      const newData = {
        time: Math.floor(klineData.t / 1000),
        open: parseFloat(klineData.o),
        high: parseFloat(klineData.h),
        low: parseFloat(klineData.l),
        close: parseFloat(klineData.c),
        volume: parseFloat(klineData.v),
      };

      if (lastTimeRef.current === null || newData.time >= lastTimeRef.current) {
        candlestickSeriesRef.current.update(newData);

        volumeSeriesRef.current.update({
          time: newData.time,
          value: newData.volume,
          color: newData.close >= newData.open ? 'rgba(102, 187, 106, 0.3)' : 'rgba(244, 67, 54, 0.3)',
        });

        lastTimeRef.current = newData.time;
      } else {
        console.warn("Skipped update for older time:", newData.time);
      }
    }
  }, [steamdata]);

  return (
    <CardItem height={470} style={{ padding: 0, margin: 0, background: '#161b22' }}>
      <div
        ref={chartContainer}
        className="chart-container"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <div ref={refToolTip} className="BoxToolTip" />
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
            background: 'rgba(22, 27, 34, 0.9)',
            padding: '8px 12px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            border: '1px solid #30363d',
          }}
        >
          {['close', 'high', 'low', 'open'].map((key) => (
            <p
              key={key}
              style={{
                margin: 0,
                color: '#00e676',
                fontSize: '14px',
              }}
            >
              {`${key.charAt(0).toUpperCase() + key.slice(1)}: `}
              <span style={{ color: '#ffffff' }}>{seriesData[key]}</span>
            </p>
          ))}
        </div>
      </div>
    </CardItem>
  );
}

export default Content;