// Initialize Lenis
const lenis = new Lenis({
	autoRaf: true,
});

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Update ScrollTrigger on Lenis scroll
lenis.on("scroll", ScrollTrigger.update);

// Initialize Splide carousel
const splide = new Splide(".splide", {
	type: "loop",
	perPage: 1,
	focus: "center",
	gap: "24px",
	padding: { right: "80px" },
	arrows: false,
	breakpoints: {
		640: {
			padding: { right: "60px" },
		},
		480: {
			padding: { right: "40px" },
		},
	},
}).mount();

// WHITE RECTANGLE EXPANSION ANIMATION
gsap.timeline({
	scrollTrigger: {
		trigger: ".new-section",
		start: "top bottom",
		end: "top center",
		scrub: 1,
		onUpdate: (self) => {
			const progress = self.progress;

			// Desktop animation
			const desktopRect = document.getElementById("white-rectangle-desktop");
			if (desktopRect) {
				const initialWidth = window.innerHeight * 0.49; // 49vh
				const initialHeight = window.innerHeight * 0.7; // 70vh
				const finalWidth = window.innerWidth;
				const finalHeight = window.innerHeight;

				// Use easing for smoother animation
				const easedProgress = gsap.parseEase("power2.out")(progress);

				const currentWidth =
					initialWidth + (finalWidth - initialWidth) * easedProgress;
				const currentHeight =
					initialHeight + (finalHeight - initialHeight) * easedProgress;

				// Determinar qué bordes mostrar según el progreso
				let borderTop = easedProgress > 0.9 ? "0px" : "4px";
				let borderLeft = easedProgress > 0.9 ? "0px" : "4px";
				let borderRight = easedProgress > 0.9 ? "0px" : "4px";
				let borderBottom = "0px"; // Sin borde inferior

				gsap.set(desktopRect, {
					width: currentWidth + "px",
					height: currentHeight + "px",
					borderRadius:
						easedProgress > 0.7
							? `${16 * (1 - easedProgress)}px ${
									16 * (1 - easedProgress)
							  }px 0 0`
							: "16px 16px 0 0",
					borderTop: `${borderTop} solid #EEEEF0`,
					borderLeft: `${borderLeft} solid #EEEEF0`,
					borderRight: `${borderRight} solid #EEEEF0`,
					borderBottom: borderBottom,
					backgroundColor: `rgba(255, 255, 255, ${easedProgress})`,
					position: "fixed",
					bottom: 0,
					left: "50%",
					transform: "translateX(-50%)",
					zIndex: progress > 0.5 ? 15 : 5, // Menor z-index al principio para quedar detrás del texto
				});
			}

			// Mobile animation
			const mobileRect = document.getElementById("white-rectangle-mobile");
			if (mobileRect) {
				const easedProgress = gsap.parseEase("power2.out")(progress);

				// Para mobile, ajustar bordes también
				let borderWidth = easedProgress > 0.9 ? "0px" : "4px";

				gsap.set(mobileRect, {
					width: 80 + (100 - 80) * easedProgress + "%",
					height: 40 + (100 - 40) * easedProgress + "%",
					bottom: 10 - 10 * easedProgress + "%",
					borderRadius:
						easedProgress > 0.7 ? `${16 * (1 - easedProgress)}px` : "16px",
					border: `${borderWidth} solid #EEEEF0`,
					backgroundColor: `rgba(255, 255, 255, ${easedProgress})`,
					position: "fixed",
					left: "50%",
					transform: "translateX(-50%)",
					zIndex: progress > 0.5 ? 15 : 5, // Menor z-index al principio para quedar detrás del texto
				});
			}
		},
	},
});

// Reset rectangle position when animation is complete
gsap.timeline({
	scrollTrigger: {
		trigger: ".new-section",
		start: "top center",
		end: "top center",
		onEnter: () => {
			// Reset to normal positioning after animation
			const desktopRect = document.getElementById("white-rectangle-desktop");
			const mobileRect = document.getElementById("white-rectangle-mobile");
			if (desktopRect) {
				gsap.set(desktopRect, {
					position: "absolute",
					width: "100vw",
					height: "100vh",
					borderRadius: "0px",
					border: "none",
					backgroundColor: "rgba(255, 255, 255, 1)",
				});
			}

			if (mobileRect) {
				gsap.set(mobileRect, {
					position: "absolute",
					width: "100%",
					height: "100%",
					borderRadius: "0px",
					border: "none",
					backgroundColor: "rgba(255, 255, 255, 1)",
				});
			}
		},
	},
});

// Fade in hero content when scrolling back up
gsap.timeline({
	scrollTrigger: {
		trigger: ".new-section",
		start: "top bottom",
		end: "top center",
		scrub: 1,
		onUpdate: (self) => {
			const progress = self.progress;
			const heroContent = document.querySelector(".hero-content");
			if (heroContent) {
				gsap.set(heroContent, {
					opacity: 1 - progress * 0.5,
				});
			}
		},
	},
});

// NEW SECTION - Fade In/Out Animation
gsap.set(".new-section-content", { opacity: 0, y: 100 });

gsap.timeline({
	scrollTrigger: {
		trigger: ".new-section",
		start: "top 70%",
		end: "bottom 30%",
		toggleActions: "play none none reverse",
		onEnter: () => {
			gsap.to(".new-section-content", {
				opacity: 1,
				y: 0,
				duration: 1.2,
				ease: "power2.out",
			});
		},
		onLeave: () => {
			gsap.to(".new-section-content", {
				opacity: 0,
				y: -100,
				duration: 1,
				ease: "power2.in",
			});
		},
		onEnterBack: () => {
			gsap.to(".new-section-content", {
				opacity: 1,
				y: 0,
				duration: 1.2,
				ease: "power2.out",
			});
		},
		onLeaveBack: () => {
			gsap.to(".new-section-content", {
				opacity: 0,
				y: 100,
				duration: 1,
				ease: "power2.in",
			});
		},
	},
});

// INVITATION SECTION - Fade In/Out Animation
gsap.set(".invitation-section-content", { opacity: 0, y: 100 });

gsap.timeline({
	scrollTrigger: {
		trigger: ".invitation-section",
		start: "top 70%",
		end: "bottom 30%",
		toggleActions: "play none none reverse",
		onEnter: () => {
			gsap.to(".invitation-section-content", {
				opacity: 1,
				y: 0,
				duration: 1.2,
				ease: "power2.out",
			});
		},
		onLeave: () => {
			gsap.to(".invitation-section-content", {
				opacity: 0,
				y: -100,
				duration: 1,
				ease: "power2.in",
			});
		},
		onEnterBack: () => {
			gsap.to(".invitation-section-content", {
				opacity: 1,
				y: 0,
				duration: 1.2,
				ease: "power2.out",
			});
		},
		onLeaveBack: () => {
			gsap.to(".invitation-section-content", {
				opacity: 0,
				y: 100,
				duration: 1,
				ease: "power2.in",
			});
		},
	},
});

// INVITATION SECTION - Parallax Effect (Container only)
gsap.to(".invitation-parallax-container", {
	y: -50,
	ease: "none",
	scrollTrigger: {
		trigger: ".invitation-section",
		start: "top bottom",
		end: "bottom top",
		scrub: 1,
	},
});
