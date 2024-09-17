import { Component, Input } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router'; // Importamos RouterModule
import { Pet } from '../../../model/pet';
import { PetService } from '../../../services/pet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './pet-detail.component.html',
  styleUrl: './pet-detail.component.css'
})
export class PetDetailComponent {
  @Input()
  mascota!: Pet;

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.mascota = this.petService.findById(id);
    });
  }


}
