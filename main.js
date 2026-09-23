(function () {
  var D = window.PORTFOLIO;
  var $ = function (id) { return document.getElementById(id); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function empty(msg) { return '<p class="empty">' + esc(msg) + "</p>"; }
  function badge(text, cls) { return text ? '<span class="badge ' + (cls || "") + '">' + esc(text) + "</span>" : ""; }
  function imageBtn(src, caption) {
    return src ? '<button class="btn small" type="button" data-view="' + esc(src) + '" data-caption="' + esc(caption) + '">증빙 보기</button>' : "";
  }
  function linkBtn(href, label) {
    return href ? '<a class="btn small" href="' + esc(href) + '" target="_blank" rel="noopener">' + esc(label) + "</a>" : "";
  }
  function techChips(list) {
    return list && list.length ? '<ul class="chips tech">' + list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "";
  }
  // 저자 목록에서 본인 이름만 굵게
  function authorsHtml(s) {
    var me = D.profile.authorName;
    var html = esc(s);
    return me ? html.split(esc(me)).join("<b>" + esc(me) + "</b>") : html;
  }
  function parseDate(d) {
    var m = /^(\d{4})\.(\d{1,2})/.exec(d || "");
    return m ? { y: +m[1], m: +m[2] } : null;
  }

  // ---------- 기록 종류 정의: 순서 = 연도 페이지에서 그룹 순서 ----------
  var TYPES = [
    { key: "patents", ko: "특허", render: function (x) {
      return '<div class="badge-row">' + badge(x.status, x.status === "등록" ? "ok" : "info") + "</div><h3>" + esc(x.title) +
        '</h3><p class="meta">' + esc([x.number, x.inventors].filter(Boolean).join(" · ")) + "</p>" +
        (x.summary ? "<p>" + esc(x.summary) + "</p>" : "") + '<div class="actions">' + imageBtn(x.image, x.title) + "</div>";
    } },
    { key: "publications", ko: "논문", render: function (x) {
      var cls = { Submitted: "info", "Under review": "warn", Accepted: "ok", Published: "ok" }[x.status] || "";
      var venue = x.journal
        ? '<p class="meta"><b>' + esc(x.journal) + "</b>" + (x.citation ? ", " + esc(x.citation) : "") + "</p>"
        : '<p class="meta">Target · <b>' + esc(x.target) + "</b></p>";
      return '<div class="badge-row">' + badge(x.status, cls) + badge(x.expected) + "</div><h3>" + esc(x.title) +
        '</h3><p class="meta">' + authorsHtml(x.authors) + "</p>" + venue +
        (x.summary ? "<p>" + esc(x.summary) + "</p>" : "") + '<div class="actions">' + linkBtn(x.link, "논문 보기") +
        linkBtn(x.doi && "https://doi.org/" + x.doi, "DOI " + x.doi) + "</div>";
    } },
    { key: "projects", ko: "프로젝트", render: function (x) {
      return '<div class="badge-row">' + badge(x.status, x.status === "완료" ? "ok" : "info") + "</div><h3>" + esc(x.title) +
        "</h3>" + (x.summary ? "<p>" + esc(x.summary) + "</p>" : "") + techChips(x.tech) +
        '<div class="actions">' + linkBtn(x.repo, "GitHub") + '<a class="btn small" href="#projects">자세히</a></div>';
    } },
    { key: "conferences", ko: "학회 발표", render: function (x) {
      return '<div class="badge-row">' + badge(x.type, "accent") + (x.award ? badge("🏆 " + x.award, "warn") : "") + "</div><h3>" +
        esc(x.title) + '</h3><p class="meta">' + esc([x.venue, x.location].filter(Boolean).join(" · ")) + '</p><p class="meta">' +
        esc(x.authors) + '</p><div class="actions">' + linkBtn(x.link, "자료 보기") + "</div>";
    } },
    { key: "licenses", ko: "자격증", render: function (x) {
      return (x.planned ? '<div class="badge-row">' + badge("응시 예정", "plan") + "</div>" : "") + "<h3>" + esc(x.title) +
        '</h3><p class="meta">' + esc([x.issuer, x.number].filter(Boolean).join(" · ")) + '</p><div class="actions">' +
        imageBtn(x.image, x.title) + "</div>";
    } },
    { key: "languages", ko: "어학", render: function (x) {
      var detail = x.planned ? (x.goal ? "목표 " + x.goal : "") : x.score;
      return (x.planned ? '<div class="badge-row">' + badge("응시 예정", "plan") + "</div>" : "") + "<h3>" + esc(x.title) +
        '</h3><p class="meta">' + esc(detail) + '</p><div class="actions">' + imageBtn(x.image, x.title) + "</div>";
    } },
    { key: "certificates", ko: "수료 · 교육", render: function (x) {
      var prog = "";
      if (x.courses && x.courses.length) {
        var n = x.courses.filter(function (c) { return c.done; }).length, total = x.courses.length;
        prog = '<div class="progress"><div class="progress-label"><span>강좌 ' + n + " / " + total + ' 완료</span></div>' +
          '<div class="bar"><i style="width:' + (n / total * 100) + '%"></i></div><ol class="course-list">' +
          x.courses.map(function (c) { return '<li class="' + (c.done ? "done" : "") + '">' + esc(c.title) + "</li>"; }).join("") + "</ol></div>";
      }
      var status = x.courses && x.planned ? badge("진행 중", "info") : "";
      return '<div class="badge-row">' + badge(x.category, "accent") + status + "</div><h3>" + esc(x.title) + '</h3><p class="meta">' +
        esc(x.issuer) + "</p>" + prog + (x.period || x.number ? '<p class="meta">' + esc([x.period, x.number].filter(Boolean).join(" · ")) + "</p>" : "") +
        '<div class="actions">' + linkBtn(x.credentialUrl, "Credential") + imageBtn(x.image, x.title) + "</div>";
    } }
  ];

  // 전체 기록을 하나의 목록으로 (연·월 파싱)
  var ITEMS = [];
  TYPES.forEach(function (t) {
    (D[t.key] || []).forEach(function (x) {
      var d = parseDate(x.date);
      if (d) ITEMS.push({ type: t, data: x, y: d.y, m: d.m });
    });
  });
  var years = {};
  ITEMS.forEach(function (i) { years[i.y] = true; });
  Object.keys(D.years || {}).forEach(function (y) { years[y] = true; });
  var YEARS = Object.keys(years).map(Number).sort(function (a, b) { return b - a; });

  // ---------- hero ----------
  var p = D.profile;
  $("brand").textContent = p.name;
  $("hello").innerHTML = "Hello! I'm <b>" + esc(p.name) + "</b>";
  $("photo").innerHTML = (p.photo
    ? '<img src="' + esc(p.photo) + '" alt="' + esc(p.name) + ' 프로필 사진">'
    : '<div class="avatar" aria-hidden="true">' + esc(p.name.charAt(0)) + "</div>") +
    '<svg class="pulse" viewBox="0 0 140 28" aria-hidden="true"><path d="M2 16 H40 l6 -6 l6 6 H62 l5 5 l7 -19 l7 24 l5 -10 H100 l7 -4 l7 4 H138"/></svg>';

  var h = p.headline || {};
  $("headline").innerHTML = esc(h.before) + (h.highlight
    ? '<span class="circled">' + esc(h.highlight) +
      '<svg viewBox="0 0 120 50" preserveAspectRatio="none" aria-hidden="true"><path d="M8 28 C 6 10, 60 2, 104 10 C 124 16, 118 40, 80 46 C 44 50, 4 44, 6 26 C 8 16, 30 8, 54 7"/></svg></span>'
    : "") + esc(h.after);
  $("intro").textContent = p.intro;

  // 타이핑 효과
  var roles = p.roles && p.roles.length ? p.roles : [""];
  if (reduceMotion || roles.length < 2) {
    $("typed").textContent = roles[0];
  } else {
    var ri = 0, ci = 0, deleting = false;
    (function tick() {
      var word = roles[ri];
      ci += deleting ? -1 : 1;
      $("typed").textContent = word.slice(0, ci);
      var delay = deleting ? 40 : 85;
      if (!deleting && ci === word.length) { deleting = true; delay = 1600; }
      else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 300; }
      setTimeout(tick, delay);
    })();
  }

  var L = p.links || {};
  var links = [
    L.email && '<a class="btn primary" href="mailto:' + esc(L.email) + '">Email</a>',
    L.phone && '<a class="btn" href="tel:' + esc(L.phone.replace(/[^0-9+]/g, "")) + '">' + esc(L.phone) + "</a>",
    L.cv && '<a class="btn" href="' + esc(L.cv) + '" target="_blank" rel="noopener">CV (PDF)</a>',
    L.github && '<a class="btn" href="' + esc(L.github) + '" target="_blank" rel="noopener">GitHub</a>',
    L.linkedin && '<a class="btn" href="' + esc(L.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>',
    L.scholar && '<a class="btn" href="' + esc(L.scholar) + '" target="_blank" rel="noopener">Google Scholar</a>'
  ].filter(Boolean).join("");
  $("heroLinks").innerHTML = links;
  $("footerLinks").innerHTML = links;
  $("copyright").textContent = "© " + new Date().getFullYear() + " " + p.name + " · " + p.location;

  function done(key) { return (D[key] || []).filter(function (x) { return !x.planned; }).length; }
  $("stats").innerHTML = [
    ["특허", done("patents")],
    ["논문", done("publications")],
    ["프로젝트", done("projects")],
    ["학회 발표", done("conferences")],
    ["자격 · 어학", done("licenses") + done("languages")],
    ["수료 · 교육", done("certificates")]
  ].map(function (s) { return "<div><dt>" + s[0] + "</dt><dd>" + s[1] + "</dd></div>"; }).join("");

  // ---------- about ----------
  function gpaRow(label, v, max) {
    if (v == null || v === "") return "";
    return '<div class="gpa-row"><div class="label"><span>' + label + "</span><strong>" + Number(v).toFixed(2) +
      " <small>/ " + max + '</small></strong></div><div class="bar"><i style="width:' + Math.min(100, v / max * 100) + '%"></i></div></div>';
  }
  $("educationList").innerHTML = (D.education || []).length ? D.education.map(function (e) {
    var max = e.gpaMax || 4.5;
    var gpa = gpaRow("전체 평점", e.gpa, max) + gpaRow("전공 평점", e.majorGpa, max);
    var labLine = [e.lab, e.advisor && "지도교수 " + e.advisor].filter(Boolean).join(" · ");
    return '<article class="card edu' + (gpa ? "" : " no-gpa") + '"><div><div class="badge-row">' + badge(e.degree, "accent") +
      badge(e.status, e.status === "재학 중" ? "info" : "") + "</div><h3>" + esc(e.school || "학교 입력 전") + "</h3>" +
      (e.major ? '<p class="meta">' + esc(e.major) + "</p>" : "") + (labLine ? '<p class="meta">' + esc(labLine) + "</p>" : "") +
      (e.period ? '<p class="meta">' + esc(e.period) + "</p>" : "") +
      (e.notes && e.notes.length ? "<ul>" + e.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>" : "") +
      "</div>" + (gpa ? '<div class="gpa">' + gpa + "</div>" : "") + "</article>";
  }).join("") : empty("학력 정보를 data.js에 추가하세요.");

  var creds = (D.licenses || []).concat(D.languages || []);
  $("credList").innerHTML = creds.length ? creds.map(function (c) {
    var right = c.planned ? badge("예정", "plan") : badge(c.score || c.date);
    var sub = c.issuer || (c.planned && c.goal ? "목표 " + c.goal : "");
    return "<li><div><b>" + esc(c.title) + "</b>" + (sub ? "<small>" + esc(sub) + "</small>" : "") + "</div>" + right + "</li>";
  }).join("") : '<li class="muted">자격증·어학 성적을 data.js에 추가하세요.</li>';
  $("interests").innerHTML = (D.interests || []).map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("");

  // ---------- projects ----------
  $("projectList").innerHTML = (D.projects || []).length ? D.projects.map(function (x) {
    return '<article class="card project' + (x.image ? " has-figure" : "") + '"><div class="project-body">' +
      '<div class="badge-row">' + badge(x.status, x.status === "완료" ? "ok" : "info") + badge(x.date) + "</div>" +
      "<h3>" + esc(x.title) + "</h3>" + (x.subtitle ? '<p class="subtitle">' + esc(x.subtitle) + "</p>" : "") +
      (x.summary ? "<p>" + esc(x.summary) + "</p>" : "") +
      (x.highlights && x.highlights.length ? '<ul class="highlights">' + x.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul>" : "") +
      techChips(x.tech) + '<div class="actions">' + linkBtn(x.repo, "GitHub 저장소") + "</div></div>" +
      (x.image ? '<button class="project-figure" type="button" data-view="' + esc(x.image) + '" data-caption="' + esc(x.title) +
        '" aria-label="그림 크게 보기"><img src="' + esc(x.image) + '" alt="' + esc(x.title) + ' 결과 그래프" loading="lazy"></button>' : "") +
      "</article>";
  }).join("") : empty("프로젝트를 data.js에 추가하세요.");

  // ---------- timeline: 연도별 페이지 ----------
  var MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  $("yearRail").innerHTML = YEARS.map(function (y) {
    var n = ITEMS.filter(function (i) { return i.y === y; }).length;
    return '<li><a href="#y' + y + '" data-year="' + y + '">' + y + "<em>" + n + "</em></a></li>";
  }).join("");

  $("yearPages").innerHTML = YEARS.length ? YEARS.map(function (y, idx) {
    var list = ITEMS.filter(function (i) { return i.y === y; });
    var meta = (D.years || {})[y] || {};
    var counts = TYPES.map(function (t) {
      var n = list.filter(function (i) { return i.type === t; }).length;
      return n ? t.ko + " <em>" + n + "</em>건" : "";
    }).filter(Boolean).join(", ");
    var groups = TYPES.map(function (t) {
      var g = list.filter(function (i) { return i.type === t; }).sort(function (a, b) { return b.m - a.m; });
      if (!g.length) return "";
      return '<div class="grp"><h4>' + t.ko + " · " + g.length + "</h4>" + g.map(function (i) {
        return '<div class="entry' + (i.data.planned ? " planned" : "") + '"><div class="mo">' + String(i.m).padStart(2, "0") +
          "<small>" + MON[i.m - 1] + '</small></div><article class="card">' + t.render(i.data) + "</article></div>";
      }).join("") + "</div>";
    }).join("");
    var newer = YEARS[idx - 1], older = YEARS[idx + 1];
    return '<article class="year-page" id="y' + y + '" data-year="' + y + '" aria-label="' + y + '년 기록">' +
      '<header class="year-head"><div><p class="year-num">' + y + '</p><p class="year-sub">Vol. ' + (YEARS.length - idx) +
      (meta.gpa ? " · GPA " + Number(meta.gpa).toFixed(2) : "") + " · " + list.length + " records</p></div>" +
      '<div class="arrows"><button type="button" data-go="' + (older || "") + '" aria-label="이전 해"' + (older ? "" : " disabled") + ">←</button>" +
      '<button type="button" data-go="' + (newer || "") + '" aria-label="다음 해"' + (newer ? "" : " disabled") + ">→</button></div></header>" +
      '<p class="year-summary">' + esc(meta.summary || "") + (counts ? " " + counts + "." : "") + "</p>" +
      (groups || empty("이 해의 기록이 아직 없습니다.")) + "</article>";
  }).join("") : empty("기록을 data.js에 추가하세요.");

  var current = null;
  function showYear(y, scroll) {
    if (YEARS.indexOf(y) < 0) y = YEARS[0];
    current = y;
    document.querySelectorAll(".year-page").forEach(function (el) { el.hidden = +el.dataset.year !== y; });
    document.querySelectorAll("#yearRail a").forEach(function (a) { a.setAttribute("aria-current", +a.dataset.year === y); });
    if (scroll) $("timeline").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }
  function yearFromHash() { var m = /^#y(\d{4})$/.exec(location.hash); return m ? +m[1] : null; }

  showYear(yearFromHash() || YEARS[0], false);
  if (yearFromHash()) $("timeline").scrollIntoView();

  $("yearRail").addEventListener("click", function (e) {
    var a = e.target.closest("a[data-year]"); if (!a) return;
    e.preventDefault();
    history.replaceState(null, "", "#y" + a.dataset.year);
    showYear(+a.dataset.year, false);
  });
  $("yearPages").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-go]"); if (!b || b.disabled) return;
    history.replaceState(null, "", "#y" + b.dataset.go);
    showYear(+b.dataset.go, true);
  });
  window.addEventListener("hashchange", function () { var y = yearFromHash(); if (y) showYear(y, true); });
  document.addEventListener("keydown", function (e) {
    if (e.target.closest("input, textarea, dialog[open]")) return;
    var r = $("timeline").getBoundingClientRect();
    if (r.top > window.innerHeight * .5 || r.bottom < 0) return;
    var i = YEARS.indexOf(current);
    if (e.key === "ArrowLeft" && YEARS[i + 1]) showYear(YEARS[i + 1], false);
    if (e.key === "ArrowRight" && YEARS[i - 1]) showYear(YEARS[i - 1], false);
  });

  // ---------- skills ----------
  $("skillList").innerHTML = (D.skills || []).map(function (g) {
    return '<div class="card"><h3 class="card-label">' + esc(g.group) + '</h3><ul class="chips">' +
      g.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>";
  }).join("");

  // ---------- image viewer ----------
  var viewer = $("viewer");
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-view]"); if (!b) return;
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
        navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id], footer[id]").forEach(function (s) { io.observe(s); });
  }
})();
