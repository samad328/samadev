// I know the code is Ugly 😁 But hay it's working
import $ from "jquery";


import Lenis from 'lenis'
import SplitType from 'split-type'
import imagesLoaded from "imagesloaded";

import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";


gsap.registerPlugin(ScrollTrigger,ScrollToPlugin,Draggable);

const lenis = new Lenis({
  lerp: 0.06, // Lower values create a smoother scroll effect
  smoothWheel: true ,// Enables smooth scrolling for mouse wheel events

direction: "vertical",
gestureDirection: "vertical",
smooth: true,
smoothTouch: false,
touchMultiplier: 2,
infinite: false,
autoResize: true,
})

// lenis.on('scroll', console.log)

function raf(time) {
lenis.raf(time)
requestAnimationFrame(raf)
}
requestAnimationFrame(raf);

lenis.start();

  //  



  // Script Registration
// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
// Intro Homepage Start

//Intro Homepage End

// Anchor Navigation
/* Main navigation */
let panelsSection = document.querySelector("#panels"),
	panelsContainer = document.querySelector("#panels-container");
	let tween;
document.querySelectorAll(".anchor").forEach(anchor => {
	anchor.addEventListener("click", function(e) {
		e.preventDefault();
		let targetElem = document.querySelector(e.target.getAttribute("href"))
      
			let y = targetElem;
            console.log(y)
		if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
            
			let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
				totalMovement = (panels.length - 1) * targetElem.offsetWidth;
			y = Math.round(tween.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
		}
		gsap.to(window, {
			scrollTo: {
				y: '#portfolio-content',
				autoKill: false
			},
			duration: 1
		});
	});
});

/* Panels */
const panels = gsap.utils.toArray("#panels-container");

tween = gsap.to(panels, {
	xPercent: -100 * ( panels.length - 1 ),
	ease: "none",
	scrollTrigger: {
		trigger: "#panels-container",
		pin: true,
		start: "top top",
		scrub: 1,
		snap: {
			snapTo: 1 / (panels.length - 1),
			inertia: false,
			duration: {min: 0.1, max: 0.1}
		},
		end: () =>  "+=" + (panelsContainer.offsetWidth - innerWidth)
	}
});


// Cursor effect
gsap.set(".cursor-scroll", {xPercent: -50, yPercent: -50});

var ball = document.querySelector(".cursor-scroll");
var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
var mouse = { x: pos.x, y: pos.y };
var speed = 0.1;

var xSet = gsap.quickSetter(ball, "x", "px");
var ySet = gsap.quickSetter(ball, "y", "px");

gsap.set(ball, { scale: 0 })

function mousemoveFunction(e) {   
    mouse.x = e.x;
    mouse.y = e.y;  
}

function tickerUpdate() {   
var dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 

pos.x += (mouse.x - pos.x) * dt;
pos.y += (mouse.y - pos.y) * dt;
xSet(pos.x);
ySet(pos.y);
}

var section = document.querySelector(".intro");

section.onmouseenter = function(){
    section.addEventListener("mousemove", mousemoveFunction);
    gsap.ticker.add(tickerUpdate)
    gsap.to(ball, { scale: 1 })
}

section.onmouseleave = function(){
    section.removeEventListener("mousemove", mousemoveFunction);
    gsap.ticker.remove(tickerUpdate)
    gsap.to(ball, { scale: 0 })
}



// Three JS Start

// // Define the container dimensions
// const containerWidth = 100; // Set your desired width
// const containerHeight = 100; // Set your desired height

// // Create a scene
// const scene = new THREE.Scene();

// // Create a camera
// const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
// camera.position.z = 1.5;

// // Create a renderer that fits the container
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(containerWidth, containerHeight);

// // Append the renderer's DOM element to your container (div)
// const container = document.getElementById("threed-cube"); // Replace with your container's ID
// container.appendChild(renderer.domElement);

// // Create a rotating box
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0xD5CDC4, wireframe: true });
// const cube = new THREE.Mesh(geometry, outlineMaterial);
// scene.add(cube);

// Auto-rotation
const animate = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

// animate();


// Three JS end

// Clients Slider

// var clients = gsap.timeline({
//     pause: true,
//     defaults: {
//       ease: "linear",
//       repeat: -1,
//       duration: 20,
//       yoyo: true
//     }
//   })
  
//   clients.from(
//     ".slide-track",
//     { xPercent: -50 }, 0
//   )
//   .fromTo(
//     ".slide-track-2",
//     { xPercent: 0 },{ xPercent: -50 }, 0
//   )
  
//   ScrollTrigger.create({
//     trigger: "section",
//     start: "top top",
//     end: "bottom",
//     onEnter: () => {
//         clients.play();
//     },
//     onLeave: () => {
//         clients.play();
//     },
//     onUpdate: (self) => {
//       const velocity = Math.abs(self.getVelocity());
//       clients.timeScale(velocity / 100);
//       gsap.to(clients, { timeScale: 1, ease: 'power1.inOut', duration: 2, overwrite: true });
//     }
//   });


// Portfolio Listing JS

const clamp = (min, number, max) => Math.min(max, Math.max(number, min));
        let prevX = 0;

        document.querySelectorAll(".showcase").forEach((showcase) => {
        const img = showcase.querySelector(".showcase-photo");
        let timeout;

        showcase.addEventListener("mousemove", (e) => {
            clearTimeout(timeout);

            const x = e.clientX - showcase.getBoundingClientRect().left - img.clientWidth / 2;
            const y = e.clientY - showcase.getBoundingClientRect().top - img.clientHeight / 2;
            const rotate = e.clientX - prevX;
            prevX = e.clientX;
            
            // console.log({y, x, rotate});

            requestAnimationFrame(() => {
            img.style.translate = `${x}px ${y}px`;
            img.style.rotate = clamp(-8, rotate * 2, 8) + "deg";
            });

            timeout = setTimeout(() => {img.style.rotate = "0deg"}, 250);
        });

        showcase.addEventListener("mouseenter", () => {
            setTimeout(() => {
            img.style.transition = "1200ms cubic-bezier(0.23, 1, 0.320, 1)";
            img.style.opacity = 1;
            }, 1);
        });

        showcase.addEventListener("mouseleave", () => {
            img.style.transition = "none";
            img.style.opacity = 0;
        });
    });

// End Portfolio JS

// Home Page Animation
// Website Animation

// Preloader Filter
(function() {
    const blurProperty = gsap.utils.checkPrefix("filter"),
          blurExp = /blur\((.+)?px\)/,
          getBlurMatch = target => (gsap.getProperty(target, blurProperty) || "").match(blurExp) || [];
  
    gsap.registerPlugin({
      name: "blur",
      get(target) {
        return +(getBlurMatch(target)[1]) || 0;
      },
      init(target, endValue) {
        let data = this,
            filter = gsap.getProperty(target, blurProperty),
            endBlur = "blur(" + endValue + "px)",
            match = getBlurMatch(target)[0],
            index;
        if (filter === "none") {
          filter = "";
        }
        if (match) {
          index = filter.indexOf(match);
          endValue = filter.substr(0, index) + endBlur + filter.substr(index + match.length);
        } else {
          endValue = filter + endBlur;
          filter += filter ? " blur(0px)" : "blur(0px)";
        }
        data.target = target; 
        data.interp = gsap.utils.interpolate(filter, endValue); 
      },
      render(progress, data) {
        data.target.style[blurProperty] = data.interp(progress);
      }
    });
  })();


// Footer animation
gsap.from('.foot', {
    scrollTrigger: {
        trigger: '.foot',
        scrub: true,
        skewX: 5,
        star: "top bottom",
        
    },
    yPercent:-50,
    stagger:0.1,
    ease: 'power4.out',
    duration:1
});

// Intro timeline
        // const preloadI = gsap.timeline();
        // preloadI.from(".prewrap", {y:20, stagger:1, duration:1, opacity:0, alpha:0, blur:10},{y:0, stagger:1, duration:1, opacity:1, ease:"SlowMo", alpha:1, blur:0, yoyo:true});
        // gsap.fromTo(".holder", {y:50, duration:3}, {y:0, duration:5, ease:"SloMo"});

        


        

        
        // Top animation
          gsap.to('.uptotop', {
            scrollTrigger: {
                trigger: 'section',
                start: "top top",
                scrub: true,
            },
            ease: "linear.out",
            stagger: .5,
            y:-100,
            duration: 2,
        });
        // H1 Animation on scroll  
        gsap.to('h1', {
            scrollTrigger: {
                trigger: ".intro",
                start: "top top",
                scrub: true,
            },
            ease: "linear.out",
            y:-100,
            duration: 5,
        });

        
        // My Image parallax


        // Titles Animations

        let select = (e) => document.querySelector(e);
        let selectAll = (e) => document.querySelectorAll(e);

        const slides = selectAll('.container');
       

        const myText = new SplitType('.my-text');
        // H3 Animation
        var lines = gsap.utils.toArray('.line');
        lines.forEach((line, i) => {
        
        gsap.from(line, { autoAlpha: 0,
            scrollTrigger: {
                trigger: line,
                star: "top 50%",
                ease: "linear",
                
            },
            yPercent:100,
            stagger:0.1,
            rotationX: 75,
            skewX: -30,
            autoAlpha: 0,
            ease: 'power4',
            duration:1.5,
            blur:20
        });
        
        }) 

        // Pragraph text animation
        
        var pragraphs = gsap.utils.toArray('.quote');

        pragraphs.forEach((text, i) => {
        
        gsap.from(text, { autoAlpha: 0,
            scrollTrigger: {
                trigger: text,
                start: 'top 90%',
            },
            duration: 2, 
            ease: "power4.out", 
            skewY: 4,
            yPercent: 20, 
            stagger: 0.3,
        });
        
        }) 


        

        /// Test
        // gsap.from(".small-sentence", {yPercent: 100, duration:2, stagger: 1, opacity:0, skewY: 4, ease: "power4.out"});
        /// End Test
        

        // Elements fade-in animation
        
        var fadein = gsap.utils.toArray('.fadein');

        fadein.forEach((fadein, i) => {
        
        gsap.from(fadein, { autoAlpha: 0,
            scrollTrigger: {
                trigger: fadein,
            },
            duration: 1.5, 
            ease: "power4", 
            skewX: -10,
            yPercent: 30, 
            stagger: 0.2,
        });
        
        }) 
       

        // Sections fadout
        var sections = gsap.utils.toArray('.section');

        sections.forEach((section) => {
        
        gsap.to(section, { autoAlpha: 0,
            scrollTrigger: {
                trigger: section,
                start: '50%',
                scrub: true,
                end: 'bottom',
                ease: "linear"
            }
        });
        
        });

        
      
        
      // const words = [...title.querySelectorAll('.word')];
      
      // for (const word of words) {

      //     const chars = word.querySelectorAll('.char');
      //     const charsTotal = chars.length;
          
      //     gsap.fromTo(chars, {
      //         'will-change': 'transform, filter', 
      //         transformOrigin: '50% 100%',
      //         scale: position => {
      //             const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
      //             return gsap.utils.mapRange(0, Math.ceil(charsTotal/2), 0.5, 2.1, factor);
      //         },
      //         y: position => {
      //             const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
      //             return gsap.utils.mapRange(0, Math.ceil(charsTotal/2), 0, 60, factor);
      //         },
      //         rotation: position => {
      //             const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1;
      //             return position < charsTotal/2 ? gsap.utils.mapRange(0, Math.ceil(charsTotal/2), -4, 0, factor) : gsap.utils.mapRange(0, Math.ceil(charsTotal/2), 0, 4, factor);
      //         },
      //         filter: 'blur(12px) opacity(0)',
      //     }, 
      //     {
      //         ease: 'power2.inOut',
      //         y: 0,
      //         rotation: 0,
      //         scale: 1,
      //         filter: 'blur(0px) opacity(1)',
      //         scrollTrigger: {
      //             trigger: word,
      //             start: 'top bottom+=40%',
      //             end: 'top top+=15%',
      //             scrub: true,
      //         },
      //         stagger: {
      //             amount: 0.15,
      //             from: 'center'
      //         }
      //     });

      // }

 

      Draggable.create("#w-node-fe882e7d-9d65-c915-0dfe-e39f3fc196ad-d95f793f", {
        bounds: ".testimonials-section",
        inertia: true
      });



      import {Curtains, Plane,Vec2,ShaderPass} from 'curtainsjs';

function curtains(){
 // track the mouse positions to send it to the shaders
 const mousePosition = new Vec2();
 // we will keep track of the last position in order to calculate the movement strength/delta
 const mouseLastPosition = new Vec2();

 const deltas = {
     max: 0,
     applied: 0,
 };

    // set up our WebGL context and append the canvas to our wrapper
    const curtains = new Curtains({
        container: "canvas",
        // no need to listen for the scroll in this example
        pixelRatio: Math.min(1.5, window.devicePixelRatio) // limit pixel ratio for performance
    });

    curtains.onRender(() => {
        // update our planes deformation
        // increase/decrease the effect
        planesDeformations = curtains.lerp(planesDeformations, 0, 0.075);
    }).onScroll(() => {
        // get scroll deltas to apply the effect on scroll
        const delta = curtains.getScrollDeltas();

        // invert value for the effect
        delta.y = -delta.y;

        // threshold
        if(delta.y > 60) {
            delta.y = 60;
        }
        else if(delta.y < -60) {
            delta.y = -60;
        }

        if(Math.abs(delta.y) > Math.abs(planesDeformations)) {
            planesDeformations = curtains.lerp(planesDeformations, delta.y, 0.5);
        }
    }).onError(() => {
        // we will add a class to the document body to display original images
        document.body.classList.add("no-curtains", "planes-loaded");
    }).onContextLost(() => {
        // on context lost, try to restore the context
        curtains.restoreContext();
    });

    // we will keep track of all our planes in an array
    const planes = [];
    let planesDeformations = 0;

    // get our planes elements
    let planeElements = document.getElementsByClassName("gallery_image-wrapper");

    const vs = `
    precision mediump float;

    // default mandatory variables
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    uniform mat4 planeTextureMatrix;

    // custom variables
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;

    uniform float uPlaneDeformation;

    varying float vWave;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMousePosition;
    uniform float uMouseMoveStrength;


// peep peep
  


    void main() {
      

        
        
        vec3 vertexPosition = aVertexPosition;

      

        // a float varying from -1.5 to 1.5
        float waveCoords = ((uTime / 45.0) * 3.5) - 1.75;
    
        // distance from the waveCoords to the vertex coordinates
        float distanceToWave = distance(vec2(vertexPosition.x, 0.0), vec2(waveCoords, 0.0));
    
        // nice little wave animation from left to right or right to left depending on the timer
        vertexPosition.z -= (cos(clamp(distanceToWave, 0.0, 0.75) * 3.141592) - cos(0.75 * 3.141592) + (2.0 * sin(3.141592 * uTime / 90.0))) * 0.025;
    
           gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    
           // varyings
           vVertexPosition = vertexPosition;
           vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.)).xy;

    }
`;









const fs = `
precision mediump float;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

uniform sampler2D planeTexture;

varying float vWave;

void main() {
    

    // apply our texture
    vec4 finalColor = texture2D(planeTexture, vTextureCoord);

    // fake shadows based on vertex position along Z axis
    finalColor.rgb -= clamp(-vVertexPosition.z, 0.0, 1.0);
    // fake lights based on vertex position along Z axis
    finalColor.rgb += clamp(vVertexPosition.z, 0.0, 1.0);

    // handling premultiplied alpha (useful if we were using a png with transparency)
    finalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);

    gl_FragColor = finalColor;
}
`;
for(let i = 0; i < planeElements.length; i++) {
    // all planes will have the same parameters
    const params = {
        vertexShader: vs,
        fragmentShader: fs,
        widthSegments: 10,
        heightSegments: 10,
        fov: 15,
        texturesOptions: {
            minFilter: curtains.gl.LINEAR_MIPMAP_NEAREST
        },
        drawCheckMargins: {
            top: 100,
            right: 0,
            bottom: 100,
            left: 0,
        },
        uniforms: {
          time: {
            name: "uTime", // uniform name that will be passed to our shaders
            type: "1f", // this means our uniform is a float
            value:0, // initial value of the uniform
            },
            planeDeformation: {
                name: "uPlaneDeformation",
                type: "1f",
                value: 1,
            },
            mousePosition: { // our mouse position
                name: "uMousePosition",
                type: "2f", // again an array of floats
                value: mousePosition,
            },
            mouseMoveStrength: { // the mouse move strength
                name: "uMouseMoveStrength",
                type: "1f",
                value: 0,
            },
            resolution: { // resolution of our plane
                name: "uResolution",
                type: "2f", // notice this is an length 2 array of floats
                value: [planeElements[0].clientWidth, planeElements[0].clientHeight],
            },
        }
    };
    planes.push(new Plane(curtains, planeElements[i], params));
    handlePlanes(i);

}
    
    
    // handle all the planes
    function handlePlanes(index) {
        const plane = planes[index];

        plane.onReady(function() {

            plane.userData.mouseOver = false;

            planeElements[index].addEventListener("mouseenter", function(e) {
                plane.userData.mouseOver = true;
            });

            planeElements[index].addEventListener("mouseleave", function(e) {
                plane.userData.mouseOver = false;
            });

        }).onRender(() => {
            // use damping
            if(plane.userData.mouseOver) {
                plane.uniforms.time.value++;
            }
            else {
                plane.uniforms.time.value += (0 - plane.uniforms.time.value) * 0.0375;
            }
        });
    }

}

// Preload images
const preloadImages = new Promise((resolve, reject) => {
    imagesLoaded(document.querySelectorAll("img"), { background: true }, resolve);
  });
  
  preloadImages.then(images => {
    let IMAGES = images.images;
  });
  
  const preloadEverything = [ preloadImages];
  
  // And then..
  Promise.all(preloadEverything).then(() => {
  
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");
  // load images
  
  
  //progress animation
  var progressTl = gsap.timeline({  onComplete: loadComplete });
  
  
  // preloader out
  var preloaderOutT1 = gsap.timeline();
  preloaderOutT1
    .set('html', { className: 'is-loading' })
    .set('html', { className: 'is-loaded' })
    .from('.intro', 0.1, { autoAlpha: 0, ease: 'Power1.easeOut' }, '-=0.2')
    .from(".logo", { y: -30, duration: 1.4, opacity: 0, ease: "power4", }, '-=0.2')
    .from(".navbar", { y: -30, duration: 1.4, opacity: 0 }, "<0.3")
    .from(".wrappar-title, .bio_social, .bio_copyrights", { y: 30, duration: 1.4, opacity: 0, ease: "power4" }, "<0.3")
    .from(".o1, .o2, .o3, .o4", { autoAlpha: 0, duration: 2, skewX: -30, yPercent: 100, ease: "power4", stagger: 0.1, blur: 10 }, "<0.25");
  //force the playhead to jump to the end in order to pre-render all the tweens, then back to the start and pause.
  
  function loadComplete() {
    preloaderOutT1.play();
  }
  // Do not repeat the loader again

  curtains()






  
  });
  
  
  
  
  
  
