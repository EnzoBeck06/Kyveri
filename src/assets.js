import kyveriMark from "./assets/images/kyveri-mark-champagne.svg";
import heroWebp from "./assets/images/kyveri-hero.webp";
import heroPng from "./assets/images/kyveri-hero.png";
import studioWebp from "./assets/images/kyveri-studio.webp";
import studioPng from "./assets/images/kyveri-studio.png";
import contactWebp from "./assets/images/kyveri-contact.webp";
import contactPng from "./assets/images/kyveri-contact.png";
import propertyWebp from "./assets/images/project-property.webp";
import propertyPng from "./assets/images/project-property.png";
import barberWebp from "./assets/images/project-barber.webp";
import barberPng from "./assets/images/project-barber.png";
import fitnessWebp from "./assets/images/project-fitness.webp";
import fitnessPng from "./assets/images/project-fitness.png";
import techWebp from "./assets/images/project-tech.webp";
import techPng from "./assets/images/project-tech.png";

export const assets = {
  mark: kyveriMark,
  hero: { webp: heroWebp, fallback: heroPng },
  studio: { webp: studioWebp, fallback: studioPng },
  contact: { webp: contactWebp, fallback: contactPng },
};

export const projectAssets = {
  property: { webp: propertyWebp, fallback: propertyPng },
  barber: { webp: barberWebp, fallback: barberPng },
  fitness: { webp: fitnessWebp, fallback: fitnessPng },
  tech: { webp: techWebp, fallback: techPng },
};
