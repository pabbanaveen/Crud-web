import { Component, OnInit } from '@angular/core';
import { DeveloperService } from '../service/developer.service';
import { HrService } from '../service/hr.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit {
  id : number | undefined;
  firstName: string | undefined;
  lastName: string| undefined;
  email: string | undefined;
  phone: string | undefined;
  project: string| undefined
  isEditOrSave: string | undefined
  constructor(private developerService: DeveloperService) { }
  allDevelopers: any[] = []
  ngOnInit(): void {
    this.getAllDevelopers();
  }
  async getAllDevelopers() {
    await this.developerService.getAllDevelopers().subscribe(
      (response:any) => {
        console.log(response);
        this.allDevelopers =  response.developmentResponse;
        console.log(this.allDevelopers?.map((a) => a?.email));
      }
    );
  }

  async saveData() {
    var data = [];  
      var loc = {
      "id": this.id,
      "firstName" : this.firstName,
      "lastName" : this.lastName,
      "email" : this.email,
      "phone" : this.phone,
      "project" : this.project
    };
   
    data.push(loc);
      if(this.isEditOrSave === "add") {
        
        await this.developerService.addDeveloper({"developmentReq": data}).subscribe(
          response => {
            console.log(response);
             this.getAllDevelopers();
          },
          error => {
            console.log(error);
          }
        );
        this.isEditOrSave = "";
      } else if(this.isEditOrSave === "edit") {
        await this.developerService.updateDeveloper(loc).subscribe(
          response => {
            console.log(response);
            this.getAllDevelopers();
          },
          error => {
            console.log(error);
          }
        );
        
        this.isEditOrSave = "";
      }
  }

  openPopup(type: any, dev: any) {
    console.log(type);
    if(type === "add") {
      this.isEditOrSave = "add";
      this.id = 0;
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.phone = "";
      this.project = "";
    }
    if(type === "edit") {
      this.isEditOrSave = "edit";
      this.id = dev.id;
      this.firstName = dev.firstName;
      this.lastName = dev.lastName;
      this.email = dev.email;
      this.phone = dev.phone;
      this.project = dev.project;
    }
  }

  deleteDeveloper(id:number) {
    this.developerService.deleteDeveloper(id).subscribe(
      () => {
        this.getAllDevelopers();
      }
      // response => {
      //   console.log("delete ", response);
      //   this.getAllHrsData();
      // }, 
      // error=> {
      //   console.log("delete error", error);
      // }
    )
  }

}
