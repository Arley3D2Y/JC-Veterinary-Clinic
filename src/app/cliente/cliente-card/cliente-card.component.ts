import { Component, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../model/cliente';
import { CustomerService } from '../../services/customer.service';


@Component({
  selector: 'app-cliente-card',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule
    ],
  templateUrl: './cliente-card.component.html',
  styleUrls: ['./cliente-card.component.css']
})
export class ClienteCardComponent {
  @Input() 
  cliente!: Cliente;

}
