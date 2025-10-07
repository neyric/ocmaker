import darkArtisticPortraitMen from "./prompts/dark-artistic-portrait-men.md?raw";
import darkArtisticPortraitWomen from "./prompts/dark-artistic-portrait-women.md?raw";
import portraitMen1 from "./prompts/portrait-men-1.md?raw";
import portraitMen2 from "./prompts/portrait-men-2.md?raw";
import portraitMen3 from "./prompts/portrait-men-3.md?raw";
import portraitMen4 from "./prompts/portrait-men-4.md?raw";
import portraitMen5 from "./prompts/portrait-men-5.md?raw";
import portraitMen6 from "./prompts/portrait-men-6.md?raw";
import portraitMen7 from "./prompts/portrait-men-7.md?raw";
import portraitWomen1 from "./prompts/portrait-women-1.md?raw";
import portraitWomen2 from "./prompts/portrait-women-2.md?raw";
import portraitWomen3 from "./prompts/portrait-women-3.md?raw";
import portraitWomen4 from "./prompts/portrait-women-4.md?raw";
import portraitWomen5 from "./prompts/portrait-women-5.md?raw";
import portraitWomen6 from "./prompts/portrait-women-6.md?raw";
import portraitWomen7 from "./prompts/portrait-women-7.md?raw";
import womenFlowerOcean from "./prompts/portrait-women-flower-ocean.md?raw";

export interface FotoProfissionalItem {
  id: string;
  image: string;
  prompt: string;
  type: "women" | "men";
}

export const fotoProfissionalList: FotoProfissionalItem[] = [
  {
    id: "portrait-men-4",
    prompt: portraitMen4,
    image: "/assets/portrait-men-4.webp",
    type: "men",
  },
  {
    id: "portrait-men-7",
    prompt: portraitMen7,
    image: "/assets/portrait-men-7.webp",
    type: "men",
  },
  {
    id: "portrait-women-7",
    prompt: portraitWomen7,
    image: "/assets/portrait-women-7.webp",
    type: "women",
  },

  {
    id: "portrait-women-1",
    prompt: portraitWomen1,
    image: "/assets/portrait-women-1.webp",
    type: "women",
  },
  {
    id: "dark-artistic-portrait-women",
    image: "/assets/dark-artistic-portrait-women.webp",
    prompt: darkArtisticPortraitWomen,
    type: "women",
  },

  {
    id: "portrait-men-5",
    prompt: portraitMen5,
    image: "/assets/portrait-men-5.webp",
    type: "men",
  },
  {
    id: "portrait-women-5",
    prompt: portraitWomen5,
    image: "/assets/portrait-women-5.webp",
    type: "women",
  },
  {
    id: "portrait-women-6",
    prompt: portraitWomen6,
    image: "/assets/portrait-women-6.webp",
    type: "women",
  },
  {
    id: "portrait-men-3",
    prompt: portraitMen3,
    image: "/assets/portrait-men-3.webp",
    type: "men",
  },
  {
    id: "portrait-women-4",
    prompt: portraitWomen4,
    image: "/assets/portrait-women-4.webp",
    type: "women",
  },
  {
    id: "portrait-men-6",
    prompt: portraitMen6,
    image: "/assets/portrait-men-6.webp",
    type: "men",
  },
  {
    id: "portrait-women-2",
    prompt: portraitWomen2,
    image: "/assets/portrait-women-2.webp",
    type: "women",
  },
  {
    id: "portrait-men-2",
    prompt: portraitMen2,
    image: "/assets/portrait-men-2.webp",
    type: "men",
  },
  {
    id: "portrait-women-3",
    prompt: portraitWomen3,
    image: "/assets/portrait-women-3.webp",
    type: "women",
  },
  {
    id: "portrait-men-1",
    prompt: portraitMen1,
    image: "/assets/portrait-men-1.webp",
    type: "men",
  },
  {
    id: "women-flower-ocean",
    image: "/assets/women-flower-ocean.webp",
    prompt: womenFlowerOcean,
    type: "women",
  },
];
