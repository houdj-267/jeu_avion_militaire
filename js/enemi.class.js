import { TirEnemi } from './tir_enemi.class.js';

const enemis = ["assets/img/enemi.png", "assets/img/enemi_2.png", "assets/img/enemi_3.png"];

export class Enemi {
    constructor(carte) {
        this.carte = carte;
        this.positionX = Math.random() * (590 - 32);
        this.positionY = 0;
        this.element = document.createElement('img');
        this.element.src = enemis[Math.floor(Math.random() * enemis.length)];
        this.element.className = 'enemi';
        this.carte.appendChild(this.element);

        this.mettreAJourPosition();
        this.mouvement();

        // Iniciar disparos aleatorios
        this.shootInterval = this.initTirAleatorio();
    }

    mettreAJourPosition() {
        this.element.style.left = `${this.positionX}px`;
        this.element.style.top = `${this.positionY}px`;
    }

    mouvement() {
        const vitesse = Math.floor(Math.random()*1+2);
        this.intervalle = setInterval(() => {
            this.positionY += vitesse;
            this.mettreAJourPosition();
            if (this.positionY > 600) {
                clearInterval(this.intervalle);
                clearInterval(this.shootInterval); 
                this.element.remove();
            }
        }, 30);
    }
    

    initTirAleatorio() {
        return setInterval(() => {
            this.tirer();
        }, Math.floor(Math.random() * 300) + 200);
    }

    tirer() {
        const positionActuelle = this.element.getBoundingClientRect(); // Obtener posición actual del enemigo
        const x = this.element.offsetLeft + (this.element.offsetWidth / 2) - 5; // Ajustar el centro horizontal
        const y = this.element.offsetTop + this.element.offsetHeight; // Justo debajo del enemigo
        new TirEnemi(this.carte, x, y);
    }
    
}
