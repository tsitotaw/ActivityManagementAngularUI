import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantHelperService } from '../common/constant.service';
import { UserServiceService } from '../common/user-service.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LocalHttpClient } from '../local-http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  token: string = '';
  constructor(private fb: FormBuilder,
    private localHttpClient: LocalHttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private constantHelperService:ConstantHelperService) {
    this.loginForm = fb.group({
      'userName': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if(this.constantHelperService.IS_USER_AUTHENTICATED){
      this.router.navigate(['activity','type'])
    }
  }

  gotoSignup(){
    this.router.navigate(['signup']);
  }
  /**
   * I need to recieve the username and password and
   * do a post request to the server api
   *
   * I need a service
   */
  onSubmit() {
    this.localHttpClient.post('http://localhost:5000/api/users/login', this.loginForm.value).subscribe(data => {
      let token:any = data;
      this.constantHelperService.IS_USER_AUTHENTICATED = true;
      /**
       * Also Update User Info Object and display Welcome
       */
      const helperJwtService = new JwtHelperService();
      const decodedToken = helperJwtService.decodeToken(token.authToken);
      if(token.authToken == false){
        alert("Invalid UserName or password. Please try again")
        return;
      }
      this.constantHelperService.LOGGED_IN_USER = decodedToken;
      localStorage.setItem("token", token.authToken);
      this.router.navigate(['activity','type']);
    });
  }

}
