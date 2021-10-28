import { Component, OnInit, ViewChild } from '@angular/core';
import { TaxonomyRelease } from '../../../model/taxonomy-release';
import { TaxonomyReleaseService } from '../../../service/taxonomy-release.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-taxonomy-upload-list',
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.scss'],
  providers: [TaxonomyReleaseService]
})
export class ReleaseListComponent implements OnInit {

  public taxonomyReleases: TaxonomyRelease[];
  cols: any[];
  first = 0;
  rows = 10;
  loading: boolean = true;
  settings: any;

  constructor(
    private router: Router,
    private taxonomyReleaseService: TaxonomyReleaseService,
    public activeRoute: ActivatedRoute,
    public translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {
    this.getAllTaxonomyReleases();
  }

  getAllTaxonomyReleases() {
    this.taxonomyReleaseService.findAll().subscribe(
      taxonomyReleases => {
        this.taxonomyReleases = taxonomyReleases;
      },
      err => {
        console.log(err);
      }

    );
  }

  redirectNewTaxonomyReleasePage() {
    this.router.navigate(['create'], { relativeTo: this.activeRoute });
  }

  editTaxonomyReleasePage(taxonomyReleases: TaxonomyRelease) {
    if (taxonomyReleases) {
      this.router.navigate(['edit', taxonomyReleases.id], { relativeTo: this.activeRoute });
    }
  }

  onDelete(event): void {
    this.deleteTaxonomyRelease(event.data);
  }

  deleteTaxonomyRelease(taxonomyRelease: TaxonomyRelease) {
    if (taxonomyRelease) {
      this.taxonomyReleaseService.deleteTaxonomyReleaseById(taxonomyRelease.id).subscribe(
        res => {
          this.getAllTaxonomyReleases();
          console.log(this.activeRoute);
          this.router.navigate(['/taxonomy/release'], { relativeTo: this.activeRoute });
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}

