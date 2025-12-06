import { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const COLORS = {
  positive: '#82ca9d',
  neutral: '#8884d8',
  negative: '#ffc658',
};

function App() {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState('');
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a CSV file.");
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const messages = text.split('\n').map(line => ({ text: line.trim() })).filter(msg => msg.text);
      
      try {
        const response = await fetch('http://localhost:8000/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messages),
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error analyzing data:', error);
        alert('Failed to analyze data. Please check the console for more information.');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  const handleGenerateSummary = async () => {
    setLoading(true);
    const messages = data.map(item => ({ text: item.text }));
    try {
      const [themesResponse, summaryResponse] = await Promise.all([
        fetch('http://localhost:8000/cluster', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(messages),
        }),
        fetch('http://localhost:8000/summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(messages),
        }),
      ]);
      const themesResult = await themesResponse.json();
      const summaryResult = await summaryResponse.json();
      setThemes(themesResult.themes);
      setSummary(summaryResult.summary);
    } catch (error) {
      console.error('Error generating summary:', error);
      alert('Failed to generate summary. Please check the console for more information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold">AI Customer Insight Agent</h1>
      </header>
      <main>
        <div className="flex justify-center items-center space-x-4 mb-8">
          <input type="file" accept=".csv" onChange={handleFileChange} className="bg-gray-800 text-white p-2 rounded" />
          <button onClick={handleAnalyze} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
          {data.length > 0 && (
            <button onClick={handleGenerateSummary} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Summary'}
            </button>
          )}
        </div>
        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {data.length > 0 && !loading && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-700">Message</th>
                  <th className="py-2 px-4 border-b border-gray-700">Category</th>
                  <th className="py-2 px-4 border-b border-gray-700">Sentiment</th>
                  <th className="py-2 px-4 border-b border-gray-700">Urgency</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-700">{item.text}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{item.category}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{item.sentiment}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{item.urgency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-2xl font-bold mb-4 text-center">Sentiment Analysis</h2>
              <PieChart width={400} height={400}>
                <Pie
                  data={Object.entries(data.reduce((acc, item) => {
                    acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
                    return acc;
                  }, {})).map(([name, value]) => ({ name, value }))}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {Object.entries(data.reduce((acc, item) => {
                    acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
                    return acc;
                  }, {})).map(([name, value], index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-2xl font-bold mb-4 text-center">Category Analysis</h2>
              <BarChart
                width={500}
                height={300}
                data={Object.entries(data.reduce((acc, item) => {
                  acc[item.category] = (acc[item.category] || 0) + 1;
                  return acc;
                }, {})).map(([name, value]) => ({ name, value }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </div>
          </div>
        )}
        {summary && themes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-2xl font-bold mb-4 text-center">Top Themes</h2>
              <ul className="list-disc list-inside">
                {themes.map((theme, index) => (
                  <li key={index}>{theme}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-2xl font-bold mb-4 text-center">Executive Summary</h2>
              <p>{summary}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
