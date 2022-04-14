import { Component, OnInit } from '@angular/core';
import { Hr, HrService } from '../service/hr.service';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})
export class HrComponent implements OnInit {
  id : number | undefined;
  firstName: string | undefined;
  lastName: string| undefined;
  email: string | undefined;
  phone: string | undefined;
  recruited: number| undefined
  isEditOrSave: string | undefined
  constructor(private hrService: HrService) { }
  allHrs: any[] = []
  ngOnInit(): void {
    this.getAllHrsData();
  }
  async getAllHrsData() {
    await this.hrService.retriveAllHrData().subscribe(
      (response:any) => {
        console.log(response);
        this.allHrs =  response.hrsResp;
        console.log(this.allHrs.map((a) => a.email));
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
      "recruited" : this.recruited
    };
   
    data.push(loc);
      if(this.isEditOrSave === "add") {
        
        await this.hrService.addHr({"hrReq": data}).subscribe(
          response => {
            console.log(response);
             this.getAllHrsData();
          },
          error => {
            console.log(error);
          }
        );
        this.isEditOrSave = "";
      } else if(this.isEditOrSave === "edit") {
        await this.hrService.editHr(loc).subscribe(
          response => {
            console.log(response);
            this.getAllHrsData();
          },
          error => {
            console.log(error);
          }
        );
        
        this.isEditOrSave = "";
      }
  }

  openPopup(type: any, hrData: any) {
    console.log(type);
    if(type === "add") {
      this.isEditOrSave = "add";
      this.id = 0;
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.phone = "";
      this.recruited = 0;
    }
    if(type === "edit") {
      this.isEditOrSave = "edit";
      this.id = hrData.id;
      this.firstName = hrData.firstName;
      this.lastName = hrData.lastName;
      this.email = hrData.email;
      this.phone = hrData.phone;
      this.recruited = hrData.recruited;
    }
  }

  deleteHr(id:number) {
    this.hrService.deleteHr(id).subscribe(
      () => {
        this.getAllHrsData();
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
  // saveData() {

  // }
}
