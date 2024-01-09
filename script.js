const { gsap } = window;

function animateBubbleAppearance(bubble) {
    gsap.from(bubble, { duration: 0.5, scale: 0, opacity: 0, ease: "back.out(1.7)" });
}

function animateBubbleClick(bubble) {
    gsap.to(bubble, { duration: 0.3, scale: 1.5, opacity: 0, onComplete: () => bubble.remove() });
}

function animateGameOver() {
    gsap.to("#pbtm", { duration: 1, opacity: 0, y: -100, scale: 0.5 });
    gsap.to("#panel", { duration: 1, delay: 0.5, opacity: 0, y: -100, scale: 0.5 });
    gsap.to("#pbtm", { duration: 0.5, delay: 2, opacity: 1, y: 0, scale: 1 });
    gsap.to("#panel", { duration: 0.5, delay: 2, opacity: 1, y: 0, scale: 1 });
}


function makeBubble() {
    var clutter = "";

    for (var i = 0; i <= 300; i++) { // Reduced the number of bubbles for illustration
        var rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${rn}</div>`;
    }

    document.querySelector("#pbtm").innerHTML = clutter;

    // Animate each newly created bubble
    document.querySelectorAll(".bubble").forEach(animateBubbleAppearance);
}

makeBubble();

var runTimer = 60;
var hitrun;

function timer() {
    var timerint = setInterval(function () {
        if (runTimer > 0) {
            runTimer--;
            document.querySelector("#timerval").textContent = runTimer;
        } else {
            clearInterval(timerint);
            animateGameOver();
            // Do something when runTimer reaches 0 (optional)
        }
    }, 1000);
}

timer();

function getNewHit() {
    hitrun = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitrun;
}

getNewHit();


var score = 0;

function IncreaseScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

var final_Score;

document.querySelector("#pbtm").addEventListener("click", function (dets) {
    var clickedBubble = dets.target;
    var clickednum = Number(clickedBubble.textContent);
    
    if (clickednum === hitrun) {
        IncreaseScore();
        animateBubbleClick(clickedBubble);
        makeBubble();
        getNewHit();
    }
});


