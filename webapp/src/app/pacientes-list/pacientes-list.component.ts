import { Component, OnInit, Input } from '@angular/core';
import { IPaciente, Paciente} from '../models/models';


@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrls: ['./pacientes-list.component.scss']
})
export class PacientesListComponent implements OnInit {
@Input("pacientes") pacientes: any[];
@Input("title") title: string;
  constructor() { }
  status: { [key: string]: any } = {};
  selectedPaciente: IPaciente|null = null;

  ngOnInit(): void {
    this.status.isLoading = false;
    this.status.isLoadingMore = true;
    this.status.dataError = false;
    this.status.dataNotFound = false;
    this.status.isEditing = false;
    this.status.hideFilters = true;
    this.status.hoy = Date.now();
    this.status.offset = 0;
    this.status.hasMore = false;
    this.status.isNew = false;
    this.status.scrollPosition = [0,0];
  }

  // onEdit( edit: {paciente: IPaciente, asNew: boolean}) {
  //   // this.selectedBien = edit.bien;
  //   // this.status.isNew = edit.asNew;
  //   // this.status.isEditing = true;
  //   // this.scrollToTop();
  // }

  editarPaciente( paciente: IPaciente) {
    this.selectedPaciente = Paciente(paciente)
    this.status.isNew = false;
    this.status.isEditing = true;
  }

  nuevoPaciente(event) {
    this.selectedPaciente = Paciente(null)
    this.status.isEditing = true;
    // this.scrollToTop();
}
closeEditForm(event) {
    this.status.isEditing = false;
    // if (event === null) {
    //     this.scrollToSelected( this.selectedBien.Id.toString() );
    //     return
    // }
    // let index = this.bienes.findIndex( bien => {return bien.Id === event.Id});
    // if (index !== -1) {
    //     this.bienes[index] = event;
    //     this.scrollToSelected(this.selectedBien.Id.toString());

    // } else {
    //     this.bienes = [event,...this.bienes];
    //     this.selectedBien = event;
    //     this.scrollToTop();
    // }
}

}
