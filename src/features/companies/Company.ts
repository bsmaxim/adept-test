export interface Company {
  id: number;
  name: string;
  address: string;
  selected: boolean;
}

export interface CompaniesSchema {
  companies: Company[];
  isLoading?: boolean;
  error?: string;
}
