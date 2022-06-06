import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie/movie.component';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: MovieComponent,
  },
];

@NgModule({
  declarations: [MovieComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    AppMaterialModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
