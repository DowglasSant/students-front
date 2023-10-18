import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentFilterComponent } from './student-filter/student-filter.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentUpdateComponent } from './student-update/student-update.component';

const routes: Routes = [
  { path: '', component: StudentListComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'students/new', component: StudentRegisterComponent },
  { path: 'students/:id/edit', component: StudentUpdateComponent },
  { path: 'students/filter', component: StudentFilterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }