import React from 'react';
import DragAndDropUpload from './components/DragAndDropUpload';
import SentimentCard from './components/SentimentCard';
import CategoryDistributionCard from './components/CategoryDistributionCard';
import ThemesCard from './components/ThemesCard';
import SummaryCard from './components/SummaryCard';
import DataTable from './components/DataTable';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-charcoal">Dashboard</h1>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <DragAndDropUpload />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SentimentCard />
            <CategoryDistributionCard />
          </div>
          <ThemesCard />
          <DataTable />
        </div>
        <div className="lg:col-span-1">
          <SummaryCard />
        </div>
      </main>
    </div>
  );
}

export default App;
