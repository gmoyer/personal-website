import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SocialComponent } from './social/social.component';
import { AboutComponent } from './about/about.component';
import { ResumeComponent } from './resume/resume.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  title: "Griffin Moyer",  
},
{
  path: 'social',
  component: SocialComponent,
  title: "Griffin Moyer | Social"
},
{
  path: 'about',
  component: AboutComponent,
  title: "Griffin Moyer | About"
},
{
  path: 'resume',
  component: ResumeComponent,
  title: "Griffin Moyer | Resume"
},
{
  path: 'contact',
  component: ContactComponent,
  title: "Griffin Moyer | Contact"
},
{
  path: 'projects',
  children: [
    {
      path: '',
      component: ProjectsComponent,
      title: 'Griffin Moyer | Projects',
    },
    {
      path: ':id',
      component: BlogComponent,
      title: 'Griffin Moyer'
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
