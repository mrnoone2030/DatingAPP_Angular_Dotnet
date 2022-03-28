import { AccountService } from './../../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any ={};
  currentUser$: Observable<User| null> = new Observable<User|null>();
  
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    this.accountService.login(this.model).subscribe(res=> {
      console.log(res);
    }, 
    error => {
      console.log(error);
    }
    )
  }

  logout(){
    this.accountService.logout();

  }

}
