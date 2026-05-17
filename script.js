const tl = gsap.timeline();

tl.to("#shield-logo",{

    opacity:1,
    duration:2,
    scale:1.1

})

.to("#shield-logo",{

    rotation:360,
    duration:2

})

.to("#imperium-title",{

    opacity:1,
    y:-10,
    duration:1.5

})

.to("#legacy-text",{

    opacity:1,
    duration:2

});
