$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.award").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
  });
  $("a").removeClass("waves-effect waves-light");

  const homeSectionNavItems = Array.from(document.querySelectorAll("[data-home-section-nav]"));
  const homeSections = homeSectionNavItems
    .map((item) => document.getElementById(item.dataset.homeSectionNav))
    .filter((section) => section);

  if (homeSectionNavItems.length && homeSections.length) {
    const updateHomeSectionNav = function () {
      const activationOffset = Math.min(window.innerHeight * 0.35, 260);
      let activeSectionId = homeSections[0].id;

      homeSections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= activationOffset) {
          activeSectionId = section.id;
        }
      });

      homeSectionNavItems.forEach(function (item) {
        const isActive = item.dataset.homeSectionNav === activeSectionId;
        const link = item.querySelector(".nav-link");

        item.classList.toggle("active", isActive);
        if (link) {
          if (isActive) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        }
      });
    };

    updateHomeSectionNav();
    window.addEventListener("scroll", updateHomeSectionNav, { passive: true });
    window.addEventListener("resize", updateHomeSectionNav);
    window.addEventListener("hashchange", updateHomeSectionNav);
  }

  const navbar = document.getElementById("navbar");

  if (navbar) {
    const updateNavbarGlass = function (event) {
      const rect = navbar.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      navbar.style.setProperty("--navbar-glass-x", `${x.toFixed(1)}%`);
      navbar.style.setProperty("--navbar-glass-y", `${y.toFixed(1)}%`);
    };

    const resetNavbarGlass = function () {
      navbar.style.setProperty("--navbar-glass-x", "50%");
      navbar.style.setProperty("--navbar-glass-y", "50%");
    };

    navbar.addEventListener("pointermove", updateNavbarGlass);
    navbar.addEventListener("pointerleave", resetNavbarGlass);
  }

  document.querySelectorAll("figure:has(.avatar-border-glow)").forEach(function (avatarFrame) {
    const updateAvatarBorderGlow = function (event) {
      const rect = avatarFrame.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;

      avatarFrame.style.setProperty("--avatar-glow-angle", `${angle.toFixed(2)}deg`);
      avatarFrame.style.setProperty("--avatar-glow-intensity", "1");
    };

    const resetAvatarBorderGlow = function () {
      avatarFrame.style.setProperty("--avatar-glow-angle", "120deg");
      avatarFrame.style.setProperty("--avatar-glow-intensity", "0.62");
    };

    avatarFrame.addEventListener("pointermove", updateAvatarBorderGlow);
    avatarFrame.addEventListener("pointerleave", resetAvatarBorderGlow);
  });

  const animateNewsPanels = function (panels, open, startHeights) {
    panels.forEach(function (panel, index) {
      const startHeight = startHeights ? startHeights[index] : 0;

      panel.classList.add("is-animating");
      panel.style.height = `${startHeight}px`;
      panel.offsetHeight;
    });

    requestAnimationFrame(function () {
      panels.forEach(function (panel) {
        const targetHeight = open ? panel.scrollHeight : 0;

        panel.style.height = `${targetHeight}px`;
      });
    });
  };

  const finishNewsPanelAnimation = function (event) {
    if (event.propertyName !== "height") {
      return;
    }

    event.currentTarget.classList.remove("is-animating");
    event.currentTarget.style.removeProperty("height");
  };

  document.querySelectorAll(".news-gallery-collapse, .news-older-item").forEach(function (panel) {
    panel.addEventListener("transitionend", finishNewsPanelAnimation);
  });

  document.querySelectorAll("label[for]").forEach(function (label) {
    const control = document.getElementById(label.getAttribute("for"));

    if (!control || (!control.classList.contains("news-gallery-control") && !control.classList.contains("news-older-control"))) {
      return;
    }

    label.addEventListener("click", function (event) {
      const open = !control.checked;
      let panels = [];
      let startHeights = [];

      event.preventDefault();
      label.classList.add("is-toggling");
      label.addEventListener(
        "animationend",
        function (animationEvent) {
          if (animationEvent.animationName === "news-marker-tap") {
            label.classList.remove("is-toggling");
          }
        },
        { once: true }
      );

      if (control.classList.contains("news-gallery-control")) {
        const gallery = control.closest(".news-gallery");
        const panel = gallery ? gallery.querySelector(".news-gallery-collapse") : null;

        if (panel) {
          panels = [panel];
        }
      } else {
        const wrapper = control.closest(".news-timeline-wrapper");

        panels = wrapper ? Array.from(wrapper.querySelectorAll(".news-older-item")) : [];
      }

      if (!panels.length) {
        control.checked = open;
        return;
      }

      startHeights = panels.map(function (panel) {
        return panel.getBoundingClientRect().height;
      });

      control.checked = open;
      animateNewsPanels(panels, open, startHeights);
    });
  });

  document.querySelectorAll(".news-gallery-card").forEach(function (galleryCard) {
    const controls = Array.from(galleryCard.querySelectorAll(".news-gallery-slide-control"));
    const slides = Array.from(galleryCard.querySelectorAll(".news-gallery-slide"));

    if (!controls.length || controls.length !== slides.length) {
      return;
    }

    const getCircularOffset = function (index, activeIndex, length) {
      let offset = index - activeIndex;

      if (offset > length / 2) {
        offset -= length;
      }

      if (offset < -length / 2) {
        offset += length;
      }

      return offset;
    };

    const updateCircularGallery = function () {
      const activeIndex = Math.max(
        0,
        controls.findIndex(function (control) {
          return control.checked;
        })
      );
      const length = slides.length;

      slides.forEach(function (slide, index) {
        const offset = getCircularOffset(index, activeIndex, length);
        const distance = Math.abs(offset);
        const side = Math.sign(offset);
        const x = distance === 0 ? 0 : side * Math.min(43, 30 + distance * 9);
        const z = -distance * 92;
        const rotate = side * -26;
        const scale = Math.max(0.56, 1 - distance * 0.18);
        const opacity = distance === 0 ? 1 : distance === 1 ? 0.62 : 0.18;
        const zIndex = Math.max(1, 10 - distance);

        slide.classList.toggle("is-active", distance === 0);
        slide.style.setProperty("--gallery-x", `${x}%`);
        slide.style.setProperty("--gallery-z", `${z}px`);
        slide.style.setProperty("--gallery-rotate", `${rotate}deg`);
        slide.style.setProperty("--gallery-scale", scale.toFixed(3));
        slide.style.setProperty("--gallery-opacity", opacity.toFixed(3));
        slide.style.zIndex = zIndex.toString();
      });
    };

    controls.forEach(function (control) {
      control.addEventListener("change", updateCircularGallery);

      galleryCard.querySelectorAll(`label[for="${control.id}"]`).forEach(function (label) {
        label.addEventListener("click", function (event) {
          event.preventDefault();
          control.checked = true;
          control.dispatchEvent(new Event("change", { bubbles: true }));
        });
      });
    });

    updateCircularGallery();
  });

  document.querySelectorAll(".experience-logo-3d").forEach(function (logo) {
    const maxRotation = 14;
    const state = {
      currentRotateX: 0,
      currentRotateY: 0,
      currentScale: 1,
      targetRotateX: 0,
      targetRotateY: 0,
      targetScale: 1,
      lastOffsetY: 0,
      frame: null,
    };

    const renderExperienceLogoTilt = function () {
      state.currentRotateX += (state.targetRotateX - state.currentRotateX) * 0.18;
      state.currentRotateY += (state.targetRotateY - state.currentRotateY) * 0.18;
      state.currentScale += (state.targetScale - state.currentScale) * 0.16;

      logo.style.setProperty("--experience-rotate-x", `${state.currentRotateX.toFixed(2)}deg`);
      logo.style.setProperty("--experience-rotate-y", `${state.currentRotateY.toFixed(2)}deg`);
      logo.style.setProperty("--experience-scale", state.currentScale.toFixed(3));

      if (
        Math.abs(state.targetRotateX - state.currentRotateX) > 0.01 ||
        Math.abs(state.targetRotateY - state.currentRotateY) > 0.01 ||
        Math.abs(state.targetScale - state.currentScale) > 0.001
      ) {
        state.frame = requestAnimationFrame(renderExperienceLogoTilt);
      } else {
        state.frame = null;
      }
    };

    const requestExperienceLogoTiltFrame = function () {
      if (!state.frame) {
        state.frame = requestAnimationFrame(renderExperienceLogoTilt);
      }
    };

    const updateExperienceLogoTilt = function (clientX, clientY) {
      const rect = logo.getBoundingClientRect();
      const offsetX = clientX - rect.left - rect.width / 2;
      const offsetY = clientY - rect.top - rect.height / 2;
      const normalizedX = offsetX / (rect.width / 2);
      const normalizedY = offsetY / (rect.height / 2);

      state.targetRotateX = normalizedY * -maxRotation;
      state.targetRotateY = normalizedX * maxRotation;
      state.targetScale = 1.08;
      state.lastOffsetY = offsetY;

      logo.style.setProperty("--experience-shine-x", `${((normalizedX + 1) * 50).toFixed(1)}%`);
      logo.style.setProperty("--experience-shine-y", `${((normalizedY + 1) * 50).toFixed(1)}%`);
      requestExperienceLogoTiltFrame();
    };

    const resetExperienceLogoTilt = function () {
      logo.classList.remove("is-dragging", "is-tilted");
      state.targetRotateX = 0;
      state.targetRotateY = 0;
      state.targetScale = 1;
      state.lastOffsetY = 0;
      logo.style.setProperty("--experience-shine-x", "50%");
      logo.style.setProperty("--experience-shine-y", "50%");
      requestExperienceLogoTiltFrame();
    };

    logo.addEventListener("pointerenter", function (event) {
      logo.classList.add("is-tilted");
      updateExperienceLogoTilt(event.clientX, event.clientY);
    });

    logo.addEventListener("pointerdown", function (event) {
      logo.classList.add("is-dragging");
      logo.setPointerCapture(event.pointerId);
      updateExperienceLogoTilt(event.clientX, event.clientY);
    });

    logo.addEventListener("pointermove", function (event) {
      if (logo.classList.contains("is-tilted") || logo.classList.contains("is-dragging")) {
        updateExperienceLogoTilt(event.clientX, event.clientY);
      }
    });

    logo.addEventListener("pointerup", resetExperienceLogoTilt);
    logo.addEventListener("pointercancel", resetExperienceLogoTilt);
    logo.addEventListener("mouseleave", function () {
      if (!logo.classList.contains("is-dragging")) {
        resetExperienceLogoTilt();
      }
    });
    logo.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        resetExperienceLogoTilt();
      }
    });
  });

  const clickSparkCanvas = document.createElement("canvas");
  const clickSparkContext = clickSparkCanvas.getContext("2d");
  const clickSparks = [];
  const clickSparkSettings = {
    size: 10,
    radius: 15,
    count: 8,
    duration: 400,
    extraScale: 1,
  };
  let clickSparkAnimationId = null;

  clickSparkCanvas.className = "click-spark-canvas";
  clickSparkCanvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(clickSparkCanvas);

  const resizeClickSparkCanvas = function () {
    const pixelRatio = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    clickSparkCanvas.style.width = `${width}px`;
    clickSparkCanvas.style.height = `${height}px`;
    clickSparkCanvas.width = Math.round(width * pixelRatio);
    clickSparkCanvas.height = Math.round(height * pixelRatio);
    clickSparkContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const easeClickSpark = function (progress) {
    return progress * (2 - progress);
  };

  const getClickSparkColor = function () {
    return getComputedStyle(document.documentElement).getPropertyValue("--global-theme-color").trim() || "#0056b3";
  };

  const drawClickSparks = function (timestamp) {
    clickSparkContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let index = clickSparks.length - 1; index >= 0; index -= 1) {
      const spark = clickSparks[index];
      const elapsed = timestamp - spark.startTime;

      if (elapsed >= clickSparkSettings.duration) {
        clickSparks.splice(index, 1);
        continue;
      }

      const progress = elapsed / clickSparkSettings.duration;
      const eased = easeClickSpark(progress);
      const distance = eased * clickSparkSettings.radius * clickSparkSettings.extraScale;
      const lineLength = clickSparkSettings.size * (1 - eased);
      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      clickSparkContext.strokeStyle = spark.color;
      clickSparkContext.lineWidth = 2;
      clickSparkContext.beginPath();
      clickSparkContext.moveTo(x1, y1);
      clickSparkContext.lineTo(x2, y2);
      clickSparkContext.stroke();
    }

    if (clickSparks.length) {
      clickSparkAnimationId = requestAnimationFrame(drawClickSparks);
    } else {
      clickSparkAnimationId = null;
    }
  };

  const addClickSpark = function (event) {
    const now = performance.now();
    const sparkColor = getClickSparkColor();

    for (let index = 0; index < clickSparkSettings.count; index += 1) {
      clickSparks.push({
        x: event.clientX,
        y: event.clientY,
        angle: (2 * Math.PI * index) / clickSparkSettings.count,
        color: sparkColor,
        startTime: now,
      });
    }

    if (!clickSparkAnimationId) {
      clickSparkAnimationId = requestAnimationFrame(drawClickSparks);
    }
  };

  resizeClickSparkCanvas();
  window.addEventListener("resize", resizeClickSparkCanvas);
  document.addEventListener("click", addClickSpark);

  document.querySelectorAll(".publications ol.bibliography").forEach(function (bibliography) {
    let activePublicationBentoCard = null;

    const updatePublicationBentoCard = function (card, clientX, clientY) {
      const rect = card.getBoundingClientRect();
      const relativeX = ((clientX - rect.left) / rect.width) * 100;
      const relativeY = ((clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--publication-glow-x", `${relativeX.toFixed(1)}%`);
      card.style.setProperty("--publication-glow-y", `${relativeY.toFixed(1)}%`);
      card.style.setProperty("--publication-glow-intensity", "1");
    };

    bibliography.addEventListener("mousemove", function (event) {
      const card = event.target.closest("li");

      if (!card || !bibliography.contains(card)) {
        return;
      }

      if (activePublicationBentoCard && activePublicationBentoCard !== card) {
        activePublicationBentoCard.style.setProperty("--publication-glow-intensity", "0");
      }

      activePublicationBentoCard = card;
      updatePublicationBentoCard(card, event.clientX, event.clientY);
    });

    bibliography.addEventListener("mouseleave", function () {
      if (activePublicationBentoCard) {
        activePublicationBentoCard.style.setProperty("--publication-glow-intensity", "0");
        activePublicationBentoCard = null;
      }
    });

    bibliography.addEventListener("click", function (event) {
      const card = event.target.closest("li");

      if (!card || !bibliography.contains(card)) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );
      const ripple = document.createElement("span");

      ripple.className = "publication-bento-ripple";
      ripple.style.width = `${maxDistance * 2}px`;
      ripple.style.height = `${maxDistance * 2}px`;
      ripple.style.left = `${x - maxDistance}px`;
      ripple.style.top = `${y - maxDistance}px`;
      card.appendChild(ripple);
      ripple.addEventListener("animationend", function () {
        ripple.remove();
      });
    });
  });

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
      offset: 100,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
