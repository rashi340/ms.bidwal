
// =====================================
// RASHMI PORTFOLIO - JAVASCRIPT
// =====================================

// 1. MOBILE NAVIGATION MENU

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close menu after clicking a navigation link

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});

// Close menu when clicking outside

document.addEventListener("click", (event) => {
    if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
});


// 2. TYPING ANIMATION

const typingText = document.getElementById("typing-text");

const roles = [
    "Web Designer",
    "Computer Learner",
    "Future Professional",
    "Creative Thinker"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (reducedMotion) {
    typingText.textContent = "Web Designer";
} else {
    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (!deleting) {
            charIndex++;
            typingText.textContent = currentRole.slice(0, charIndex);

            if (charIndex === currentRole.length) {
                deleting = true;
                setTimeout(typeEffect, 1400);
                return;
            }
        } else {
            charIndex--;
            typingText.textContent = currentRole.slice(0, charIndex);

            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        setTimeout(typeEffect, deleting ? 45 : 90);
    }

    typeEffect();
}


// 3. SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


// 4. ACTIVE NAVIGATION LINK

const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.id;

                    navItems.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === "#" + currentId;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    pageSections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


// 5. AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// 6. CONTACT FORM - OPEN EMAIL APPLICATION

const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        formNote.textContent = "Please fill in all the fields.";
        return;
    }

    const recipient = "rbidwal93@gmail.com";

    const emailSubject = encodeURIComponent(subject);

    const emailBody = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        "Message:\n" + message
    );

    const mailtoLink =
        "mailto:" + recipient +
        "?subject=" + emailSubject +
        "&body=" + emailBody;

    formNote.textContent =
        "Opening your email application. Please send the message there.";

    window.location.href = mailtoLink;
});
