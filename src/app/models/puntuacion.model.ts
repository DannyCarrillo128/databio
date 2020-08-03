import { Usuario } from './usuario.model';
import { Comentario } from './comentario.model';
export class Puntuacion {
    
    constructor(
        public comentario?: Comentario,
        public calificacion?: number,
        public calificador?: Usuario,
        public _id?: string
    ) { }

}