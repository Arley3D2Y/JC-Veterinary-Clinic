import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from "../form-login/form-login.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormLoginComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userType: string | null = null; // Se almacenará el tipo de usuario ('admin' o null)

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Verificamos si el parámetro 'type' está en la ruta
    this.userType = this.route.snapshot.data['type'] || null;
  }
}
