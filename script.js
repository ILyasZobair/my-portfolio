
/* ==========================================
   INFRA.LAB — Portfolio interactions
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Automatic footer year
  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Ouvrir le menu" : "Fermer le menu"
      );

      mainNav.classList.toggle("open", !isOpen);
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (
        mainNav.classList.contains("open") &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // 3. Project filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow =
          selectedFilter === "all" || category === selectedFilter;

        card.classList.toggle("is-hidden", !shouldShow);
      });
    });

    button.setAttribute(
      "aria-pressed",
      String(button.classList.contains("active"))
    );
  });

  // 4. Reveal sections when scrolling
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // 5. Highlight the current navigation section
  const navLinks = document.querySelectorAll(
    '.nav-link[href^="#"]'
  );

  const pageSections = document.querySelectorAll(
    "main section[id]"
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const isCurrent =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isCurrent);
          });
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px"
      }
    );

    pageSections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // 6. OPTIONAL: configure your own links here.
  // Replace the example values with your real public links.
  const GITHUB_PROFILE = "";
  const GITHUB_REPOSITORY = "";
  const CONTACT_EMAIL = "";

  const githubTargets = [
    document.getElementById("githubLink"),
    document.getElementById("contactGithub")
  ];

  githubTargets.forEach((link) => {
    if (!link) return;

    const destination = GITHUB_REPOSITORY || GITHUB_PROFILE;

    if (destination) {
      link.href = destination;
    }
  });

  const emailLink = document.querySelector(
    'a[href^="mailto:"]'
  );

  if (emailLink && CONTACT_EMAIL) {
    emailLink.href = `mailto:${CONTACT_EMAIL}`;
  }

  console.info("INFRA.LAB portfolio initialized.");
});
