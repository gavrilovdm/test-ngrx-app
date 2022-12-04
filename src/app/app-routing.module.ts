import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'overview',
    loadChildren: () => import('./pages/overview/overview.module').then(m=>m.OverviewModule),
    pathMatch:'full'
  },
  {
      path: '',
      redirectTo: 'overview',
      pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'overview',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
