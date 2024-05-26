import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';
@Injectable({
  providedIn: 'root'
})
export class WebMemoryApiService implements InMemoryDbService{

 createDb(){
  const myemployees=[
    { id: 1, name: 'Disha Sachdeva', position: 'Developer', email: 'disha@gmail.com', phone: '1234567890' },
    { id: 2, name: 'Nitanshi', position: 'Designer', email: 'nits@gmail.com', phone: '0987654321' },
    { id: 3, name: 'Abcd', position: 'Project Manager', email: 'abcd@gmail.com', phone: '1112223333' },
    { id: 4, name: 'NoOne', position: 'QA Engineer', email: 'noOne@gmail.com', phone: '4445556666' },
    { id: 5, name: 'Priyaa', position: 'DevOps Engineer', email: 'priyaa@gmail.com', phone: '7778889999' }
  ]
  return { myemployees };
 }
 genId(myemployees: Employee[]): number {
  return myemployees.length > 0 ? Math.max(...myemployees.map(employee => employee.id)) + 1 : 1;
}

}
