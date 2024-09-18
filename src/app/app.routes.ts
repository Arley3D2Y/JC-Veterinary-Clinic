import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginContainerComponent } from './login/login-container/login-container.component';
import { CustomersSearchComponent } from './veterinary/customers-search/customers-search.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección a home
    { path: 'home', component: LandingPageComponent }, // Ruta para la landing page
    { path: 'login', component:  LoginContainerComponent}, // Login usuario
    { path: 'veterinario/clientes',
        component: CustomersSearchComponent,
        children: [
          { path: '', redirectTo: 'clientes', pathMatch: 'full' },  // Redirige a 'clientes' al entrar a 'veterinario'
        ]
      },
    { path: '**', redirectTo: '/home' } // Redirección en caso de ruta no encontrada
];
