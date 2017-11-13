import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompanyService {
  private API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(private httpClient: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`);
  }

  deleteCompany(companyId: number){
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyId}`);
  }

}
