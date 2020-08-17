import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { baseField } from './field-base';
import { textField } from './field-text';
import { dateField } from './field-date';
import { numberField } from './field-number';
import { booleanField } from './field-boolean';
import { autocompleteField } from './field-autocomplete';

@Injectable()
export class SwFormsService {
   // Todo: get from a remote source of question metadata
   // Todo: make asynchronous

   constructor(private http: HttpClient) { }

   getFields(table: string) {
      if (table === 'sucursales') {
         const fields: baseField<any>[] = [
            new textField({
               key: 'descrip',
               label: 'Descripción de la Sucursal',
               value: '',
               required: true,
               type: 'text',
               data: {},
               order: 1
            }),
            new booleanField({
               key: 'activo',
               label: 'Activo',
               value: true,
               required: true,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 3
            })
         ];
         return fields.sort((a, b) => a.order - b.order);
      }

      if (table === 'depositos') {
         const fields: baseField<any>[] = [
            new autocompleteField({
               key: 'sucursal',
               label: 'Seleccione la Sucursal',
               value: { descrip: '', Id: 0, activo: false },
               required: true,
               type: 'autocomplete',
               data: { show: 'descrip', id: 'Id' },
               autocomplete_query: 'filteredobjects?object=sucursales&filter=<term>',
               id: 'Id',
               order: 1
            }),
            new textField({
               key: 'descrip',
               label: 'Descripción del Depósito',
               value: '',
               required: true,
               type: 'text',
               data: {},
               order: 2
            }),

            new booleanField({
               key: 'activo',
               label: 'Activo',
               value: true,
               required: true,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 3
            })
         ];
         return fields.sort((a, b) => a.order - b.order);
      }

      if (table === 'marcas') {
         const fields: baseField<any>[] = [
            new textField({
               key: 'descrip',
               label: 'Descripción de la Marca',
               value: '',
               required: true,
               type: 'text',
               data: {},
               order: 1
            }),
            new booleanField({
               key: 'activo',
               label: 'Activo',
               value: true,
               required: true,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 3
            })
         ];
         return fields.sort((a, b) => a.order - b.order);
      }
      if (table === 'tpcomprobs') {
         const fields: baseField<any>[] = [
            new textField({
               key: 'descrip',
               label: 'Descripción del Tipo de Comprobante',
               value: '',
               required: true,
               type: 'text',
               data: {},
               order: 1
            }),
            new textField({
               key: 'sor',
               label: 'Suma : 1, Resta : -1, Nada: 0',
               value: 0,
               required: true,
               type: 'number',
               min: -1,
               max: 1,
               data: {},
               order: 2
            }),
            new booleanField({
               key: 'nroaut',
               label: 'Numero Automatico',
               value: true,
               required: false,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 3
            }),
            new booleanField({
               key: 'pideProveedor',
               label: 'Pide Proveedor en el Comprobante',
               value: true,
               required: false,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 4
            }),
            new booleanField({
               key: 'pideCliente',
               label: 'Pide Cliente en el Comprobante',
               value: true,
               required: false,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 5
            }),
            new booleanField({
               key: 'pideDeposito',
               label: 'Pide Deposito en el Comprobante',
               value: true,
               required: false,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 6
            }),
            new booleanField({
               key: 'pideRepartidor',
               label: 'Pide Repartidor en el Comprobante',
               value: true,
               required: false,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 7
            }),
            new booleanField({
               key: 'activo',
               label: 'Activo',
               value: true,
               required: false,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 8
            })
         ];
         return fields.sort((a, b) => a.order - b.order);
      }
      if (table === 'rubros') {
         const fields: baseField<any>[] = [
            new textField({
               key: 'descrip',
               label: 'Descripción del Rubro',
               value: '',
               required: true,
               type: 'text',
               data: {},
               order: 1
            }),
            new booleanField({
               key: 'activo',
               label: 'Activo',
               value: true,
               required: true,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 3
            })
         ];
         return fields.sort((a, b) => a.order - b.order);
      }
      if (table === 'impuestos') {
         const fields: baseField<any>[] = [
            new textField({
               key: 'descrip',
               label: 'Descripción del Impuesto',
               value: '',
               required: true,
               type: 'text',
               data: {},
               order: 1
            }),
            new numberField({
               key: 'tasa',
               label: 'Tasa',
               value: true,
               required: true,
               type: 'number',
               min: 0,
               max: 100,
               data: {},
               order: 2
            }),
            new booleanField({
               key: 'activo',
               label: 'Activo',
               value: true,
               required: true,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 3
            })
         ];
         return fields.sort((a, b) => a.order - b.order);
      }
      if (table === 'presentaciones') {
         const fields: baseField<any>[] = [
            new textField({
               key: 'descrip',
               label: 'Descripción de la Presentación',
               value: '',
               required: true,
               type: 'text',
               data: {},
               order: 1
            }),
            new numberField({
               key: 'factor',
               label: 'Unidades por Bulto',
               value: true,
               required: true,
               type: 'number',
               min: 0,
               max: 1000,
               data: {},
               order: 2
            }),
            new booleanField({
               key: 'activo',
               label: 'Activo',
               value: true,
               required: true,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 3
            })
         ];
         return fields.sort((a, b) => a.order - b.order);
      }
      if (table === 'productos') {
         const fields: baseField<any>[] = [
            new autocompleteField({
               key: 'marca',
               label: 'Seleccione la Marca',
               value: { descrip: '', Id: 0, activo: false },
               required: true,
               type: 'autocomplete',
               data: { show: 'descrip', id: 'Id' },
               autocomplete_query: 'filteredobjects?object=marcas&filter=<term>',
               id: 'Id',
               order: 1
            }),
            new autocompleteField({
               key: 'rubro',
               label: 'Seleccione el Rubro',
               value: { descrip: '', Id: 0, activo: false },
               required: true,
               type: 'autocomplete',
               data: { show: 'descrip', id: 'Id' },
               autocomplete_query: 'filteredobjects?object=rubros&filter=<term>',
               id: 'Id',
               order: 2
            }),
            new textField({
               key: 'descrip',
               label: 'Descripción del Producto',
               value: '',
               required: true,
               type: 'text',
               data: {},
               order: 3
            }),
            new autocompleteField({
               key: 'presentacion',
               label: 'Seleccione la Presentacion',
               value: { descrip: '', Id: 0, activo: false },
               required: true,
               type: 'autocomplete',
               data: { show: 'descrip', id: 'Id' },
               autocomplete_query: 'filteredobjects?object=presentaciones&filter=<term>',
               id: 'Id',
               order: 4
            }),
            new booleanField({
               key: 'activo',
               label: 'Activo',
               value: true,
               required: true,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 5
            })
         ];
         return fields.sort((a, b) => a.order - b.order);
      }
      if (table === 'clientes') {
         const fields: baseField<any>[] = [
            new textField({
               key: 'firstName',
               label: 'First Name',
               value: '',
               required: true,
               type: 'text',
               data: {},
               order: 1
            }),
            new textField({
               key: 'lastName',
               label: 'Last Name',
               value: '',
               required: true,
               type: 'text',
               data: {},
               order: 2
            }),

            new textField({
               key: 'emailAddress',
               label: 'Email',
               value: '',
               required: true,
               type: 'email',
               data: {},
               order: 3
            }),
            new dateField({
               key: 'fingreso',
               label: 'Fecha Ingreso',
               value: '',
               required: true,
               type: 'date',
               data: {},
               order: 4
            }),
            new numberField({
               key: 'importe',
               label: 'Importe',
               value: '',
               required: true,
               type: 'number',
               data: {},
               min: 0.01,
               max: null,
               order: 5
            }),
            new autocompleteField({
               key: 'cliente',
               label: 'Seleccione el Cliente',
               value: '',
               required: true,
               type: 'autocomplete',
               data: { show: 'Cliente', id: 'ID' },
               id: 'clienteId',
               order: 6
            })
         ];
         return fields.sort((a, b) => a.order - b.order);
      }
      if (table === 'repartidores') {
         const fields: baseField<any>[] = [
            new textField({
               key: 'descrip',
               label: 'Descripción del Repartidor',
               value: '',
               required: true,
               type: 'text',
               data: {},
               order: 1
            }),
            new autocompleteField({
               key: 'sucursal',
               label: 'Seleccione la Sucursal',
               value: { descrip: '', Id: 0, activo: false },
               required: true,
               type: 'autocomplete',
               data: { show: 'descrip', id: 'Id' },
               autocomplete_query: 'filteredobjects?object=sucursales&filter=<term>',
               id: 'Id',
               order: 2
            }),
            new numberField({
               key: 'comision',
               label: 'Comision',
               value: true,
               required: true,
               type: 'number',
               min: 0,
               max: 100,
               data: {},
               order: 3
            }),
            new booleanField({
               key: 'activo',
               label: 'Activo',
               value: true,
               required: true,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 4
            })
         ];
         return fields.sort((a, b) => a.order - b.order);
      }
      if (table === 'personas') {
         const fields: baseField<any>[] = [
            new textField({
               key: 'clase',
               label: 'Clase',
               value: '',
               required: true,
               hidden: true,
               type: 'text',
               data: {},
               order: 1
            }),
            new textField({
               key: 'descrip',
               label: 'Descripción',
               value: '',
               required: true,
               type: 'text',
               data: {},
               order: 2
            }),
            new textField({
               key: 'cuit',
               label: 'CUIT',
               value: '',
               required: true,
               type: 'text',
               data: {},
               order: 3
            }),
            new textField({
               key: 'direccion',
               label: 'Direccion',
               value: '',
               required: false,
               type: 'text',
               data: {},
               order: 4
            }),
            new textField({
               key: 'telefono',
               label: 'Telefono',
               value: '',
               required: false,
               type: 'text',
               data: {},
               order: 5
            }),
            new textField({
               key: 'contacto',
               label: 'Contacto',
               value: '',
               required: false,
               type: 'text',
               data: {},
               order: 6
            }),
            new textField({
               key: 'categoria_afip',
               label: 'Categoria Afip',
               value: '',
               required: true,
               type: 'text',
               data: {},
               order: 7
            }),

            new textField({
               key: 'obs',
               label: 'Observaciones',
               value: '',
               required: false,
               type: 'text',
               data: {},
               order: 8
            }),
            new booleanField({
               key: 'activo',
               label: 'Activo',
               value: true,
               required: true,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 9
            })
         ];
         return fields.sort((a, b) => a.order - b.order);
      }

      if (table === 'items') {
         const fields: baseField<any>[] = [
            new textField({
               key: 'Item',
               label: 'Descripción del Item',
               value: '',
               required: true,
               type: 'text',
               data: {},
               order: 1
            }),
            new autocompleteField({
               key: 'Rubro',
               label: 'Seleccione el Rubro',
               value: { Rubro: '', gId: '', activo: false },
               required: true,
               type: 'autocomplete',
               data: { show: 'Rubro', id: 'gId' },
               autocomplete_query: 'filteredobjects?object=rubros&filter=<term>',
               id: 'RubroId',
               order: 2
            }),
            new textField({
               key: 'Precio',
               label: 'Precio',
               value: '',
               required: true,
               type: 'number',
               min: 0.01,
               max: null,
               data: {},
               order: 3
            }),
            new booleanField({
               key: 'activo',
               label: 'Activo',
               value: true,
               required: true,
               type: 'boolean',
               min: 0,
               max: 1,
               data: {},
               order: 4
            })
         ];
         return fields.sort((a, b) => a.order - b.order);
      }
   }
}

