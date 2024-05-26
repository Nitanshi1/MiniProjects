import { Component,inject,TemplateRef } from '@angular/core';
import { FormGroup,  FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Validators} from '@angular/forms'
import { EmployeeService } from '../employee.service';

import { Employee } from '../employee';
import { CommonModule } from '@angular/common';
import { ModalDismissReasons,NgbModal,} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  private modalService = inject(NgbModal);
	closeResult = '';

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
  employeeForm!: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    
    private location:Location
  ) {
    
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      position: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]

    });
  }
  add(name:string,position:string,email:string,phone:string){
    name=name.trim();
    position=position.trim();
    email=email.trim();
    phone=phone.trim();
    this.employeeService.addEmployee({name,position,email,phone} as Employee).subscribe(()=>{
      this.goback();
    })
  }
  goback(){
    this.location.back();
  }
  
}


