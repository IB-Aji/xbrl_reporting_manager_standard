import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ParameterService, TaxonomyMasterFormService, TaxonomyEntrypointService, TaxonomyReleaseService } from '../../../service';
import { RoleService } from '../../../service/role.service';
import { Role } from '../../../model/role';
import { TaxonomyMasterForm } from '../../../model/taxonomy-masterform';
import { TaxonomyFormMapping } from '../../../model/taxonomy-formmapping';
@Component({
  selector: 'app-mapping-create',
  templateUrl: './mapping-create.component.html',
  styleUrls: ['./mapping-create.component.scss'],
  providers: [TaxonomyMasterFormService, RoleService, TaxonomyEntrypointService, ParameterService, TaxonomyReleaseService],
})
export class MappingCreateComponent implements OnInit, OnDestroy {

  id: number;
  taxonomyMasterForm: TaxonomyMasterForm;
  private sub: any;
  roles: Role[];
  selectedRole: Role[];
  uploadedFile: any;
  uploadedFileString: any;
  typeOption: any[];
  avatar: any;
  releaseOption: any[];
  institutionOption: any[];
  sectorOption: any[];
  frequencyOption: any[];
  tableOption: any[];
  dbOption: any[];
  columnOption: any[];
  mappingList: TaxonomyFormMapping[] = [];
  formOption: any[];
  settings: any;

  reader: FileReader;

  name: string;
  type: string;
  file: string;
  release: string;
  institution: string;
  sector: string;
  frequency: string;
  dbsource: string = '';
  srvip: string;
  srvport: string;
  user: string;
  password: string;
  dbname: string;
  schema: string;
  tablename: string;
  form: number;
  table: string;

  constructor(
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public activeRoute: ActivatedRoute,
    private taxonomyMasterFormService: TaxonomyMasterFormService,
    private taxonomyEntryPointService: TaxonomyEntrypointService,
    private parameterService: ParameterService,
    private taxonomyReleaseService: TaxonomyReleaseService,
    public translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.reader = new FileReader();

  }

  ngOnInit() {
    this.dbOption = [{ name: "SQL Server", value: "SQL_SERVER" }, { name: "Postgres", value: "POSTGRESQL" }]
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.settings = {
        columns: {
          elementLabel: {
            title: 'Field',
          },
          tableField: {
            title: 'Column',
          },
        },
        actions: false,
        hideSubHeader: true,
      };
    });

    if (this.id) {
      // edit form
      this.taxonomyMasterFormService.findById(this.id).subscribe(
        (taxonomyMasterForm: TaxonomyMasterForm) => {
          console.log(taxonomyMasterForm);
          this.id = taxonomyMasterForm.id;
          this.taxonomyMasterForm = taxonomyMasterForm;

          this.institution = taxonomyMasterForm.entrypoint ? taxonomyMasterForm.entrypoint.institutionType : '';
          this.sector = taxonomyMasterForm.entrypoint ? taxonomyMasterForm.entrypoint.sector : '';
          this.frequency = taxonomyMasterForm.entrypoint ? taxonomyMasterForm.entrypoint.frequencePeriod : '';
          this.release = taxonomyMasterForm.entrypoint ? taxonomyMasterForm.entrypoint.taxonomyRelease.releaseDate + ' Version: ' +
            taxonomyMasterForm.entrypoint.taxonomyRelease.version : '';

          this.dbsource = taxonomyMasterForm.datamartDBType;
          this.srvip = taxonomyMasterForm.datamartIP;
          this.srvport = taxonomyMasterForm.datamartPort;
          this.user = taxonomyMasterForm.datamartUsername;
          this.password = taxonomyMasterForm.datamartPassword;
          this.dbname = taxonomyMasterForm.datamartDBName;
          this.schema = taxonomyMasterForm.datamartSchema;
          this.tablename = taxonomyMasterForm.datamartTable;
          this.form = taxonomyMasterForm.id;
          this.mappingList = JSON.parse(taxonomyMasterForm.formMappingJSONObj);

          this.getAllForm();
          this.gettables();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.getFrequencyOption();
    this.getInstitutionOption();
    this.getSectorOption();
    this.getAllRelease();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    this.taxonomyMasterForm.datamartDBType = this.dbsource;
    this.taxonomyMasterForm.datamartIP = this.srvip;
    this.taxonomyMasterForm.datamartPort = this.srvport;
    this.taxonomyMasterForm.datamartDBName = this.dbname;
    this.taxonomyMasterForm.datamartUsername = this.user;
    this.taxonomyMasterForm.datamartPassword = this.password;
    this.taxonomyMasterForm.id = +this.form;
    this.taxonomyMasterForm.datamartTable = this.tablename;
    this.taxonomyMasterForm.datamartSchema = this.schema;

    this.taxonomyMasterForm.formMappingJSONObj = JSON.stringify(this.mappingList);
    console.log();

    if (this.id) {
      this.taxonomyMasterFormService.updateTaxonomyMasterForm(this.taxonomyMasterForm).subscribe(
        (res) => {
          console.log('taxonomyMasterForm updated  :' + this.taxonomyMasterForm);
          this.toastrService.success('Form is sucessfully submitted. Thank you!', `Info`);
          this.redirectTaxonomyMasterFormPage();
        },
        (err) => {
          this.toastrService.danger(err, `Error Info`);
          console.log(err);
        }
      );
    } else {

      this.taxonomyMasterFormService.saveTaxonomyMasterForm(this.taxonomyMasterForm).subscribe(
        (res) => {
          this.toastrService.success('Form is sucessfully submitted. Thank you!', `Info`);
          this.redirectTaxonomyMasterFormPage();
        },
        (err) => {
          this.toastrService.danger(err, `Error Info`);
          console.log(err);
        }
      );


    }

  }

  redirectTaxonomyMasterFormPage() {
    this.router.navigate(['taxonomy/mapping'], { relativeTo: this.activeRoute.parent });
  }


  onSelect(event: any) {
    let fileList: FileList = event.target.files;
    this.uploadedFile = fileList[0];
    this.reader.readAsDataURL(this.uploadedFile);
    this.reader.onload = () => {
      this.avatar = this.reader.result;
    };
  }

  getInstitutionOption() {
    this.parameterService.findByType('INSTITUTION').subscribe(
      (res) => {
        this.institutionOption = res;
      },
      (err) => {
        this.toastrService.danger(err, `Error get types`);
        console.log(err);
      }
    );
  }

  getSectorOption() {
    this.parameterService.findByType('SECTOR').subscribe(
      (res) => {
        this.sectorOption = res;
      },
      (err) => {
        this.toastrService.danger(err, `Error get types`);
        console.log(err);
      }
    );
  }

  getFrequencyOption() {
    this.parameterService.findByType('FREQ').subscribe(
      (res) => {
        this.frequencyOption = res;
      },
      (err) => {
        this.toastrService.danger(err, `Error get types`);
        console.log(err);
      }
    );
  }


  getAllRelease() {
    this.taxonomyReleaseService.findAll().subscribe(
      (res) => {
        this.releaseOption = res;
      },
      (err) => {
        this.toastrService.danger(err, `Error get types`);
        console.log(err);
      }
    );
  }


  getAllForm() {
    this.taxonomyMasterFormService.findAll().subscribe(
      (res) => {
        this.formOption = res;
        this.formSelected(null);
      },
      (err) => {
        this.toastrService.danger(err, `Error get types`);
        console.log(err);
      }
    );
  }

  formSelected(event) {


    for (var index in this.formOption) {
      if (this.form === this.formOption[index].id) {
        this.taxonomyMasterForm = this.formOption[index];
      }
    }


    this.taxonomyMasterForm.datamartDBType = this.dbsource;
    this.taxonomyMasterForm.datamartIP = this.srvip;
    this.taxonomyMasterForm.datamartPort = this.srvport;
    this.taxonomyMasterForm.datamartDBName = this.dbname;
    this.taxonomyMasterForm.datamartUsername = this.user;
    this.taxonomyMasterForm.datamartPassword = this.password;
    this.taxonomyMasterForm.id = this.form;
    this.taxonomyMasterForm.datamartSchema = this.schema;
    this.taxonomyMasterFormService.getFormMapping(this.taxonomyMasterForm).subscribe(
      (res) => {
        console.log(res);
        this.mappingList = res;
      },
      (err) => {
        this.toastrService.danger(err, `Error get types`);
        console.log(err);
      }
    );

  }

  gettables() {

    if (!this.srvip || !this.srvport || !this.dbname || !this.user || !this.password) return;
    const taxonomyMasterForm: TaxonomyMasterForm = new TaxonomyMasterForm(
      this.id,
    );
    taxonomyMasterForm.datamartDBType = this.dbsource;
    taxonomyMasterForm.datamartIP = this.srvip;
    taxonomyMasterForm.datamartPort = this.srvport;
    taxonomyMasterForm.datamartDBName = this.dbname;
    taxonomyMasterForm.datamartUsername = this.user;
    taxonomyMasterForm.datamartPassword = this.password;
    taxonomyMasterForm.id = this.form;
    taxonomyMasterForm.datamartSchema = this.schema;
    this.taxonomyMasterFormService.getTables(taxonomyMasterForm).subscribe(
      (res) => {
        this.tableOption = res;
      },
      (err) => {
        this.toastrService.danger(err, `Error get types`);
        console.log(err);
      }
    );

  }

  getColumns() {
    const taxonomyMasterForm: TaxonomyMasterForm = new TaxonomyMasterForm(
      this.id,
    );
    taxonomyMasterForm.datamartDBType = this.dbsource;
    taxonomyMasterForm.datamartIP = this.srvip;
    taxonomyMasterForm.datamartPort = this.srvport;
    taxonomyMasterForm.datamartDBName = this.dbname;
    taxonomyMasterForm.datamartUsername = this.user;
    taxonomyMasterForm.datamartPassword = this.password;
    taxonomyMasterForm.id = this.form;
    taxonomyMasterForm.datamartTable = this.tablename;
    taxonomyMasterForm.datamartSchema = this.schema;
    this.taxonomyMasterFormService.getColumns(taxonomyMasterForm).subscribe(
      (res) => {
        this.columnOption = res;

        for (var index in res) {
          if (this.mappingList[index]) {
            this.mappingList[index].columnName = res[index];
          }
        }
      },
      (err) => {
        this.toastrService.danger(err, `Error get types`);
        console.log(err);
      }
    );

  }
}
