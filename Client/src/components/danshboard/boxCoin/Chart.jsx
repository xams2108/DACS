import { useEffect, useRef, useState } from "react";
import getChartData from "../../../services/api/getChartData";
import { createChart } from "lightweight-charts";

function Chart({ symbol }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const resizeObserver = useRef(null);
  const [dataChart, setDataChart] = useState([]);

  const params = {
    symbol: symbol.toUpperCase(),
    interval: "15m",
    limit: "96",
  };

  // Fetch chart data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getChartData(params);
        const convertedData = res.data.map((item) => ({
          time: Math.floor(item.openTime / 1000),
          value: parseFloat(item.close),
        }));
        setDataChart(convertedData);
      } catch (error) {
        console.error("❌ Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [symbol]);
    useEffect(() => {
        if (!chartContainerRef.current || dataChart.length === 0) return;
        const container = chartContainerRef.current;
        if (chartRef.current) {
        chartRef.current.remove();
        }
        const chart = createChart(container, {
        layout: {
            background: {color: "transparent" },
        },
        grid: {
            vertLines: { visible: false },
            horzLines: { visible: false },
        },
        rightPriceScale: { visible: false },
        leftPriceScale: { visible: false },
        timeScale: { visible: false },
        crosshair: {
            vertLine: { visible: false },
            horzLine: { visible: false },
        },
        watermark: { visible: false },
        autoSize: true,
        handleScroll: {
            mouseWheel: false,
            pressedMouseMove: false,
            horzTouchDrag: false,
            vertTouchDrag: false,
        },
        handleScale: {
            axisPressedMouseMove: false,
            mouseWheel: false,
            pinch: false,
        },
        });

        chartRef.current = chart;
        const lineSeries = chart.addLineSeries({

        color: dataChart[0]?.value < dataChart[dataChart.length - 1]?.value ? "#66bb6a" : "#f50057",
        lineWidth: 2,
        });
        lineSeries.setData(dataChart);
        chart.timeScale().fitContent(); 
    
    

        return () => {
        chart.remove();
        if (resizeObserver.current) {
            resizeObserver.current.disconnect();
        }
        };
    }, [dataChart]);

  return (
    <div
      ref={chartContainerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative"
      }}
    />
  );
}

export default Chart;
