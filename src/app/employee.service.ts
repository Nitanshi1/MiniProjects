import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Employee } from './employee';
import { catchError, tap, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUrl = 'api/myemployees';  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        catchError(this.handleError<Employee[]>('getEmployees', []))
      );
  }

  
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }
 
  
  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.employeesUrl, employee, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

 
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee, this.httpOptions).pipe(
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  
  deleteEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<Employee>(url, this.httpOptions).pipe(
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }
}