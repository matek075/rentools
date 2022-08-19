import { Company } from 'context/company/types';
import { Category } from 'utils/product/categories';

export type ProfileCategory = Omit<Category, 'children'>;

export interface CompanyQuestion {
  title: string;
  answer: string;
  order: number;
}

export type CompanyQuestions = CompanyQuestion[];

export interface CompanyProfileResponse {
  company: Company;
  categories: ProfileCategory[];
  questions: CompanyQuestions;
}

export interface CompanyReview {
  id: number;
  review: string;
  rating: number;
  user: {
    id: number;
    name: string;
  };
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  companyId: number;
}
