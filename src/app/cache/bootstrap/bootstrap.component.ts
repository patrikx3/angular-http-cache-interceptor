import { Component, OnInit } from '@angular/core';
import {HighlightService} from "../../common/highlight.service";
import { DefaultComponentComponent } from '../../common/default-component/default-component.component';
import { MatDividerModule } from '@angular/material/divider';



@Component({
    selector: 'p3x-bootstrap-cache',
    templateUrl: './bootstrap.component.html',
    styleUrls: ['./bootstrap.component.scss'],
    standalone: true,
    imports: [MatDividerModule, DefaultComponentComponent]
})
export class BootstrapComponent implements OnInit {

  defaultSettings: string

  constructor(private service: HighlightService) { }

  ngOnInit(): void {

      this.defaultSettings = this.service.hljs.highlight(

`import { P3XHttpCacheInterceptorModule, CachingHeaders, CachingStore } from 'p3x-angular-http-cache-interceptor';

@NgModule({
  declarations: [],
  imports: [
    P3XHttpCacheInterceptorModule.forRoot({
      behavior: CachingHeaders.Cache,
      store: CachingStore.Global,
    }),
    CommonModule
  ]
})
export class NonCacheModule { }`, { language: 'typescript'}).value
  }

}
