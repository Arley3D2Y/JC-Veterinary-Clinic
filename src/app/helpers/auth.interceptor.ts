import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Verificar si estamos en el navegador
  if (typeof window !== 'undefined' && window.localStorage) {
    let token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      // alert("Entra a cloned: ->  " + cloned.headers.get('Authorization'));
      return next(cloned);
    }
  }

  // Si no hay token o estamos en un entorno que no sea navegador
  return next(req);
};