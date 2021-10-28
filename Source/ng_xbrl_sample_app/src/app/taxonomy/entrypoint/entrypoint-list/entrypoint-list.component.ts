import { ViewEntrypoint } from './../../../model/view-entrypoint';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TaxonomyEntrypoint } from '../../../model/taxonomy-entrypoint';
import { TaxonomyEntrypointService } from '../../../service/taxonomy-entrypoint.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-entrypoint-list',
  templateUrl: './entrypoint-list.component.html',
  styleUrls: ['./entrypoint-list.component.scss'],
  providers: [TaxonomyEntrypointService]
})
export class EntrypointListComponent implements OnInit {

  public taxonomyEntryPoints: ViewEntrypoint[];

  cols: any[];
  first = 0;
  rows = 10;
  settings: any;

  constructor(
    private router: Router,
    private taxonomyEntryPointService: TaxonomyEntrypointService,
    public activeRoute: ActivatedRoute,
    public translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {
    this.getAllTaxonomyEntrypoints();

    this.settings = {
      columns: {
        taxonomyRelease: {
          title: this.translate.instant('master.taxonomyEntryPoint.email')
        },
        entrypointPath: {
          title: this.translate.instant('master.taxonomyEntryPoint.firstName')
        },
        frequencePeriods: {
          title: this.translate.instant('master.taxonomyEntryPoint.lastName')
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

  getAllTaxonomyEntrypoints() {
    this.taxonomyEntryPointService.getAllEntryPoint().subscribe(
      taxonomyEntryPoints => {
        this.taxonomyEntryPoints = taxonomyEntryPoints;
      },
      err => {
        console.log(err);
      }

    );
  }

  redirectNewTaxonomyEntrypointPage() {
    this.router.navigate(['create'], { relativeTo: this.activeRoute });
  }

  editTaxonomyEntrypointPage(taxonomyEntryPoints: ViewEntrypoint) {
    if (taxonomyEntryPoints) {
      this.router.navigate(['edit', taxonomyEntryPoints.id], { relativeTo: this.activeRoute });
    }
  }

  // editTaxonomyEntrypointPage(event) {
  //   if (event.data.id) {
  //     this.router.navigate(['edit', event.data.id], { relativeTo: this.activeRoute });
  //   }
  // }

  onDelete(event): void {
    this.deleteTaxonomyEntrypoint(event.data);
  }

  deleteTaxonomyEntrypoint(taxonomyEntryPoint: TaxonomyEntrypoint) {
    if (taxonomyEntryPoint) {
      this.taxonomyEntryPointService.deleteTaxonomyEntrypointById(taxonomyEntryPoint.id).subscribe(
        res => {
          this.getAllTaxonomyEntrypoints();
          console.log(this.activeRoute);
          this.router.navigate(['taxonomyEntryPoint'], { relativeTo: this.activeRoute.parent });
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}

