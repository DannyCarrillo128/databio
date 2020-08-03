import { Usuario } from './usuario.model';
export class Comentario {
    
    constructor(
        public texto?: string,
        public autor?: Usuario,
        public fecha?: string,
        public puntuacion?: number,
        public _id?: string
    ) { }

}