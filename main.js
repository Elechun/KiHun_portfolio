(function () {
  var D = window.PORTFOLIO;
  var $ = function (id) { return document.getElementById(id); };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function empty(msg) { return '<p class="empty">' + esc(msg) + "</p>"; }

  function imageBtn(src, caption) {
    if (!src) return "";
    return '<button class="btn small" type="button" data-view="' + esc(src) +
      '" data-caption="' + esc(caption) + '">증빙 보기</button>';
  }

  function linkBtn(href, label) {
    if (!href) return "";
    return '<a class="btn small" href="' + esc(href) + '" target="_blank" rel="noopener">' + esc(label) + "</a>";
  }

  // ---------- profile ----------
  var p = D.profile;
  $("role").textContent = p.role;
  $("name").innerHTML = esc(p.name) + (p.nameKo ? "<small>" + esc(p.nameKo) + "</small>" : "");
  $("brand").textContent = p.name;
  $("tagline").textContent = p.tagline;
  $("intro").textContent = p.intro;
  $("interests").innerHTML = D.interests.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("");
  $("photo").innerHTML = p.photo
    ? '<img src="' + esc(p.photo) + '" alt="' + esc(p.name) + ' 프로필 사진">'
    : '<div class="avatar" aria-hidden="true">' + esc(p.name.charAt(0)) + "</div>";

  var L = p.links;
  var links = [
    L.email && '<a class="btn primary" href="mailto:' + esc(L.email) + '">Email</a>',
    L.cv && '<a class="btn" href="' + esc(L.cv) + '" target="_blank" rel="noopener">CV (PDF)</a>',
    L.github && '<a class="btn" href="' + esc(L.github) + '" target="_blank" rel="noopener">GitHub</a>',
    L.linkedin && '<a class="btn" href="' + esc(L.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>',
    L.scholar && '<a class="btn" href="' + esc(L.scholar) + '" target="_blank" rel="noopener">Google Scholar</a>'
  ].filter(Boolean).join("");
  $("heroLinks").innerHTML = links;
  $("footerLinks").innerHTML = links;
  $("copyright").textContent = "© " + new Date().getFullYear() + " " + p.name + " · " + p.location;

  // ---------- stats ----------
  var stats = [
    ["특허", D.patents.length],
    ["학회 발표", D.conferences.length],
    ["논문", D.publications.length],
    ["수료 · 교육", D.certificates.length]
  ];
  $("stats").innerHTML = stats.map(function (s) {
    return "<div><dt>" + s[0] + "</dt><dd>" + s[1] + "</dd></div>";
  }).join("");

  // ---------- education ----------
  function gpaRow(label, v, max) {
    if (v == null || v === "") return "";
    var pct = Math.min(100, (v / max) * 100);
    return '<div class="gpa-row"><div class="label"><span>' + label + "</span><strong>" +
      Number(v).toFixed(2) + ' <span class="muted" style="font-size:13px;font-weight:400">/ ' + max +
      '</span></strong></div><div class="bar"><i style="width:' + pct + '%"></i></div></div>';
  }
  $("educationList").innerHTML = D.education.length ? D.education.map(function (e) {
    var max = e.gpaMax || 4.5;
    return '<article class="card edu"><div><h3>' + esc(e.school) + '</h3><p class="meta">' +
      esc(e.degree) + "</p><p class=\"meta\">" + esc(e.period) + "</p>" +
      (e.notes && e.notes.length ? "<ul>" + e.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>" : "") +
      '</div><div class="gpa">' + gpaRow("전체 평점", e.gpa, max) + gpaRow("전공 평점", e.majorGpa, max) +
      "</div></article>";
  }).join("") : empty("학력 정보를 data.js에 추가하세요.");

  // ---------- patents ----------
  $("patentList").innerHTML = D.patents.length ? D.patents.map(function (x) {
    var cls = x.status === "등록" ? "ok" : "info";
    return '<article class="card"><div class="badge-row"><span class="badge ' + cls + '">' + esc(x.status) +
      '</span><span class="badge">' + esc(x.date) + "</span></div><h3>" + esc(x.title) + '</h3><p class="meta">' +
      esc(x.number) + (x.inventors ? " · " + esc(x.inventors) : "") + "</p><p>" + esc(x.summary) +
      '</p><div class="actions">' + imageBtn(x.image, x.title) + "</div></article>";
  }).join("") : empty("특허 정보를 data.js에 추가하세요.");

  // ---------- conferences ----------
  $("conferenceList").innerHTML = D.conferences.length ? D.conferences.map(function (c) {
    return '<li><article class="card"><div class="badge-row"><span class="badge accent">' + esc(c.type) +
      '</span><span class="badge">' + esc(c.date) + "</span>" +
      (c.award ? '<span class="badge warn">🏆 ' + esc(c.award) + "</span>" : "") +
      "</div><h3>" + esc(c.title) + '</h3><p class="meta">' + esc(c.venue) + " · " + esc(c.location) +
      "</p><p class=\"meta\">" + esc(c.authors) + '</p><div class="actions">' + linkBtn(c.link, "자료 보기") +
      "</div></article></li>";
  }).join("") : "<li>" + empty("학회 발표 정보를 data.js에 추가하세요.") + "</li>";

  // ---------- publications ----------
  var pubCls = {
    "In preparation": "", "Submitted": "info", "Under review": "warn", "Accepted": "ok", "Published": "ok"
  };
  $("publicationList").innerHTML = D.publications.length ? D.publications.map(function (x) {
    return '<article class="card pub"><div class="badge-row"><span class="badge ' + (pubCls[x.status] || "") + '">' +
      esc(x.status) + "</span>" + (x.expected ? '<span class="badge">' + esc(x.expected) + "</span>" : "") +
      "</div><h3>" + esc(x.title) + '</h3><p class="meta">' + esc(x.authors) +
      '</p><p class="meta target">Target: <b>' + esc(x.target) + "</b></p>" +
      (x.summary ? "<p>" + esc(x.summary) + "</p>" : "") +
      '<div class="actions">' + linkBtn(x.link, "논문 보기") + "</div></article>";
  }).join("") : empty("논문 정보를 data.js에 추가하세요.");

  // ---------- certificates ----------
  var cats = ["전체"];
  D.certificates.forEach(function (c) { if (cats.indexOf(c.category) < 0) cats.push(c.category); });
  var current = "전체";
  try { current = localStorage.getItem("certTab") || "전체"; } catch (e) {}
  if (cats.indexOf(current) < 0) current = "전체";

  function renderCerts() {
    var list = D.certificates.filter(function (c) { return current === "전체" || c.category === current; });
    $("certTabs").innerHTML = cats.map(function (c) {
      var n = c === "전체" ? D.certificates.length
        : D.certificates.filter(function (x) { return x.category === c; }).length;
      return '<button type="button" role="tab" data-cat="' + esc(c) + '" aria-selected="' + (c === current) + '">' +
        esc(c) + '<span class="count">' + n + "</span></button>";
    }).join("");
    $("certList").innerHTML = list.length ? list.map(function (c) {
      return '<article class="card"><span class="badge accent">' + esc(c.category) + "</span><h3>" + esc(c.title) +
        '</h3><p class="meta">' + esc(c.issuer) + '</p><p class="meta">' + esc(c.date) + '</p><div class="actions">' +
        linkBtn(c.credentialUrl, "Credential") + imageBtn(c.image, c.title) + "</div></article>";
    }).join("") : empty("수료 이력을 data.js에 추가하세요.");
  }
  renderCerts();
  $("certTabs").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-cat]");
    if (!b) return;
    current = b.getAttribute("data-cat");
    try { localStorage.setItem("certTab", current); } catch (err) {}
    renderCerts();
  });

  // ---------- skills ----------
  $("skillList").innerHTML = D.skills.map(function (g) {
    return '<div class="card"><h3>' + esc(g.group) + '</h3><ul class="chips">' +
      g.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>";
  }).join("");

  // ---------- image viewer ----------
  var viewer = $("viewer");
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-view]");
    if (!b) return;
    $("viewerImg").src = b.getAttribute("data-view");
    $("viewerImg").alt = b.getAttribute("data-caption");
    $("viewerCaption").textContent = b.getAttribute("data-caption");
    if (viewer.showModal) viewer.showModal(); else window.open(b.getAttribute("data-view"));
  });
  viewer.addEventListener("click", function (e) { if (e.target === viewer) viewer.close(); });

  // ---------- theme toggle ----------
  $("themeToggle").addEventListener("click", function () {
    var root = document.documentElement;
    var dark = root.getAttribute("data-theme")
      ? root.getAttribute("data-theme") === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    var next = dark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // ---------- active nav ----------
  var navLinks = document.querySelectorAll(".nav a");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { io.observe(s); });
  }
})();
