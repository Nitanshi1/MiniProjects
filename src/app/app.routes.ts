import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EditformComponent } from './editform/editform.component';
export const routes: Routes = [
  { path: "", redirectTo: "/employee", pathMatch: 'full' },
  { path: "employee", component: EmployeeListComponent },
  { path: 'add-employee', component: EmployeeFormComponent },
  { path: 'edit-employee/:id', component: EditformComponent },

];
