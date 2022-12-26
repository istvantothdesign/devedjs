let controller;
let slideScene;

function animateSlides() {
  //  Initiate controller
  controller = new ScrollMagic.Controller();

  //Select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  //Loop over each slide
  sliders.forEach((slide) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");

    //GSAP
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power3.inOut" },
    });
    slideTl.fromTo(revealImg, { x: "50%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.76");
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=1");
  });
}

animateSlides();
