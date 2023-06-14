import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit{

  username: string | undefined = undefined;
  constructor(private authService: AuthService, private router: Router){

  }
  ngOnInit(){
    this.authService.username.subscribe(u => {
      this.username = u;
    })
  }
  
  logout(){
    this.authService.logout();
    this.username = '';
    this.router.navigateByUrl('/');
  }
}
