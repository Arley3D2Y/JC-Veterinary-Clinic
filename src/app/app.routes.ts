import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { VeterinaryComponent } from './veterinary/veterinary.component';
import { CustomersTableComponent } from './veterinary/customers/customers-table/customers-table.component';
import { PetsTableComponent } from './veterinary/pets/pets-table/pets-table.component';
import { CustomerDetailComponent } from './veterinary/customers/customer-detail/customer-detail.component';
import { PetDetailComponent } from './veterinary/pets/pet-detail/pet-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección a home
    { path: 'home', component: LandingPageComponent }, // Ruta para la landing page
    { path: 'login', component:  LoginComponent}, // Login usuario
    { path: 'veterinario',
        component: VeterinaryComponent,
        children: [
          { path: '', redirectTo: 'clientes', pathMatch: 'full' },  // Redirige a 'clientes' al entrar a 'veterinario'
          { path: 'clientes', component: CustomersTableComponent },
          { path: 'detalles-cliente/:id', component: CustomerDetailComponent},
          { path: 'mascotas', component: PetsTableComponent },
          { path: 'detalles-mascota/:id', component: PetDetailComponent},
        ]
      },
    { path: '**', redirectTo: '/home' } // Redirección en caso de ruta no encontrada
];
