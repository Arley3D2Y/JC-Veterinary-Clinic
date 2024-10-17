import { Routes } from '@angular/router';
import { WelcomePageComponent } from './landing-page/welcome-page/welcome-page.component';

import { LoginComponent } from './login/login/login.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { DashboardComponent } from './cliente/dashboard/dashboard.component';
import { VeterinarioComponent } from './veterinario/veterinario/veterinario.component';
import { EntityDetailsComponent } from './ToolsComponents/entity-details/entity-details.component';
import { FormHandlerComponent } from './ToolsComponents/form-handler/form-handler.component';
import { AdministradorComponent } from './administrador/administrador/administrador.component';
import { DashboardVeterinarioComponent } from './administrador/dashboard-veterinario/dashboard-veterinario.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección a home
    { path: 'home', component: WelcomePageComponent }, // Ruta para la landing page
    { path: 'login', component: LoginComponent }, // Login usuario
    { path: 'login/administrador', component: LoginComponent, data: { type: 'administrador' } }, 

    { path: 'cliente/dashboard/:cedula', component: DashboardComponent, data: { type: 'cliente' } }, // Ruta para el dashboard del cliente
    
    { path: 'veterinario/clientes', component: VeterinarioComponent, data: { type: 'clientes' } },
    { path: 'veterinario/detalles/cliente/:id', component: EntityDetailsComponent, data: { type: 'cliente' } },
    { path: 'veterinario/agregar/cliente', component: FormHandlerComponent },
    { path: 'veterinario/actualizar/cliente/:id', component: FormHandlerComponent },

    { path: 'veterinario/mascotas', component: VeterinarioComponent, data: { type: 'mascotas' } },
    { path: 'veterinario/detalles/mascota/:id', component: EntityDetailsComponent, data: { type: 'mascota' } },
    { path: 'veterinario/agregar/mascota/cliente/:id', component: FormHandlerComponent },
    { path: 'veterinario/actualizar/mascota/:id', component: FormHandlerComponent },

    { path: 'veterinario/tratamientos', component: VeterinarioComponent, data: { type: 'tratamientos' } },
    { path: 'veterinario/detalles/tratamiento/:id', component: EntityDetailsComponent, data: { type: 'tratamiento' } },
    { path: 'veterinario/agregar/tratamiento/mascota/:id', component: FormHandlerComponent },
    { path: 'veterinario/actualizar/tratamiento/:id', component: FormHandlerComponent },

    { path: 'administrador/veterinario', component: AdministradorComponent, data: { type: 'veterinarios' } },
    { path: 'administrador/medicamentos', component: AdministradorComponent, data: { type: 'medicamentos' } },
    { path: 'administrador/dashboard', component: DashboardVeterinarioComponent },
    { path: 'administrador/detalles/veterinario/:id', component: EntityDetailsComponent, data: { type: 'veterinario' } },
    { path: 'administrador/agregar/veterinario', component: FormHandlerComponent },
    { path: 'administrador/actualizar/veterinario/:id', component: FormHandlerComponent },


    { path: 'page-not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/page-not-found' }, // Redirección en caso de ruta no encontrada

];
