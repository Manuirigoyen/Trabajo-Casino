import { JuegoBase } from "./JuegoBase";
import chalk from "chalk";

export class TragamonedasSimple extends JuegoBase {
  private simbolos: string[];

  constructor() {
    super("Tragamonedas Simple", 3);
    this.simbolos = ["🍒", "🍋", "🍉", "⭐", "7️⃣", "🔔"];
  }

  private async animarGiro(): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const giro = Array.from({ length: 3 }, () =>
        chalk.yellowBright(this.simbolos[Math.floor(Math.random() * this.simbolos.length)])
      ).join("  ");

      console.clear();
      console.log(chalk.blueBright("╔═══════════════════════════════════╗"));
      console.log(chalk.blueBright("║") + chalk.bold("     🎰 TRAGAMONEDAS SIMPLE 🎰     ") + chalk.blueBright("║"));
      console.log(chalk.blueBright("╠═══════════════════════════════════╣"));
      console.log(chalk.blueBright("║") + "                                 " + chalk.blueBright("║"));
      console.log(chalk.blueBright("║") + "        " + giro + "        " + chalk.blueBright("║"));
      console.log(chalk.blueBright("║") + "                                 " + chalk.blueBright("║"));
      console.log(chalk.blueBright("╚═══════════════════════════════════╝\n"));

      await new Promise(resolve => setTimeout(resolve, 100 + i * 10));
    }
  }

  async jugar(apuesta: number): Promise<number> {
    this.validarApuesta(apuesta);

    await this.animarGiro();

    const resultado: string[] = [];
    for (let i = 0; i < 3; i++) {
      const idx = Math.floor(Math.random() * this.simbolos.length);
      resultado.push(this.simbolos[idx]);
    }

    const tiradaFinal = resultado.map(s => chalk.bold.yellow(s)).join("  ");

    console.clear();
    console.log(chalk.blueBright("╔═══════════════════════════════════╗"));
    console.log(chalk.blueBright("║") + chalk.bold("     🎰 TRAGAMONEDAS SIMPLE 🎰     ") + chalk.blueBright("║"));
    console.log(chalk.blueBright("╠═══════════════════════════════════╣"));
    console.log(chalk.blueBright("║") + "                                 " + chalk.blueBright("║"));
    console.log(chalk.blueBright("║") + "        " + tiradaFinal + "        " + chalk.blueBright("║"));
    console.log(chalk.blueBright("║") + "                                 " + chalk.blueBright("║"));
    console.log(chalk.blueBright("╚═══════════════════════════════════╝\n"));

    const iguales = resultado.every((val) => val === resultado[0]);

    if (iguales) {
      console.log(chalk.greenBright("¡Jackpot! 3 iguales → Ganaste 5x tu apuesta 🎉"));
      return apuesta * 5;
    } else {
      console.log(chalk.red("No hubo suerte esta vez 💸"));
      return 0;
    }
  }
}