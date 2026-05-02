// ── 1. NAVBAR SCROLL ──
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
//-2. HAMBURGER MENU-
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("open");
  if (navLinks.classList.contains("open")) {
    hamburger.innerHTML = "&#10005;"; // Change to 'X' when open
  } else {
    hamburger.innerHTML = "&#9776;"; // Change back to hamburger when closed
  }
});
navItems.forEach(function (link) {
  link.addEventListener("click", function () {
    setTimeout(function () {
      navLinks.classList.remove("open");
      hamburger.innerHTML = "&#9776;"; // Change back to hamburger when closed
    }, 300); // Delay of 300ms
  });
});

//-3. FAQ ACCORDION-
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(function (item) {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", function () {
    const isOpen = item.classList.contains("active");
    faqItems.forEach(function (otherItem) {
      otherItem.classList.remove("active");
    });
    if (!isOpen) {
      item.classList.add("active");
    }
  });
});
// -4. GALLERY LIGHTBOX-
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

// Add click to each gallery image
document.querySelectorAll(".gallery-item img").forEach(function (img) {
  img.style.cursor = "pointer";
  img.addEventListener("click", function () {
    lightboxImg.src = this.src;
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

// Close with X button
lightboxClose.addEventListener("click", function () {
  lightbox.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close by clicking dark background
lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Close with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// -5. SCROLL REVEAL ANIMATIONS-
const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right"
);

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(function (el) {
  revealObserver.observe(el);
});
// ── FEATURE 6 — FORM SUBMISSION FEEDBACK ──
const contactForm = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(contactForm);

  fetch(contactForm.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then(function (response) {
      if (response.ok) {
        successMessage.style.display = "flex";
        contactForm.reset();
        setTimeout(function () {
          successMessage.style.display = "none";
        }, 5000);
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    })
    .catch(function (error) {
      alert("Oops! Something went wrong. Please try again.");
    });
});
// ── FEATURE 7 — ACTIVE NAV LINK HIGHLIGHT ──
const sections = document.querySelectorAll("section");
const navLinksList = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", function () {
  let currentSection = "";
  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinksList.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});
