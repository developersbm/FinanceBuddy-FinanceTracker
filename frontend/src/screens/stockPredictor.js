import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../context/themeContext';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// ─── Static historical close price data (sampled weekly, 2020-2025) ─────────
const STOCK_DATA = {
  AAPL: {
    name: 'Apple Inc.',
    prices: [77.4, 80.5, 90.2, 95.3, 108.2, 120.1, 126.0, 130.5, 135.4, 148.0,
             155.2, 160.0, 165.3, 172.1, 177.5, 182.0, 174.3, 168.5, 152.2, 145.0,
             150.3, 157.8, 161.4, 167.2, 170.5, 175.3, 178.1, 183.0, 186.4, 190.5,
             193.2, 188.7, 182.5, 178.3, 180.1, 184.0],
    forecast: [184.5, 187.2, 191.0, 195.5, 200.3, 205.8, 211.2, 217.0, 223.5, 230.1,
               236.8, 244.0],
  },
  GOOG: {
    name: 'Alphabet Inc.',
    prices: [68.5, 72.0, 78.3, 82.5, 87.2, 91.0, 95.3, 100.5, 105.8, 110.2,
             115.0, 120.5, 125.2, 130.3, 126.5, 118.0, 105.3, 99.5, 95.2, 98.0,
             102.5, 107.8, 112.0, 116.5, 120.3, 124.0, 128.5, 132.8, 137.2, 141.0,
             145.5, 140.3, 136.8, 140.2, 144.5, 148.0],
    forecast: [150.5, 154.2, 158.0, 162.5, 167.0, 172.3, 177.8, 183.5, 189.2, 195.0,
               201.5, 208.0],
  },
  MSFT: {
    name: 'Microsoft Corp.',
    prices: [162.0, 168.5, 175.3, 180.0, 185.5, 195.2, 200.5, 210.3, 220.5, 230.0,
             240.5, 248.0, 255.3, 262.5, 270.0, 275.3, 262.0, 250.5, 240.8, 245.0,
             252.3, 258.5, 265.0, 272.3, 280.5, 288.0, 295.3, 305.0, 315.5, 325.0,
             333.5, 340.2, 348.5, 357.0, 365.3, 372.0],
    forecast: [378.5, 385.2, 392.0, 399.5, 407.3, 415.8, 424.5, 433.5, 443.0, 453.0,
               463.5, 474.5],
  },
  NVDA: {
    name: 'NVIDIA Corp.',
    prices: [14.5, 18.2, 22.0, 28.5, 35.3, 42.0, 50.5, 58.2, 65.0, 72.5,
             80.3, 88.0, 95.5, 102.3, 110.0, 118.5, 125.0, 132.5, 140.3, 148.0,
             160.5, 180.3, 210.5, 250.0, 300.5, 350.3, 400.0, 450.5, 500.3, 550.0,
             600.5, 650.3, 700.0, 750.5, 800.3, 850.0],
    forecast: [900.5, 960.2, 1020.0, 1085.5, 1155.3, 1230.8, 1312.5, 1400.0, 1495.0, 1598.0,
               1710.0, 1830.5],
  },
  AMD: {
    name: 'AMD Inc.',
    prices: [45.5, 50.2, 55.0, 62.5, 70.3, 78.0, 85.5, 92.2, 100.0, 108.5,
             115.3, 122.0, 128.5, 135.3, 140.0, 145.5, 130.3, 118.0, 105.3, 112.0,
             118.5, 125.8, 132.0, 138.5, 145.3, 152.0, 158.5, 165.3, 170.0, 175.5,
             180.3, 175.0, 170.5, 165.2, 170.0, 175.3],
    forecast: [182.5, 189.2, 196.0, 203.5, 211.3, 219.8, 228.5, 237.5, 247.0, 257.0,
               267.5, 278.5],
  },
};

const YEAR_LABELS = [];
for (let year = 2020; year <= 2025; year++) {
  for (let q = 0; q < 6; q++) {
    const m = (q + 1) * 2;
    YEAR_LABELS.push(`${year}-${String(m).padStart(2, '0')}`);
  }
}
const FORECAST_LABELS = ['Jan 26', 'Feb 26', 'Mar 26', 'Apr 26', 'May 26', 'Jun 26',
                          'Jul 26', 'Aug 26', 'Sep 26', 'Oct 26', 'Nov 26', 'Dec 26'];

const STOCKS = ['AAPL', 'GOOG', 'MSFT', 'NVDA', 'AMD'];

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-2 border-b border-base-200 last:border-0">
    <span className="text-sm opacity-60">{label}</span>
    <span className="text-sm font-semibold">{value}</span>
  </div>
);

const StockPredictor = () => {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [years, setYears] = useState(1);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const tickColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';
  const tooltipBg = isDark ? '#1e293b' : '#fff';
  const tooltipTitle = isDark ? '#e2e8f0' : '#0f172a';
  const tooltipBody = isDark ? '#94a3b8' : '#475569';
  const tooltipBorder = isDark ? '#334155' : '#e2e8f0';

  const stock = STOCK_DATA[selectedStock];

  const historicalData = useMemo(() => ({
    labels: YEAR_LABELS.slice(0, stock.prices.length),
    datasets: [
      {
        label: `${selectedStock} Close Price`,
        data: stock.prices,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.12)',
        pointRadius: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  }), [stock]);

  const forecastMonths = Math.min(years * 12, stock.forecast.length);
  const forecastData = useMemo(() => ({
    labels: FORECAST_LABELS.slice(0, forecastMonths),
    datasets: [
      {
        label: 'Forecast',
        data: stock.forecast.slice(0, forecastMonths),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245,158,11,0.12)',
        pointRadius: 2,
        borderDash: [6, 3],
        tension: 0.3,
        fill: true,
      },
    ],
  }), [forecastMonths, stock]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { boxWidth: 12, color: tickColor, font: { size: 12 } },
      },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: tooltipTitle,
        bodyColor: tooltipBody,
        borderColor: tooltipBorder,
        borderWidth: 1,
        callbacks: {
          label: (ctx) => ` $${ctx.parsed.y?.toFixed(2) ?? '—'}`,
        },
      },
    },
    scales: {
      x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
      y: {
        grid: { color: gridColor },
        ticks: { color: tickColor, font: { size: 11 }, callback: (v) => `$${v}` },
      },
    },
  };

  const lastPrice = stock.prices[stock.prices.length - 1];
  const prevPrice = stock.prices[stock.prices.length - 2];
  const change = lastPrice - prevPrice;
  const changePct = ((change / prevPrice) * 100).toFixed(2);
  const forecastTarget = stock.forecast[forecastMonths - 1];
  const upside = (((forecastTarget - lastPrice) / lastPrice) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      <div className="flex justify-center -mb-2">
        <div className="rounded-full bg-base-200/60 px-4 py-1.5 text-xs opacity-75 max-w-fit text-center">
          ⚠️ Static demo. In production the Python backend runs Facebook Prophet trained on real Yahoo Finance data via yfinance. Forecasts are illustrative only.
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Stock Predictor</h1>
        <p className="text-sm opacity-60">
          AI-powered forecasts using Prophet
        </p>
      </div>

      {/* Controls */}
      <div className="card border border-base-200 bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex flex-wrap items-end gap-6">
            <div className="flex flex-col gap-2 flex-1 min-w-40">
              <label className="text-sm font-semibold">Select stock</label>
              <div className="flex flex-wrap gap-2">
                {STOCKS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStock(s)}
                    className={`btn btn-sm rounded-full ${
                      selectedStock === s ? 'btn-primary' : 'btn-ghost border border-base-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-xs opacity-50">{stock.name}</p>
            </div>

            <div className="flex flex-col gap-2 flex-1 min-w-48">
              <label className="text-sm font-semibold">
                Forecast horizon: <span className="text-primary">{years} yr{years > 1 ? 's' : ''}</span>
              </label>
              <input
                type="range"
                min={1}
                max={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="range range-primary range-sm"
              />
              <div className="flex justify-between text-xs opacity-40">
                <span>1 yr</span>
                <span>1 yr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="card border border-base-200 bg-base-100 shadow-sm">
          <div className="card-body py-4">
            <div className="text-xs opacity-50 mb-1">Last Close</div>
            <div className="text-2xl font-extrabold">${lastPrice.toFixed(2)}</div>
          </div>
        </div>
        <div className="card border border-base-200 bg-base-100 shadow-sm">
          <div className="card-body py-4">
            <div className="text-xs opacity-50 mb-1">Period Change</div>
            <div className={`text-2xl font-extrabold ${change >= 0 ? 'text-success' : 'text-error'}`}>
              {change >= 0 ? '+' : ''}{change.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="card border border-base-200 bg-base-100 shadow-sm">
          <div className="card-body py-4">
            <div className="text-xs opacity-50 mb-1">Change %</div>
            <div className={`text-2xl font-extrabold ${change >= 0 ? 'text-success' : 'text-error'}`}>
              {change >= 0 ? '+' : ''}{changePct}%
            </div>
          </div>
        </div>
        <div className="card border border-base-200 bg-base-100 shadow-sm">
          <div className="card-body py-4">
            <div className="text-xs opacity-50 mb-1">Forecast Upside</div>
            <div className={`text-2xl font-extrabold ${upside >= 0 ? 'text-success' : 'text-error'}`}>
              +{upside}%
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card border border-base-200 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="card-title">Historical Price</h2>
              <span className="text-xs opacity-60">2020 – 2025</span>
            </div>
            <div className="h-64 w-full">
              <Line data={historicalData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="card border border-base-200 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="card-title">Prophet Forecast</h2>
              <span className="text-xs opacity-60">Next {years} yr{years > 1 ? 's' : ''}</span>
            </div>
            <div className="h-64 w-full">
              <Line data={forecastData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Summary table */}
      <div className="card border border-base-200 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-2">Forecast Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
            <div>
              <InfoRow label="Ticker" value={selectedStock} />
              <InfoRow label="Company" value={stock.name} />
              <InfoRow label="Last Close" value={`$${lastPrice.toFixed(2)}`} />
              <InfoRow label="Forecast target" value={`$${forecastTarget?.toFixed(2) ?? '—'}`} />
            </div>
            <div>
              <InfoRow label="Horizon" value={`${years} year${years > 1 ? 's' : ''}`} />
              <InfoRow label="Model" value="Facebook Prophet (FBProphet)" />
              <InfoRow label="Training data" value="2015-01-01 → today" />
              <InfoRow label="Estimated upside" value={`+${upside}%`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPredictor;
