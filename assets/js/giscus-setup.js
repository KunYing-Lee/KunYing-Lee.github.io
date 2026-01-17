function determineGiscusTheme() {
  
    let theme =
      localStorage.getItem("theme") ||
      document.documentElement.getAttribute("data-theme") ||
      "system";

    if (theme === "dark") return "dark";
    if (theme === "light") return "light";

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  
}

(function setupGiscus() {
  let giscusTheme = determineGiscusTheme();

  let giscusAttributes = {
    src: "https://giscus.app/client.js",
    "data-repo": "KunYing-Lee/KunYing-Lee.github.io",
    "data-repo-id": "R_kgDOQ5mDAA",
    "data-category": "Announcements",
    "data-category-id": "DIC_kwDOQ5mDAM4C1CXP",
    "data-mapping": "title",
    "data-strict": "1",
    "data-reactions-enabled": "1",
    "data-emit-metadata": "0",
    "data-input-position": "bottom",
    "data-theme": giscusTheme,
    "data-lang": "en",
    crossorigin: "anonymous",
    async: true,
  };

  let giscusScript = document.createElement("script");
  Object.entries(giscusAttributes).forEach(([key, value]) =>
    giscusScript.setAttribute(key, value)
  );
  document.getElementById("giscus_thread").appendChild(giscusScript);
})();

