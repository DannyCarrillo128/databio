export class Usuario {
    
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public telefono?: string,
        public interes?: string,
        public ocupacion?: string,
        public institucion?: string,
        public solicitud?: string,
        public img?: string,
        public role?: string,
        public google?: string,
        public estado?: string,
        public _id?: string
    ) { }

}