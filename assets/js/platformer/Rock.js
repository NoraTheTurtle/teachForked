import Character from './Character.js';
import GameEnv from './GameEnv.js';
export class Rock extends Character {
    // constructors sets up Character object
    constructor(canvas, image, speedRatio, enemyData){
        super(canvas,
            image,
            speedRatio,
            enemyData.width,
            enemyData.height,
        );
        this.destruction = 0;
        // Player Data is required for Animations
        this.enemyData = enemyData;
        // this.spriteScale = 1;
        //Initial Position of Goomba
        this.x = .60 * GameEnv.innerWidth;
    }
    update() {
        // Check if the enemy is at the left or right boundary
        if (this.x <= 0 || this.x + this.width >= GameEnv.innerWidth) {
            // Change direction by reversing the speed
            this.speed = -this.speed;
        }

        //Randomly change when the Goomba changes position
        if (Math.random() < 0.006) {
            this.speed = Math.random() < 0.5 ? -this.speed : this.speed;
        }
        //Randomly turn Goomba into God Mode
        if (Math.random() < 0.01) {
            this.performGoombaSpecial();
        }
        //Initially get the enemy moving
        this.x += this.speed;
        //detect if the goomba is dead
        if (this.destruction === 1) {
            this.destroy();
        }
    }
    performGoombaSpecial() {
        if (!this.specialActionActive) {
            // Temporary increase in speed
            const originalSpeed = this.speed;
            this.speed *= 4; // You can adjust the multiplier based on your game's design
    
            // Store the original styles
            const originalTransform = this.canvas.style.transform;
            const originalFilter = this.canvas.style.filter;
            const originalBackgroundColor = this.canvas.style.backgroundColor; // Store the original background color
    
            // Set initial hue value
            let hue = 0;
    
            // Function to update the color
            const updateColor = () => {
                // Update the hue and convert it to an HSL color string
                hue = (hue + 1) % 360;
                const color = `hsl(${hue}, 100%, 50%)`;
    
                // Change the styling and scale of the enemy
                this.canvas.style.backgroundColor = color;
            };
    
            // Call the updateColor function at regular intervals (e.g., every 100 milliseconds)
            this.colorInterval = setInterval(updateColor, 100);
    
            // Restyle the enemy
            this.canvas.style.transform = 'scaleX(-1)';
            this.canvas.style.transform = 'scale(1.5)';
    
            // Set a timeout to revert the changes after a certain duration
            setTimeout(() => {
                this.speed = originalSpeed;
                this.canvas.style.transform = originalTransform;
                this.canvas.style.filter = originalFilter;
                this.canvas.style.backgroundColor = originalBackgroundColor; // Revert to the original background color
                this.specialActionActive = false; // Reset the flag after the timeout
                clearInterval(this.colorInterval); // Stop the color cycling interval
            }, 3000);
    
            // Set the flag to indicate that the special action is active
            this.specialActionActive = true;
        }
    }    
    /* murder() {
        let i = 1;
        let intervalId = setInterval(() => {
            if (i >= 0) {
                canvas.style.transform = `scale(1, ${i.toFixed(1)})`;
                console.log("Death" + i.toFixed(1));
                i -= 0.1;
            } else {
                clearInterval(intervalId);
            }
        }, 50);
    } */
} 
export default Mort