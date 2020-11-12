import {NgModule} from '@angular/core'
import {PreloadAllModules, RouterModule, Routes} from '@angular/router'


const routes: Routes = [
  {
    path: 'default',
    loadChildren: () => import('./default/default.module').then(m => m.DefaultModule)
  },
  {
    path: 'cache',
    loadChildren: () => import('./cache/cache.module').then(m => m.CacheModule)
  },
  {
    path: 'non-cache',
    loadChildren: () => import('./non-cache/non-cache.module').then(m => m.NonCacheModule)
  },
  {
    path: '**',
    redirectTo: '/default'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
