import { Company } from '../features/companies/Company'
import { companiesData } from './mockData'


export async function readCompanies(): Promise<Company[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(companiesData);
        }, 400);
    });
}
