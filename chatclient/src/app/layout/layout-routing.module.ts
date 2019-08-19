import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
{  path: '',
  component: LayoutComponent,
  children: [
    { path: '', redirectTo: 'profile', pathMatch: 'prefix' },
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
    { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) }]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
