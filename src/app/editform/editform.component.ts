import { Component } from '@angular/core';
import { FormGroup,  FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Validators} from '@angular/forms'
import { EmployeeService } from '../employee.service';

import { Employee } from '../employee';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editform',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './editform.component.html',
  styleUrl: './editform.component.css'
})
export class EditformComponent {
  get name(){
   return this.employeeForm.get('name');
  }
  get position(){
    return this.employeeForm.get('position');
  }
  get email(){
    return this.employeeForm.get('email');
  }
  get phone(){
    return this.employeeForm.get('phone');
  }
   
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private activatedroute: ActivatedRoute,
    private location:Location
  ) {
    
  }
  employeeForm!: FormGroup;
    selectedemployee!: Employee;
 
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    })
      this.tobeUpdate();
    
  }
  tobeUpdate(){
     const id = Number(this.activatedroute.snapshot.paramMap.get('id'));
     console.log(id);
     this.employeeService.getEmployee(id).subscribe(i=>{
      this.selectedemployee=i
      this.employeeForm.patchValue({
        name:this.selectedemployee.name, 
        position:this.selectedemployee.position,
        email:this.selectedemployee.email,
        phone:this.selectedemployee.phone
      });
     });
  }
  update(name:string,position:string,email:string,phone:string){
    const id = Number(this.activatedroute.snapshot.paramMap.get('id'));
    this.employeeService.updateEmployee({id,name,position,phone,email}as Employee).subscribe(()=>{
      this.goback();
    })
  }

  
  goback(){
    this.location.back();
  }

}
