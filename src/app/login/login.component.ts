import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string | undefined;

  response:any;
  userName= "";
  password= "";
  constructor(
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  loginUser() {
    if(this.userName !== "" && this.password !== "") {
      sessionStorage.setItem("login", this.userName);
      this.router.navigate(['welcome', this.userName]);
      alert('logined success');
    }
  }
}
