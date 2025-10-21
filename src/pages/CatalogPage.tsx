import React from 'react';
import SearchPage from './SearchPage';

const CatalogPage: React.FC = () => {
  // Delegates to SearchPage which reads query string
  return <SearchPage />;
};

export default CatalogPage;
