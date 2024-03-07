import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/validators/constants';
import { UserService } from '../user.service';

interface Profile {
  username: string;
  email: string;
  tel: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit{
  isEditMode: boolean = false;
  appEmailDomains = DEFAULT_EMAIL_DOMAINS;

  profileDetails: Profile = {
    username: '',
    email: '',
    tel: '',
  };

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  @ViewChild('form')
  form!: NgForm;

  ngOnInit(): void {
    const {username, email, tel} = this.userService.user!;
    this.profileDetails= {
      username,
      email,
      tel,
    };

    this.form.setValue({
      username,
      email,
      tel,
    })
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  editUserProfile(): void {
    if (this.form.invalid) {
      return;
    }

    this.profileDetails = { ...this.form.value } as Profile;
    const { username, email, tel } = this.profileDetails;
    this.userService.editUserProfile(username, email, tel).subscribe(() => {
      this.toggleEditMode();
    });
    // this.router.navigate(['/profile']);
  }
}
