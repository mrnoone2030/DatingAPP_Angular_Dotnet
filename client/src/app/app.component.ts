import { AccountService } from './_services/account.service';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any;

  constructor(private accountService: AccountService){}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  private setCurrentUser(){
    const item = localStorage.getItem('user');
    if(item){
      const user: User = JSON.parse(item);
      this.accountService.setCurrentUser(user);
    }
    
  }
}
