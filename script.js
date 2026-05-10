const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const tamanho = 20;
let cobra = [{ x: 200, y: 200 }];
let direcao = "right";

let comida = {
  x: Math.floor(Math.random() * 20) * tamanho,
  y: Math.floor(Math.random() * 20) * tamanho
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direcao !== "down") direcao = "up";
  if (e.key === "ArrowDown" && direcao !== "up") direcao = "down";
  if (e.key === "ArrowLeft" && direcao !== "right") direcao = "left";
  if (e.key === "ArrowRight" && direcao !== "left") direcao = "right";
});

function desenhar() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 400, 400);

  // cobra
  ctx.fillStyle = "lime";
  cobra.forEach(parte => {
    ctx.fillRect(parte.x, parte.y, tamanho, tamanho);
  });

  // comida
  ctx.fillStyle = "red";
  ctx.fillRect(comida.x, comida.y, tamanho, tamanho);

  // movimento
  let novaCabeca = { ...cobra[0] };

  if (direcao === "right") novaCabeca.x += tamanho;
  if (direcao === "left") novaCabeca.x -= tamanho;
  if (direcao === "up") novaCabeca.y -= tamanho;
  if (direcao === "down") novaCabeca.y += tamanho;

  cobra.unshift(novaCabeca);

  // comer comida
  if (novaCabeca.x === comida.x && novaCabeca.y === comida.y) {
    comida = {
      x: Math.floor(Math.random() * 20) * tamanho,
      y: Math.floor(Math.random() * 20) * tamanho
    };
  } else {
    cobra.pop();
  }

  // colisão (parede ou corpo)
  if (
    novaCabeca.x < 0 || novaCabeca.x >= 400 ||
    novaCabeca.y < 0 || novaCabeca.y >= 400 ||
    cobra.slice(1).some(p => p.x === novaCabeca.x && p.y === novaCabeca.y)
  ) {
    alert("Game Over!");
    cobra = [{ x: 200, y: 200 }];
    direcao = "right";
  }
}

setInterval(desenhar, 100);
