/* ==================================================
//  ____  _     _   _            _   _          _____ _                              
// |  _ \(_)___| |_(_)_ __   ___| |_(_)_   ____|_   _| |__   ___ _ __ ___   ___  ___ 
// | | | | / __| __| | '_ \ / __| __| \ \ / / _ \| | | '_ \ / _ \ '_ ` _ \ / _ \/ __|
// | |_| | \__ \ |_| | | | | (__| |_| |\ V /  __/| | | | | |  __/ | | | | |  __/\__ \
// |____/|_|___/\__|_|_| |_|\___|\__|_| \_/ \___||_| |_| |_|\___|_| |_| |_|\___||___/
//
/* ================================================*/

/*-----------------------------------------------------------------------------------*/
/*  DOCUMENT READY
/*-----------------------------------------------------------------------------------*/
$(document).ready(function(){
    'use strict';
    // OWL CAROUSEL //
    $('.owl-carousel').owlCarousel({
        navigation: false,
        pagination: false,
        navigationText: [
            "<i class='pe-7s-angle-left'></i>",
            "<i class='pe-7s-angle-right'></i>"
        ],
        autoPlay: 8000,
        loop: true
    });

    $('.owl-carousel-paged').owlCarousel({
        navigation: false,
        pagination:  true,
        autoPlay: 8000,
        loop: true
    });

    $('#single-slider').owlCarousel({
        navigation: false,
        pagination: true,
        autoPlay: 8000,
        loop: true
    });

    $(".side-menu .nav").metisMenu({
        toggle: false
    });

    // ANIMATED ONLY IF NOT AT TOP OF PAGE ON LOAD //
    var $win = $(window);
    if ($win.scrollTop() == 0)
        jQuery('.navbar-fixed-top').addClass('wow');
    else if ($win.height() + $win.scrollTop() == $(document).height()) {
        jQuery('.navbar-fixed-top').removeClass('wow');
    }

    // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
    $('.header-fixed-top .dropdown').on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });

    // ADD SLIDEUP ANIMATION TO DROPDOWN //
    $('.header-fixed-top .dropdown').on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.header-fixed-top .navbar-collapse ul li a').on('click', function(){
        $('.navbar-toggle:visible').click();
    });

    //NEAT VID EMBEDS
    $().prettyEmbed({ useFitVids: true });

    $('.lb-link').magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom mfp-img-mobile'
    });

    //BACK TO TOP
    $('a#back-to-top').on('click', function(event){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("body").offset().top
        }, 500);
    });

    $('.vertical-center').flexVerticalCenter({ cssAttribute: 'padding-top' });

    //CONTACT FORM
    $('#contactform').submit(function(){
        var action = $(this).attr('action');
        $("#message").slideUp(750,function() {
            $('#message').hide();
            $('#submit').attr('disabled','disabled');
            $.post(action, {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    website: $('#website').val(),
                    comments: $('#comments').val()
                },
                function(data){
                    document.getElementById('message').innerHTML = data;
                    $('#message').slideDown('slow');
                    $('#submit').removeAttr('disabled');
                    if(data.match('success') != null) $('#contactform').slideUp('slow');
                    $(window).trigger('resize');
                }
            );
        });
        return false;
    });

    $(".rotate").textrotator({
        animation: "dissolve",
        separator: ",",
        speed: 2500 // How many milliseconds until the next word show.
    });

    $('.match-height').matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
    });

    //SIDE NAV MOBILE
    $('#side-menu-toggle').on('click', function(event){
        event.preventDefault();
        $(this).toggleClass('open');
        $('#side-menu-toggle i').toggleClass('fa-bars');
        $('#side-menu-toggle i').toggleClass('fa-times');
        $('#side-wrapper').toggle();
    });

    // ONEPAGER XTRA //
    $('body').scrollspy({
        target: '.navbar-fixed-top'
    });

    // FULLSCREEN FIX //
    var windowHeight = $(window).innerHeight();
    var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if( !isMobileDevice ) {
        $('#headerwrap.fullheight').css('height', windowHeight);
        $(window).resize(function() {
            $('#headerwrap.fullheight').css('height', windowHeight);
        });
    }

    // ANIMATE ONCE PAGE LOAD IS OVER //
    Pace.on("done", function(){
        new WOW().init();
        $(window).trigger('resize');
    });

    // SEARCH //
    $('a[href="#search"]').on('click', function(event) {
        event.preventDefault();
        $('#search-wrapper').addClass('open');
        $('#search-wrapper > form > input[type="search"]').focus();
    });

    $('#search-wrapper, #search-wrapper button.close').on('click keyup', function(event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });

    $('form').submit(function(event) {
        event.preventDefault();
        return false;
    })

    // ONEPAGER //
    $('a.page-scroll').on('click', function(event){
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    $('.entry-content table, #post-content table').addClass('table');
    $('.entry-content dl, #post-content dl').addClass('dl-horizontal');
    //$(window).trigger('resize');
});

/*-----------------------------------------------------------------------------------*/
/*  WINDOW LOAD
/*-----------------------------------------------------------------------------------*/
$(window).load(function() {
    'use strict';

    // PRELOADING SCREEN
    jQuery('a:not([target="_blank"]):not([href*=#]):not([href^=mailto]):not(.fancybox-media):not(.btn.responsive-menu):not(a[href$="jpg"]):not([href$="jpeg"]):not(a[href$="gif"]):not(a[href$="png"]):not(a.ajax-link)').on('click', function(){
        var href = jQuery(this).attr('href');
        jQuery('.preloader').fadeIn(300);
        setTimeout(function(){
            window.location = href;
        }, 300);
        return false;
    });
});

/* CONFETTI JS */
var canvas = Confetti.createCanvas(
    document.querySelector('div'),
    document.querySelector('canvas#fettiwrap')
);

var config = {
    angle: 0.01,
    tiltAngle: 0.5,
    draw: draw,
    updatePosition: updatePosition,
    updateState: updateState
};

var particles = _.range(0, Confetti.DEFAULT_NUM).map(function () {
    return Confetti.create({
        x: Confetti.randomFrom(0, canvas.width),
        y: 0,
        r: Confetti.randomFrom(5, 30),
        tilt: Confetti.randomFrom(-10, 0),
        tiltAngle: 0,
        tiltAngleIncrement: Confetti.randomFrom(0.05, 0.12, 100)
    });
});
canvas.step(particles, config)();

function draw(confetti) {
    canvas.context.beginPath();
    canvas.context.lineWidth = confetti.r / 2;
    canvas.context.strokeStyle = confetti.color;
    canvas.context.moveTo(confetti.x + confetti.tilt + (confetti.r / 4),
        confetti.y);
    canvas.context.lineTo(confetti.x + confetti.tilt, confetti.y +
        confetti.tilt + (confetti.r / 4));
    canvas.context.stroke();
}

function updatePosition(confetti, idx) {
    confetti.tiltAngle += confetti.tiltAngleIncrement;
    confetti.y += (Math.cos(config.angle + confetti.d) + 1 + confetti.r / 2) / 2;
    confetti.x += Math.sin(config.angle);
    confetti.tilt = 15 * Math.sin(confetti.tiltAngle - idx / 3);

    if (confetti.isFlakeExiting(canvas)) {
        if (idx % 5 > 0 || idx % 2 === 0) {
            confetti.x = Confetti.randomFrom(0, canvas.width);
            confetti.y = -10;
            confetti.tilt = Confetti.randomFrom(-10, 0);

        } else {
            if (Math.sin(config.angle) > 0) {
                confetti.x = -5;
                confetti.y = Confetti.randomFrom(0, canvas.height);
                confetti.tilt = Confetti.randomFrom(-10, 0);
            } else {
                confetti.x = canvas.width + 5;
                confetti.y = Confetti.randomFrom(0, canvas.height);
                confetti.tilt = Confetti.randomFrom(-10, 0);
            }
        }
    }
}

function updateState() {
    this.angle += 0.01;
    this.tiltAngle += 0.1;
}

var feed = new Instafeed({
    get: 'tagged',
    tagName: 'wedding',
    clientId: '36c69579e891432f9cab8bb8752778e8',
    template: '<img src="{{image}}" />',
    resolution: 'low_resolution',
    limit: 12
});
feed.run();


// --- timeline ---- //
(function() {

    // VARIABLES
    const timeline = document.querySelector(".timeline ol"),
        elH = document.querySelectorAll(".timeline li > div"),
        arrows = document.querySelectorAll(".timeline .arrows .arrow"),
        arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
        arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
        firstItem = document.querySelector(".timeline li:first-child"),
        lastItem = document.querySelector(".timeline li:last-child"),
        xScrolling = 280,
        disabledClass = "disabled";

    // START
    window.addEventListener("load", init);

    function init() {
        setEqualHeights(elH);
        animateTl(xScrolling, arrows, timeline);
        setSwipeFn(timeline, arrowPrev, arrowNext);
        setKeyboardFn(arrowPrev, arrowNext);
    }

    // SET EQUAL HEIGHTS
    function setEqualHeights(el) {
        let counter = 0;
        for (let i = 0; i < el.length; i++) {
            const singleHeight = el[i].offsetHeight;

            if (counter < singleHeight) {
                counter = singleHeight;
            }
        }

        for (let i = 0; i < el.length; i++) {
            el[i].style.height = `${counter}px`;
        }
    }

    // CHECK IF AN ELEMENT IS IN VIEWPORT
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // SET STATE OF PREV/NEXT ARROWS
    function setBtnState(el, flag = true) {
        if (flag) {
            el.classList.add(disabledClass);
        } else {
            if (el.classList.contains(disabledClass)) {
                el.classList.remove(disabledClass);
            }
            el.disabled = false;
        }
    }

    // ANIMATE TIMELINE
    function animateTl(scrolling, el, tl) {
        let counter = 0;
        for (let i = 0; i < el.length; i++) {
            el[i].addEventListener("click", function() {
                if (!arrowPrev.disabled) {
                    arrowPrev.disabled = true;
                }
                if (!arrowNext.disabled) {
                    arrowNext.disabled = true;
                }
                const sign = (this.classList.contains("arrow__prev")) ? "" : "-";
                if (counter === 0) {
                    tl.style.transform = `translateX(-${scrolling}px)`;
                } else {
                    const tlStyle = getComputedStyle(tl);
                    // add more browser prefixes if needed here
                    const tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
                    const values = parseInt(tlTransform.split(",")[4]) + parseInt(`${sign}${scrolling}`);
                    tl.style.transform = `translateX(${values}px)`;
                }

                setTimeout(() => {
                    isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
                    isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
                }, 1100);

                counter++;
            });
        }
    }

    // ADD SWIPE SUPPORT FOR TOUCH DEVICES
    function setSwipeFn(tl, prev, next) {
        const hammer = new Hammer(tl);
        hammer.on("swipeleft", () => next.click());
        hammer.on("swiperight", () => prev.click());
    }

    // ADD BASIC KEYBOARD FUNCTIONALITY
    function setKeyboardFn(prev, next) {
        document.addEventListener("keydown", (e) => {
            if ((e.which === 37) || (e.which === 39)) {
                const timelineOfTop = timeline.offsetTop;
                const y = window.pageYOffset;
                if (timelineOfTop !== y) {
                    window.scrollTo(0, timelineOfTop);
                }
                if (e.which === 37) {
                    prev.click();
                } else if (e.which === 39) {
                    next.click();
                }
            }
        });
    }

})();


// --- typing ---- //
const selectSVG = id => {
    const el = document.getElementById(id);
    return new SVGElement(el);
};

const createSVG = type => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', type);
    return new SVGElement(el);
};

class SVGElement {
    constructor(element) {
        this.element = element;
    }

    set(attributeName, value) {
        this.element.setAttribute(attributeName, value);
    }

    style(property, value) {
        this.element.style[property] = value;
    }
}

const colors = [
    { main: '#FBDB4A', shades: ['#FAE073', '#FCE790', '#FADD65', '#E4C650'] },
    { main: '#F3934A', shades: ['#F7B989', '#F9CDAA', '#DD8644', '#F39C59'] },
    { main: '#EB547D', shades: ['#EE7293', '#F191AB', '#D64D72', '#C04567'] },
    { main: '#9F6AA7', shades: ['#B084B6', '#C19FC7', '#916198', '#82588A'] },
    { main: '#5476B3', shades: ['#6382B9', '#829BC7', '#4D6CA3', '#3E5782'] },
    { main: '#2BB19B', shades: ['#4DBFAD', '#73CDBF', '#27A18D', '#1F8171'] },
    { main: '#70B984', shades: ['#7FBE90', '#98CBA6', '#68A87A', '#5E976E'] }
];
const svg = selectSVG('svg');
const text = document.getElementById('text');
const offscreenText = document.getElementById('offscreen-text');
const input = document.getElementById('input');
let width = window.innerWidth;
let height = window.innerHeight;
let textSize = 0;
let textCenter = 0;
const letters = [];
const prompt = ['t', 'r', 'y', ' ', 't', 'o', ' ', 't', 'y', 'p', 'i', 'n', 'g'];
let runPrompt = true;

const resizePage = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    svg.set('height', height);
    svg.set('width', width);
    svg.set('viewBox', `0 0 ${width} ${height}`);
    resizeLetters();
}

const resizeLetters = () => {
    textSize = width / (letters.length+2);
    if (textSize > 100) textSize = 100;
    text.style.fontSize = `${textSize}px`;
    text.style.height = `${textSize}px`;
    text.style.lineHeight = `${textSize}px`;
    offscreenText.style.fontSize = `${textSize}px`;
    const textRect = text.getBoundingClientRect();
    textCenter = textRect.top + textRect.height/2;
    positionLetters();
};

const positionLetters = () => {
    letters.forEach(letter => {
        const timing = letter.shift ? 0.1 : 0;
        TweenLite.to(letter.onScreen, timing, {x:letter.offScreen.offsetLeft+'px', ease: Power3.easeInOut});
        letter.shift = true;
    });
}

const animateLetterIn = letter => {
    const yOffset = (0.5+Math.random()*0.5) * textSize;
    TweenLite.fromTo(letter, 0.4, {scale:0}, {scale:1, ease: Back.easeOut});
    TweenLite.fromTo(letter, 0.4, {opacity:0}, {opacity: 1, ease: Power3.easeOut});
    TweenLite.to(letter, 0.2, {y:-yOffset, ease: Power3.easeInOut});
    TweenLite.to(letter, 0.2, {y:0, ease: Power3.easeInOut, delay: 0.2});
    const rotation = -50 + Math.random()*100;
    TweenLite.to(letter, 0.2, {rotation: rotation, ease: Power3.easeInOut});
    TweenLite.to(letter, 0.2, {rotation: 0, ease: Power3.easeInOut, delay: 0.2});
}

const addDecor = (letter, color) => {
    setTimeout(() => {
        var rect = letter.getBoundingClientRect();
        const x0 = letter.offsetLeft + letter.offsetWidth/2;
        const y0 = textCenter - textSize*0.5;
        const shade = color.shades[Math.floor(Math.random()*4)];
        for (var i = 0; i < 8; i++) addTri(x0, y0, shade);
        for (var i = 0; i < 8; i++) addCirc(x0, y0);
    }, 150);
};

const addTri = (x0, y0, shade) => {
    const tri = createSVG('polygon');
    const a = Math.random();
    const a2 = a + (-0.2 + Math.random()*0.4);
    const r = textSize*0.52;
    const r2 = r + textSize*Math.random()*0.2;
    const x = x0 + r * Math.cos(2 * Math.PI * a);
    const y = y0 + r * Math.sin(2 * Math.PI * a);
    const x2 = x0 + r2 * Math.cos(2 * Math.PI * a2);
    const y2 = y0 + r2 * Math.sin(2 * Math.PI * a2);
    const triSize = textSize * 0.1;
    const scale = 0.3 + Math.random()*0.7;
    const offset = triSize*scale;
    tri.set('points', `0,0 ${triSize*2},0 ${triSize},${triSize*2}`);
    tri.style('fill', shade);
    svg.element.appendChild(tri.element);
    TweenLite.fromTo(tri.element, 0.6, {rotation: Math.random()*360, scale: scale, x: x-offset, y: y-offset, opacity: 1}, {x: x2-offset, y: y2-offset, opacity: 0, ease: Power1.easeInOut, onComplete: () => {
            svg.element.removeChild(tri.element);
        }});
}

const addCirc = (x0, y0) => {
    const circ = createSVG('circle');
    const a = Math.random();
    const r = textSize*0.52;
    const r2 = r + textSize;
    const x = x0 + r * Math.cos(2 * Math.PI * a);
    const y = y0 + r * Math.sin(2 * Math.PI * a);
    const x2 = x0 + r2 * Math.cos(2 * Math.PI * a);
    const y2 = y0 + r2 * Math.sin(2 * Math.PI * a);
    const circSize = textSize * 0.05 * Math.random();
    circ.set('r', circSize);
    circ.style('fill', '#eee');
    svg.element.appendChild(circ.element);
    TweenLite.fromTo(circ.element, 0.6, {x: x-circSize, y: y-circSize, opacity: 1}, {x: x2-circSize, y: y2-circSize, opacity: 0, ease: Power1.easeInOut, onComplete: () => {
            svg.element.removeChild(circ.element);
        }});
}

const addLetter = (char, i) => {
    const letter = document.createElement('span');
    const oLetter = document.createElement('span');
    letter.innerHTML = char;
    oLetter.innerHTML = char;
    text.appendChild(letter);
    const color = colors[i%colors.length];
    letter.style.color = color.main;
    offscreenText.appendChild(oLetter);
    letters[i] = {offScreen: oLetter, onScreen: letter, char: char};
    animateLetterIn(letter);
    addDecor(oLetter, color);
}

const addLetters = value => {
    value.forEach((char, i) => {
        if (letters[i] && letters[i].char !== char) {
            letters[i].onScreen.innerHTML = char;
            letters[i].offScreen.innerHTML = char;
            letters[i].char = char;
        }
        if (letters[i] === undefined) {
            addLetter(char, i);
        }
    });
};

const animateLetterOut = (letter, i) => {
    TweenLite.to(letter.onScreen, 0.1, {scale: 0, opacity: 0, ease: Power2.easeIn, onComplete: () => {
            console.log('removing');
            console.log(letter);
            offscreenText.removeChild(letter.offScreen);
            text.removeChild(letter.onScreen);
            positionLetters();
        }});
    letters.splice(i, 1);
}

const removeLetters = value => {
    for (let i = letters.length-1; i >= 0; i--) {
        const letter = letters[i];
        if (value[i] === undefined) {
            animateLetterOut(letter, i)
        }
    }
}

const onInputChange = () => {
    const value = input.value === '' ? [] : input.value.toLowerCase().split('');
    addLetters(value);
    removeLetters(value);
    resizeLetters();
};

const keyup = (e) => {
    if (runPrompt) {
        input.value = '';
        runPrompt = false;
    };
    onInputChange();
}

const addPrompt = (i) => {
    setTimeout(() => {
        if (runPrompt && prompt[i]) {
            input.value = input.value + prompt[i];
            onInputChange();
            addPrompt(i+1);
        }
    }, 300);
}

resizePage();
window.addEventListener('resize', resizePage);
input.addEventListener('keyup', keyup);
// input.focus();
addPrompt(0);


///* file 저장 */
const saveFile = document.getElementsByClassName("save");

function download(filename, textInput){
    const element = document.createElement('a');
    element.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(textInput));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
    console.log(element);
}
document.getElementById("save_btn").addEventListener("click", function (e){
    e.preventDefault();
    const text = document.getElementById("input").value;
    const filename = "file.txt";
    download(filename,text);
}, false);
//----- project -----//

var carousel = $(".p_carousel"),
    currdeg  = 0;

$(".p_next").on("click", { d: "n" }, rotate);
$(".p_prev").on("click", { d: "p" }, rotate);

function rotate(e){
    if(e.data.d=="n"){
        currdeg = currdeg - 60;
    }
    if(e.data.d=="p"){
        currdeg = currdeg + 60;
    }
    carousel.css({
        "-webkit-transform": "rotateY("+currdeg+"deg)",
        "-moz-transform": "rotateY("+currdeg+"deg)",
        "-o-transform": "rotateY("+currdeg+"deg)",
        "transform": "rotateY("+currdeg+"deg)"
    });
}

