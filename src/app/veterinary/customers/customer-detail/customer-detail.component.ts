import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterModule, ActivatedRoute, Router } from '@angular/router'; // Importamos RouterModule
import { Customer } from '../../../model/customer';
import { CustomerService } from '../../../services/customer.service';
import { Pet } from '../../../model/pet';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {
  @Input()
  cliente!: Customer;

  petList: Pet[] = [
    {
      id: 1,
      nombre: 'Lily',
      raza: 'Persa',
      sexo: 'Hembra',
      fechaNacimiento: '2019-01-01',
      fotoString: 'https://content.elmueble.com/medio/2023/04/12/gato-birmano_40aca551_230412112429_900x900.jpg'
    }
  ];

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.cliente = this.customerService.findById(id);
    });
  }


}
