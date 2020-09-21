import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';
import { format } from 'path';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeServices: EmployeeService) {

  }

  ngOnInit(): void {
    this.getEmployees();
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  getEmployees() {

    this.employeeServices.getEmployees().
      subscribe(
        res => {
          this.employeeServices.employees = res;
        },
        err => console.log(err))
  }
  addEmployee(form: NgForm) {
    console.log(form.value);
    if (form.value._id) {
      console.log('actualizando');
      this.employeeServices.updateEmployee(form.value).
        subscribe(
          res => console.log(res),
          err => console.log(err)
        )
    }
    else {
      this.employeeServices.createEmployee(form.value).
        subscribe(
          res => {
            this.getEmployees();
            form.reset();
          },
          err => console.log(err));
    }

  }

  deleteEmploye(id: string) {
    console.log("delete");
    const res = confirm('Are you sure you want to delete it?');
    if (res) {
      this.employeeServices.deleteEmployee(id)
        .
        subscribe(
          res => {
            this.getEmployees();
            console.log(res);
          },
          err => console.log(err))
    }

  }

  editEmployee(employee: Employee) {
    this.employeeServices.selectedEmployee = employee;
  }


}
