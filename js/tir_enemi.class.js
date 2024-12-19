export class TirEnemi {
    constructor(carte, x, y) {
        this.carte = carte;
        this.positionX = x;
        this.positionY = y;
        this.element = document.createElement('img');
        this.element.src = "assets/img/tir_enemi.png";
        this.element.className = 'tir_enemi';
        this.carte.appendChild(this.element);

        this.mettreAJourPosition();
        this.mouvement();
    }

    mettreAJourPosition() {
        this.element.style.left = `${this.positionX}px`;
        this.element.style.top = `${this.positionY}px`;
    }

    mouvement() {
        const vitesse = Math.floor(Math.random() * 3 + 4); // Velocidad del disparo enemigo (más rápida que el enemigo)
        this.intervalleTir = setInterval(() => {
            this.positionY += vitesse; // Incremento de posición más rápido
            this.mettreAJourPosition();
            if (this.positionY > this.carte.offsetHeight) {
                clearInterval(this.intervalleTir);
                this.element.remove();
            }
        }, 30);
    }
    
}
