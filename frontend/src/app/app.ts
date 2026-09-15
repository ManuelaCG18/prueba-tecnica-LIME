import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  equipos: any[] = [];
  ubicaciones: any[] = [];

  // Filtros de búsqueda
  tipoSeleccionado: string = '';
  busquedaTexto: string = '';

  // Objeto temporal para el equipo que se va a editar en el modal
  equipoEditar: any = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarUbicaciones();
    this.cargarEquipos();
  }

  // Nuevo metodo para asignar colores segun el tipo de equipo
  obtenerColorBadge(tipo: string): string {
    const colores: any = {
      'Surgical Aspirator': 'bg-primary-subtle text-primary-emphasis',
      'Vital Signs Monitor': 'bg-success-subtle text-success-emphasis',
      'Hospital Bed': 'bg-warning-subtle text-warning-emphasis',
      'Microscope': 'bg-danger-subtle text-danger-emphasis',
      'Medical Scale': 'bg-info-subtle text-info-emphasis',
      'Surgical Light': 'bg-secondary-subtle text-secondary-emphasis',
      'Electrocardiograph': 'bg-dark-subtle text-dark-emphasis',
      'Centrifuge': 'bg-primary-subtle text-primary-emphasis',
      'Nebulizer': 'bg-success-subtle text-success-emphasis',
      'Sterilizer': 'bg-info-subtle text-info-emphasis',
      'X-Ray Machine': 'bg-warning-subtle text-warning-emphasis',
      'Ultrasound Machine': 'bg-danger-subtle text-danger-emphasis',
      'Pulse Oximeter': 'bg-success-subtle text-success-emphasis',
      'Anesthesia Machine': 'bg-primary-subtle text-primary-emphasis',
      'Defibrillator': 'bg-danger-subtle text-danger-emphasis',
      'Neonatal Incubator': 'bg-warning-subtle text-warning-emphasis',
      'Autoclave': 'bg-secondary-subtle text-secondary-emphasis'
    }

    return colores[tipo] || 'bg-light text-dark border';
  }

  // Cargar el catálogo de ubicaciones para el selector
  cargarUbicaciones(): void {
    this.apiService.getUbicaciones().subscribe({
      next: (data) => (this.ubicaciones = data),
      error: (err) => console.error('Error al cargar ubicaciones:', err)
    });
  }

  // Cargar lista de equipos según filtros
  cargarEquipos(): void {
    const filtros: any = {};
    if (this.tipoSeleccionado) filtros.tipo_equipo = this.tipoSeleccionado;
    if (this.busquedaTexto) filtros.query = this.busquedaTexto;

    this.apiService.getEquipos(filtros).subscribe({
      next: (data) => (this.equipos = data),
      error: (err) => console.error('Error al cargar equipos:', err)
    });
  }

  aplicarFiltros(): void {
    this.cargarEquipos();
  }

  limpiarFiltros(): void {
    this.tipoSeleccionado = '';
    this.busquedaTexto = '';
    this.cargarEquipos();
  }

  eliminarEquipo(id: string): void {
    if (confirm('¿Estás segura de que deseas eliminar este equipo?')) {
      this.apiService.deleteEquipo(id).subscribe({
        next: () => {
          this.cargarEquipos();
        },
        error: (err) => console.error('Error al eliminar equipo:', err)
      });
    }
  }

  // Abrir modal de edición
  prepararEdicion(equipo: any): void {
    this.equipoEditar = { ...equipo, location: equipo.location?._id || equipo.location };
  }

  // Guardar cambios del modal
  guardarEdicion(): void {
    if (!this.equipoEditar) return;

    this.apiService.updateEquipo(this.equipoEditar._id, this.equipoEditar).subscribe({
      next: () => {
        this.equipoEditar = null;
        this.cargarEquipos();
      },
      error: (err) => console.error('Error al actualizar equipo:', err)
    });
  }
}
