import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IPaciente } from '../models/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'paciente-edit-form',
  templateUrl: './paciente-edit-form.component.html',
  styleUrls: ['./paciente-edit-form.component.scss']
})
export class PacienteEditFormComponent implements OnInit {

  @Input() paciente: IPaciente;
  @Input("is-new") isNew: boolean;
  @Output("onClose") close = new EventEmitter<IPaciente|null>();

  editForm: FormGroup;
  formTitle: string;
  tiposdoc: Array<string> = [];

  constructor( private ds: DataService) { }

  ngOnInit() {
      this.formTitle = (this.isNew) ? 'Nuevo paciente.' : 'Editar paceinte.';
      this.createForm();
      this.tiposdoc = ['DNI','CI','LE','PAS']
      
      this.editForm.patchValue({
        Nombre: this.paciente.Nombre,
        Apellido: this.paciente.Apellido,
        TipoDoc: this.paciente.TipoDoc,
        NroDoc: this.paciente.NroDoc,
        FechaNac: new Date(this.paciente.FechaNac).toISOString().substr(0,10),
        Edad: this.paciente.Edad,
        ObraSocial: this.paciente.ObraSocial,
        NroAfiliado: this.paciente.NroAfiliado,
      })
  }

  createForm() {
      this.editForm = new FormGroup({
          Nombre: new FormControl('',[Validators.required, Validators.maxLength(50)]),
          Apellido: new FormControl('',[Validators.required, Validators.maxLength(50)]),
          TipoDoc: new FormControl('',[Validators.required, Validators.maxLength(3)]),
          NroDoc: new FormControl(''),
          FechaNac: new FormControl(''),
          Edad: new FormControl({value: '', disabled: true}),
          ObraSocial: new FormControl('',[Validators.maxLength(50)]),
          NroAfiliado: new FormControl(''),
      });
  }


  getErrorMessage( fld: string) {
    if (this.flget(fld).hasError('required')) {
      return 'Debe ingresar : ' + fld;
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
      saveData.Nombre = this.flget('Nombre').value;
      saveData.Apellido = this.flget('Apellido').value;
      saveData.TipoDoc = this.flget('TipoDoc').value;
      saveData.NroDoc = this.flget('NroDoc').value;
      saveData.FechaNac = this.flget('FechaNac').value;
      saveData.Edad = this.flget('Edad').value;
      saveData.ObraSocial = this.flget('ObraSocial').value;
      saveData.NroAfiliado = this.flget('NroAfiliado').value;
      this.ds.savePaciente(saveData, (this.isNew) ? 0 : this.paciente.ID ).subscribe( (data) => {
          // alert('check for error before emiting close')
          const savedPaciente: IPaciente = data['paciente'];
          this.close.emit(savedPaciente); 
      },
      (error) => {
          console.error(error);
      });
  }

  // helper function
  flget( fld: string ) {
    return this.editForm.get(fld)
  }

  // getDefs() {
  //     this.ds.getDefs().subscribe( (data) => {
  //         let tmp = JSON.parse(data['Marcas'])
  //         tmp.map( (el) => {
  //             this.marcas.push(el['Descrip'].trim())
  //         })
  //         tmp = JSON.parse(data['Proveedores'])
  //         tmp.map( (el) => {
  //             this.proveedores.push(el['Descrip'].trim())
  //         })
  //         tmp = JSON.parse(data['Cuentas'])
  //         tmp.map( (el) => {
  //             this.cuentas.push({ Id: el['ID'],Descrip: el['Descrip'].trim()})
  //         })
  //         tmp = JSON.parse(data['Dependencias'])
  //         tmp.map( (el) => {
  //             this.dependencias.push({ Id: el['ID'],Descrip: el['Descrip'].trim()})
  //         })
  //     })
  // }

  // displayFn(obj: any): string {
  //     return obj && obj.Descrip ? obj.Descrip : '';
  // }

  // private _filterCuentas(value: string | {Id:number, Descrip:string}) {
  //     const filterValue = (typeof value === 'string' ) ? value.toLowerCase() : value['Descrip'].toLowerCase();
  //     return this.cuentas.filter(option => option.Descrip.toLowerCase().includes(filterValue));
  // }

  // private _filterDeps(value: string | {Id:number, Descrip:string}) {
  //     const filterValue = (typeof value === 'string' ) ? value.toLowerCase() : value['Descrip'].toLowerCase();
  //     return this.dependencias.filter(option => option.Descrip.toLowerCase().includes(filterValue));
  // }

  // private _filterProveedores(value: string) {
  //     const filterValue = value.toLowerCase();
  //     return this.proveedores.filter(option => option.toLowerCase().includes(filterValue));
  // }

  // private _filterMarcas(value: string) {
  //     const filterValue = value.toLowerCase();
  //     return this.marcas.filter(option => option.toLowerCase().includes(filterValue));
  // }

  CalculaEdad() {
    if (this.flget('FechaNac') && !this.flget('FechaNac').invalid) {
      const edad = this.getAge( this.flget('FechaNac').value)
      this.editForm.patchValue({
        Edad: edad,
      })
    }
  }

  getAge(dateString: string) {
    try {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
    }
    catch (e) {
      return 0;
    }

}

}
