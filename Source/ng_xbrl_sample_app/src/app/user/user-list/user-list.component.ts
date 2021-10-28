import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {

  public users: User[];

  cols: any[];
  first = 0;
  rows = 10;
  loading: boolean = true;
  settings: any;

  constructor(
    private router: Router,
    private userService: UserService,
    public activeRoute: ActivatedRoute,
    public translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'in']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    router.events.subscribe(console.log);
  }

  ngOnInit() {
    this.getAllUsers();
    this.loading = false;

    this.settings = {
      columns: {
        email: {
          title: this.translate.instant('master.user.email')
        },
        firstName: {
          title: this.translate.instant('master.user.firstName')
        },
        lastName: {
          title: this.translate.instant('master.user.lastName')
        },
        userType: {
          title: this.translate.instant('master.user.userType')
        },
        instType: {
          title: this.translate.instant('master.user.institutionType'),
          valuePrepareFunction: (value) => {
            if (value) {
              const values: any = JSON.parse(value);
              return values.value;
            }
          },
        },
        ljk: {
          title: this.translate.instant('master.user.ljk'),
          valuePrepareFunction: (value) => {
            if (value) {
              return value.name;
            }
          }
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

  getAllUsers() {
    this.userService.findAll().subscribe(
      users => {
        this.users = users;
      },
      err => {
        console.log(err);
      }

    );
  }

  redirectNewUserPage() {
    this.router.navigate(['create'], { relativeTo: this.activeRoute });
  }

  editUserPage(user: User) {
    if (user) {
      this.router.navigate(['edit', user.id], { relativeTo: this.activeRoute });
    }
  }

  onDelete(event): void {
    this.deleteUser(event.data);
  }

  deleteUser(user: User) {
    if (user) {
      this.userService.deleteUserById(user.id).subscribe(
        res => {
          this.getAllUsers();
          console.log(this.activeRoute);
          this.router.navigate(['user'], { relativeTo: this.activeRoute.parent });
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}

