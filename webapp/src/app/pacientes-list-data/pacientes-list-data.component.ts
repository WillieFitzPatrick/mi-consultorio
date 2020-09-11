import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { IPaciente, IVisita, Visita } from "../models/models";
@Component({
  selector: 'app-pacientes-list-data',
  templateUrl: './pacientes-list-data.component.html',
  styleUrls: ['./pacientes-list-data.component.scss']
})
export class PacientesListDataComponent implements OnInit {
  @Input("paciente") paciente: IPaciente;
  @Output("onEditPaciente") onEditPaciente = new EventEmitter<IPaciente>();

  status: { [key: string]: any } = {};
  selectedVisita: IVisita|null = null;
  visitasCount: number = 0;
  constructor( private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.status.isLoading = false;
    this.status.isLoadingMore = true;
    this.status.dataError = false;
    this.status.isEditingVisita = false;
    this.status.nuevaVisita = false;
    this.visitasCount = this.paciente.Visitas.length;
    this.status.lastVisitaShownIndex = Math.min(2, this.visitasCount);

    // Reordeno las visitas por Fecha + Id
    if (this.visitasCount) {
      // this.paciente.Visitas.reverse();
      const v = this.paciente.Visitas.sort(function(a:IVisita, b:IVisita) {
        if (a.Fecha > b.Fecha) {
          return -1;
        }
        if (a.Fecha < b.Fecha) {
          return 1;
        }
        if (a.Fecha === b.Fecha) {
          return b.ID - a.ID;
        }
        // a must be equal to b
        // return 0;
      });
      this.paciente.Visitas = v;
    }

  }

  onNuevaVisita(event) {
    this.status.nuevaVisita = true;
    this.status.isEditingVisita = true;
    this.selectedVisita = Visita(null);
  }

  onVerVisita(visita: IVisita) {
    this.status.nuevaVisita = false;
    this.status.isEditingVisita = true;
    this.selectedVisita = Visita(visita); 
  }

  verMasVisitas() {
    this.status.lastVisitaShownIndex += 3;
  }

  onCloseVisitaForm( visita: IVisita|null) {
    if (visita) {
      if (this.status.nuevaVisita) {
        this.paciente.Visitas = [visita, ...this.paciente.Visitas];
        this.visitasCount = this.paciente.Visitas.length;
        this.cd.detectChanges();
      }
    }
    this.status.isEditingVisita=false;
  }
  onEdit() {
    this.onEditPaciente.emit(this.paciente);
  }

  trackByFn(index, item: IVisita) {
    return item.ID;
  }

}
