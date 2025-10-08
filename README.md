# Lioro — Futuristische one‑pager (Bootstrap)

Een single‑page portfolio/agency site gebouwd met Bootstrap 5 en custom neon/glassmorphism effecten.

## Structuur
- `index.html` — one‑pager met secties: Hero, Portfolio, Diensten, Over, Contact.
- `assets/css/styles.css` — custom styling (neon, glass, animaties, responsive).
- `assets/js/main.js` — smooth scroll, scroll‑reveal, particles, kleine interacties.

## Lokaal draaien
1. Open `index.html` direct in je browser
   - Of start een simpele server (optioneel):
     - VS Code Live Server, of
     - Node: `npx serve .` en ga naar de link.
2. Controleer dat de animaties en het particles‑achtergrond laden.

## Aanpassen
- Logo/naam: wijzig de wordmark in `index.html` (`navbar-brand > Lioro`).
- Kleuren: pas CSS variabelen aan in `assets/css/styles.css` (`:root`).
- Portfolio items: vervang de kaarten in `#portfolio` met je eigen projecten en links.
- Contact: het formulier is mock (geen backend). Vervang `handleContact()` in `assets/js/main.js` of koppel aan een service (Formspree/Netlify Forms).

## Assets
Externe CDN's:
- Bootstrap 5, Bootstrap Icons
- Google Fonts (Orbitron, Inter)
- particles.js

## SEO/Meta
- Pas `<title>` en `meta description` aan in `index.html`.

## Licentie
Vrij te gebruiken en aan te passen voor je eigen portfolio.

## Toegankelijkheid & Reduced Motion

De site respecteert gebruikersvoorkeuren voor bewegingsreductie en biedt een site-brede override:

- Er is een kleine toggle in de navigatie (knop met id `motionToggle`) waarmee bezoekers animaties kunnen aan- of uitzetten.
- De keuze wordt opgeslagen in `localStorage` onder de sleutel `reduced-motion` als `true` of `false`.
- Wanneer animaties uitgeschakeld zijn, wordt er de CSS-class `reduced-motion` op het `<html>` element gezet. Er is ook een `@media (prefers-reduced-motion: reduce)` query in `assets/css/styles.css` die OS-voorkeur respecteert.
- Voor ontwikkelaars: de typewriter en CTA-pulse worden aangestuurd in `assets/js/main.js`. Het script checkt zowel OS-voorkeur als de opgeslagen gebruikersoverride en past gedrag daarop aan.

Dit voorkomt bewegingsgerelateerde klachten en geeft gebruikers controle over animaties zonder de site-ervaring te breken.
