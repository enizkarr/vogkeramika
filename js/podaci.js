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
  Ako napišete novu kategoriju ili površinu, ona će se sama pojaviti u filterima.
*/

const PROIZVODI = [

  // ---------- PLOČICE ----------

  {
    tip: "plocica",
    naziv: "Prosecco Grigio",
    kategorije: ["Vanjske", "Podne"],
    prostorije: ["Terasa", "Hodnik"],
    dimenzije: "30x60 cm",
    povrsina: "Mat",
    opis: "Siva pločica s izgledom prirodnog kamena i blagom, slojevitom teksturom.",
    slika: "images/proizvodi/prosecco-grigio.webp",
    izdvojeno: true,
  },
  {
    tip: "plocica",
    naziv: "Hardrock Grey",
    kategorije: ["Vanjske", "Podne"],
    prostorije: ["Terasa", "Hodnik"],
    dimenzije: "30x60 cm",
    povrsina: "Mat",
    opis: "Svijetlosiva pločica s izgledom grubog kamena, pogodna za terase i ulazne prostore.",
    slika: "images/proizvodi/hardrock-grey.webp",
  },
  {
    tip: "plocica",
    naziv: "Rwood Nut",
    kategorije: ["Vanjske", "Podne"],
    prostorije: ["Terasa", "Dnevni boravak"],
    dimenzije: "20x120 cm",
    povrsina: "Mat",
    opis: "Rektificirana pločica s izgledom svijetlog drveta. Toplina drveta na terasi, bez održavanja koje drvo traži.",
    slika: "images/proizvodi/rwood-nut.webp",
    izdvojeno: true,
  },
  {
    tip: "plocica",
    naziv: "Limestone Anthracite",
    kategorije: ["Vanjske", "Podne"],
    prostorije: ["Terasa", "Dnevni boravak", "Hodnik"],
    dimenzije: "60x120 cm",
    povrsina: "Mat",
    opis: "Rektificirana pločica antracit boje s izgledom prirodnog krečnjaka. Veliki format za moderan izgled.",
    slika: "images/proizvodi/limestone-anthracite-60x120.webp",
    izdvojeno: true,
  },
  {
    tip: "plocica",
    naziv: "Limestone Taupe 60x120",
    kategorije: ["Vanjske", "Podne"],
    prostorije: ["Terasa", "Dnevni boravak", "Hodnik"],
    dimenzije: "60x120 cm",
    povrsina: "Mat",
    opis: "Rektificirana pločica tople taupe nijanse s izgledom prirodnog kamena.",
    slika: "images/proizvodi/limestone-taupe-60x120.webp",
  },
  {
    tip: "plocica",
    naziv: "Limestone Grey",
    kategorije: ["Vanjske", "Podne"],
    prostorije: ["Terasa", "Dnevni boravak", "Hodnik"],
    dimenzije: "60x120 cm",
    povrsina: "Mat",
    opis: "Rektificirana siva pločica prirodnog kamenog izgleda.",
    slika: "images/proizvodi/limestone-grey-60x120.webp",
  },
  {
    tip: "plocica",
    naziv: "Limestone White",
    kategorije: ["Vanjske", "Podne"],
    prostorije: ["Terasa", "Dnevni boravak", "Hodnik"],
    dimenzije: "60x120 cm",
    povrsina: "Mat",
    opis: "Rektificirana bijela pločica kamene strukture. Daje prostoru svijetao i prozračan izgled.",
    slika: "images/proizvodi/limestone-white-60x120.webp",
  },
  {
    tip: "plocica",
    naziv: "Limestone Marble Beige",
    kategorije: ["Vanjske", "Podne"],
    prostorije: ["Terasa", "Dnevni boravak"],
    dimenzije: "60x60 cm",
    povrsina: "Mat",
    opis: "Rektificirana bež pločica s mermernim žilama.",
    slika: "images/proizvodi/limestone-marble-beige.webp",
    izdvojeno: true,
  },
  {
    tip: "plocica",
    naziv: "Limestone Marble Avorio",
    kategorije: ["Vanjske", "Podne"],
    prostorije: ["Terasa", "Dnevni boravak"],
    dimenzije: "60x60 cm",
    povrsina: "Mat",
    opis: "Rektificirana pločica boje slonovače s nježnim mermernim žilama.",
    slika: "images/proizvodi/limestone-marble-avorio.webp",
  },
  {
    tip: "plocica",
    naziv: "Limestone Taupe 60x60",
    kategorije: ["Vanjske", "Podne"],
    prostorije: ["Terasa", "Dnevni boravak", "Hodnik"],
    dimenzije: "60x60 cm",
    povrsina: "Protuklizna",
    opis: "Rektificirana pločica tople taupe nijanse, protuklizna (R10) — pogodna za terase.",
    slika: "images/proizvodi/limestone-taupe-60x60.webp",
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
