const tl = gsap.timeline();

tl.to("#shield-center",{

    opacity:1,
    scale:1.05,
    duration:2

})

.to("#shield-ring",{

    rotateY:360,

    duration:4,

    repeat:-1,

    ease:"linear"

},0)

.to("#imperium-title",{

    opacity:1,
    y:-10,
    duration:1.5

})

.to("#legacy-text",{

    opacity:1,
    duration:2

});
