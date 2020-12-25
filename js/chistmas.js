//form thing
var $readyNow = false;

$('#form').on('submit', function(e) {
    e.preventDefault();
    var tF = document.getElementById("namefield").value;
    if (tF.length === 0) {
        alert("Please enter your name");
        return false;
    }
    $('#form').submit.disabled = true;
    $(".go").addClass("hide");
    $(".confirm").append(document.createTextNode("lovely name!"));
    $(".confirm").addClass("show");
    var $mCt = ["Merry Christmas, " + tF + "!"];
    $('.dialog-text').append(document.createTextNode($mCt));
    $readyNow = true;
    if (master.isActive() === false) {
        master.resume();
    }
});

//GSAP stuff
TweenMax.ticker.fps(60);

var $stars = $("#tree polygon"),
    $dialog = $(".dialog"),
    $bear = $("#bear"),
    $decor = $("#decorations *");

function sceneOne() {
    var tl = new TimelineLite();

    tl.add("bubbles")
        .to($(".stripes"), 4, {
            scale: 1.1,
            repeat: 2,
            yoyo: true,
            transformOrigin: "50% 50%",
            opacity: 0.7
        }, "bubbles")
        .staggerFromTo($(".bubble1"), 1, {
            y: 3,
            scale: 0.8
        }, {
            y: -3,
            scale: 1.2,
            repeat: 7,
            yoyo: true,
            ease: Quad.easeOut
        }, 0.5, "bubbles")
        .staggerFromTo($(".bubble2"), 1, {
            y: 3,
            scale: 0.6,
            opacity: 0.7
        }, {
            y: -3,
            scale: 1.2,
            opacity: 0.4,
            yoyo: true,
            repeat: 7,
            ease: Quad.easeOut
        }, 0.5, "bubbles+=0.5")
        .staggerFromTo($(".bubble3"), 1, {
            y: 2,
            scale: 0.9
        }, {
            y: -3,
            scale: 2,
            yoyo: true,
            repeat: 5,
            ease: Quad.easeOut
        }, 0.5, "bubbles+=0.7")
        .fromTo($(".bearhead"), 1, {
            x: -2,
            y: 2,
            rotation: 5,
            repeat: 5,
            transformOrigin: "50% 100%"
        }, {
            x: 2,
            y: 2,
            rotation: -5,
            transformOrigin: "50% 100%",
            repeat: 7,
            yoyo: true,
            ease: Power1.easeInOut
        }, "bubbles+=0.7");
    tl.call(function(e) {
        if ($readyNow === false) {
            master.pause();
        }
    });
    tl.add("change")
        .to($("form"), 0.3, {
            y: -10,
            scaleY: 0,
            opacity: 0,
            ease: Quad.easeInOut
        }, "change")
        .to($(".sceneone"), 3, {
            scaleY: 0,
            y: 30,
            opacity: 0,
            ease: Quad.easeInOut
        }, "change+=0.3")
        .to($("body"), 4, {
            backgroundColor: "#BDDBD0",
            ease: Quad.easeInOut
        }, "change+=1");
    tl.add("bearz", "-=0.5")
        .from($bear, 12, {
            scale: 0.15,
            y: 140,
            ease: Quad.easeInOut
        }, "bearz")
        .to($(".bear-body"), 0.5, {
            y: -2,
            ease: Circ.easeInOut,
            repeat: 23
        }, "bearz")
        .fromTo($(".leg1"), 1, {
            y: -2
        }, {
            y: +2,
            repeat: 10,
            ease: Expo.easeOut
        }, "bearz")
        .fromTo($(".leg2"), 1, {
            y: -2
        }, {
            y: +2,
            repeat: 10,
            ease: Expo.easeOut
        }, "bearz+=0.5")
        .staggerFrom($stars, 3, {
            rotation: 1000,
            opacity: 0.2,
            scale: 0,
            x: -400,
            y: -500,
            ease: Bounce.easeOut
        }, 0.05, "bearz+=4")
        .staggerFrom($(".decorations path"), 2, {
            scaleX: 0,
            ease: Expo.easeOut
        }, 0.1, "-=2")
        .staggerFrom($decor, 2, {
            scaleX: 0,
            scaleY: 0.3,
            rotation: 360,
            transformOrigin: "50% 50%",
            opacity: 0.5,
            ease: Expo.easeOut
        }, 0.1, "-=2")
        .from($(".light"), 0.5, {
            scale: 0,
            transformOrigin: "50% 50%",
            opacity: 0.2,
            ease: Back.easeOut
        })
        .from($dialog, 2, {
            scale: 0,
            opacity: 0.5,
            transformOrigin: "0% 100%",
            ease: Elastic.easeInOut
        })
        .from($(".dialog-text"), 1, {
            scale: 0,
            opacity: 0.5,
            transformOrigin: "50% 50%",
            ease: Back.easeOut
        }, "-=0.8");

    tl.timeScale(1.2);

    return tl;
}

var master = new TimelineLite();
$(document).ready(master)
master.add(sceneOne(), "scene1");

//master.seek("scene2");