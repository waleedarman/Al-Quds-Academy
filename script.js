document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const menuButton = document.getElementById("menu");
  const closeMenuButton = document.getElementById("closeMenu");
  const menuBox = document.querySelector(".menu-box");
  const menuLinks = document.querySelectorAll(".menu-box .menu-links a");

  const loginOverlay = document.getElementById("loginPage");
  const loginForm = document.getElementById("form");
  const closeLoginButton = document.getElementById("close");
  const loginTriggers = document.querySelectorAll(".login-trigger");

  const form = document.getElementById("Form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitButton = document.getElementById("oki");
  const emailMessage = document.getElementById("messageemail");
  const passwordMessage = document.getElementById("messagemot");

  const allSectionLinks = document.querySelectorAll('a[href^="#"]');
  const sections = document.querySelectorAll("section[id], div[id]");

  const faqItems = document.querySelectorAll(".question .quest");

  const openMenu = () => {
    if (!menuBox) return;
    menuBox.classList.add("open");
    body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    if (!menuBox) return;
    menuBox.classList.remove("open");
    body.style.overflow = "";
  };

  if (menuButton) {
    menuButton.addEventListener("click", openMenu);
  }

  if (closeMenuButton) {
    closeMenuButton.addEventListener("click", closeMenu);
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!menuBox || !menuButton) return;

    const clickedInsideMenu = menuBox.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton && menuBox.classList.contains("open")) {
      closeMenu();
    }
  });

  const openLogin = () => {
    if (!loginOverlay || !loginForm) return;

    loginOverlay.style.display = "flex";
    requestAnimationFrame(() => {
      loginForm.style.transform = "scale(1)";
    });
    body.style.overflow = "hidden";
  };

  const closeLogin = () => {
    if (!loginOverlay || !loginForm) return;

    loginForm.style.transform = "scale(0)";
    setTimeout(() => {
      loginOverlay.style.display = "none";
    }, 250);
    body.style.overflow = "";
  };

  loginTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      const href = trigger.getAttribute("href") || "";
      if (href === "#" || href === "" || href.toLowerCase().includes("login")) {
        event.preventDefault();
        openLogin();
      }
    });
  });

  if (closeLoginButton) {
    closeLoginButton.addEventListener("click", closeLogin);
  }

  if (loginOverlay) {
    loginOverlay.addEventListener("click", (event) => {
      if (event.target === loginOverlay) {
        closeLogin();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeLogin();
    }
  });

  const validateForm = () => {
    if (!emailInput || !passwordInput || !submitButton) return;

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    const passwordValid = passwordValue.length >= 6;

    if (emailMessage) {
      emailMessage.style.display = emailValue && !emailValid ? "block" : "none";
    }

    if (passwordMessage) {
      passwordMessage.style.display = passwordValue && !passwordValid ? "block" : "none";
    }

    submitButton.disabled = !(emailValid && passwordValid);
  };

  if (emailInput) {
    emailInput.addEventListener("input", validateForm);
    emailInput.addEventListener("blur", validateForm);
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", validateForm);
    passwordInput.addEventListener("blur", validateForm);
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      validateForm();
      if (submitButton && submitButton.disabled) {
        event.preventDefault();
      }
    });
  }

  faqItems.forEach((item) => {
    const content = item.querySelector(".content-box");
    const icon = item.querySelector(".down");

    if (!content) return;

    item.addEventListener("click", () => {
      const isOpen = content.classList.contains("open");

      faqItems.forEach((otherItem) => {
        const otherContent = otherItem.querySelector(".content-box");
        const otherIcon = otherItem.querySelector(".down");

        if (otherContent) {
          otherContent.classList.remove("open");
          otherContent.style.height = "0px";
        }

        if (otherIcon) {
          otherIcon.classList.remove("saber");
        }
      });

      if (!isOpen) {
        content.classList.add("open");
        content.style.height = `${content.scrollHeight}px`;
        if (icon) {
          icon.classList.add("saber");
        }
      }
    });
  });

  const clearActiveLinks = () => {
    allSectionLinks.forEach((link) => link.classList.remove("active"));
  };

  const setActiveByHash = () => {
    const currentHash = window.location.hash;
    if (!currentHash) return;

    clearActiveLinks();

    const relatedLinks = document.querySelectorAll(`a[href="${currentHash}"]`);
    relatedLinks.forEach((link) => link.classList.add("active"));
  };

  allSectionLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      clearActiveLinks();
      const relatedLinks = document.querySelectorAll(`a[href="${targetId}"]`);
      relatedLinks.forEach((item) => item.classList.add("active"));
    });
  });

  const observeSections = () => {
    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.getAttribute("id");
          if (!id) return;

          clearActiveLinks();
          const links = document.querySelectorAll(`a[href="#${id}"]`);
          links.forEach((link) => link.classList.add("active"));
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0.01,
      }
    );

    sections.forEach((section) => {
      if (section.id) {
        observer.observe(section);
      }
    });
  };

  setActiveByHash();
  observeSections();
  validateForm();

  if (typeof window.ScrollReveal === "function") {
    const sr = window.ScrollReveal({
      distance: "50px",
      duration: 900,
      easing: "ease",
      reset: false,
    });

    sr.reveal(".landing-page .content, .landing-page .image", { origin: "bottom", interval: 120 });
    sr.reveal(".online .image, .online .content", { origin: "left", interval: 120 });
    sr.reveal(".why-us .box, .works .box, .teachers .teachearbox, .testimonial .testimonial-box", {
      origin: "bottom",
      interval: 100,
    });
    sr.reveal(".question .quest, .footer .box", { origin: "top", interval: 100 });
  }
});
