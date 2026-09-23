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

  // 접었다 펼 수 있는 카드: head 는 항상 보이고, body 는 펼쳤을 때만 보임 (body 가 비면 그냥 카드)
  function fold(cls, head, body) {
    if (!body.replace(/<div class="actions"><\/div>/g, "").trim()) return '<article class="card ' + cls + '">' + head + "</article>";
    return '<details class="card fold ' + cls + '"><summary><div class="fold-head">' + head + "</div>" +
      '<span class="chev" aria-hidden="true"></span><span class="sr-only">자세히 보기</span></summary><div class="fold-body">' + body + "</div></details>";
  }
  function actions() {
    var html = Array.prototype.join.call(arguments, "");
    return html ? '<div class="actions">' + html + "</div>" : "";
  }
  function yearOf(d) { var p = parseDate(d); return p ? String(p.y) : ""; }

  // ---------- 기록 종류 정의: 순서 = 연도 페이지에서 그룹 순서 ----------
  // head: 접힌 상태에서 보이는 제목·한 줄 설명 / body: 펼치면 보이는 세부 내용
  var TYPES = [
    { key: "patents", ko: "특허", head: function (x) {
      return '<div class="badge-row">' + badge(x.status, x.status === "등록" ? "ok" : "info") + "</div><h3>" + esc(x.title) + "</h3>" +
        '<p class="meta">' + esc(x.number) + "</p>";
    }, body: function (x) {
      return (x.titleEn ? '<p class="subtitle">' + esc(x.titleEn) + "</p>" : "") +
        (x.applicant ? '<p class="meta">출원인 · ' + esc(x.applicant) + "</p>" : "") +
        (x.inventors ? '<p class="meta">발명자 · ' + esc(x.inventors) + "</p>" : "") +
        (x.summary ? "<p>" + esc(x.summary) + "</p>" : "") + actions(imageBtn(x.image, x.title));
    } },
    { key: "publications", ko: "논문", head: function (x) {
      var cls = { Submitted: "info", "Under review": "warn", Accepted: "ok", Published: "ok" }[x.status] || "";
      return '<div class="badge-row">' + badge(x.status, cls) + badge(x.expected) + "</div><h3>" + esc(x.title) + "</h3>" +
        '<p class="meta"><b>' + esc(x.journal || x.target) + "</b>" + (x.journal ? " · " + yearOf(x.date) : " (투고 예정)") + "</p>";
    }, body: function (x) {
      return '<p class="meta">' + authorsHtml(x.authors) + "</p>" +
        (x.citation ? '<p class="meta">' + esc(x.journal) + ", " + esc(x.citation) + "</p>" : "") +
        (x.summary ? "<p>" + esc(x.summary) + "</p>" : "") +
        actions(linkBtn(x.link, "논문 보기"), linkBtn(x.doi && "https://doi.org/" + x.doi, "DOI " + x.doi));
    } },
    { key: "projects", ko: "프로젝트", head: function (x) {
      return '<div class="badge-row">' + badge(x.status, x.status === "완료" ? "ok" : "info") + "</div><h3>" + esc(x.title) + "</h3>" +
        (x.subtitle ? '<p class="meta">' + esc(x.subtitle) + "</p>" : "");
    }, body: function (x) {
      return (x.summary ? "<p>" + esc(x.summary) + "</p>" : "") + techChips(x.tech) +
        actions(linkBtn(x.repo, "GitHub"), '<a class="btn small" href="#projects">프로젝트 섹션에서 보기</a>');
    } },
    { key: "conferences", ko: "학회 발표", head: function (x) {
      return '<div class="badge-row">' + badge(x.type, "accent") + (x.award ? badge("🏆 " + x.award, "warn") : "") + "</div><h3>" +
        esc(x.title) + '</h3><p class="meta">' + esc(x.venue) + "</p>";
    }, body: function (x) {
      return (x.location ? '<p class="meta">' + esc(x.location) + "</p>" : "") + (x.authors ? '<p class="meta">' + authorsHtml(x.authors) + "</p>" : "") +
        actions(linkBtn(x.link, "자료 보기"));
    } },
    { key: "licenses", ko: "자격증", head: function (x) {
      return (x.planned ? '<div class="badge-row">' + badge("응시 예정", "plan") + "</div>" : "") + "<h3>" + esc(x.title) +
        '</h3><p class="meta">' + esc(x.issuer) + "</p>";
    }, body: function (x) {
      return (x.number ? '<p class="meta">' + esc(x.number) + "</p>" : "") + actions(imageBtn(x.image, x.title));
    } },
    { key: "languages", ko: "어학", head: function (x) {
      var detail = x.planned ? (x.goal ? "목표 " + x.goal : "") : x.score;
      return (x.planned ? '<div class="badge-row">' + badge("응시 예정", "plan") + "</div>" : "") + "<h3>" + esc(x.title) +
        '</h3><p class="meta">' + esc(detail) + "</p>";
    }, body: function (x) {
      return actions(imageBtn(x.image, x.title));
    } },
    { key: "certificates", ko: "수료 · 교육", head: function (x) {
      var n = 0, total = 0;
      if (x.courses && x.courses.length) { total = x.courses.length; n = x.courses.filter(function (c) { return c.done; }).length; }
      var status = x.courses && x.planned ? badge("진행 중 " + n + "/" + total, "info") : "";
      return '<div class="badge-row">' + badge(x.category, "accent") + status + "</div><h3>" + esc(x.title) + '</h3><p class="meta">' +
        esc(x.issuer) + "</p>";
    }, body: function (x) {
      var prog = "";
      if (x.courses && x.courses.length) {
        var n = x.courses.filter(function (c) { return c.done; }).length, total = x.courses.length;
        prog = '<div class="progress"><div class="progress-label"><span>강좌 ' + n + " / " + total + ' 완료</span></div>' +
          '<div class="bar"><i style="width:' + (n / total * 100) + '%"></i></div><ol class="course-list">' +
          x.courses.map(function (c) { return '<li class="' + (c.done ? "done" : "") + '">' + esc(c.title) + "</li>"; }).join("") + "</ol></div>";
      }
      return prog + (x.period || x.number ? '<p class="meta">' + esc([x.period, x.number].filter(Boolean).join(" · ")) + "</p>" : "") +
        actions(linkBtn(x.credentialUrl, "Credential"), imageBtn(x.image, x.title));
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
  var emails = (L.emails || []).concat(L.email ? [{ label: "Email", address: L.email }] : []);
  function mailBtns(showAddress) {
    return emails.map(function (m, i) {
      return '<a class="btn' + (i === 0 ? " primary" : "") + '" href="mailto:' + esc(m.address) + '">' +
        esc(showAddress ? m.label + " · " + m.address : m.label) + "</a>";
    }).join("");
  }
  var links = [
    L.phone && '<a class="btn" href="tel:' + esc(L.phone.replace(/[^0-9+]/g, "")) + '">' + esc(L.phone) + "</a>",
    L.cv && '<a class="btn" href="' + esc(L.cv) + '" target="_blank" rel="noopener">CV (PDF)</a>',
    L.github && '<a class="btn" href="' + esc(L.github) + '" target="_blank" rel="noopener">GitHub</a>',
    L.linkedin && '<a class="btn" href="' + esc(L.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>',
    L.scholar && '<a class="btn" href="' + esc(L.scholar) + '" target="_blank" rel="noopener">Google Scholar</a>'
  ].filter(Boolean).join("");
  $("heroLinks").innerHTML = mailBtns(false) + links;
  // 푸터에서는 메일 주소를 그대로 보여 줘서 복사할 수 있게
  $("footerLinks").innerHTML = mailBtns(true) + links;
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
  // 학력: 사진 한 칸 + 학위들을 한 카드에 (data.js 순서대로, 최신 학위가 위)
  $("eduPhoto").innerHTML = p.photo
    ? '<img src="' + esc(p.photo) + '" alt="' + esc(p.nameKo || p.name) + ' 프로필 사진">'
    : '<div class="photo-empty" aria-label="프로필 사진 자리"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="18" r="8"/><path d="M8 42c2-9 8.5-13 16-13s14 4 16 13"/></svg></div>';
  $("educationList").innerHTML = (D.education || []).length ? D.education.map(function (e) {
    var max = e.gpaMax || 4.5;
    // 학점은 눈에 띄는 그래프 대신 한 줄 정보로만
    var gpa = [e.gpa != null && e.gpa !== "" ? "평점 " + Number(e.gpa).toFixed(2) + " / " + max : "",
      e.majorGpa != null && e.majorGpa !== "" ? "전공 " + Number(e.majorGpa).toFixed(2) + " / " + max : ""].filter(Boolean).join(" · ");
    var lab = e.lab ? (e.labUrl ? '<a href="' + esc(e.labUrl) + '" target="_blank" rel="noopener">' + esc(e.lab) + "</a>" : esc(e.lab)) : "";
    var labLine = [lab, e.advisor && "지도교수 " + esc(e.advisor)].filter(Boolean).join('<span class="sep"> · </span>');
    return '<section class="edu-item"><div class="edu-head"><div class="badge-row">' + badge(e.degree, "accent") +
      badge(e.status, e.status === "재학 중" ? "info" : "") + '</div><span class="edu-period">' + esc(e.period) + "</span></div>" +
      '<h3 class="school">' + esc(e.school || "학교 입력 전") + (e.schoolEn ? "<small>" + esc(e.schoolEn) + "</small>" : "") + "</h3>" +
      (e.major ? '<p class="edu-major">' + esc(e.major) + (e.majorEn ? "<small>" + esc(e.majorEn) + "</small>" : "") + "</p>" : "") +
      (labLine ? '<p class="meta">' + labLine + "</p>" : "") +
      (e.notes && e.notes.length ? "<ul>" + e.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>" : "") +
      (gpa ? '<p class="edu-gpa">' + esc(gpa) + "</p>" : "") + "</section>";
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
    var head = '<div class="badge-row">' + badge(x.status, x.status === "완료" ? "ok" : "info") + badge(x.date) + "</div>" +
      "<h3>" + esc(x.title) + "</h3>" + (x.summary ? '<p class="lead">' + esc(x.summary) + "</p>" : "");
    var body = '<div class="project-detail' + (x.image ? " has-figure" : "") + '"><div class="project-body">' +
      (x.subtitle ? '<p class="subtitle">' + esc(x.subtitle) + "</p>" : "") +
      (x.highlights && x.highlights.length ? '<ul class="highlights">' + x.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul>" : "") +
      techChips(x.tech) + actions(linkBtn(x.repo, "GitHub 저장소")) + "</div>" +
      (x.image ? '<button class="project-figure" type="button" data-view="' + esc(x.image) + '" data-caption="' + esc(x.title) +
        '" aria-label="그림 크게 보기"><img src="' + esc(x.image) + '" alt="' + esc(x.title) + ' 결과 그래프" loading="lazy"></button>' : "") + "</div>";
    return fold("project", head, body);
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
          "<small>" + MON[i.m - 1] + "</small></div>" + fold("", t.head(i.data), t.body(i.data)) + "</div>";
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

  // ---------- activities: 연도 탭 + 분류별 묶음 ----------
  (function () {
    var acts = D.activities || [];
    var nowY = new Date().getFullYear();
    function span(a) {
      var s = parseDate(a.start), e = parseDate(a.end);
      if (!s) return [];
      var last = e ? e.y : Math.max(nowY, s.y), ys = [];
      for (var y = s.y; y <= last; y++) ys.push(y);
      return ys;
    }
    var byYear = {};
    acts.forEach(function (a) { span(a).forEach(function (y) { (byYear[y] = byYear[y] || []).push(a); }); });
    var ys = Object.keys(byYear).map(Number).sort(function (a, b) { return b - a; });
    if (!ys.length) { $("activityPanels").innerHTML = empty("활동을 data.js의 activities에 추가하세요."); return; }

    var order = (D.activityCategories || []).slice();
    acts.forEach(function (a) { if (order.indexOf(a.category) < 0) order.push(a.category); });

    function card(a) {
      var period = esc(a.start) + " – " + (a.end ? esc(a.end) : "현재");
      var head = '<div class="act-side"><p class="act-period">' + period + "</p>" +
        (a.end ? "" : badge("진행 중", "info")) + (a.role ? '<p class="act-role">' + esc(a.role) + "</p>" : "") +
        '</div><div class="act-main"><h3>' + esc(a.title) + "</h3>" + (a.org ? '<p class="meta">' + esc(a.org) + "</p>" : "") + "</div>";
      var body = (a.summary ? "<p>" + esc(a.summary) + "</p>" : "") +
        (a.highlights && a.highlights.length ? '<ul class="highlights">' + a.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul>" : "") +
        actions(linkBtn(a.link, "자세히"), imageBtn(a.image, a.title));
      return fold("act", head, body);
    }

    $("activityTabs").innerHTML = ys.map(function (y, i) {
      return '<button type="button" role="tab" id="atab-' + y + '" aria-controls="apanel-' + y + '" aria-selected="' + (i === 0) +
        '" tabindex="' + (i === 0 ? 0 : -1) + '">' + y + "<em>" + byYear[y].length + "</em></button>";
    }).join("");
    $("activityPanels").innerHTML = ys.map(function (y, i) {
      var list = byYear[y];
      var groups = order.map(function (c) {
        var g = list.filter(function (a) { return a.category === c; });
        if (!g.length) return "";
        return '<div class="act-group"><h4>' + esc(c) + " · " + g.length + '</h4><div class="act-grid">' + g.map(card).join("") + "</div></div>";
      }).join("");
      return '<div class="act-panel" role="tabpanel" id="apanel-' + y + '" aria-labelledby="atab-' + y + '"' + (i === 0 ? "" : " hidden") + ">" + groups + "</div>";
    }).join("");

    function select(btn) {
      $("activityTabs").querySelectorAll("button").forEach(function (b) {
        var on = b === btn;
        b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1;
        $(b.getAttribute("aria-controls")).hidden = !on;
      });
    }
    $("activityTabs").addEventListener("click", function (e) {
      var b = e.target.closest("button[role=tab]"); if (b) select(b);
    });
    $("activityTabs").addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      var tabs = Array.prototype.slice.call(this.querySelectorAll("button"));
      var i = tabs.indexOf(document.activeElement); if (i < 0) return;
      var next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
      next.focus(); select(next); e.preventDefault(); e.stopPropagation();
    });
  })();

  // ---------- 모두 펼치기 / 접기 ----------
  document.querySelectorAll("[data-fold-all]").forEach(function (btn) {
    var root = $(btn.getAttribute("data-fold-all"));
    function sync() {
      var all = root.querySelectorAll("details.fold"), open = root.querySelectorAll("details.fold[open]");
      btn.hidden = !all.length;
      btn.textContent = all.length && open.length === all.length ? "모두 접기" : "모두 펼치기";
    }
    btn.addEventListener("click", function () {
      var openAll = btn.textContent === "모두 펼치기";
      root.querySelectorAll("details.fold").forEach(function (d) { d.open = openAll; });
      sync();
    });
    root.addEventListener("toggle", sync, true);
    sync();
  });
  // 인쇄(PDF 저장) 때는 전부 펼쳐서 출력
  var printOpened = [];
  window.addEventListener("beforeprint", function () {
    printOpened = Array.prototype.filter.call(document.querySelectorAll("details.fold"), function (d) { return !d.open; });
    printOpened.forEach(function (d) { d.open = true; });
  });
  window.addEventListener("afterprint", function () { printOpened.forEach(function (d) { d.open = false; }); });

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
