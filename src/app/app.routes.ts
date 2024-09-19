import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginContainerComponent } from './login/login-container/login-container.component';
import { CustomersSearchComponent } from './veterinary/customers-search/customers-search.component';
import { EntityOverviewComponent } from './veterinary/entity-overview/entity-overview.component';
import { PetFormComponent } from './veterinary/pet-form/pet-form.component';
import { VeterinaryFormsComponent } from './veterinary/veterinary-forms/veterinary-forms.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección a home
    { path: 'home', component: LandingPageComponent }, // Ruta para la landing page
    { path: 'login', component:  LoginContainerComponent}, // Login usuario
    { path: 'veterinario/clientes', component: CustomersSearchComponent },
    { path: 'veterinario/detalles-cliente/:id', component: EntityOverviewComponent },
    { path: 'veterinario/detalles-mascota/:id', component: EntityOverviewComponent },
    { path: 'veterinario/mascotas/add/:id', component: VeterinaryFormsComponent },
    { path: 'veterinario/mascota/update/:id', component: PetFormComponent },
    { path: 'veterinario/mascota/create', component: PetFormComponent },
    { path: '**', redirectTo: '/home' } // Redirección en caso de ruta no encontrada
];
