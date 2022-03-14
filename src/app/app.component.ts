import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantHelperService } from './common/constant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UserUI';

  constructor(private router: Router, private constantHelperService:ConstantHelperService){}

  logout(){
    localStorage.removeItem("token");
    this.constantHelperService.IS_USER_AUTHENTICATED = false;
    this.router.navigate(['login']);
  }
}
