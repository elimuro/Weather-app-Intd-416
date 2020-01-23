class Particle {
    constructor(n) {
        // function called when a Particle is generated
        this.dia = 5; // set the diameter of the particle
        this.id = n; // set the ID of the particle
        this.setParticleMode(0); // call the wait function
        this.mode; // variable to store current mode
    }

    setParticleMode(m) {
        this.mode = m;

        switch(this.mode) {
            case 0:
                this.wait();
                break;
            case 1:
                this.sun();
                break;
            case 2:
                this.rain();
                break;
            case 3:
                this.wind();
                break;
            default:
                this.wait();
                break;
        }
    }

    wait() {
        // init function which sets the starting point of the particle and a random direction
        //console.log("wait mode");
        let x = (canvasWidth/14) * (this.id%14) + ((canvasWidth/14)/2); // calculate the x position of the particle in the grid based on it's id and the width of the canvas
        let y = (canvasHeight/14)*(floor(this.id/14)) + ((canvasHeight/14)/2); // calculate the y position of the particle in the grid based in it's id and height of the canvas

        this.pos = createVector(x,y); // particles are arranged in a grid (using the previously calculated x and y position)
        this.dir = createVector(0,0); // no direction needed for wait mode
        this.acc = 0; // no acceleration needed for wait mode

        this.age = 0; // no age needed for wait mode
        this.lifespan = 0; // no lifespan needed for wait mode
    }

    sun() {
        // function to execute when the weather is sunny which emits the points from the center into a random direction
        console.log("sun mode");
        this.pos = createVector(canvasWidth/2, canvasHeight/2); // put particle to 0/0
        this.dir = p5.Vector.random2D(); // create a random direction and store it in 'dir'
        this.dir.mult(25); // multiple 'dir' by 25
        this.pos.add(this.dir); // offset 'pos' of the particle by 'dir' from the center

        this.dir.normalize(); // normalize 'dir' so subsequent steps are smaller
        this.acc = random(.5,1); // create a random number between 1 and 3 for the particles acceleration and store it in 'acc'
        this.dir.mult(this.acc); // multiply 'dir' with 'acc'

        this.age = 0; // set the age of the particle to 0
        this.lifespan = random(55,233); // each particle receives a random lifespan between 100 and 200 frames
    }

    rain() {
        // function to execute when the weather is rainy
        console.log("rain mode");
        this.pos = createVector(random(0,canvasWidth), random(0,canvasHeight));
        this.dir = createVector(0, 1);
        this.acc = random(.5,1);
        this.dir.mult(this.acc);
        this.age = 0;
        this.lifespan = random(55,233);
    }

    wind() {
        // function to execute when the weather is windy
        console.log("wind mode");
        this.pos = createVector(random(0, canvasWidth), random(0, canvasHeight));
        this.dir = createVector(1,0);
        this.acc = random(.5, 1);
        this.dir.mult(this.acc);
        this.age = 0;
        this.lifespan = random(55,233);
    }

    update() {
        // update function increases the position of the particle and checks if it's lifespan is over
        if(this.lifespan != 0) {
            if(this.age < this.lifespan) { // if the age is below the lifespan the particle lives and moves
                this.pos.add(this.dir); // add 'dir' to 'pos' (particle is moving)
                this.age++; // age of the particle increases by 1
                //console.log("update");
            } else {
                this.setParticleMode(this.mode);
            }
        } else {
            //console.log("no updates");
        }
    }

    show() {
        fill(255); // particles are drawn with a black fill color
        ellipseMode(CENTER); // particles are drawn from the center
        //push(); // we store the current matrix transformation
        //translate(p5Canvas.width/2, p5Canvas.height/2); // we move the transformation matrix to the center of the screen
        ellipse(this.pos.x, this.pos.y, this.dia, this.dia); // we draw an ellipse using the particle's position and diameter
        //pop(); // we restore the previously stored matrix transformation
    }
}