import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Platform from './Platform.js';
import PlatformO from './PlatformO.js';
import Player from './Player.js';
import Tube from './Tube.js';
import Enemy from './Enemy.js';
import Mort from './Mort.js';
import Thing1 from './Thing1.js';
import Background2 from './Background2.js';


// Store the assets and attributes of the Game at the specific GameLevel.
class GameLevel {
    constructor(gameObject) {
        // conditional assignments from GameObject to instance variables
        this.tag = gameObject?.tag;
        this.backgroundImg2 = gameObject.background2?.file;
        this.backgroundImg = gameObject.background?.file;
        this.platformImg = gameObject.platform?.file;
        this.platformOImg = gameObject.platformO?.file; // platform lesson add on 
        this.thingImg = gameObject.thing?.file; // platform lesson add on
        this.playerImg = gameObject.player?.file;
        this.playerData = gameObject?.player;
        this.enemyImg = gameObject.enemy?.file;
        this.enemyData = gameObject?.enemy;
        this.tubeImg = gameObject.tube?.file;
        this.isComplete = gameObject?.callback; // function that determines if level is complete
        GameEnv.levels.push(this);
    }
    // Load level data
    async load() {
        // test for presence of Images
        const imagesToLoad = [];
        if (this.backgroundImg2) {
            imagesToLoad.push(this.loadImage(this.backgroundImg2));
        }
        if (this.backgroundImg) {
            imagesToLoad.push(this.loadImage(this.backgroundImg));
        }
        if (this.platformImg) {
            imagesToLoad.push(this.loadImage(this.platformImg));
        }
        if (this.platformOImg) {
            imagesToLoad.push(this.loadImage(this.platformOImg));
        }
        if (this.thingImg) {
            imagesToLoad.push(this.loadImage(this.thingImg));
        }
        if (this.playerImg) {
            imagesToLoad.push(this.loadImage(this.playerImg));
        }
        if(this.enemyImg) {
            imagesToLoad.push(this.loadImage(this.enemyImg));
        }
        if (this.tubeImg) {
            imagesToLoad.push(this.loadImage(this.tubeImg));
        }
        try {
            // Do not proceed until images are loaded
            const loadedImages = await Promise.all(imagesToLoad);
            var i = 0;

            if (this.backgroundImg2) {
                const backgroundCanvas = document.createElement("canvas");
                backgroundCanvas.id = "background2";
                document.querySelector("#canvasContainer").appendChild(backgroundCanvas);
                const backgroundSpeedRatio = 0;
                new Background2(backgroundCanvas, loadedImages[i], backgroundSpeedRatio);
                i++;
            }
            // Prepare HTML with Background Canvas (if backgroundImg is defined)
            if (this.backgroundImg) {
                const backgroundCanvas = document.createElement("canvas");
                backgroundCanvas.id = "background";
                document.querySelector("#canvasContainer").appendChild(backgroundCanvas);
                const backgroundSpeedRatio = 0;
                new Background(backgroundCanvas, loadedImages[i], backgroundSpeedRatio);
                i++;
            }            
            // Prepare HTML with Platform Canvas (if platformImg is defined)
            if (this.platformImg) {
                const platformCanvas = document.createElement("canvas");
                platformCanvas.id = "platform";
                document.querySelector("#canvasContainer").appendChild(platformCanvas);
                const platformSpeedRatio = 0;
                new Platform(platformCanvas, loadedImages[i], platformSpeedRatio);
                i++;
            }
            //platformO
            if (this.platformOImg) {
                const platformCanvas = document.createElement("canvas");
                platformCanvas.id = "jumpPlatform";
                document.querySelector("#canvasContainer").appendChild(platformCanvas);
                const platformSpeedRatio = 0;
                new PlatformO(platformCanvas, loadedImages[i], platformSpeedRatio);
                i++;
            }
            //thing/coin
            if (this.thingImg) {
                const platformCanvas = document.createElement("canvas");
                platformCanvas.id = "thing2";
                document.querySelector("#canvasContainer").appendChild(platformCanvas);
                const platformSpeedRatio = 0;
                new Thing1(platformCanvas, loadedImages[i], platformSpeedRatio);
                i++;
            }
            // Prepare HTML with Player Canvas (if playerImg is defined)
            if (this.playerImg) {
                const playerCanvas = document.createElement("canvas");
                playerCanvas.id = "character";
                document.querySelector("#canvasContainer").appendChild(playerCanvas);
                const playerSpeedRatio = 0.7;
                new Player(playerCanvas, loadedImages[i], playerSpeedRatio, this.playerData);
                i++;
            }
            if (this.enemyImg) {
                const enemyCanvas = document.createElement("canvas");
                enemyCanvas.id = "enemy";
                document.querySelector("#canvasContainer").appendChild(enemyCanvas);
                const enemySpeedRatio = 0.7;
                new Enemy(enemyCanvas, loadedImages[i], enemySpeedRatio, this.enemyData);
                i++;
            }
            // Prepare HTML with Player Canvas (if playerImg is defined)
            if (this.tubeImg) {
                const tubeCanvas = document.createElement("canvas");
                tubeCanvas.id = "tube";
                document.querySelector("#canvasContainer").appendChild(tubeCanvas);
                new Tube(tubeCanvas, loadedImages[i]);
                i++;
            }
        } catch (error) {
            console.error('Failed to load one or more images:', error);
        }
    }
    // Create a function to load an image and return a Promise
    async loadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = () => resolve(image);
            image.onerror = reject;
        });
    }
}
export default GameLevel;