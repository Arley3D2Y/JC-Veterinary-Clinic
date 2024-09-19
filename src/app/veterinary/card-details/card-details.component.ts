import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { Pet } from '../../model/pet';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent {
  @Input()
  customerSelected!: Customer;

  mascotas?: Pet[];

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService  
  ) {
    this.mascotas = [];
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.customerSelected = this.customerService.findById(id);

      this.mascotas = this.customerService.getPetsByCustomerId(id);
    });
  }
}
