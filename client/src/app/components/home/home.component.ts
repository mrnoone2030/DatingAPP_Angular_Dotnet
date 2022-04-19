import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelRegisterHandler(bool: boolean){
    this.registerMode = bool;
  }

  private isLoggedIn(){
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if(token){
      this.router.navigate(['/members']);
    }
  }

}
