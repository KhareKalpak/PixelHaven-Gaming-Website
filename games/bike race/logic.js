// Adding Keys Events To Animate Bike And Car
let cross = true
let score = 0;
let scoreBoard = document.querySelector('.score')
let gameOverBoard = document.querySelector('.gameOver')

window.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        let car = document.querySelector('.opponent')    // Getting Car
        gameOverBoard.innerHTML = "<h1>Created By Aamir</h1>"
        car.classList.add('animateCar')
    }
    if (e.key == "ArrowUp") {
        let bike = document.querySelector('.player')  // Getting Bike

        bike.classList.add('animateBike') // Adding the animateBike class when Arrow Up
        setTimeout(() => {   // Removing the animateBike class after
            bike.classList.remove('animateBike')
        }, 600);
    }
    if (e.key == "ArrowRight") {
        let bike = document.querySelector('.player')     // Getting Bike
        let bikeX = parseInt(window.getComputedStyle(bike, null).getPropertyValue('left'))
        bike.style.left = bikeX + 70 + "px"
    }
    if (e.key == "ArrowLeft") {
        let bike = document.querySelector('.player')     // Getting Bike
        let bikeX = parseInt(window.getComputedStyle(bike, null).getPropertyValue('left'))
        bike.style.left = bikeX - 70 + "px"
    }
})

setInterval(() => {
    let bike = document.querySelector('.player')     // Getting Bike
    let car = document.querySelector('.opponent')    // Getting Car
    let gameOver = document.querySelector('.gameOver')  // Getting GameOver


    // Getting Current CSS Values Of Bike And Car In Integer
    let bikeX = parseInt(window.getComputedStyle(bike, null).getPropertyValue('left'))
    let bikeY = parseInt(window.getComputedStyle(bike, null).getPropertyValue('top'))
    let carX = parseInt(window.getComputedStyle(car, null).getPropertyValue('left'))
    let carY = parseInt(window.getComputedStyle(car, null).getPropertyValue('top'))

    let offsetX = Math.abs(bikeX - carX)
    let offsetY = Math.abs(bikeY - carY)

    if (offsetX < 120 && offsetY < 40) {
        bike.classList.add('gameOverAnimate')
        let car = document.querySelector('.opponent')    // Getting Car
        car.classList.add('gameOverAnimate2')
        gameOverBoard.innerHTML = "<h1>Game Over! Reload To Try Again</h1>"
        setTimeout(() => {
            bike.classList.remove('gameOverAnimate')
            bike.classList.remove('player')
        }, 1000);
    }
    else if (offsetX < 120 && cross) {
        score += 1
        // let car = document.querySelector('.opponent')    // Getting Car
        // let carSpeed = parseFloat(window.getComputedStyle(car, null).getPropertyValue('animation-duration'))
        // setTimeout(() => {
        //     car.style.animationDuration = carSpeed - 0.1 + "s"
        // }, 500);

        cross = false
        setTimeout(() => {
            cross = true
        }, 1000);
    }
    scoreBoard.innerHTML = "Score: " + score;
}, 1);