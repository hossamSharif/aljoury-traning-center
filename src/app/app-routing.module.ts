import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SectionsComponent } from './sections/sections.component';
import { SectionDetailsComponent } from './section-details/section-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SectionModalComponent } from './section-modal/section-modal.component';
import { TeacherModalComponent } from './teacher-modal/teacher-modal.component';
import { OfferModalComponent } from './offer-modal/offer-modal.component';
import { ImgModalComponent } from './img-modal/img-modal.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sections', component: SectionsComponent },
  { path: 'section-details', component: SectionDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'section-modal', component: SectionModalComponent },
  { path: 'offer-modal', component: OfferModalComponent },
  { path: 'teacher-modal', component: TeacherModalComponent },
  { path: 'img-modal', component: ImgModalComponent },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
