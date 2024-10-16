import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Tratamiento } from '../../model/tratamiento';
import { TratamientoService } from '../../services/tratamiento.service';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-treatment-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './treatment-card.component.html',
  styleUrl: './treatment-card.component.css'
})
export class TratamientoCardComponent {
  @Input()
  treatmentSelected!: Tratamiento;
  isTreatmentUpdated: Boolean = false;

  isDataLoaded: boolean = false
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tratService: TratamientoService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.tratService.findById(id).subscribe(treatment => {
        this.treatmentSelected = treatment;
        this.isDataLoaded = true
      })
    });
  }

  updateTratamienot() {
    this.isTreatmentUpdated = true;
    this.router.navigate(['/veterinario/actualizar/tratamiento', this.treatmentSelected.id])
  }

  // Función para eliminar una mascota
  deleteTratamiento(id: number) {
    this.tratService.deleteTratamiento(id).subscribe(() => {
      if (this.isTreatmentUpdated === true) {
        this.location.back();
      } else if (this.isTreatmentUpdated === false) {
        this.router.navigate(['/veterinario/tratamientos']);
      }
    })
  }

}
