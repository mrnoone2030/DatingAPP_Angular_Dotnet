import { AccountService } from './../../_services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<boolean>();
  model:any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    
  }

  register(){
    this.accountService.register(this.model).subscribe(res => {
      console.log('registered & logged in', res);
      this.cancel();
    },
    (err) => console.log('Error while registering ', err)
    );
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
