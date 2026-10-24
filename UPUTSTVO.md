# Uputstvo za održavanje web stranice VOGKERAMIK

Stranica je napravljena od običnih datoteka — nema baze podataka, prijave ni instalacije.
Da biste je pogledali, dvaput kliknite na **index.html** i otvorit će se u pregledniku (Chrome, Edge…).

Za uređivanje datoteka preporučujemo besplatni program **Visual Studio Code** (ili bilo koji
uređivač teksta, npr. Notepad). Ne koristite Word — on kvari datoteke.

---

## Sadržaj mape

| Datoteka / mapa | Šta je |
|---|---|
| `index.html` | Početna stranica |
| `ponuda.html` | Ponuda (pločice, ostali proizvodi, kalkulator) |
| `o-nama.html` | O nama |
| `kontakt.html` | Kontakt, forma za upit, mapa |
| `js/podaci.js` | **Popis proizvoda — ovo najčešće mijenjate** |
| `images/proizvodi/` | Slike proizvoda |
| `images/logo*.svg` | Logotip (cijeli, samo znak, samo tekst) |
| `css/style.css` | Izgled (boje, razmaci) — nije potrebno mijenjati |
| `js/main.js` | Funkcionalnost — nije potrebno mijenjati |

---

## 1. Kako dodati pločicu

**Korak 1 — pripremite sliku**

- Najbolje kvadratna fotografija (npr. 800 × 800 piksela), format `.jpg`.
- Smanjite veličinu datoteke na besplatnoj stranici **https://squoosh.app**
  (cilj: ispod 200 KB). Velike slike usporavaju stranicu.
- Ime datoteke pišite malim slovima, bez razmaka i bez č, ć, š, ž, đ.
  Dobro: `marmo-bianco.jpg` · Loše: `Marmo Bianco (1).JPG`
- Kopirajte sliku u mapu `images/proizvodi/`.

**Korak 2 — dodajte pločicu u `js/podaci.js`**

Otvorite `js/podaci.js`, kopirajte jednu postojeću pločicu (od `{` do `},`) i zalijepite je
ispod. Zatim promijenite vrijednosti:

```js
  {
    tip: "plocica",
    naziv: "Marmo Bianco",
    kategorije: ["Zidne"],
    prostorije: ["Kupatilo"],
    dimenzije: "30x60 cm",
    povrsina: "Sjajna",
    opis: "Bijela zidna pločica s izgledom mermera.",
    slika: "images/proizvodi/marmo-bianco.jpg",
  },
```

- **kategorije**: jedna ili više od `"Podne"`, `"Zidne"`, `"Vanjske"`, `"Stepenice"`, npr. `["Podne", "Zidne"]`.
- **prostorije**: npr. `["Kupatilo", "Kuhinja"]`. Prikazuju se u detaljima pločice.
- **opis**: može ostati prazan: `opis: "",`
- Dodajte red `izdvojeno: true,` ako želite da se pločica prikaže na početnoj stranici
  (prikazuju se prve 4 izdvojene).

**Korak 3 — provjerite**

Sačuvajte datoteku i osvježite stranicu u pregledniku (tipka **F5**).

---

## 2. Kako dodati ostali proizvod (ljepilo, hidroizolacija, silikon…)

Isto kao pločica, samo s ovim poljima:

```js
  {
    tip: "ostalo",
    naziv: "Fleksibilno ljepilo C2TE S1",
    kategorija: "Ljepila",
    pakovanje: "25 kg",
    opis: "Za velike formate i podno grijanje.",
    slika: "images/proizvodi/ljepilo-c2te.jpg",
  },
```

Ako upišete novu kategoriju (npr. `"Fug mase"`), ona će se sama pojaviti kao filter.

---

## 3. Kako izmijeniti ili ukloniti proizvod

- **Izmjena**: pronađite proizvod u `js/podaci.js` i promijenite tekst.
- **Uklanjanje**: obrišite cijeli blok od `{` do `},` tog proizvoda.
  Sliku iz `images/proizvodi/` možete obrisati ili ostaviti.

---

## 4. Najčešće greške

Ako se nakon izmjene **nijedan proizvod ne prikazuje**, u `js/podaci.js` je najvjerovatnije:

- zaboravljen zarez `,` na kraju reda ili iza `}`
- zaboravljen navodnik `"` (svaki tekst mora biti `"između navodnika"`)
- navodnik unutar teksta — umjesto `"metro" pločica` napišite `\"metro\" pločica` ili koristite „ovakve" navodnike

Ako se **ne prikazuje samo slika**, provjerite da li se ime datoteke u `slika:` tačno poklapa s
imenom datoteke u mapi (uključujući `.jpg` / `.png`, mala i velika slova).

Savjet: prije veće izmjene napravite kopiju datoteke `podaci.js` (npr. `podaci-kopija.js`).

---

## 5. Promjena kontakt podataka

Kontakt podaci (telefon, e-mail, adresa, radno vrijeme) upisani su na više stranica.
Najlakše ih je promijeniti u Visual Studio Code: **Edit → Replace in Files** (Ctrl+Shift+H),
upišite stari tekst (npr. `info@vogkeramik.ba`) i novi, pa kliknite **Replace All**.

**Važno — e-mail:** trenutno je upisana privremena adresa `info@vogkeramik.ba`.
Zamijenite je pravom u svim `.html` datotekama **i** u `js/main.js` (red `email: ...`),
jer forma za upit šalje poruke na tu adresu.

---

## 6. Tekst „O nama"

Tekst je općenit i treba ga zamijeniti vašom pričom (kada je firma osnovana, ko je vodi…).
Nalazi se u `o-nama.html`, ispod komentara `<!-- Ovaj tekst zamijenite... -->`.
Kada budete imali fotografiju prodavnice, možete je staviti umjesto logotipa na toj stranici.

---

## 7. Slike koje treba zamijeniti

Sve slike u `images/proizvodi/` (`.svg` datoteke) su **privremene ilustracije**.
Zamijenite ih pravim fotografijama vaših proizvoda i u `js/podaci.js` promijenite `slika:`
(npr. sa `marmo-bianco.svg` na `marmo-bianco.jpg`).

Slike na početnoj stranici (mozaik u uvodu i kartice kategorija) uzimaju se automatski
iz popisa proizvoda — ne morate ih posebno mijenjati.

---

## 8. Objavljivanje na internetu (kasnije)

Kada stranica bude spremna, cijela mapa se može besplatno objaviti, npr. na **Netlify**
(prevlačenjem mape na stranicu app.netlify.com/drop). Tada se forma za upit može povezati
tako da poruke stižu direktno na vaš e-mail, bez otvaranja e-mail programa kod kupca.
