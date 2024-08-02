import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompaniesSchema, Company } from './Company';
import { readCompanies } from '../../app/api';

const initialState: CompaniesSchema = {
  isLoading: false,
  error: undefined,

  companies: [],
};


export const fetchCompanies = createAsyncThunk<Company[]>(
  'companies/fetchCompanies',
  async () => {
    const response = await readCompanies();
    return response;
  }
)

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    updateCompanies(state, action: PayloadAction<Company[]>) {
      const changedCompanies = action.payload

      const companyMap = new Map<number, Company>()
      changedCompanies.forEach(company => {
        companyMap.set(company.id, company)
      })

      state.companies = state.companies.map((company) => {
        if (companyMap.has(company.id)) {
          return companyMap.get(company.id)!
        } else {
          return company
        }
      })
    },
    addCompany(state, action: PayloadAction<Company>) {
      state.companies.push(action.payload);
    },
    deleteCompanies(state, action: PayloadAction<Record<number, boolean>>) {
      const removalIds = action.payload
      state.companies = state.companies.filter(company => !removalIds.hasOwnProperty(company.id));
    },
    toggleSelectAll(state, action: PayloadAction<boolean>) {
      const selectAll = action.payload;
      state.companies = state.companies.map(company => ({
        ...company,
        selected: selectAll
      }));
    },
    removeSelectedCompanies(state) {
      state.companies = state.companies.filter(company => !company.selected);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCompanies.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    }).addCase(fetchCompanies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.companies = action.payload
    }).addCase(fetchCompanies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string
      state.companies = []
    })
  }
});

export const { reducer: companiesReducer,
  actions: companiesActions } = companiesSlice
