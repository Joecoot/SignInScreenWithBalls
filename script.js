const canvas = document.getElementById("floatingBalls");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const loginWrapper = document.getElementById("login-wrapper");
const cover = document.getElementById("cover");

const loginButton = document.getElementById("login-button");

const transitionButton = document.getElementById("transition-button");
const transitionHead = document.getElementById("transition-head");
const transitionBody = document.getElementById("transition-body");

const numberOfBalls = 250;
const ballsArray = [];

let state = 0;

class Ball {
    constructor(radius = 0, color) {
        if (radius === 0) {
            this.radius = Math.floor(Math.random() * 15) + 10;
        }
        else {
            this.size = radius;
        }


        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        this.color = `rgb(${r}, ${g}, ${b})`

        this.x = Math.floor(Math.random() * (canvas.width - this.radius*2)) + this.radius;
        this.y = Math.floor(Math.random() * (canvas.height - this.radius*2)) + this.radius;

        this.direction = [(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5];

        this.temp = false;
        this.temp2 = false;
    }

    update() {
        this.move();
        this.draw();
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    move() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {

            if (this.temp) {
                this.temp = false;
                this.direction[0] += 100;
                this.x = 0 + this.radius;
            }

            if (this.temp2) {
                this.temp2 = false;
                this.direction[0] -= 100;
                this.x = canvas.width - this.radius*2;
            }

            this.direction[0] = -this.direction[0];

        }
        else if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.direction[1] = -this.direction[1];
        }

        this.x += this.direction[0];
        this.y += this.direction[1];
    }
}

function createBalls() {
    for (let i = 0; i<numberOfBalls; i++) {
        let ball = new Ball();
        ballsArray.push(ball);
    }
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ballsArray.forEach(ball => ball.update());

    console.log(loginWrapper.style.width)
    if (loginWrapper.style.width === "0px") {
        loginWrapper.style.display = "none";
    }

}

createBalls();

transitionButton.onclick = () => {

    if (state === 0) {
        state = 1;
        cover.classList.remove("right");
        cover.classList.add("left")
        for (let ball of ballsArray) {
            ball.direction[0] -= 100;
            ball.temp = true;
        }
        transitionHead.textContent = "Welcome back!";
        transitionBody.textContent = "Click here if you would like to log into your account";
        transitionButton.textContent = "SIGN IN";
    }
    else if (state === 1) {
        state = 0;
        cover.classList.remove("left");
        cover.classList.add("right")
        for (let ball of ballsArray) {
            ball.direction[0] += 100;
            ball.temp2 = true;
        }
        transitionHead.textContent = "Hello!";
        transitionBody.textContent = "Click here if you would like to register a new account into the site";
        transitionButton.textContent = "SIGN UP";
    }

};