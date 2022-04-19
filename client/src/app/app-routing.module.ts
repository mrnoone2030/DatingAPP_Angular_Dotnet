import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { TestErrorsComponent } from './components/errors/test-errors/test-errors.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ListsComponent } from './components/lists/lists.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GuardGuard } from './_guards/guard.guard';
import { ServerErrorComponent } from './components/errors/server-error/server-error.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'members',
    runGuardsAndResolvers: 'always',
    canActivate: [GuardGuard],
    children: [
      {path: '', component: MemberListComponent, pathMatch: 'full'},
      {path: 'edit', component: MemberEditComponent, pathMatch: 'full', canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
      {path: ':username', component: MemberDetailComponent},
      
      
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
