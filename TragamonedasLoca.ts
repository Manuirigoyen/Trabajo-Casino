import { JuegoBase } from "./JuegoBase";
import chalk from "chalk";

export class TragamonedasLoca extends JuegoBase {
  private simbolos: string[];

  constructor() {
    super("Tragamonedas Loca", 4);
    this.simbolos = ["🍒", "🍋", "🍉", "⭐", "7️⃣", "💎", "🔔"];
  }

  private async animarGiro(): Promise<void> {
    for (let i = 0; i < 15; i++) {
      const tirada = Array.from({ length: 5 }, () =>
        chalk.magentaBright(this.simbolos[Math.floor(Math.random() * this.simbolos.length)])
      ).join("  ");

      console.clear();
      console.log(chalk.cyanBright("╔════════════════════════════════════════════════╗"));
      console.log(chalk.cyanBright("║") + chalk.bold.yellow("        🤪 TRAGAMONEDAS LOCA 🤪         ") + chalk.cyanBright("║"));
      console.log(chalk.cyanBright("╠════════════════════════════════════════════════╣"));
      console.log(chalk.cyanBright("║") + "                                              " + chalk.cyanBright("║"));
      console.log(chalk.cyanBright("║") + "      " + tirada + "      " + chalk.cyanBright("║"));
      console.log(chalk.cyanBright("║") + "                                              " + chalk.cyanBright("║"));
      console.log(chalk.cyanBright("╚════════════════════════════════════════════════╝\n"));
      await new Promise(resolve => setTimeout(resolve, 100 + i * 10)); // efecto de desaceleración
    }
  }

  async jugar(apuesta: number): Promise<number> {
    this.validarApuesta(apuesta);

    await this.animarGiro(); // Mostrar la animación antes del resultado

    const tirada: string[] = [];
    for (let i = 0; i < 5; i++) {
      const idx = Math.floor(Math.random() * this.simbolos.length);
      tirada.push(this.simbolos[idx]);
    }

    const resultado = tirada.map(s => chalk.bold.magenta(s)).join("  ");

    console.clear();
    console.log(chalk.cyanBright("╔════════════════════════════════════════════════╗"));
    console.log(chalk.cyanBright("║") + chalk.bold.yellow("        🤪 TRAGAMONEDAS LOCA 🤪         ") + chalk.cyanBright("║"));
    console.log(chalk.cyanBright("╠════════════════════════════════════════════════╣"));
    console.log(chalk.cyanBright("║") + "                                              " + chalk.cyanBright("║"));
    console.log(chalk.cyanBright("║") + "      " + resultado + "      " + chalk.cyanBright("║"));
    console.log(chalk.cyanBright("║") + "                                              " + chalk.cyanBright("║"));
    console.log(chalk.cyanBright("╚════════════════════════════════════════════════╝\n"));

    const unique = new Set(tirada);
    let ganancia = 0;

    if (unique.size === 1) {
      ganancia = apuesta * 20;
      console.log(chalk.greenBright("¡Épico! 5 símbolos iguales → 20x tu apuesta 🎆"));
    } else if (unique.size <= 2) {
      ganancia = apuesta * 5;
      console.log(chalk.green("¡Muy bien! 4 iguales → 5x tu apuesta 🎉"));
    } else if (unique.size <= 3) {
      ganancia = apuesta * 2;
      console.log(chalk.green("¡Algo es algo! 3 iguales → 2x tu apuesta"));
    } else {
      console.log(chalk.red("Nada por ahora... seguí intentando 💸"));
    }

    return ganancia;
  }
}