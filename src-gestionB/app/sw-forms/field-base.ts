export class baseField<T> {
   value: T;
   key: string;
   label: string;
   required: boolean;
   type: string;
   min: number;
   max: number;
   data: { show: string; id: string};
   autocomplete_query: string;
   id: string;
   order: number;
   controlType: string;
   hidden: boolean;

   constructor(options: {
       value?: T,
       key?: string,
       label?: string,
       required?: boolean,
       type?: string,
       min?: number,
       max?: number,
       data?: {show?: string; id?: string; };
       autocomplete_query?: string,
       id?: string;
       order?: number,
       controlType?: string,
       hidden?: boolean
     } = {}) {
     this.value = options.value;
     this.key = options.key || '';
     this.label = options.label || '';
     this.required = !!options.required;
     this.type = options.type || 'text';
     this.min = options.min || null;
     this.max = options.max || null;
     this.data = {show: options.data.show || '', id: options.data.id || ''};
     this.id = options.id || '';
     this.autocomplete_query = options.autocomplete_query || '';
     this.order = options.order === undefined ? 1 : options.order;
     this.controlType = options.controlType || '';
     this.hidden = options.hidden || false;
   }
 }
