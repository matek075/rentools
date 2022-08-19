import { FileType, Geolocation, OpeningHours } from 'types';

export enum CompanyPlan {
  Basic = 1,
  Standard = 2,
  Pro = 3,
}

export interface Company {
  id: number;
  name: string;
  vatId: string;
  description: string;
  address: string;
  geolocation: Geolocation;
  postCode: string;
  slug: string;
  email: string | null;
  phone: string | null;
  plan: CompanyPlan;
  openingHours: OpeningHours;
  information: string;
  visits: number;
  logo?: {
    id: number;
    path: string;
    type: FileType;
  };
}

export interface CompanyObject extends Company {
  questionsCount?: number;
}

export interface CompanyState {
  loading: boolean;
  data?: CompanyObject;
  setCompany: (company: Company) => void;
  loadCompany: () => void;
}
