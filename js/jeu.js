import { Avion } from './avion.class.js';
import { Enemi } from './enemi.class.js';
import { Obstacle } from './obstacle.class.js';
import { Bonus } from './bonus.class.js';
import { Tir } from './tir.class.js';
const bonuses = ["assets/img/bonus_1.png", "assets/img/bonus_2.png", "assets/img/bonus_3.png", "assets/img/bonus_4.png"]

class Jeu {
    constructor() {
        this.enCours = false;
        this.avion = null;
        this.score = 0;
        this.bouclier = false
        this.carte = document.getElementById('carte');
        this.scoreElement = document.getElementById('score');
        this.viesContainer = document.getElementById('vies');

        document.addEventListener('keydown', this.demarrerAvecEntree);
        document.addEventListener('keydown', this.gestionClavier);
    }

    demarrerAvecEntree = (event) => {
        if (event.key === 'Enter' && !this.enCours) {
            this.demarrerJeu();
        }
    };

    demarrerJeu() {
        this.enCours = true;
        this.score = 0;
        this.bouclier = false;
        document.getElementById('ecran-demarrage').style.display = 'none';
        document.getElementById('jeu').style.display = 'block';
        document.getElementById('score').innerHTML = '000000';
        this.carte.innerHTML = ''; // Limpiar la carte al inicio

        this.avion = new Avion(this.carte, this);

        this.intervalleEnemis = setInterval(() => this.creerEnemis(), 2000);
        this.intervalleObstacles = setInterval(() => this.creerObstacles(), 3000);
        this.intervalleBonus = setInterval(() => this.creerBonus(), 5000);

        this.boucleJeu();
    }


    boucleJeu = () => {
        this.verifierCollisions();
        if (this.enCours) requestAnimationFrame(this.boucleJeu);
    };

    creerEnemis() {
        new Enemi(this.carte);
    }

    creerObstacles() {
        new Obstacle(this.carte);
    }

    creerBonus() {
        new Bonus(this.carte);
    }

    verifierCollisions() {
        document.querySelectorAll('.tir').forEach((tirElement) => {

            document.querySelectorAll('.enemi').forEach((enemiElement) => {
                if (verifierCollision(tirElement, enemiElement)) {
                    enemiElement.src = "assets/img/explotion.gif";
                    setTimeout(() => enemiElement.remove(), 500);
                    tirElement.remove();
                    this.score += 10;
                }
            });

            document.querySelectorAll('.obstacle').forEach((obstacleElement) => {
                if (verifierCollision(tirElement, obstacleElement)) {
                    obstacleElement.src = "assets/img/explotion_obstacle.gif";
                    setTimeout(() => obstacleElement.remove(), 500);
                    tirElement.remove();
                    this.score += 5;
                }
            });

            document.querySelectorAll('.bonus').forEach((bonusElement) => {
                if (verifierCollision(tirElement, bonusElement)) {
                    tirElement.remove();
                    bonusElement.remove()
                    this.score += 20;
                }
            });
        });

        document.querySelectorAll('.tir_enemi').forEach((tirEnemiElement) => {
            if (verifierCollision(this.avion.element, tirEnemiElement)) {
                tirEnemiElement.remove();
                if (!this.bouclier) {
                    if (this.viesContainer.childElementCount > 1) {
                       this.viesContainer.removeChild(this.viesContainer.lastChild)

                    } else {
                        this.avion.element.src = "assets/img/explotion.gif"

                        setTimeout(() => {
                            this.avion.element.remove();
                            if (this.enCours) this.finDuJeu();
                        }, 500)
                        // this.score = 0;
                    }
                }
                else {
                    this.avion.element.src = "assets/img/avion.png";
                    this.bouclier = false;
                }
            }
        });
        document.querySelectorAll('.enemi').forEach((enemiElement) => {
            if (verifierCollision(this.avion.element, enemiElement)) {            
                enemiElement.remove()
                if (!this.bouclier) {
                    if (this.viesContainer.childElementCount > 1) {
                        this.viesContainer.removeChild(this.viesContainer.lastChild)
 
                     } else {
                    this.avion.element.src = "assets/img/explotion.gif"

                    setTimeout(() => {
                        this.avion.element.remove();
                        if (this.enCours) this.finDuJeu();
                    }, 500)
                }
                    // this.score = 0;
                }
                else {
                    this.avion.element.src = "assets/img/avion.png";
                    this.bouclier = false;
                }

            }
        });

        document.querySelectorAll('.obstacle').forEach((obstacleElement) => {
            if (verifierCollision(this.avion.element, obstacleElement)) {
                // obstacleElement.src = "assets/img/explotion_obstacle.gif";
                // setTimeout(() => {
                obstacleElement.remove()
                // }, 500);
                if (!this.bouclier) {
                    if (this.viesContainer.childElementCount > 1) {
                        this.viesContainer.removeChild(this.viesContainer.lastChild)
 
                     } else {
                    this.avion.element.src = "assets/img/explotion.gif"
                    setTimeout(() => {
                        this.avion.element.remove();
                        // obstacleElement.remove()

                        this.finDuJeu()
                    }, 500);}
                    // this.score = 0;
                }
                else {
                    this.avion.element.src = "assets/img/avion.png";
                    this.bouclier = false;
                }

            }
        });

        document.querySelectorAll('.bonus').forEach((bonusElement) => {
            if (verifierCollision(this.avion.element, bonusElement)) {
                bonusElement.remove()
                if (bonusElement.src.includes("bonus_1.png")) {
                    this.score += 20;

                    if (this.viesContainer) {
                        // Crear la imagen de vida extra
                        const img = document.createElement('img');
                        img.src = "assets/img/bonus_1.png";
                        img.alt = "vie extra";
                        img.style.height = "20px";
                        img.style.width = "20px";

                        if (this.viesContainer.childElementCount < 3) { // Máximo de 3 vidas extra
                            this.viesContainer.appendChild(img);
                        }
                    }
                }
                else if (bonusElement.src.includes("bonus_2.png")) {
                    this.score += 200;
                }
                else if (bonusElement.src.includes("bonus_3.png")) {

                    this.avion.element.src = "assets/img/avion_2.png";
                    this.bouclier = true;
                    setTimeout(() => {
                        this.avion.element.src = "assets/img/avion.png";
                        this.bouclier = false;
                    }, 6000)
                    this.score += 20;
                }
                else if (bonusElement.src.includes("bonus_4.png")) {
                    //amelioration du avion
                    this.avion.element.src = "assets/img/avion_2.png"
                    this.score += 20;
                }

            }
        });

        this.actualiserScore()
    }

    actualiserScore() {
        this.scoreElement.textContent = String(this.score).padStart(6, '0');
    }

    gestionClavier = (event) => {
        if (!this.avion || !this.enCours) return;

        switch (event.key) {
            case 'ArrowUp':
                this.avion.deplacer('haut');
                break;
            case 'ArrowDown':
                this.avion.deplacer('bas');
                break;
            case 'ArrowLeft':
                this.avion.deplacer('gauche');
                break;
            case 'ArrowRight':
                this.avion.deplacer('droite');
                break;
            case ' ':
                this.avion.tirer();
                break;
            case 'Escape':
                this.fin();
                break;
        }
    };

    finDuJeu() {
        this.enCours = false;
        clearInterval(this.intervalleEnemis);
        clearInterval(this.intervalleObstacles);
        clearInterval(this.intervalleBonus);
        var vies = document.getElementById('vies');
        document.getElementById('h1').innerHTML = "Jeu terminé : vous avez perdu";
        document.getElementById('p').innerHTML = `Score final : ${this.score} <br> Entrée pour Recommencer`;
        document.getElementById('ecran-demarrage').style.display = 'flex';
        document.getElementById('jeu').style.display = 'none';
        console.log(this.score)
        this.carte.innerHTML = '';
        this.score = 0;
        this.scoreElement.textContent = '000000';
    }

    fin() {
        this.enCours = false;
        clearInterval(this.intervalleEnemis);
        clearInterval(this.intervalleObstacles);
        clearInterval(this.intervalleBonus);
        var vies = document.getElementById('vies');
        document.getElementById('ecran-demarrage').style.display = 'flex';
        document.getElementById('jeu').style.display = 'none';
        document.getElementById('h1').innerHTML = "Jeu d'Avion Militaire";
        document.getElementById('p').innerHTML = "commencer";
        this.carte.innerHTML = '';
        this.score = 0;
        this.scoreElement.textContent = '000000';
    }
}

function verifierCollision(element1, element2) {
    if (!element1 || !element2) return false;
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

new Jeu();
