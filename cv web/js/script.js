document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling (using a simple approach - can be enhanced with libraries)
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Adjust for nav height
                    behavior: 'smooth'
                });
            }
        });
    });

    // GSAP Animation (Example - section heading fade-in)
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray("section").forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%", // Adjust as needed
        onEnter: () => {
          gsap.from(section.querySelector("h2"), {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out"
          });
        },
        //  once: true // Only animate once
      });
    });

    // Active Nav Link Highlighting
    window.addEventListener('scroll', () => {
        let currentSection = '';

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 70; // Adjust for nav height
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });
});