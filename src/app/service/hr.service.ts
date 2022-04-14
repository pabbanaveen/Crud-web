import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export class Hr{
  constructor(
    public id:number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public recruited: number
  ){

  }
}

@Injectable({
  providedIn: 'root'
})
export class HrService {

  constructor(private http: HttpClient ) { }

  retriveAllHrData() {
    return this.http.get<Hr[]>('http://localhost:8080/getAllHrData');
  }

  addHr(hr: any) {
    console.log(hr);
    return this.http.post<any>('http://localhost:8080/addHr', hr);
  }

  editHr(hr: any) {
    console.log(hr, 'update');
    return this.http.put<any>('http://localhost:8080/updateHr', hr);
  }

  deleteHr(id: any) {
    console.log(id, 'delete');
    return this.http.delete<any>(`http://localhost:8080/deleteHr/${id}`);
  }
}
