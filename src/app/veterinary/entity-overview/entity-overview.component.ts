import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';
import { SharedHeaderComponent } from '../shared-header/shared-header.component';

@Component({
  selector: 'app-entity-overview',
  standalone: true,
  imports: [
    SharedHeaderComponent
  ],
  templateUrl: './entity-overview.component.html',
  styleUrl: './entity-overview.component.css'
})
export class EntityOverviewComponent {
  @Input()
  customerSelected!: Customer;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService  
  ) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.customerSelected = this.customerService.findById(id);
    });
  }
}
