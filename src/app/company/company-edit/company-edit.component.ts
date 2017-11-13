import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyEditComponent implements OnInit {

  company = {} as Company;
  companyId: any;
  isNewCompany: boolean;
  companyForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.companyId = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = this.companyId === 'new';
    this.buildForm();

    if(!this.isNewCompany){
      this.companyService.getCompany(this.companyId)
      .subscribe(company => this.companyForm.patchValue(company))
    }
   }


   buildForm() {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      email: ['']
    });
   }

   saveCompany() {
    if (this.isNewCompany)
    {
      this.companyService.addCompany(this.companyForm.value)
        .subscribe(() => this.router.navigate(['/company/list']));
    } else {
      const comp = {...this.companyForm.value, id: this.companyId}
      this.companyService.updateCompany(comp)
      .subscribe(() => this.router.navigate(['/company/list']));
    }
   }

}
