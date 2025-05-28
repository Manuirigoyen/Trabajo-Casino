import { JuegoBase } from "./JuegoBase";

export class RuletaSimple extends JuegoBase {
  constructor() {
    super("Ruleta", 5);  // nombre y apuesta mínima
  }

  jugar(apuesta: number): number {
    this.validarApuesta(apuesta);
    let gana = Math.random() < 0.5;
    return gana ? apuesta * 2 : 0;
  }
}
