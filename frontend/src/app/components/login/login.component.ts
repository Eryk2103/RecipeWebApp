import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    username: ['',{ validators: [Validators.required]}],
    password: ['',{ validators: [Validators.required]}]
  });

  error: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}
  
  validate(){
    if(this.loginForm.get('username')?.invalid){
      this.error = 'Username is required'
      return false;
    }
    if(this.loginForm.get('password')?.invalid){
      this.error = 'Password is required'
      return false;
    }
    return true;
  }
  onSubmit(){
    if(!this.validate()){
      return;
    }
  
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if(username && password){
      this.authService.login(username , password).subscribe(
        {
          next: () => this.router.navigateByUrl('/recipes'),
          error:  e => this.error = "Invalid credentials"
        }
      );
    }
  }
}
