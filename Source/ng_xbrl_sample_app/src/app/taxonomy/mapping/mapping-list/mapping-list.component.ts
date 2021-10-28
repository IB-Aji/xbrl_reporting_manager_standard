import { Component, OnInit, ViewChild } from '@angular/core';
import { TaxonomyMasterForm } from '../../../model/taxonomy-masterform';
import { TaxonomyMasterFormService } from '../../../service/taxonomy-masterform.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-mapping-list',
  templateUrl: './mapping-list.component.html',
  styleUrls: ['./mapping-list.component.scss'],
  providers: [TaxonomyMasterFormService]
})
export class MappingListComponent implements OnInit {

  public taxonomyMasterForms: TaxonomyMasterForm[];
  cols: any[];
  first = 0;
  rows = 10;
  loading: boolean = true;
  settings: any;

  constructor(
    private router: Router,
    private taxonomyMasterFormService: TaxonomyMasterFormService,
    public activeRoute: ActivatedRoute,
    public translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    router.events.subscribe(console.log);
  }

  ngOnInit() {
    this.getAllTaxonomyMapping();
    this.loading = false;

    this.settings = {
      columns: {
        name: {
          title: this.translate.instant('master.taxonomyMasterForm.name')
        },
        type: {
          title: this.translate.instant('master.taxonomyMasterForm.type')
        },
        file: {
          title: this.translate.instant('master.taxonomyMasterForm.file')
        },
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      mode: 'external'
    };
  }

  getAllTaxonomyMapping() {
    this.taxonomyMasterFormService.findAll().subscribe(
      taxonomyMasterForms => {
        this.taxonomyMasterForms = taxonomyMasterForms;
      },
      err => {
        console.log(err);
      }

    );
  }

  redirectNewTaxonomyMappingPage() {
    this.router.navigate(['create'], { relativeTo: this.activeRoute });
  }

  editTaxonomyMappingPage(taxonomyMasterForm: TaxonomyMasterForm) {
    if (taxonomyMasterForm) {
      this.router.navigate(['edit', taxonomyMasterForm.id], { relativeTo: this.activeRoute });
    }
  }

  onDelete(event): void {
    this.deleteTaxonomyMapping(event.data);
  }

  deleteTaxonomyMapping(taxonomyMasterForm: TaxonomyMasterForm) {
    if (taxonomyMasterForm) {
      this.taxonomyMasterFormService.deleteTaxonomyMasterFormById(taxonomyMasterForm.id).subscribe(
        res => {
          this.getAllTaxonomyMapping();
          console.log(this.activeRoute);
          this.router.navigate(['taxonomyMasterForm'], { relativeTo: this.activeRoute.parent });
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}

