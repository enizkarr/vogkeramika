/* ==========================================================
   VOGKERAMIK d.o.o. — funkcionalnost stranice
   Proizvodi se uređuju u js/podaci.js, ne ovdje.
   ========================================================== */

const KONTAKT = {
  telefon: "+38762506525",
  email: "info@vogkeramik.ba", // privremena adresa — zamijeniti pravom
};

const LINKOVI = {
  viber: "viber://chat?number=%2B" + KONTAKT.telefon.slice(1),
  whatsapp: (tekst) =>
    "https://wa.me/" + KONTAKT.telefon.slice(1) + (tekst ? "?text=" + encodeURIComponent(tekst) : ""),
};

// Pretvara tekst u oblik za poređenje: "Spavaća soba" -> "spavaca soba"
function normalizuj(tekst) {
  return tekst
    .toLowerCase()
    .replace(/đ/g, "dj")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function escapeHtml(tekst) {
  const div = document.createElement("div");
  div.textContent = tekst ?? "";
  return div.innerHTML;
}

function jedinstveneVrijednosti(lista) {
  return [...new Set(lista)].sort((a, b) => a.localeCompare(b, "bs"));
}

/* ---------- Meni na mobitelu ---------- */

function postaviMeni() {
  const dugme = document.querySelector(".meni-dugme");
  const nav = document.querySelector(".navigacija");
  if (!dugme || !nav) return;

  dugme.addEventListener("click", () => {
    const otvoreno = nav.classList.toggle("otvoreno");
    dugme.setAttribute("aria-expanded", otvoreno);
  });
}

/* ---------- Kartica proizvoda ---------- */

function opisKartice(p) {
  if (p.tip === "plocica") return [p.dimenzije, p.povrsina].filter(Boolean).join(" · ");
  return p.pakovanje || "";
}

function oznakeProizvoda(p) {
  return p.tip === "plocica" ? p.kategorije || [] : [p.kategorija];
}

function napraviKarticu(p) {
  const kartica = document.createElement("button");
  kartica.type = "button";
  kartica.className = "proizvod";
  kartica.innerHTML = `
    <img class="proizvod__slika" src="${escapeHtml(p.slika)}" alt="${escapeHtml(p.naziv)}" loading="lazy">
    <div class="proizvod__tijelo">
      <div class="proizvod__oznake">
        ${oznakeProizvoda(p).map((o) => `<span class="oznaka">${escapeHtml(o)}</span>`).join("")}
      </div>
      <h3>${escapeHtml(p.naziv)}</h3>
      <p class="proizvod__detalji">${escapeHtml(opisKartice(p))}</p>
      <span class="proizvod__link">Detalji i upit →</span>
    </div>`;
  kartica.addEventListener("click", () => otvoriDetalje(p));
  return kartica;
}

/* ---------- Prozor s detaljima ---------- */

function otvoriDetalje(p) {
  const prozor = document.getElementById("detalji");
  if (!prozor) return;

  const redovi =
    p.tip === "plocica"
      ? [
          ["Vrsta", (p.kategorije || []).join(", ")],
          ["Dimenzije", p.dimenzije],
          ["Površina", p.povrsina],
          ["Prostorije", (p.prostorije || []).join(", ")],
        ]
      : [
          ["Kategorija", p.kategorija],
          ["Pakovanje", p.pakovanje],
        ];

  const upit = `Pozdrav, zanima me cijena za: ${p.naziv}`;

  prozor.querySelector(".prozor__sadrzaj").innerHTML = `
    <img class="prozor__slika" src="${escapeHtml(p.slika)}" alt="${escapeHtml(p.naziv)}">
    <div class="prozor__tekst">
      <h2>${escapeHtml(p.naziv)}</h2>
      ${p.opis ? `<p class="prozor__opis">${escapeHtml(p.opis)}</p>` : ""}
      <dl class="prozor__tabela">
        ${redovi
          .filter(([, v]) => v)
          .map(([k, v]) => `<dt>${k}</dt><dd>${escapeHtml(v)}</dd>`)
          .join("")}
      </dl>
      <p class="prozor__cijena">Za cijenu i dostupnost kontaktirajte nas — rado ćemo vam pomoći.</p>
      <div class="prozor__dugmad">
        <a class="dugme dugme--plavo" href="kontakt.html?proizvod=${encodeURIComponent(p.naziv)}#upit">Pitajte za cijenu</a>
        <a class="dugme dugme--whatsapp" href="${LINKOVI.whatsapp(upit)}" target="_blank" rel="noopener">WhatsApp</a>
        <a class="dugme dugme--viber" href="${LINKOVI.viber}">Viber</a>
      </div>
    </div>`;

  prozor.showModal();
}

function postaviProzor() {
  const prozor = document.getElementById("detalji");
  if (!prozor) return;

  prozor.querySelector(".prozor__zatvori").addEventListener("click", () => prozor.close());
  // Klik na tamnu pozadinu zatvara prozor
  prozor.addEventListener("click", (e) => {
    if (e.target === prozor) prozor.close();
  });
}

/* ---------- Početna: slike i izdvojeni proizvodi ---------- */

function prikaziPocetnu() {
  const mreza = document.getElementById("izdvojeno");
  if (!mreza) return;

  const plocice = PROIZVODI.filter((p) => p.tip === "plocica");

  PROIZVODI.filter((p) => p.izdvojeno)
    .slice(0, 4)
    .forEach((p) => mreza.appendChild(napraviKarticu(p)));

  // Mozaik u uvodu: prvih 6 pločica
  document.getElementById("hero-mozaik").innerHTML = plocice
    .slice(0, 6)
    .map((p) => `<img src="${escapeHtml(p.slika)}" alt="">`)
    .join("");

  // Slika na kartici kategorije: prva pločica samo iz te kategorije (ako postoji),
  // da se iste slike ne ponavljaju na više kartica
  document.querySelectorAll("[data-slika-kategorije]").forEach((img) => {
    const k = img.dataset.slikaKategorije;
    const uKategoriji = plocice.filter((p) => (p.kategorije || []).includes(k));
    const p = k === "ostalo"
      ? PROIZVODI.find((p) => p.tip === "ostalo")
      : uKategoriji.find((p) => p.kategorije.length === 1) || uKategoriji[0];
    if (p) img.src = p.slika;
  });
}

/* ---------- Početna: slajdovi u uvodu ---------- */

function postaviHeroSlajdove() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const traka = hero.querySelector(".hero__traka");
  const slajdovi = [...hero.querySelectorAll(".hero__slajd")];
  const tacke = [...hero.querySelectorAll(".hero__tacka")];
  const bezAnimacije = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PAUZA = 7000; // ms između automatskih promjena
  let trenutni = 0;
  let tajmer = null;

  function prikazi(i) {
    trenutni = (i + slajdovi.length) % slajdovi.length;
    traka.style.transform = `translateX(-${trenutni * 100}%)`;
    // Skriveni slajd se ne može fokusirati tabom niti ga čita čitač ekrana
    slajdovi.forEach((s, j) => (s.inert = j !== trenutni));
    tacke.forEach((t, j) => t.setAttribute("aria-current", j === trenutni ? "true" : "false"));
  }

  function pokreni() {
    if (bezAnimacije) return;
    clearInterval(tajmer);
    tajmer = setInterval(() => prikazi(trenutni + 1), PAUZA);
  }

  function zaustavi() {
    clearInterval(tajmer);
    tajmer = null;
  }

  hero.querySelectorAll(".hero__strelica").forEach((dugme) =>
    dugme.addEventListener("click", () => {
      prikazi(trenutni + Number(dugme.dataset.smjer));
      if (tajmer) pokreni();
    })
  );

  tacke.forEach((tacka, i) =>
    tacka.addEventListener("click", () => {
      prikazi(i);
      if (tajmer) pokreni();
    })
  );

  // Prevlačenje prstom na mobitelu
  let pocetakX = null;
  traka.addEventListener("touchstart", (e) => (pocetakX = e.touches[0].clientX), { passive: true });
  traka.addEventListener("touchend", (e) => {
    if (pocetakX === null) return;
    const razlika = e.changedTouches[0].clientX - pocetakX;
    if (Math.abs(razlika) > 50) {
      prikazi(trenutni + (razlika < 0 ? 1 : -1));
      if (tajmer) pokreni();
    }
    pocetakX = null;
  });

  // Pauza dok je miš iznad uvoda ili je fokus u njemu
  hero.addEventListener("mouseenter", zaustavi);
  hero.addEventListener("mouseleave", pokreni);
  hero.addEventListener("focusin", zaustavi);
  hero.addEventListener("focusout", pokreni);

  prikazi(0);
  pokreni();
}

/* ---------- Ponuda: katalog s filterima ---------- */

function postaviKatalog() {
  const mreza = document.getElementById("katalog");
  if (!mreza) return;

  const stanje = {
    tip: "plocica",
    kategorija: "",
    povrsina: "",
    pretraga: "",
  };

  const tabovi = document.querySelectorAll(".tab");
  const cipovi = document.getElementById("cipovi");
  const izborPovrsina = document.getElementById("filter-povrsina");
  const pretraga = document.getElementById("pretraga");
  const brojRezultata = document.getElementById("broj-rezultata");
  const samoPlocice = document.querySelectorAll("[data-samo-plocice]");

  const plocice = PROIZVODI.filter((p) => p.tip === "plocica");
  const ostalo = PROIZVODI.filter((p) => p.tip === "ostalo");

  const kategorijePlocica = jedinstveneVrijednosti(plocice.flatMap((p) => p.kategorije || []));
  const kategorijeOstalog = jedinstveneVrijednosti(ostalo.map((p) => p.kategorija));

  function popuniIzbor(izbor, vrijednosti, prvaOpcija) {
    izbor.innerHTML =
      `<option value="">${prvaOpcija}</option>` +
      vrijednosti.map((v) => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join("");
  }

  popuniIzbor(izborPovrsina, jedinstveneVrijednosti(plocice.map((p) => p.povrsina).filter(Boolean)), "Sve površine");

  function nacrtajCipove() {
    const kategorije = stanje.tip === "plocica" ? kategorijePlocica : kategorijeOstalog;
    cipovi.innerHTML = "";
    ["", ...kategorije].forEach((k) => {
      const cip = document.createElement("button");
      cip.type = "button";
      cip.className = "cip";
      cip.textContent = k || "Sve";
      cip.setAttribute("aria-pressed", stanje.kategorija === k);
      cip.addEventListener("click", () => {
        stanje.kategorija = k;
        nacrtajCipove();
        prikazi();
      });
      cipovi.appendChild(cip);
    });
  }

  function odgovara(p) {
    if (p.tip !== stanje.tip) return false;
    if (stanje.kategorija && !oznakeProizvoda(p).includes(stanje.kategorija)) return false;
    if (stanje.tip === "plocica") {
      if (stanje.povrsina && p.povrsina !== stanje.povrsina) return false;
    }
    if (stanje.pretraga) {
      const tekst = normalizuj([p.naziv, p.opis, p.dimenzije, p.kategorija, ...(p.kategorije || [])].join(" "));
      if (!tekst.includes(normalizuj(stanje.pretraga))) return false;
    }
    return true;
  }

  function prikazi() {
    const rezultati = PROIZVODI.filter(odgovara);
    mreza.innerHTML = "";
    rezultati.forEach((p) => mreza.appendChild(napraviKarticu(p)));

    if (rezultati.length === 0) {
      mreza.innerHTML = `<p class="nema-rezultata">Nema proizvoda za odabrane filtere.<br>Pokušajte s drugim filterima ili nas <a href="kontakt.html">kontaktirajte</a> — možda imamo ono što tražite.</p>`;
    }
    brojRezultata.textContent = `Prikazano: ${rezultati.length}`;
  }

  function promijeniTip(tip) {
    stanje.tip = tip;
    stanje.kategorija = "";
    tabovi.forEach((t) => t.setAttribute("aria-selected", t.dataset.tip === tip));
    samoPlocice.forEach((el) => (el.hidden = tip !== "plocica"));
    nacrtajCipove();
    prikazi();
  }

  tabovi.forEach((t) => t.addEventListener("click", () => promijeniTip(t.dataset.tip)));
  izborPovrsina.addEventListener("change", () => {
    stanje.povrsina = izborPovrsina.value;
    prikazi();
  });
  pretraga.addEventListener("input", () => {
    stanje.pretraga = pretraga.value.trim();
    prikazi();
  });

  // Link s početne npr. ponuda.html#vanjske ili ponuda.html#ostalo
  function primijeniAdresu() {
    const hash = normalizuj(decodeURIComponent(location.hash.slice(1)));
    const nadji = (lista) => lista.find((k) => normalizuj(k) === hash) || "";

    if (hash === "ostalo" || nadji(kategorijeOstalog)) {
      promijeniTip("ostalo");
      stanje.kategorija = nadji(kategorijeOstalog);
    } else {
      promijeniTip("plocica");
      stanje.kategorija = nadji(kategorijePlocica);
    }
    nacrtajCipove();
    prikazi();
  }

  window.addEventListener("hashchange", primijeniAdresu);
  primijeniAdresu();
}

/* ---------- Kalkulator pločica ---------- */

function postaviKalkulator() {
  const forma = document.getElementById("kalkulator");
  if (!forma) return;

  const rezultat = document.getElementById("kalkulator-rezultat");
  const poljeVisina = document.getElementById("polje-visina");
  const poljeOtvori = document.getElementById("polje-otvori");

  const broj = (ime) => parseFloat(String(forma.elements[ime].value).replace(",", ".")) || 0;
  // Decimalni zarez, npr. 13,20
  const format = (n, dec = 2) => n.toFixed(dec).replace(".", ",");

  function izracunaj() {
    const zidovi = forma.elements.nacin.value === "zid";
    poljeVisina.hidden = !zidovi;
    poljeOtvori.hidden = !zidovi;

    const duzina = broj("duzina");
    const sirina = broj("sirina");
    let povrsina = zidovi
      ? 2 * (duzina + sirina) * broj("visina") - broj("otvori")
      : duzina * sirina;
    povrsina = Math.max(povrsina, 0);

    const rezerva = broj("rezerva") / 100;
    const ukupno = povrsina * (1 + rezerva);
    const kutija = broj("kutija");

    let html = `<strong>${format(ukupno)} m²</strong>
      <span>Površina ${format(povrsina)} m² + ${format(rezerva * 100, 0)} % rezerve</span>`;
    if (kutija > 0 && ukupno > 0) {
      html += `<br><span>To je <b>${Math.ceil(ukupno / kutija)} kutija</b> (po ${format(kutija)} m²)</span>`;
    }
    rezultat.innerHTML = html;
  }

  forma.addEventListener("input", izracunaj);
  forma.addEventListener("submit", (e) => e.preventDefault());
  izracunaj();
}

/* ---------- Kontakt forma ---------- */

function postaviKontaktFormu() {
  const forma = document.getElementById("upit-forma");
  if (!forma) return;

  // Ako je kupac došao preko "Pitajte za cijenu", upiši naziv proizvoda
  const proizvod = new URLSearchParams(location.search).get("proizvod");
  if (proizvod) {
    forma.elements.proizvod.value = proizvod;
    forma.elements.poruka.value = `Pozdrav, zanima me cijena i dostupnost za: ${proizvod}.\n\n`;
  }

  function sastaviPoruku() {
    const f = forma.elements;
    return [
      f.poruka.value.trim(),
      "",
      f.proizvod.value ? `Proizvod: ${f.proizvod.value}` : "",
      `Ime: ${f.ime.value}`,
      f.telefon.value ? `Telefon: ${f.telefon.value}` : "",
      f.email.value ? `E-mail: ${f.email.value}` : "",
    ]
      .filter((red, i) => red || i === 1)
      .join("\n");
  }

  forma.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!forma.reportValidity()) return;

    const kanal = e.submitter?.value || "email";
    const poruka = sastaviPoruku();

    if (kanal === "whatsapp") {
      window.open(LINKOVI.whatsapp(poruka), "_blank", "noopener");
    } else {
      const naslov = forma.elements.proizvod.value
        ? `Upit: ${forma.elements.proizvod.value}`
        : "Upit sa web stranice";
      location.href = `mailto:${KONTAKT.email}?subject=${encodeURIComponent(naslov)}&body=${encodeURIComponent(poruka)}`;
    }
  });
}

/* ---------- Pokretanje ---------- */

document.addEventListener("DOMContentLoaded", () => {
  postaviMeni();
  postaviProzor();
  prikaziPocetnu();
  postaviHeroSlajdove();
  postaviKatalog();
  postaviKalkulator();
  postaviKontaktFormu();
  document.querySelectorAll("[data-godina]").forEach((el) => (el.textContent = new Date().getFullYear()));
});
