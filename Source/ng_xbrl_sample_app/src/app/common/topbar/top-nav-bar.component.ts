import { User } from './../../model/user';
import { Component } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbThemeService } from '@nebular/theme';
import { UserService } from '../../service/user.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-topnavbar',
  providers: [UserService],
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss'],
})
export class TopNavBarComponent {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: User = new User(1, '', '', '', 'SYSTEM', '');
  title: string;

  userMenu = [{ title: 'Log out' }];

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    }
  ];

  currentTheme = 'default';

  constructor(
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserService,
    private breakpointService: NbMediaBreakpointsService,
    public activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    const userStr = localStorage.getItem('userData');
    if (userStr == null) {
      this.userService.findInfo().subscribe(
        user => {
          localStorage.setItem('userData', JSON.stringify(user));
          this.user = user;
        },
        err => {
          this.user = new User(1, '', '', '', '', '');
        }

      );
    } else {
      this.user = JSON.parse(userStr);
    }

    if (this.user) {
      if (this.user.userType === 'REGULATOR') {
        this.title = 'Regulator';
      } else if (this.user.userType === 'INSTITUTION') {
        this.title = this.user.ljk.name;
      }
    }

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    if (themeName === 'default') {
      $('.logo').attr('src', 'assets/images/logo.png')
    } else {
      $('.logo').attr('src', 'assets/images/logo_white.png')
    }
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
