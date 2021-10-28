import { Component, OnInit, ViewChild } from '@angular/core';
import { Ljk } from '../../model/ljk';
import { LjkService } from '../../service/ljk.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ljk-list',
  templateUrl: './ljk-list.component.html',
  styleUrls: ['./ljk-list.component.scss'],
  providers: [LjkService]
})
export class LjkListComponent implements OnInit {

  public listOfLJK: Ljk[];
  settings: any;

  constructor(
    private router: Router,
    private ljkService: LjkService,
    public activeRoute: ActivatedRoute,
    public translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    router.events.subscribe(console.log);
  }

  ngOnInit() {
    this.getAllLjk();

    this.settings = {
      columns: {
        code: {
          title: this.translate.instant('master.ljk.code')
        },
        name: {
          title: this.translate.instant('master.ljk.name')
        },
        institutionType: {
          title: this.translate.instant('master.ljk.institutionType'),
          valuePrepareFunction: (value) => {
            if (value) {
              const values: any = JSON.parse(value);
              return values.value;
            }
          },
        }
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

  getAllLjk() {
    this.ljkService.findAll().subscribe(
      listOfLJK => {
        this.listOfLJK = listOfLJK;
      },
      err => {
        console.log(err);
      }

    );
  }

  onDelete(event): void {
    this.deleteLjk(event.data);
  }

  redirectNewLjkPage() {
    this.router.navigate(['create'], { relativeTo: this.activeRoute });
  }

  editLjkPage(ljk: Ljk) {
    if (ljk) {
      this.router.navigate(['edit', ljk.id], { relativeTo: this.activeRoute });
    }
  }

  deleteLjk(ljk: Ljk) {
    if (ljk) {
      this.ljkService.deleteLjkById(ljk.id).subscribe(
        res => {
          this.getAllLjk();
          this.router.navigate(['ljk'], { relativeTo: this.activeRoute.parent });
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}

