import { Component, OnInit } from '@angular/core';
import { Access } from '../../model/access';
import { Router,ActivatedRoute } from '@angular/router';
import { AccessService } from '../../service/access.service';

@Component({
  selector: 'app-access-list',
  templateUrl: './access-list.component.html',
  styleUrls: ['./access-list.component.scss'],
  providers: [AccessService]
})
export class AccessListComponent implements OnInit {

  public accesslist: Access[];
  cols: any[];
  first = 0;
  rows = 10;
  settings: any;
  constructor(private router: Router,
              private accessService: AccessService,
              public activeRoute: ActivatedRoute) {
                router.events.subscribe(console.log);

              }

  ngOnInit() {
    this.getAllAccess();
  }

  getAllAccess() {
    this.accessService.findAll().subscribe(
      accesslist => {
        this.accesslist = accesslist;
      },
      err => {
        console.log(err);
      }

    );
  }

  redirectNewAccessPage() {
    this.router.navigate([ 'create' ], { relativeTo: this.activeRoute });
  }

  editAccessPage(access: Access) {
      this.router.navigate([ 'edit',  access.id ], { relativeTo: this.activeRoute });
  }
  onDelete(event): void {
    this.deleteAccess(event.data);
  }
  deleteAccess(access: Access) {
    if (access) {
      this.accessService.deleteAccessById(access.id).subscribe(
        res => {
          this.getAllAccess();
          this.router.navigate(['access'], {
            relativeTo: this.activeRoute.parent,
          });
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}

