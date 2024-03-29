import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {BootstrapComponent} from "./bootstrap/bootstrap.component";

const routes: Routes = [
  {
    path: '**',
    component: BootstrapComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NonCacheRoutingModule {
}
