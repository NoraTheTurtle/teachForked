import Character from './Character.js';

const Dog_Animation = {
    // Sprite properties
    scale: 1,
    width: 160,
    height: 144,
	idle: { row: 0, frames: 47 },
	barking: { row: 1, frames: 47 },
	walking: { row: 2, frames: 47 }
}

export class Character_Dog extends Character{
    // constructors sets up Character object 
    constructor(dogCanvas, image, gameSpeed, speedRatio){
        super(dogCanvas, 
            image, 
            gameSpeed, 
            speedRatio,
            Dog_Animation.width, 
            Dog_Animation.height, 
            Dog_Animation.scale
        );
    }

    // Dog perform a unique update
    update() {
        if (this.frameY === Dog_Animation.walking.row) {
            this.x -= this.speed;  // Move the dog to the left
            // Check if the dog has moved off the left edge of the canvas
            if (this.x < -this.canvas.width) {
                this.x = window.innerWidth; // Reset the dog's x position to the right edge
            }
        }
        // Update animation frameX of the object
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
    }
}

// Can add specific initialization parameters for the dog here
// In this case the dog is following the default character initialization
export function initDog(canvasId, image, gameSpeed, speedRatio, controls){
    // Create the Dog character
    var dog = new Character_Dog(canvasId, image, gameSpeed, speedRatio);

    // Dog Frame position and Frame extents
    dog.setFrameY(Dog_Animation.walking.row);
    dog.setMaxFrame(Dog_Animation.walking.frames);

    // Dog Screen Position
    dog.setX(window.innerWidth);
    dog.setY(window.innerHeight / 1.5);

    /* Dog Control 
    * changes y value, the row in sprite
    * which changes animation to either idle, bark, walk
    * change number of frames in row
    */
    controls.addEventListener('click', function (event) {
        if (event.target.tagName === 'INPUT') {
            const selectedAnimation = event.target.id;
            dog.setFrameY(Dog_Animation[selectedAnimation].row);
            dog.setMaxFrame(Dog_Animation[selectedAnimation].frames);
        }
    });

    // Dog Object
    return dog;
}

export default Character_Dog;