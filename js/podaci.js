/*
  PROIZVODI
  =========
  Ovo je jedina datoteka koju mijenjate kada dodajete, mijenjate ili uklanjate proizvode.
  Detaljno uputstvo: UPUTSTVO.md

  Najlakše je kopirati postojeći proizvod (od { do },), zalijepiti ga i promijeniti vrijednosti.
  Pazite da svaki proizvod završava sa },  i da je tekst uvijek pod navodnicima "...".

  PLOČICE (tip: "plocica")
    naziv       naziv pločice
    kategorije  jedna ili više od: "Podne", "Zidne", "Vanjske"
    prostorije  npr. "Kupatilo", "Kuhinja", "Dnevni boravak", "Spavaća soba", "Hodnik", "Terasa"
    dimenzije   npr. "60x60 cm"
    povrsina    npr. "Mat", "Sjajna", "Polirana", "Protuklizna"
    opis        kratak opis (može ostati prazno: "")
    slika       putanja do slike, npr. "images/proizvodi/marmo-bianco.jpg"
    izdvojeno   true = prikazuje se na početnoj stranici (može se izostaviti)

  OSTALI PROIZVODI (tip: "ostalo")
    naziv, kategorija (npr. "Ljepila", "Hidroizolacija", "Silikoni"), pakovanje, opis, slika

  Filteri na stranici "Ponuda" se prave automatski od ovih vrijednosti.
  Ako napišete novu prostoriju ili kategoriju, ona će se sama pojaviti u filterima.
*/

const PROIZVODI = [

  // ---------- PLOČICE ----------

  {
    tip: "plocica",
    naziv: "Marmo Bianco",
    kategorije: ["Zidne"],
    prostorije: ["Kupatilo"],
    dimenzije: "30x60 cm",
    povrsina: "Sjajna",
    opis: "Bijela zidna pločica s izgledom mermera i sivim žilama. Daje kupatilu svijetao i elegantan izgled.",
    slika: "images/proizvodi/marmo-bianco.svg",
    izdvojeno: true,
  },
  {
    tip: "plocica",
    naziv: "Calacatta Gold",
    kategorije: ["Podne", "Zidne"],
    prostorije: ["Kupatilo", "Dnevni boravak"],
    dimenzije: "60x120 cm",
    povrsina: "Polirana",
    opis: "Veliki format s toplim zlatnim žilama. Pogodna i za pod i za zid.",
    slika: "images/proizvodi/calacatta-gold.svg",
    izdvojeno: true,
  },
  {
    tip: "plocica",
    naziv: "Nero Marquina",
    kategorije: ["Podne", "Zidne"],
    prostorije: ["Kupatilo", "Kuhinja"],
    dimenzije: "60x60 cm",
    povrsina: "Sjajna",
    opis: "Crni mermerni izgled s bijelim žilama.",
    slika: "images/proizvodi/nero-marquina.svg",
  },
  {
    tip: "plocica",
    naziv: "Rovere Natural",
    kategorije: ["Podne"],
    prostorije: ["Dnevni boravak", "Hodnik", "Spavaća soba"],
    dimenzije: "20x120 cm",
    povrsina: "Mat",
    opis: "Pločica s izgledom prirodnog hrastovog drveta. Toplina parketa uz otpornost keramike.",
    slika: "images/proizvodi/rovere-natural.svg",
    izdvojeno: true,
  },
  {
    tip: "plocica",
    naziv: "Rovere Grigio",
    kategorije: ["Podne"],
    prostorije: ["Dnevni boravak", "Spavaća soba"],
    dimenzije: "20x120 cm",
    povrsina: "Mat",
    opis: "Sivi drveni dekor za moderne prostore.",
    slika: "images/proizvodi/rovere-grigio.svg",
  },
  {
    tip: "plocica",
    naziv: "Cemento Grey",
    kategorije: ["Podne", "Zidne"],
    prostorije: ["Kuhinja", "Hodnik"],
    dimenzije: "60x60 cm",
    povrsina: "Mat",
    opis: "Svijetlosiva pločica s izgledom betona.",
    slika: "images/proizvodi/cemento-grey.svg",
  },
  {
    tip: "plocica",
    naziv: "Beton Antracit",
    kategorije: ["Podne"],
    prostorije: ["Hodnik", "Dnevni boravak"],
    dimenzije: "80x80 cm",
    povrsina: "Mat",
    opis: "Tamna antracit pločica velikog formata.",
    slika: "images/proizvodi/beton-antracit.svg",
  },
  {
    tip: "plocica",
    naziv: "Metro Bianco",
    kategorije: ["Zidne"],
    prostorije: ["Kuhinja", "Kupatilo"],
    dimenzije: "7,5x15 cm",
    povrsina: "Sjajna",
    opis: "Klasična \"metro\" pločica za zid iznad radne ploče ili u kupatilu.",
    slika: "images/proizvodi/metro-bianco.svg",
  },
  {
    tip: "plocica",
    naziv: "Hexagon Mix",
    kategorije: ["Podne", "Zidne"],
    prostorije: ["Kupatilo"],
    dimenzije: "20x23 cm",
    povrsina: "Mat",
    opis: "Šestougaone pločice u kombinaciji bijele, sive i crne.",
    slika: "images/proizvodi/hexagon-mix.svg",
  },
  {
    tip: "plocica",
    naziv: "Terra Cotta",
    kategorije: ["Vanjske", "Podne"],
    prostorije: ["Terasa"],
    dimenzije: "30x30 cm",
    povrsina: "Protuklizna",
    opis: "Pločica boje terakote, otporna na mraz.",
    slika: "images/proizvodi/terra-cotta.svg",
  },
  {
    tip: "plocica",
    naziv: "Pietra Beige",
    kategorije: ["Vanjske"],
    prostorije: ["Terasa", "Dvorište"],
    dimenzije: "60x60 cm",
    povrsina: "Protuklizna",
    opis: "Pločica debljine 2 cm s izgledom prirodnog kamena, za terase i dvorišta.",
    slika: "images/proizvodi/pietra-beige.svg",
    izdvojeno: true,
  },
  {
    tip: "plocica",
    naziv: "Mozaik Plavi",
    kategorije: ["Zidne"],
    prostorije: ["Kupatilo"],
    dimenzije: "30x30 cm (mreža)",
    povrsina: "Sjajna",
    opis: "Stakleni mozaik u nijansama plave, na mreži.",
    slika: "images/proizvodi/mozaik-plavi.svg",
  },

  // ---------- OSTALI PROIZVODI ----------

  {
    tip: "ostalo",
    naziv: "Ljepilo za pločice C1",
    kategorija: "Ljepila",
    pakovanje: "25 kg",
    opis: "Cementno ljepilo za keramičke pločice standardnih formata u unutrašnjim prostorima.",
    slika: "images/proizvodi/ljepilo-c1.svg",
  },
  {
    tip: "ostalo",
    naziv: "Fleksibilno ljepilo C2TE S1",
    kategorija: "Ljepila",
    pakovanje: "25 kg",
    opis: "Fleksibilno ljepilo za velike formate, podno grijanje i vanjsku upotrebu.",
    slika: "images/proizvodi/ljepilo-c2te-s1.svg",
  },
  {
    tip: "ostalo",
    naziv: "Dvokomponentna hidroizolacija",
    kategorija: "Hidroizolacija",
    pakovanje: "24 kg (komplet)",
    opis: "Elastična cementna hidroizolacija za kupatila, balkone i terase, ispod pločica.",
    slika: "images/proizvodi/hidroizolacija-2k.svg",
  },
  {
    tip: "ostalo",
    naziv: "Hidroizolacijska traka",
    kategorija: "Hidroizolacija",
    pakovanje: "10 m",
    opis: "Traka za zaptivanje spojeva zida i poda te uglova prije postavljanja pločica.",
    slika: "images/proizvodi/hidroizolacijska-traka.svg",
  },
  {
    tip: "ostalo",
    naziv: "Sanitarni silikon, bijeli",
    kategorija: "Silikoni",
    pakovanje: "280 ml",
    opis: "Silikon otporan na buđ, za kupatila i kuhinje.",
    slika: "images/proizvodi/silikon-bijeli.svg",
  },
  {
    tip: "ostalo",
    naziv: "Silikon, transparentni",
    kategorija: "Silikoni",
    pakovanje: "280 ml",
    opis: "Prozirni silikon za zaptivanje spojeva.",
    slika: "images/proizvodi/silikon-transparentni.svg",
  },

];
