import { PriceRange,RentalRange } from 'components/form/forms/Product';
import { File } from 'types/File.types';
import { Company } from 'context/company/types';
import { CompanyQuestions } from 'types/Company.types';

export interface ProductTemplate {
  id: number;
  brand: string;
  model: string;
  description: string;
  active: boolean;
}

export interface ProductCategory {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface ProductPrice {
  price: number;
  range: PriceRange;
}

export interface Product {
  id: number;
  brand: string;
  model: string;
  description: string;
  active: boolean;
  deposit?: number;
  minRentalValue:number;
  minRentalRange:RentalRange;
  prices: ProductPrice[];
  files: File[];
  category: ProductCategory;
  template?: ProductTemplate;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductPage extends Product {
  product: Product;
  company: Company;
  questions: CompanyQuestions;
}
