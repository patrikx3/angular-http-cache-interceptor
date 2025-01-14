import { Component, OnInit } from '@angular/core';
import {HighlightService} from "../../common/highlight.service";
import { DefaultComponentComponent } from '../../common/default-component/default-component.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'p3x-bootstrap-default',
    templateUrl: './bootstrap.component.html',
    styleUrls: ['./bootstrap.component.scss'],
    imports: [MatDividerModule, DefaultComponentComponent]
})
export class BootstrapComponent implements OnInit {

  defaultSettings: string

  constructor(private service: HighlightService) { }

  ngOnInit(): void {
      this.defaultSettings = this.service.hljs.highlight(

`import { P3XHttpCacheInterceptorModule } from 'p3x-angular-http-cache-interceptor';

@NgModule({
  declarations: [],
  imports: [
    P3XHttpCacheInterceptorModule,
    CommonModule,
  ]
})
export class DefaultModule { }`, { language: 'typescript'}).value

  }

}
