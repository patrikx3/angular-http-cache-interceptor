import { Component, OnInit } from '@angular/core';
import {HighlightService} from "../../common/highlight.service";




@Component({
  selector: 'p3x-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss']
})
export class BootstrapComponent implements OnInit {

  defaultSettings: string

  constructor(private service: HighlightService) { }

  ngOnInit(): void {
      this.defaultSettings = this.service.hljs.highlight('typescript',

`import { P3XHttpCacheInterceptorModule, CachingHeaders, CachingStore } from 'p3x-angular-http-cache-interceptor';

@NgModule({
  declarations: [],
  imports: [
    P3XHttpCacheInterceptorModule.forRoot({
      behavior: CachingHeaders.NoCache,
      store: CachingStore.Global,
    }),
    CommonModule
  ]
})
export class NonCacheModule { }`).value

  }

}
