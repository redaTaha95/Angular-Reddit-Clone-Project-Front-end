import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {PostTitleComponent} from "../shared/post-title/post-title.component";
import {AppModule} from "../app.module";



@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppModule
  ]
})
export class AuthModule { }
