import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="https://allard.top" target="_blank">Allard</a></b> 2018 <a href="http://www.miitbeian.gov.cn/" target="_blank">粤ICP备18042994号</a></span>
    <div class="socials">
      <a href="https://github.com/Allard-Ivan" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}
