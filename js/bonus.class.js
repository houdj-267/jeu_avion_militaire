const bonus = ["assets/img/bonus_1.png","assets/img/bonus_2.png","assets/img/bonus_3.png","assets/img/bonus_4.png"]
export class Bonus {
    constructor(carte) {
        this.carte = carte;
        this.positionX = Math.random() * (590 - 20);
        this.positionY = 0;
        this.element = document.createElement('img');
        this.element.src = bonus[Math.floor(Math.random()*bonus.length)];
        this.element.className = 'bonus';
        this.carte.appendChild(this.element);

        this.mettreAJourPosition();
        this.mouvement();
    }

    mettreAJourPosition() {
        this.element.style.left = `${this.positionX}px`;
        this.element.style.top = `${this.positionY}px`;
    }

    mouvement() {
        const vitesse =2;
        this.intervalle = setInterval(() => {
            this.positionY += vitesse;
            this.mettreAJourPosition();
            if (this.positionY > 600) {
                clearInterval(this.intervalle);
                this.element.remove();
            }
        }, 30);
    }

}
