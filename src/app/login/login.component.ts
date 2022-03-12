import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../common/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  token: string = '';
  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.loginForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  /**
   * I need to recieve the username and password and
   * do a post request to the server api
   *
   * I need a service
   */
  onSubmit() {
    let body: any = {
      username: "user",
      password: "1234"
    }
    this.httpClient.post('http://localhost:4001/api/users/login', body).subscribe(data => {
      let token:any = data;

      localStorage.setItem("token", token.authToken);
      this.router.navigate(['home']);
    });
  }

}
