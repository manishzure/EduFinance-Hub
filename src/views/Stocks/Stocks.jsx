import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '80%',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  formContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  result: {
    marginTop: '1rem',
    backgroundColor: '#e8f5e9',
    padding: '1rem',
    borderRadius: '4px',
  },
  metadata: {
    marginTop: '1rem',
    backgroundColor: '#f1f1f1',
    padding: '1rem',
    borderRadius: '4px',
  },
  chart: {
    marginTop: '2rem',
    height: '400px',
  },
  tooltip: {
    backgroundColor: '#fff',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
};

const Stock = () => {
  const [formData, setFormData] = useState({
    ticker: '',
    multiplier: 1,
    timespan: 'minute',
    from: '',
    to: '',
    adjusted: true,
    sort: 'asc',
    investment: 0,
  });
  const [startPrice, setStartPrice] = useState(null);
  const [endPrice, setEndPrice] = useState(null);
  const [profit, setProfit] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [metadata, setMetadata] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    const { ticker, multiplier, timespan, from, to, adjusted, sort, investment } = formData;
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplier}/minute/${from}/${to}?adjusted=${adjusted}&sort=${sort}&apiKey=JIVDV2rDykj_O_el59g_9bQson3CQ427`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const results = data.results;

      if (results && results.length > 0) {
        const initialPrice = results[0].c;
        const finalPrice = results[results.length - 1].c;
        setStartPrice(initialPrice);
        setEndPrice(finalPrice);
        const profitAmount = ((finalPrice - initialPrice) / initialPrice) * investment;
        setProfit(profitAmount.toFixed(2));

        const chartData = results.map((result) => ({
          time: new Date(result.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: new Date(result.t).toLocaleDateString(),
          close: parseFloat(result.c.toFixed(2)),
          high: parseFloat(result.h.toFixed(2)),
          low: parseFloat(result.l.toFixed(2)),
          open: parseFloat(result.o.toFixed(2)),
        }));
        setChartData(chartData);

        setMetadata({
          ticker: data.ticker,
          adjusted: data.adjusted,
          queryCount: data.queryCount,
          request_id: data.request_id,
          resultsCount: data.resultsCount,
          status: data.status,
        });
      } else {
        resetData('No data available for the given range.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      resetData('Failed to fetch data. Check inputs or try again later.');
    }
  };

  const resetData = (message) => {
    setProfit(message);
    setStartPrice(null);
    setEndPrice(null);
    setChartData([]);
    setMetadata(null);
  };

  const getYDomain = () => {
    const prices = chartData.flatMap((d) => [d.low, d.high]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const padding = (maxPrice - minPrice) * 0.05;
    return [Math.max(0, minPrice - padding), maxPrice + padding];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { date, close, high, low, open } = payload[0].payload;
      return (
        <div style={styles.tooltip}>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Open:</strong> ${open.toFixed(2)}</p>
          <p><strong>High:</strong> ${high.toFixed(2)}</p>
          <p><strong>Low:</strong> ${low.toFixed(2)}</p>
          <p><strong>Close:</strong> ${close.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Stock Profit Calculator</h1>
      <div style={styles.formContainer}>
        <input
          type="text"
          name="ticker"
          placeholder="Stock Ticker (e.g., AAPL)"
          value={formData.ticker}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="multiplier"
          placeholder="Multiplier"
          value={formData.multiplier}
          onChange={handleChange}
          style={styles.input}
        />
        <select 
          name="timespan" 
          value={formData.timespan} 
          onChange={handleChange}
          style={styles.input}
        >
          <option value="minute">Minute</option>
          <option value="hour">Hour</option>
          <option value="day">Day</option>
        </select>
        <input
          type="date"
          name="from"
          value={formData.from}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="date"
          name="to"
          value={formData.to}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="investment"
          placeholder="Investment Amount"
          value={formData.investment}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
      <button onClick={fetchData} style={styles.button}>Calculate Profit</button>

      {profit && (
        <div style={styles.result}>
          <p>Start Price: ${startPrice}</p>
          <p>End Price: ${endPrice}</p>
          <p>Profit: ${profit}</p>
        </div>
      )}

      {chartData.length > 0 && (
        <div style={styles.chart}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={getYDomain()} tickFormatter={(tick) => tick.toFixed(2)} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="close" stroke="#8884d8" />
              <Line type="monotone" dataKey="high" stroke="#82ca9d" />
              <Line type="monotone" dataKey="low" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Stock;
