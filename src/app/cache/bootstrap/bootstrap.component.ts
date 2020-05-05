import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'p3x-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss']
})
export class BootstrapComponent implements OnInit {

  defaultSettings: string

  constructor() { }

  ngOnInit(): void {
    this.defaultSettings = window['hljs'].highlight('typescript',
      `import { P3XHttpCacheInterceptorModule, CachingHeaders, CachingStore  } from 'p3x-angular-http-cache-interceptor';

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
export class NonCacheModule { }`).value
  }

}
