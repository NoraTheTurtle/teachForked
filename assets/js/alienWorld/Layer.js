class Layer {
    constructor(canvas, image, gameSpeed, speedRatio) {
        this.x = 0;
        this.y = 0;
        this.frame = 0;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.image = image;
        this.width = image.width;  // Image() width (meta data)
        this.height = image.height; // Image() height
        this.aspect_ratio = this.width / this.height;
        this.speedRatio = speedRatio;
        this.speed = gameSpeed * this.speedRatio;
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }
}

export default Layer;