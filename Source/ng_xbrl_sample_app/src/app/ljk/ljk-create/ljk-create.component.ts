import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LjkService } from '../../service/ljk.service';
import { Ljk } from '../../model/ljk';
import { Parameter } from '../../model/parameter';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NbToastrService } from '@nebular/theme';
import { ParameterService } from '../../service/parameter.service';

@Component({
  selector: 'app-ljk-create',
  templateUrl: './ljk-create.component.html',
  styleUrls: ['./ljk-create.component.scss'],
  providers: [LjkService, ParameterService]
})
export class LjkCreateComponent implements OnInit, OnDestroy {

  id: number;
  ljk: Ljk;
  private sub: any;

  listOfInstitution: Parameter[];
  selectedInstitutionCode: any;

  code: any;
  name: any;

  constructor(
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public activeRoute: ActivatedRoute,
    private ljkService: LjkService,
    public translate: TranslateService,
    private parameterService: ParameterService
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id) {
      // edit form
      this.ljkService.findById(this.id).subscribe(
        (ljk: Ljk) => {
          this.id = ljk.id;

          this.selectedInstitutionCode = ljk.institutionType;
          this.code = ljk.code;
          this.name = ljk.name;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    this.getTypeOption();
  }

  getTypeOption() {
    this.parameterService.findByType('INSTITUTION').subscribe(
      (typeOption) => {
        this.listOfInstitution = typeOption;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {

    const ljk: Ljk = new Ljk(this.id);

    ljk.institutionType = this.selectedInstitutionCode;
    ljk.name = this.name;
    ljk.code = this.code;

    if (this.id) {
      this.ljkService.updateLjk(ljk).subscribe(
        res => {
          this.toastrService.success('Form is sucessfully submitted. Thank you!', `Info`);
          this.redirectLjkPage();
        },
        err => {
          this.toastrService.danger(err, `Error Info`);
          console.log(err);
        });
    } else {
      this.ljkService.saveLjk(ljk).subscribe(
        res => {
          this.toastrService.success('Form is sucessfully submitted. Thank you!', `Info`);
          this.redirectLjkPage();
        },
        err => {
          this.toastrService.danger(err, `Error Info`);
          console.log(err);
        });
    }

  }

  redirectLjkPage() {
    this.router.navigate(['ljk'], { relativeTo: this.activeRoute.parent });
  }

}
