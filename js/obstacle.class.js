const obstacles = ["assets/img/obstacle.png", "assets/img/obstacle_2.png", "assets/img/obstacle_3.png"]
export class Obstacle {
    constructor(carte) {
        this.carte = carte;
        this.positionX = Math.random() * (590 - 32);
        this.positionY = 0;
        this.element = document.createElement('img');
        this.element.src = obstacles[Math.floor(Math.random() * obstacles.length)];
        this.element.className = 'obstacle';
        this.carte.appendChild(this.element);

        this.mettreAJourPosition();
        this.mouvement();
    }

    mettreAJourPosition() {
        this.element.style.left = `${this.positionX}px`;
        this.element.style.top = `${this.positionY}px`;
    }

    mouvement() {
        const vitesse =  Math.random()*2+Math.random()*2 + 1;
        this.intervalle = setInterval(() => {
            this.positionY += vitesse;
            this.mettreAJourPosition();
            if (this.positionY > 600) {
                clearInterval(this.intervalle);
                this.element.remove();
            }
        }, 30);
    }

    detruire() {
        this.element.src = "assets/img/explotion_obstacle.gif";
        clearInterval(this.intervalle);
        setTimeout(() => this.element.remove(), 2000);
    }
}
