export class Tir {
    constructor(carte, x, y) {
        this.carte = carte;
        this.positionX = x;
        this.positionY = y;
        this.element = document.createElement('img');
        this.element.src = "assets/img/tir.png";
        this.element.className = 'tir';
        this.carte.appendChild(this.element);

        this.mettreAJourPosition();
        this.mouvement();
    }

    mettreAJourPosition() {
        this.element.style.left = `${this.positionX}px`;
        this.element.style.top = `${this.positionY}px`;
    }

    mouvement() {
        const vitesse = -10; // Velocidad del disparo (hacia arriba)
        this.intervalleTir = setInterval(() => {
            this.positionY += vitesse;
            this.mettreAJourPosition();
            if (this.positionY < 0) {
                clearInterval(this.intervalleTir);
                this.element.remove();
            }
        }, 30);
    }
}
