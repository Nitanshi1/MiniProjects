import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { NgFor, NgIf,Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgFor,NgIf,RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  constructor(private employeeService: EmployeeService,private location:Location, private router:Router) { }
 
  employees?: Employee[] ;

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  ngOnInit(): void {
    this.getEmployees();
  }
 

  delete(employee: Employee): void {
    this.employees = this.employees?.filter(h => h !== employee);
    this.employeeService.deleteEmployee(employee.id).subscribe();
  }
  // editEmployee(id: number): void {
  //   this.router.navigate(['/edit-employee', id])
  // }
//   save(){
//     if(this.employees){
//       this.employeeService.updateEmployee(this.employees).subscribe(()=>this.goback());
  
//   }
// }
  goback(){
     this.location.back();
  }
}




