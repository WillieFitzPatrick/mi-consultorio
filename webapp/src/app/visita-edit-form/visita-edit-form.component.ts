
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IVisita } from '../models/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-visita-edit-form',
  templateUrl: './visita-edit-form.component.html',
  styleUrls: ['./visita-edit-form.component.scss']
})
export class VisitaEditFormComponent implements OnInit {

  @Input() visita: IVisita;
  @Input() id: number;
  @Input("is-new") isNew: boolean;
  @Output("onClose") close = new EventEmitter<IVisita|null>();

  editForm: FormGroup;
  formTitle: string;
  editDisabled: Boolean;
  needsConfirm: Boolean;
  nextAction: string;

  constructor( private ds: DataService) { }

  ngOnInit() {
      this.formTitle = (this.visita.ID) ? ' Editar visita.' : 'Nueva visita.';
      this.editDisabled = (this.isNew) ? false : true;
      this.needsConfirm = false;
      this.nextAction = 'guardar';

      this.createEditForm();
      
      this.editForm.patchValue({
        Fecha: new Date(this.visita.Fecha).toISOString().substr(0,10),
        Motivo: this.visita.Motivo,
        Texto: this.visita.Texto,
      })
  }

  createEditForm() {
      this.editForm = new FormGroup({
          Fecha: new FormControl({value: '', disabled: this.editDisabled}),
          Motivo: new FormControl({value: '', disabled: this.editDisabled},[Validators.required, Validators.maxLength(50)]),
          Texto: new FormControl({value: '', disabled: this.editDisabled},[Validators.required, Validators.maxLength(50)]),
      });
  }

  getErrorMessage( fld: string) {
    if (this.flget(fld).hasError('required')) {
      return 'Debe ingresar una descripción';
    }
    if (this.flget(fld).hasError('maxlength')) {
      return 'Maximo 50 caracteres, actual ' + this.flget(fld).errors.maxlength.actualLength;
    }
  }

  onClose(event) {
      this.close.emit(null)
  }
  onSave(event) {
    let saveData : { [key: string]: any } = {};
    saveData.ID = this.visita.ID;
    saveData.PacienteID = this.id;
    saveData.Fecha = this.flget('Fecha').value;
    saveData.Motivo = this.flget('Motivo').value;
    saveData.Texto = this.flget('Texto').value;
    if (this.nextAction === "guardar") {
      this.ds.saveVisita(saveData, (this.isNew) ? 0 : this.visita.ID ).subscribe( (data: IVisita) => {
        // alert('check for error before emiting close')
        this.close.emit(data); 
      },
      (error) => {
          console.error(error);
      });
    } else if (this.nextAction === 'eliminar') {
      this.ds.deleteVisita(this.visita.ID ).subscribe( (data) => {
        this.close.emit(null); 
      },
      (error) => {
          console.error(error);
      });
    } else if (this.nextAction === 'imprimir') {
    } else {
      console.log("no nextAction defined")
    }
    this.nextAction = 'guardar';

  }

  // helper function
  flget( fld: string ) {
    return this.editForm.get(fld)
  }

  onEdit() {
    this.editDisabled = false;
    this.editForm.get("Fecha").enable();
    this.editForm.get("Motivo").enable();
    this.editForm.get("Texto").enable();
    this.nextAction = 'guardar';

  }

  onDelete(){
      this.needsConfirm = true;
      this.nextAction = "eliminar"
  }
  onPrint(){
      this.needsConfirm = true;
      this.nextAction = "imprimir"
  }

  Capitalize(str: string){
    try {
      const _str = str.charAt(0).toUpperCase().concat(str.slice(1));
      return _str
    } catch(e) {
      return "..error.."
    }
  }

}

