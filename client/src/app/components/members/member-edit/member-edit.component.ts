import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../../_services/account.service';
import { MemberService } from './../../../_services/member.service';
import { Member } from './../../../_models/member';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { switchMap, take } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  member: Member;
  user: User;

  constructor(private memberService: MemberService, 
    private toastrService: ToastrService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadUserAndMember();
  }

  loadUserAndMember(){
    this.accountService.currentUser$.pipe(
      switchMap(currUser=> {
        this.user = currUser;
        return this.memberService.getMember(this.user.username)
      })
    ).pipe(
      take(1)
    ).subscribe(member => this.member = member);
  }

  onUpdateMember(){
    this.memberService.updateMember(this.member).subscribe(()=> {
      this.toastrService.success('Updated Profile successfully');
      this.editForm.reset(this.member);
    })
    
  }

}
