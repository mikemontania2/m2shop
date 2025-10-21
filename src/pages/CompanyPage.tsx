import React, { useEffect, useState } from 'react';
import { getCompanyInfo, CompanyInfo } from '../services/companyService';

const CompanyPage: React.FC = () => {
  const [info, setInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    getCompanyInfo().then(setInfo);
  }, []);

  if (!info) return <div className="container"><p>Cargando...</p></div>;

  return (
    <div className="container">
      <h1>{info.title}</h1>
      <p>{info.description}</p>
      <div>
        {info.sections.map((s, idx) => (
          <section key={idx} style={{ margin: '24px 0' }}>
            <h2>{s.heading}</h2>
            <p>{s.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CompanyPage;
