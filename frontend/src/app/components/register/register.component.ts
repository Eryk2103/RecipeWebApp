import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/models/registerUser';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    username: ['',{ validators: [Validators.required]}],
    password: ['',{ validators: [Validators.required]}],
  });

  error: string = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  validate(){
    if(this.registerForm.get('username')?.invalid){
      this.error = "Username is required";
      return false;
    }
    if(this.registerForm.get('password')?.invalid){
      this.error = "Password is required";
      return false;
    }
    return true;
  }
  onSubmit(){
    if(!this.validate()){
      return;
    }
    const user = <RegisterUser>{
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
    }
    this.authService.register(user).subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: (e) => this.error = "User with this username already exists"
    });
  }
}
