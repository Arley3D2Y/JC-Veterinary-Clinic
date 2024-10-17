import { Component, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../model/cliente';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-cliente-info-card',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule
    ],
  templateUrl: './cliente-info-card.component.html',
  styleUrls: ['./cliente-info-card.component.css']
})
export class ClienteInfoCardComponent {
  @Input() 
  cliente!: Cliente;

}
