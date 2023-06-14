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
    const user = <User>{
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.authService.login(user).subscribe(res => {
      this.authService.setToken(res.access_token);
      this.authService.username.next(res.username);
      this.router.navigateByUrl('/recipes');
    },e=>{
      if(e.status === 400){
        this.error = 'Invalid credentials'
      }
    });
   
  }
}
