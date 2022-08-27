// Typing Effect
function typingEffect() {

    var TxtRotate = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    window.onload = function () {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-rotate');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666;}";
        document.body.appendChild(css);
    };
}
typingEffect();

// ======================

// Responsive NavBar
function hamburger() {
    document.getElementsByClassName("fa-bars")[0].classList.add("hidden")
    document.getElementsByClassName("slide_bar")[0].style.left = "0";
    document.getElementsByClassName("fa-xmark")[0].classList.remove("hidden")
}

function close_navbar() {
    document.getElementsByClassName("fa-xmark")[0].classList.add("hidden")
    document.getElementsByClassName("slide_bar")[0].style.left = "-100%";
    document.getElementsByClassName("fa-bars")[0].classList.remove("hidden")
}

// OnScroll Smoothness

window.onscroll = function () {
    var scroll_position = window.scrollY;
    if (scroll_position === 0) {
        document.getElementsByTagName("nav")[0].style.background = "transparent";
        document.getElementsByTagName("nav")[0].style.height = "100px";
        document.querySelectorAll(".logo p span")[0].style.color = "#dc143c";
    }
    else {
        document.getElementsByTagName("nav")[0].style.background = "#dc143c";
        document.getElementsByTagName("nav")[0].style.height = "70px";
        document.querySelectorAll(".logo p span")[0].style.color = "white";
    }
}

// Changing Card Images on hover

var is_paused = false;
function change_card_image() {
    is_paused = true;
}

function default_card_image() {
    is_paused = false;

}

// Changing Project Cards

var card_count = 0;
function change_cards() {
    var left = 0;
    if (card_count === 3) {
        card_count = 0;
    } else if (card_count === -1) {
        card_count = 2;
    }
    left = card_count * 100;
    document.getElementsByClassName("card_collection")[0].style.left = `-${left}%`;
    for (i = 0; i < 3; i++) {
        document.getElementsByClassName("dots")[0].children[i].style.background = "";
        document.getElementsByClassName("dots")[0].children[i].style.width = "10px";
        document.getElementsByClassName("dots")[0].children[i].style.borderRadius = "50%";
    }
    document.getElementsByClassName("dots")[0].children[card_count].style.background = "#fff";
    document.getElementsByClassName("dots")[0].children[card_count].style.width = "15px";
    document.getElementsByClassName("dots")[0].children[card_count].style.borderRadius = "5px";
}

change_cards(); // Calling this function once 

// Setting Interval to change Project card items 

setInterval(function () {
    if (!is_paused) {
        card_count = card_count + 1;
        change_cards();
    }
}, 3000);

// Changing the dot icons when click on them 

function slider_dots(index) {
    card_count = index;
    change_cards();
}

