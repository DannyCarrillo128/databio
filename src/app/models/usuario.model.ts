export class Usuario {
    
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: string,
        public telefono?: string,
        public titulo?: string,
        public interes?: string,
        public institucion?: string,
        public _id?: string
    ) { }

}