export interface IPaciente {
    ID: number,
    TipoDoc: string,
    NroDoc: number,
    Nombre: string,
    Apellido: string,
    FechaNac: Date,
    Edad: number,
    ObraSocial: string,
    NroAfiliado: string,
    Visitas: IVisita[],
}

export function Paciente(p: IPaciente) {

    return {
        ID: p && p.ID || 0,
        Nombre: p && p.Nombre || "",
        Apellido: p && p.Apellido || "",
        TipoDoc: p && p.TipoDoc || "DNI",
        NroDoc: p && p.NroDoc || null,
        FechaNac: p && p.FechaNac || new Date(Date.now()),
        Edad: p && p.Edad || 0,
        ObraSocial: p && p.ObraSocial || "",
        NroAfiliado: p && p.NroAfiliado || "",
        Visitas: [],
    }
}

export interface IVisita {
    ID: number,
    PacienteID: number,
    Fecha: Date,
    Motivo: string,
    Texto: string,
}

export function Visita(c: IVisita) {

    return {
        ID: c && c.ID || 0,
        PacienteID: c && c.PacienteID || 0,
        Fecha: c && c.Fecha || new Date(Date.now()),
        Motivo: c && c.Motivo || "",
        Texto: c && c.Texto || "",
    }
}

export interface ILogin {
    Usuario: string,
    Password: string,
}

export interface IUser {
    Nombre: string,
    Email: string,
}

export interface IApiError {
    webapi: string,
    status: string,
}