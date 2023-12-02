// Smooth scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
});

//--------------------------------------------

// First Page animation
(function overlayAnim() {
  let tl = gsap.timeline();
  tl.from("nav", {
    y: "-10",
    opacity: 0,
    duration: 1,
    ease: Expo.easeInOut,
  })
    .to(".overlayElem", {
      y: 0,
      ease: "power4.out",
      stagger: 0.2,
      duration: 1,
    })
    .to(".overlayElem2", {
      y: 0,
      ease: "power2.InOut",
      stagger: 0.4,
      delay: -1,
    })
    .from(".lower-heading", {
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: "Expo.easeInOut",
    });
})();

// cursor ---------
const timeout = 0;
const mouse = document.querySelector(".mouse");
// Skewing mouse circle

/*
function mouseSkew() {
  // default scale value
  let xscale = 1;
  let yscale = 1;

  // prev value
  let prevX = 0;
  let prevY = 0;
  window.addEventListener("mousemove", (e) => {
    clearTimeout(timeout);
    // get the difference between the current mouse position and the previous mouse position
    // let xdiff = e.clientX - prevX;
    // let ydiff = e.clientY - prevY;

    // Now our max scale down should be 0.8 and max scale up should be 1
    // use clamp() to make sure we never go below those values
    xscale = gsap.utils.clamp(0.5, 1, e.clientX - prevX);
    yscale = gsap.utils.clamp(0.5, 1, e.clientY - prevY);

    // and update the prev position for executing next time
    prevX = e.clientX;
    prevY = e.clientY;

    // pass to mouse follower function
    mouseFollower(xscale, yscale);
    timeout = setTimeout(() => {
      mouse.styele.transform = `scale(1, 1)`;
    }, 100);
  });
}
mouseSkew();
*/

function mouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", (e) => {
    // document.querySelector(
    //   ".mouse"
    // ).style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    gsap.to(".mouse", {
      x: e.clientX,
      y: e.clientY,
      duration: 0.7,
      ease: "power3.out",
      // transform: `scale(${xscale}, ${yscale})`,
    });
  });
}

mouseFollower();
// overlayAnim();

// Project page animation
document.querySelectorAll(".items").forEach((item) => {
  let rotate = 0;
  let diffrot = 0;
  item.addEventListener("mouseleave", (e) => {
    gsap.to(item.querySelector("img"), {
      opacity: 0,
      ease: "power3.out",
      duration: 0.5,
    });
  });
  item.addEventListener("mousemove", (e) => {
    // let divY = item.getBoundingClientRect().top;
    // let currentY = e.clientY;
    let insideY = e.clientY - item.getBoundingClientRect().top;
    diffrot = e.clientX - rotate;
    rotate = e.clientX;
    gsap.to(item.querySelector("img"), {
      opacity: 1,
      ease: "power3.out",
      // display: "block",
      top: insideY,
      left: e.clientX,
      rotate: gsap.utils.clamp(-15, 15, diffrot * 0.4),
    });
  });
});
