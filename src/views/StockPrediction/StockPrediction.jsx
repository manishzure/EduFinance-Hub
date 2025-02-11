import React, { useState } from 'react';

const Prediction = () => {
  // State to manage the selected iframe src
  const [selectedSrc, setSelectedSrc] = useState('https://akshayram1-stock.hf.space');

  // Function to handle the dropdown change
  const handleSrcChange = (event) => {
    setSelectedSrc(event.target.value);
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.dropdownContainer}>
          <label htmlFor="srcSelector" style={styles.label}>Choose a Predictor:</label>
          <select id="srcSelector" onChange={handleSrcChange} value={selectedSrc} style={styles.select}>
            <option value="https://akshayram1-stock.hf.space">NLTK Predictor</option>
            <option value="https://akshayram1-stock2.hf.space">ProsusAI FinBERT Predictor</option>
            <option value="https://akshayram1-stock3.hf.space">HKUST FinBERT</option>
          </select>
        </div>

        <div style={styles.iframeContainer}>
          <iframe
            src={selectedSrc}
            title="Stock News analysis"
            style={styles.iframe}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>

        <p style={styles.description}>You can explore the Stock news sentiment analysis.</p>
      </div>
    </div>
  );
};

// CSS-in-JS styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    backgroundColor: '#1e1e2f', // Dark background
    padding: '20px',
  },
  content: {
    textAlign: 'center',
    color: 'white',
    maxWidth: '1100px', // Set a max width for content
    width: '100%',
  },
  header: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#00bcd4', // Light blue text color
  },
  dropdownContainer: {
    marginBottom: '20px',
  },
  label: {
    marginRight: '10px',
    fontSize: '1.2rem',
    color: '#ffffff',
  },
  select: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #00bcd4', // Matching the text color
    backgroundColor: '#2e2e3e',
    color: 'white',
  },
  iframeContainer: {
    width: '100%',
    height: '600px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  description: {
    marginTop: '20px',
    fontSize: '1.1rem',
    color: '#bbbbbb',
  },
};

export default Prediction;
