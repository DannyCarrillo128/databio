import { Comentario } from './comentario.model';
export class Fotografia {

    constructor(
        public camara?: string,
        public apertura?: string,
        public distanciaFocal?: string,
        public tiempoDeExposicion?: string,
        public iso?: string,
        public flash?: string,
        public comentarios?: Comentario[],
        public _id?: string
    ) { }

}