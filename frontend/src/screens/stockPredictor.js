import React, { useState } from 'react';
import { Select, Slider } from 'antd';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import { Plotly } from 'react-plotly.js';

import yfinance as yf;
import { Prophet } from 'prophet';
import { plot_plotly } from 'prophet/plot';
import { graph_objects as go } from 'plotly';

const { RangePicker } = DatePicker;

const StockPredictionApp = () => {
    const [selectedStock, setSelectedStock] = useState("AAPL");
    const [nYears, setNYears] = useState(1);
    const [data, setData] = useState(null);
    const [forecast, setForecast] = useState(null);

    const stocks = ["AAPL", "GOOG", "MSFT", "NVDA", "AMD"];

    const fetchData = async () => {
        const START = "2015-01-01";
        const TODAY = new Date().toISOString().split('T')[0];
        const result = await yf.download(selectedStock, START, TODAY);
        setData(result);
    };

    const plotRawData = () => {
        const fig = go.Figure();
        fig.add_trace(go.Scatter(x=data['Date'], y=data['Open'], name='stock_open'));
        fig.add_trace(go.Scatter(x=data['Date'], y=data['Open'], name='stock_close'));
        fig.layout.update({title: "Time Series data", xaxis: {rangeslider: {visible: true}}});
        return <Plotly data={[fig]} />;
    };

    const handleStockChange = (value) => {
        setSelectedStock(value);
        fetchData();
    };

    const handleYearChange = (value) => {
        setNYears(value);
    };

    const handleDateChange = (dates) => {
        console.log('Selected Time: ', dates);
    };

    const handleForecast = async () => {
        const df_train = data[['Date', 'Close']];
        df_train.columns = ["ds", "y"];

        const m = new Prophet();
        m.fit(df_train);
        const period = nYears * 365;
        const future = m.make_future_dataframe({periods: period});
        const forecast = m.predict(future);

        setForecast(forecast);
    };

    return (
        <div>
            <h1>Stock Prediction App</h1>
            <Select defaultValue="AAPL" onChange={handleStockChange}>
                {stocks.map((stock) => <Select.Option key={stock} value={stock}>{stock}</Select.Option>)}
            </Select>
            <Slider min={1} max={10} defaultValue={1} onChange={handleYearChange} />
            <RangePicker onChange={handleDateChange} />
            <button onClick={handleForecast}>Forecast</button>
            
            {data && 
                <div>
                    <h2>Raw data</h2>
                    {data.tail()}
                    {plotRawData()}
                </div>
            }

            {forecast && 
                <div>
                    <h2>Forecast data</h2>
                    {forecast.tail()}
                    <h2>Forecast Data</h2>
                    <Plotly data={[plot_plotly(m, forecast)]} />
                    <h2>Forecast Components</h2>
                    {m.plot_components(forecast)}
                </div>
            }
        </div>
    );
};

export default StockPredictionApp;
