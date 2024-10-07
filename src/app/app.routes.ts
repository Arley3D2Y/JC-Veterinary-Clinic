import { Routes } from '@angular/router';
import { WelcomePageComponent } from './landing-page/welcome-page/welcome-page.component';

import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './cliente/dashboard/dashboard.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';

import { VeterinarioClientesComponent } from './veterinario/veterinario-clientes/veterinario-clientes.component';
import { VeterinarioMascotasComponent } from './veterinario/veterinario-mascotas/veterinario-mascotas.component';
import { EntityDetailsComponent } from './veterinario/entity-details/entity-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección a home
    { path: 'home', component: WelcomePageComponent }, // Ruta para la landing page
    { path: 'login', component: LoginComponent }, // Login usuario
    { path: 'veterinario/clientes', component: VeterinarioClientesComponent },
    { path: 'veterinario/mascotas', component: VeterinarioMascotasComponent },
    { path: 'veterinario/detalles/cliente/:id', component: EntityDetailsComponent },
    { path: 'veterinario/cleinte/:id/actualizar', component: EntityDetailsComponent },
    
    { path: 'veterinario/detalles/mascota/:id', component: EntityDetailsComponent },

    { path: 'cliente/dashboard/:cedula', component: DashboardComponent },


    { path: 'page-not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/page-not-found' }, // Redirección en caso de ruta no encontrada


];
