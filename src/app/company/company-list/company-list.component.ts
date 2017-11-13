import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Company } from "../company";
import { CompanyService } from '../company.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyListComponent implements OnInit {

  companies$ : Observable<Company[]>;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies(){
    this.companies$ = this.companyService.getCompanies(); //.subscribe(companies => this.companies = companies);
  }

}
