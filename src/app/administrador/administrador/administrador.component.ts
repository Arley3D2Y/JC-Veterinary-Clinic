import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SharedHeaderComponent } from '../../ToolsComponents/shared-header/shared-header.component';
import { SearchBarComponent } from '../../ToolsComponents/search-bar/search-bar.component';
import { CardsTableComponent } from '../../ToolsComponents/cards-table/cards-table.component';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [
    CommonModule,
    SharedHeaderComponent,
    SearchBarComponent,
    CardsTableComponent
  ],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  // Defininimos un propiedad para manejar elmtipo de objeto
  typeSection!: 'veterinarios' | 'drogas' | 'dashboard';
  constructor(private route: ActivatedRoute) {} 

    // Puedes inicializar el tipo según lo que necesites o pasar dinámicamente al cargar
    setTypeObject(type: 'veterinarios' | 'drogas') {
      this.typeSection = type;
    }
  
    ngOnInit(): void {
      // Al cargar el componente, obtenemos el valor de `typeObject` desde la ruta
      this.route.data.subscribe((data) => {
        this.typeSection = data['type'];
      });
    }
}
