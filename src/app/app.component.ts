import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { environment } from "../environments/environment";
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService, private titleService: Title) {
    translate.addLangs(['en', 'es','it'])
    translate.setDefaultLang('es');
    this.titleService.setTitle( environment.name );
}


}