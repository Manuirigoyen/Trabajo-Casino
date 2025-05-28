import { Casino } from "./Casino";
import * as readline from "readline";
import * as fs from "fs";

let archivo = "saldo.txt";
let saldo = fs.existsSync(archivo) ? parseFloat(fs.readFileSync(archivo, "utf-8")) : 100;

let casino = new Casino();

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Bienvenido al Casino");
console.log("Saldo actual: $" + saldo);
console.log("Juegos disponibles: ", casino.listarJuegos().join(", "));

function preguntar(prompt: string): Promise<string> {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

async function main() {
  let nombre = await preguntar("Ingrese su nombre: ");
  let apellido = await preguntar("Ingrese su apellido: ");

  let juegoNombre = await preguntar("Elija un juego: ");
  let juego = casino.elegirJuego(juegoNombre);

  if (!juego) {
    console.log("Juego no encontrado.");
    rl.close();
    return;
  }

  console.log(`Hola ${nombre} ${apellido}, has seleccionado: ${juego.nombre}`);
  let apuestaStr = await preguntar(`Ingrese monto a apostar (mínimo ${juego.apuestaMinima}): `);
  let apuesta = Number(apuestaStr);

  if (isNaN(apuesta) || apuesta < juego.apuestaMinima) {
    console.log("Apuesta inválida.");
    rl.close();
    return;
  }

  if (apuesta > saldo) {
    console.log("Saldo insuficiente.");
    rl.close();
    return;
  }

  try {
    saldo -= apuesta;
    let ganancia = juego.jugar(apuesta);
    saldo += ganancia;

    console.log(
      ganancia > 0
        ? `¡Ganaste $${ganancia}!`
        : "Perdiste, mejor suerte la próxima."
    );

    console.log("Saldo final: $" + saldo);
    fs.writeFileSync(archivo, saldo.toString());
  } catch (e: any) {
    console.log("Error: " + e.message);
  } finally {
    rl.close();
  }
}

main(); //Ejecutar toda la logica

