import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export class Developer {
  constructor(
    public id:number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public project: string
   ) {

  }
}
@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor(private http: HttpClient ) { }

  getAllDevelopers() {
    return this.http.get<Developer[]>('http://localhost:8080/develop/getAllDevelopers');
  }

  addDeveloper(develop: any) {
    console.log(develop);
    return this.http.post<any>('http://localhost:8080/develop/addDeveloper', develop);
  }

  updateDeveloper(develop: any) {
    console.log(develop, 'update');
    return this.http.put<any>('http://localhost:8080/develop/updateDeveloper', develop);
  }

  deleteDeveloper(id: any) {
    console.log(id, 'delete');
    return this.http.delete<any>(`http://localhost:8080/develop/deleteDeveloper/${id}`);
  }
}
