import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NbSearchService } from "@nebular/theme/components/search/search.service";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  flag: string;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private searchService: NbSearchService,
              private userService: UserService,
              private router: Router,
              private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.routerNavigationEndListen();
    
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.allard);

    window.onkeydown = event => {
      if (9 === event.keyCode) {
        this.searchService.activateSearch('rotate-layout');
      }
    };

    this.searchService.onSearchSubmit().subscribe(data => {
      let termArray = [];
      const term = data.term;
      const termAt = term.split('@');
      if (this.flag) {
        if (termAt.length === 2) {
          termArray.push(this.flag, termAt[1]);
        } else {
          termArray.push(this.flag, term);
        }
      } else {
        if (termAt.length === 2) {
          termArray.push(termAt[0], termAt[1]);
        } else {
          termArray = term.split(':');
        }
      }
      const url = '/pages/multimedia/' + termArray[0] + '-station/' + termArray[1];
      this.router.navigateByUrl(url);
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

    /**
   * 问题：从别的路由回来又重新监听了一次
   * 路由 URL 监听
   * 路由结束时查看 URL 后缀是 real, 还是 history
   */
  routerNavigationEndListen() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        // this.realHistory = event.url.split('/')[2];
        console.log(event.url);
        const url = event.url;
        const flagArr = [ 'audio', 'video' ];
        let isInclude: boolean = false;
        flagArr.forEach(flag => {
          if (url.includes(flag)) {
            this.flag = flag;
            isInclude = true;
          }
        });
        if (!isInclude) {
          this.flag = undefined;
        }
      });
  }
}
