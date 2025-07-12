// Estado del juego
const gameState = {
    vida: 5,
    miembros: 3,
    mochila: ["botella", "cuchillo"],
    dias: 1,
    reputacion: 0,
    fase: "inicio"
};

// Elementos UI
const gameLog = document.getElementById('gameLog');
const optionsDiv = document.getElementById('options');
const mochilaList = document.getElementById('mochila');
const vidaUI = document.getElementById('vida');
const miembrosUI = document.getElementById('miembros');
const reputacionUI = document.getElementById('reputacion');
const diasUI = document.getElementById('dias');
const screen = document.querySelector('.screen');

// Función para actualizar UI
function updateUI() {
    vidaUI.textContent = '❤'.repeat(gameState.vida) + '♡'.repeat(5 - gameState.vida);
    miembrosUI.textContent = `👥: ${gameState.miembros}`;
    reputacionUI.textContent = `⚖: ${gameState.reputacion}`;
    diasUI.textContent = `📅: ${gameState.dias}`;
    
    mochilaList.innerHTML = '';
    gameState.mochila.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        mochilaList.appendChild(li);
    });

    // Cambiar clase según fase
    screen.className = `screen ${gameState.fase}`;
}

// Añadir texto al log con efecto máquina de escribir
function addLog(text, delay = 30) {
    const p = document.createElement('p');
    gameLog.appendChild(p);
    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < text.length) {
            p.textContent += text.charAt(i);
            i++;
            gameLog.scrollTop = gameLog.scrollHeight;
        } else {
            clearInterval(typingEffect);
        }
    }, delay);
}

// Mostrar opciones interactivas
function showOptions(opciones) {
    optionsDiv.innerHTML = '';
    opciones.forEach((opcion, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = `${index + 1}. ${opcion.texto}`;
        button.addEventListener('click', () => {
            // Efecto visual al seleccionar
            button.classList.add('selected');
            setTimeout(() => {
                opcion.accion();
                button.classList.remove('selected');
            }, 200);
        });
        optionsDiv.appendChild(button);
    });
}

// Sistema de eventos aleatorios
function randomEvent() {
    const events = [
        {
            condition: () => Math.random() > 0.7,
            action: () => {
                addLog("¡Un grupo de saqueadores te amenaza!");
                showOptions([
                    {
                        texto: "Pelear (-2 vida, posible botín)",
                        accion: () => {
                            gameState.vida -= 2;
                            if (Math.random() > 0.5) {
                                gameState.mochila.push("arma");
                                addLog("Ganas un arma, pero herido.");
                            } else {
                                addLog("Los saqueadores huyen, pero estás malherido.");
                            }
                            nextPhase();
                        }
                    },
                    {
                        texto: "Negociar (pierdes 1 item)",
                        accion: () => {
                            if (gameState.mochila.length > 0) {
                                const item = gameState.mochila.pop();
                                addLog(`Das tu ${item} a cambio de paz.`);
                            } else {
                                addLog("No tienes nada que ofrecer. ¡Te atacan!");
                                gameState.vida -= 3;
                            }
                            nextPhase();
                        }
                    }
                ]);
            }
        },
        // Más eventos...
    ];

    events.forEach(event => {
        if (event.condition()) {
            event.action();
            return;
        }
    });
}

// Flujo del juego
function nextPhase() {
    gameState.dias++;
    updateUI();

    switch (gameState.fase) {
        case "inicio":
            gameState.fase = "buscarComida";
            buscarComida();
            break;
        case "buscarComida":
            gameState.fase = "refugio";
            buscarRefugio();
            break;
        case "refugio":
            gameState.fase = "explorar";
            explorar();
            break;
        case "explorar":
            checkFinal();
            break;
    }
}

// Escenas del juego
function buscarComida() {
    addLog("El estómago gruñe. ¿Dónde buscar comida?");
    showOptions([
        {
            texto: "Supermercado abandonado (riesgo)",
            accion: () => {
                if (Math.random() > 0.4) {
                    gameState.mochila.push("comida", "agua");
                    addLog("¡Encontraste provisiones!");
                } else {
                    gameState.vida--;
                    addLog("¡Saqueadores! Pierdes 1 vida.");
                }
                randomEvent();
                nextPhase();
            }
        },
        {
            texto: "Cazar (necesita arma)",
            accion: () => {
                if (gameState.mochila.includes("arma")) {
                    gameState.mochila.push("carne");
                    addLog("Cazaste un animal. +carne");
                } else {
                    addLog("Sin armas, es peligroso. Pierdes tiempo.");
                    gameState.vida--;
                }
                nextPhase();
            }
        }
    ]);
}

function buscarRefugio() {
    addLog("La noche se acerca. Busca refugio:");
    showOptions([
        {
            texto: "Edificio en ruinas (seguro pero frío)",
            accion: () => {
                gameState.mochila.push("botiquin");
                addLog("Encuentras un botiquín olvidado.");
                nextPhase();
            }
        },
        {
            texto: "Cueva (riesgo de animales)",
            accion: () => {
                if (Math.random() > 0.6) {
                    gameState.vida--;
                    addLog("¡Animales salvajes! -1 vida");
                } else {
                    addLog("Pasas la noche a salvo.");
                }
                nextPhase();
            }
        }
    ]);
}

function explorar() {
    addLog("¿Qué hacer al amanecer?");
    showOptions([
        {
            texto: "Explorar metro (necesita linterna)",
            accion: () => {
                if (gameState.mochila.includes("linterna")) {
                    addLog("¡Encuentras una salida secreta!");
                    gameState.fase = "final";
                } else {
                    addLog("Demasiado oscuro. Vuelve atrás.");
                    gameState.fase = "buscarComida";
                }
                nextPhase();
            }
        },
        {
            texto: "Construir señal de ayuda",
            accion: () => {
                addLog("Fuego y humo atraen atención...");
                if (Math.random() > 0.5) {
                    gameState.miembros++;
                    addLog("¡Un sobreviviente se une!");
                } else {
                    addLog("Nadie viene. Pierdes un día.");
                }
                nextPhase();
            }
        }
    ]);
}

function checkFinal() {
    if (gameState.vida <= 0) {
        addLog("☠ HAS MUERTO. Fin del juego.");
        screen.classList.add('game-over');
    } else if (gameState.dias >= 7) {
        addLog("¡SOBREVIVISTE 7 DÍAS! Victoria.");
        screen.classList.add('victory');
    } else {
        randomEvent();
    }
}

// Iniciar juego
updateUI();
addLog("Bienvenido al yermo...", 50);
setTimeout(() => {
    nextPhase();
}, 1500);