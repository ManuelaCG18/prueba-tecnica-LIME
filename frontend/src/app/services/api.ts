import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Obtener catálogo de ubicaciones para el selector
  getUbicaciones(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ubicaciones`);
  }

  // Obtener equipos (con soporte para los filtros combinables)
  getEquipos(filtros?: { tipo_equipo?: string, query?: string }): Observable<any> {
    let params = new HttpParams();

    if (filtros?.tipo_equipo) {
      params = params.set('tipo_equipo', filtros.tipo_equipo);
    }
    if (filtros?.query) {
      params = params.set('query', filtros.query);
    }

    return this.http.get(`${this.baseUrl}/equipos`, { params });
  }

  // Actualizar un equipo
  updateEquipo(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/equipos/${id}`, data);
  }

  // Eliminar un equipo
  deleteEquipo(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/equipos/${id}`);
  }
}
