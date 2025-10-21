import empresa from '../data/empresa.json';
import historia from '../data/historia.json';

export interface CompanyInfo {
  title: string;
  description: string;
  sections: Array<{ heading: string; content: string }>;
}

export interface HistoryInfo {
  title: string;
  paragraphs: string[];
}

export const getCompanyInfo = async (): Promise<CompanyInfo> => {
  return new Promise((resolve) => setTimeout(() => resolve(empresa as CompanyInfo), 300));
};

export const getHistory = async (): Promise<HistoryInfo> => {
  return new Promise((resolve) => setTimeout(() => resolve(historia as HistoryInfo), 300));
};
