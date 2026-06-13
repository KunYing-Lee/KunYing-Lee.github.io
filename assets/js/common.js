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
