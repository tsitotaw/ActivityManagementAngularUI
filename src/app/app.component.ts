import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './common/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UserUI';

  constructor(private router: Router, private sharedService:SharedService){}

  logout(){
    localStorage.removeItem("token");
    this.sharedService.IS_USER_AUTHENTICATED = false;
    this.router.navigate(['login']);
  }
}
