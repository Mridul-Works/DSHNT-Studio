// All site content lives here. Edit this file to change copy, services or photos.

export const site = {
  name: "DSHNT Studio",
  owner: "Dishant",
  tagline: "Every frame, from the heart",
  year: 2026,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  // TODO: replace with the real profile links.
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Behance", href: "https://www.behance.net/" },
  ],
};

export const hero = {
  lineA: "Every frame,",
  lineB: "from the heart.",
  sub: "Photography by Dishant. Portraits, places, products and everything in between.",
};

export const about = {
  headline: ["Photography,", "full-time."],
  body: [
    "Dishant has loved photography for as long as he can remember, and today it’s his whole job.",
    "Portraits, street, landscapes, products: whatever is in front of the lens, the aim is the same. A picture you’ll want to keep.",
  ],
  facts: [
    ["Works with", "People, places, products"],
    ["Delivers", "Edited photos, prints and albums"],
    ["Bookings", "Open for new shoots"],
  ],
  // Dishant himself. These are Instagram-size (512–640 px), so they only
  // appear here at portrait size, never in the full-screen gallery.
  portrait: { src: "/work/dishant-01.jpg", alt: "Dishant, in a beanie and sunglasses, standing at the edge of a lake" },
  more: [
    { src: "/work/dishant-02.jpg", alt: "Dishant sitting on driftwood at a mountain lake" },
    { src: "/work/dishant-03.jpg", alt: "Dishant in an Arsenal shirt leaning on a car, black and white" },
  ],
  caption: "Dishant · the one behind the camera",
};

// The scroll gallery. A slit between the words opens into a full photo as you
// scroll; each stage shows the next photo. `flip` replaces the middle word
// once it is fully open.
export const opens = {
  words: ["it only", "opens", "this much"],
  flip: "needs",
  // tall and wide alternate; the flash-lit "All in." frames are spaced between the quieter ones
  stages: [
    "/work/dishant-01.jpg",
    "/work/allin-01.jpg",
    "/work/IMG_1595.jpg",
    "/work/allin-02.jpg",
    "/work/IMG_1628.jpg",
    "/work/allin-04.jpg",
    "/work/allin-05.jpg",
    "/work/banff-04.jpg",
    "/work/IMG_1621.jpg",
    "/work/banff-02.jpg",
  ],
};

// The scroll-driven aperture. Stops tick from f/16 down to f/1.8 as it opens.
export const aperture = {
  eyebrow: "The instrument",
  headline: ["Start with", "the light."],
  body: "Every shoot begins with one decision: how much light to let in. Dishant plans the look, the place and the shot list before the day, so the session itself is relaxed and nothing is left to chance.",
  stops: [16, 11, 8, 5.6, 4, 2.8, 2, 1.8],
  src: "/work/IMG_1558.jpg",
};

// One flat list, in this order, with no headings. `peek` picks which category's
// photo floats beside the pointer while a row is hovered.
export type Service = { name: string; detail: string; peek?: Category };

export const services: Service[] = [
  { name: "Sports Photography", detail: "Local tournaments, school/college sports" },
  { name: "Fitness & Gym", detail: "Trainers, athletes, gym promotions" },
  { name: "Brand & Lifestyle", detail: "Social media content for small businesses" },
  { name: "Food Photography", detail: "Restaurants, cafés, cloud kitchens, menus" },
  { name: "Product Photography", detail: "E-commerce, Amazon/Flipkart listings, catalogues" },
  { name: "Travel Photography", detail: "Places, cultures, people on the road", peek: "Travel" },
  { name: "Landscape Photography", detail: "Mountains, sunsets, rivers", peek: "Nature" },
  { name: "Creative Conceptual", detail: "Themed shoots, props, smoke, fairy lights", peek: "Creative" },
  { name: "Long Exposure & Night", detail: "Light trails, night skies, city lights", peek: "Creative" },
  { name: "Street Photography", detail: "Everyday life, the city, real stories", peek: "Creative" },
  { name: "Black & White", detail: "Timeless monochrome series", peek: "Creative" },
  { name: "Fashion & Modelling", detail: "Model portfolios, lookbooks", peek: "Portrait" },
  { name: "Portrait Photography", detail: "Individual, professional headshots, creative portraits", peek: "Portrait" },
];

// The booking form's "type of shoot" dropdown offers the same list.
export const allServiceNames = [...services.map((s) => s.name), "Something else"];

export const steps = [
  { title: "Enquire", text: "Tell Dishant what you want to shoot, when and where." },
  { title: "Plan", text: "Agree on the look, the location and the shot list before the day." },
  { title: "Shoot", text: "The session itself, relaxed and directed so you never feel posed." },
  { title: "Deliver", text: "Edited, retouched photos delivered online, with prints and albums on request." },
];

// Portfolio. Photos live in public/work (2400px web copies of the masters in
// assets/). `ratio` is width ÷ height so the wall lays out without jumping;
// `select: true` marks the frames shown first ("Pick"). `exif` is optional:
// add it only when the real exposure data is known.
export type Category = "Portrait" | "Nature" | "Travel" | "Creative";
export type Frame = {
  src: string;
  title: string;
  category: Category;
  ratio: number;
  exif?: string;
  select?: boolean;
};

export const categories: Category[] = ["Portrait", "Nature", "Travel", "Creative"];

const TALL = 1602 / 2400;
const WIDE = 2400 / 1602;

export const frames: Frame[] = [
  { src: "/work/IMG_1595.jpg", ratio: TALL, title: "In the high chair", category: "Portrait", select: true },
  { src: "/work/IMG_1558.jpg", ratio: WIDE, title: "Glacial lake, still morning", category: "Nature", select: true },
  { src: "/work/IMG_1546.jpg", ratio: WIDE, title: "By the lake, snow on the peaks", category: "Portrait" },
  { src: "/work/IMG_1621.jpg", ratio: WIDE, title: "Golden hour in the pasture", category: "Nature", select: true },
  // Dishant himself; 512x640, so it opens the gallery while the gate is still small
  { src: "/work/dishant-01.jpg", ratio: 4 / 5, title: "Dishant, by the lake", category: "Portrait", select: true },
  { src: "/work/IMG_1559.jpg", ratio: WIDE, title: "Mountain town from above", category: "Travel" },
  { src: "/work/IMG_1628.jpg", ratio: TALL, title: "Tail lights, black and white", category: "Creative", select: true },
  { src: "/work/IMG_2569.jpg", ratio: 1.5, title: "Sunny street", category: "Portrait" },
  // Dishant's own Instagram grade of this frame, in place of the camera master
  { src: "/work/banff-02.jpg", ratio: WIDE, title: "Last light over the lake", category: "Nature", select: true },
  { src: "/work/IMG_1620.jpg", ratio: TALL, title: "Cattle in the haze", category: "Nature" },
  { src: "/work/IMG_1627.jpg", ratio: WIDE, title: "Road into town, moon up", category: "Travel" },
  { src: "/work/IMG_1540.jpg", ratio: WIDE, title: "On the boardwalk", category: "Portrait" },
  // Dishant's own Instagram grade of this frame, in place of the camera master
  { src: "/work/banff-03.jpg", ratio: WIDE, title: "Mountain through the window", category: "Creative" },
  { src: "/work/IMG_1596.jpg", ratio: WIDE, title: "Clapping", category: "Portrait" },
  { src: "/work/IMG_1624.jpg", ratio: 1.5, title: "Farm at dusk", category: "Nature" },
  { src: "/work/IMG_1629.jpg", ratio: TALL, title: "Tail lights at sunset", category: "Creative" },
  { src: "/work/IMG_1560.jpg", ratio: WIDE, title: "Ridge line", category: "Travel" },
  { src: "/work/IMG_1619.jpg", ratio: 1.5, title: "Grazing, autumn", category: "Nature" },
  { src: "/work/IMG_1563.jpg", ratio: WIDE, title: "Cloud between the pines", category: "Creative" },
  // From the insta folder: the "All in." set (hard flash, one colour let through) and Banff
  { src: "/work/allin-01.jpg", ratio: WIDE, title: "Green jacket, hard flash", category: "Creative", select: true },
  { src: "/work/allin-02.jpg", ratio: WIDE, title: "Mirror, black and white", category: "Creative" },
  { src: "/work/allin-03.jpg", ratio: WIDE, title: "Mirror, phone up", category: "Creative" },
  { src: "/work/allin-04.jpg", ratio: WIDE, title: "Orange cap, split colour", category: "Creative", select: true },
  { src: "/work/allin-05.jpg", ratio: WIDE, title: "Neon shoes", category: "Creative", select: true },
  { src: "/work/banff-01.jpg", ratio: WIDE, title: "Lake Louise, the glacier", category: "Nature" },
  { src: "/work/banff-04.jpg", ratio: WIDE, title: "At Lake Louise", category: "Travel", select: true },
  // Dishant's other two self-portraits (640px, from the insta folder)
  { src: "/work/dishant-02.jpg", ratio: WIDE, title: "Dishant, on the driftwood", category: "Portrait" },
  { src: "/work/dishant-03.jpg", ratio: WIDE, title: "Arsenal shirt, black and white", category: "Portrait" },
];
