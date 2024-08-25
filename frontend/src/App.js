import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputData, setInputData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('numbers');

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://bajaj-vert.vercel.app/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: JSON.parse(inputData) }),
      });
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;

    switch (selectedOption) {
      case 'numbers':
        return <pre>{JSON.stringify(numbers, null, 2)}</pre>;
      case 'alphabets':
        return <pre>{JSON.stringify(alphabets, null, 2)}</pre>;
      case 'highest_lowercase_alphabet':
        return <pre>{JSON.stringify(highest_lowercase_alphabet, null, 2)}</pre>;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <h1>Data Processor</h1>
      <textarea
        value={inputData}
        onChange={handleInputChange}
        rows="10"
        cols="50"
        placeholder='Enter JSON here, e.g., { "data": ["A", "C", "z"] }'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="numbers">Numbers</option>
        <option value="alphabets">Alphabets</option>
        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
      </select>
      <div>
        <h2>Response:</h2>
        {renderResponse()}
      </div>
    </div>
  );
}

export default App;
