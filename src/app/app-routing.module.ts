import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SocialComponent } from './social/social.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  title: "Griffin Moyer",  
},
{
  path: 'social',
  component: SocialComponent,
  title: "Griffin Moyer | Social"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
