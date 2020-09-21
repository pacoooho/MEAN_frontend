import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Employee } from '../models/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

URL_API = 'http://localhost:3000/api/employees'

selectedEmployee: Employee={
  name: "",
  position: "",
  office: "",
  salary: 0
  
};
employees: Employee[]=[];

getEmployees(){


  return this.http.get<Employee[]>(this.URL_API);

}
createEmployee(employee: Employee){
return this.http.post(this.URL_API,employee);
}

deleteEmployee(id:string){
  return this.http.delete(this.URL_API+"/"+id);
}
updateEmployee(employee: Employee){
  return this.http.put(this.URL_API+"/"+employee._id,employee);
}
}
