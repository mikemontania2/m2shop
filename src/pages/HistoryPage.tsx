import React, { useEffect, useState } from 'react';
import { getHistory, HistoryInfo } from '../services/companyService';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryInfo | null>(null);

  useEffect(() => {
    getHistory().then(setHistory);
  }, []);

  if (!history) return <div className="container"><p>Cargando...</p></div>;

  return (
    <div className="container">
      <h1>{history.title}</h1>
      {history.paragraphs.map((p, idx) => (
        <p key={idx} style={{ marginBottom: 16 }}>{p}</p>
      ))}
    </div>
  );
};

export default HistoryPage;
