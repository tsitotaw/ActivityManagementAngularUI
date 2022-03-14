import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantHelperService } from '../common/constant.service';
import { LocalHttpClient } from '../local-http-client.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  token: string = '';
  passwordNotMatch:boolean = false;
  constructor(private fb: FormBuilder,
    private localHttpClient: LocalHttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private constantHelperService:ConstantHelperService) {
    this.signUpForm = fb.group({
      'firstName': ['', Validators.required],
      'lastName': [''],
      'userName': ['', Validators.required],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
      'address': [''],
    })
  }

  ngOnInit(): void {
  }

  comparePassword(){
    if(this.signUpForm.value.password != this.signUpForm.value.confirmPassword){
      this.passwordNotMatch = true;
      return false;
    }
    return true;
  }

  /**
   * I need to recieve the username and password and
   * do a post request to the server api
   *
   * I need a service
   */
   onSignUp():any {

    if(!this.comparePassword() || this.signUpForm.status == "INVALID"){
      return false;
    }

    this.localHttpClient.post('http://localhost:5000/api/users/signup', this.signUpForm.value).subscribe(data => {
      let token:any = data;
      this.constantHelperService.IS_USER_AUTHENTICATED = true;
      /**
       * Also Update User Info Object and display Welcome
       */
      localStorage.setItem("token", token.authToken);
      this.router.navigate(['activity','type']);
    });
  }
}
