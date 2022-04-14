import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userName = "";
  isUserLogin = false;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.userName = this.route.snapshot.params['name'];
    this.getIsUserLogin();
  }

  getIsUserLogin() {
    // alert(this.userName);
    if(this.userName !== "") {
      this.isUserLogin = true;
    } else {
      this.isUserLogin = false;
    }
    return 
  }

}
