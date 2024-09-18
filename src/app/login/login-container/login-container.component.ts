import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-container',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule
  ],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.css'
})
export class LoginContainerComponent {


  constructor() { }

  onSubmit() {
    console.log('submit');
  }

}
