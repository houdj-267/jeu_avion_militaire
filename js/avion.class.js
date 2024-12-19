import { Tir } from './tir.class.js';

export class Avion {
    constructor(carte, jeu) {
        this.jeu = jeu;
        this.carte = carte;
        this.positionX = 305;
        this.positionY = 490;
        this.element = document.createElement('img');
        this.element.src = "assets/img/avion.png";
        this.element.className = 'avion';
        this.carte.appendChild(this.element);

        this.mettreAJourPosition();
    }

    deplacer(direction) {
        const distance = 15;
        if (direction === 'haut' && this.positionY > 0) this.positionY -= distance;
        if (direction === 'bas' && this.positionY < 500) this.positionY += distance;
        if (direction === 'gauche' && this.positionX > 0) this.positionX -= distance;
        if (direction === 'droite' && this.positionX < 590) this.positionX += distance;
        this.mettreAJourPosition();
    }

    mettreAJourPosition() {
        this.element.style.left = `${this.positionX}px`;
        this.element.style.top = `${this.positionY}px`;
    }

    tirer() {
        new Tir(this.carte, this.positionX + 20, this.positionY);
    }
}
