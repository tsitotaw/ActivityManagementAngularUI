import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantHelperService } from './common/constant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UserUI';
  loggedInUserFullName:String = "";

  constructor(private router: Router, public constantHelperService:ConstantHelperService){

  }

  logout(){
    localStorage.removeItem("token");
    this.constantHelperService.IS_USER_AUTHENTICATED = false;
    this.router.navigate(['login']);
  }
}
