import { AccountService } from './../../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any ={};
  currentUser$: Observable<User| null> = new Observable<User|null>();
  
  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    this.accountService.login(this.model).subscribe(res=> {
      this.router.navigate(['/members']);
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigate(['/']);

  }

}
