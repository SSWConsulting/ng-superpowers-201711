import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

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

  addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(
      `${this.API_BASE}/company`,
      company,
      { headers: new HttpHeaders().set('content-type', 'application/json' ) }
    )
    .pipe(catchError(this.errorHandler));
  }

  updateCompany(company: Company){
    return this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json' ) }
    )
  }

  getCompany(companyId: number): Observable<Company>{
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`)
    .pipe(catchError(this.errorHandler))
  }

  errorHandler(): Observable<Company> {
    console.error('ERROR');
    return new EmptyObservable();
  }

}
