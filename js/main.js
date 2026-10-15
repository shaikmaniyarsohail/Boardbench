/* BoardBench — interaction layer */
(function () {
  "use strict";

  const grid = document.getElementById("boardGrid");
  const emptyMsg = document.getElementById("emptyMsg");
  const chips = document.querySelectorAll(".chip");
  const modal = document.getElementById("boardModal");
  const modalBody = document.getElementById("modalBody");
  let activeFilter = "all";

  /* ---------- hero stats ---------- */
  document.getElementById("statBoards").textContent = BOARDS.length;
  const classes = new Set(BOARDS.map((b) => b.cls));
  document.getElementById("statClass").textContent = classes.size;

  /* ---------- card rendering ---------- */
  function boardCard(b) {
    const el = document.createElement("div");
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    el.className = "board-card";
    el.dataset.cls = b.cls;
    el.setAttribute("aria-label", "View details for " + b.name);
    el.innerHTML =
      '<div class="board-vis">' + b.maker.split(" ")[0].toUpperCase() + "</div>" +
      '<div><p class="board-maker">' + b.maker + "</p>" +
      '<h3 class="board-name">' + b.name + "</h3></div>" +
      '<ul class="board-quick">' +
      "<li>Clock <b>" + b.quick.clock + "</b></li>" +
      "<li>I/O <b>" + b.quick.io + "</b></li>" +
      "<li>Net <b>" + b.quick.net + "</b></li>" +
      "</ul>" +
      '<span class="board-tag">' + b.tag + "</span>";
    el.addEventListener("click", () => openModal(b));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(b);
      }
    });
    return el;
  }

  function renderGrid() {
    grid.innerHTML = "";
    const list = BOARDS.filter(
      (b) => activeFilter === "all" || b.cls === activeFilter
    );
    list.forEach((b) => grid.appendChild(boardCard(b)));
    emptyMsg.hidden = list.length > 0;
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeFilter = chip.dataset.filter;
      renderGrid();
    });
  });

  renderGrid();

  /* ---------- modal ---------- */
  function openModal(b) {
    const rows = Object.entries(b.specs)
      .map(([k, v]) => "<li><span>" + k + "</span><b>" + v + "</b></li>")
      .join("");
    modalBody.innerHTML =
      '<div class="board-vis">' + b.maker.split(" ")[0].toUpperCase() + "</div>" +
      '<p class="modal-maker">' + b.maker + " · " + b.tag + "</p>" +
      '<h3 id="modalTitle">' + b.name + "</h3>" +
      '<p class="modal-desc">' + b.desc + "</p>" +
      '<ul class="spec-list">' + rows + "</ul>";
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  modal.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  /* ---------- compare ---------- */
  const pickA = document.getElementById("pickA");
  const pickB = document.getElementById("pickB");
  const headA = document.getElementById("headA");
  const headB = document.getElementById("headB");
  const compareBody = document.getElementById("compareBody");
  const SPEC_KEYS = ["Processor", "Flash / RAM", "Voltage", "Digital / Analog", "Wireless", "Size", "Price"];

  BOARDS.forEach((b, i) => {
    [pickA, pickB].forEach((sel) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = b.name;
      sel.appendChild(opt);
    });
  });
  pickA.value = 0;
  pickB.value = 1;

  function winner(a, b) {
    const na = parseFloat((a.match(/[\d.]+/) || [0])[0]);
    const nb = parseFloat((b.match(/[\d.]+/) || [0])[0]);
    if (a === "—") return 1;
    if (b === "—") return 0;
    return na > nb ? 0 : nb > na ? 1 : -1;
  }

  function renderCompare() {
    const a = BOARDS[+pickA.value];
    const b = BOARDS[+pickB.value];
    headA.textContent = a.name;
    headB.textContent = b.name;
    compareBody.innerHTML = "";
    SPEC_KEYS.forEach((key) => {
      const va = a.specs[key] || "—";
      const vb = b.specs[key] || "—";
      const w = key === "Price" ? winner(va, vb) : -1; // lower price wins
      const tr = document.createElement("tr");
      tr.innerHTML =
        "<th scope=\"row\">" + key + "</th>" +
        "<td class=\"" + (w === 0 ? "win" : "") + "\">" + va + "</td>" +
        "<td class=\"" + (w === 1 ? "win" : "") + "\">" + vb + "</td>";
      compareBody.appendChild(tr);
    });
  }

  pickA.addEventListener("change", renderCompare);
  pickB.addEventListener("change", renderCompare);
  renderCompare();

  /* ---------- scroll buttons ---------- */
  const boardsSection = document.getElementById("boards");
  document.getElementById("scrollBoardsBtn").addEventListener("click", () =>
    boardsSection.scrollIntoView({ behavior: "smooth" })
  );
  document.getElementById("heroExploreBtn").addEventListener("click", () =>
    boardsSection.scrollIntoView({ behavior: "smooth" })
  );
})();
