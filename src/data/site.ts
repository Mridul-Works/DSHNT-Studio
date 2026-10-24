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
};

// The scroll-driven aperture. Stops tick from f/16 down to f/1.8 as it opens.
export const aperture = {
  eyebrow: "The instrument",
  headline: ["Start with", "the light."],
  body: "Every shoot begins with one decision: how much light to let in. Dishant plans the look, the place and the shot list before the day, so the session itself is relaxed and nothing is left to chance.",
  stops: [16, 11, 8, 5.6, 4, 2.8, 2, 1.8],
  src: "/work/IMG_1558.jpg",
};

export type Service = { name: string; detail: string };
export type ServiceGroup = { id: string; title: string; services: Service[] };

export const serviceGroups: ServiceGroup[] = [
  {
    id: "people",
    title: "People",
    services: [
      { name: "Portrait Photography", detail: "Individual, professional headshots, creative portraits" },
    ],
  },
  {
    id: "creative",
    title: "Creative & artistic",
    services: [
      { name: "Fashion & Modelling", detail: "Model portfolios, lookbooks" },
      { name: "Fine Art Photography", detail: "Conceptual, artistic prints for sale" },
      { name: "Black & White", detail: "Timeless monochrome series" },
      { name: "Street Photography", detail: "Everyday life, the city, real stories" },
      { name: "Candid / Documentary", detail: "Unposed, natural storytelling" },
      { name: "Long Exposure & Night", detail: "Light trails, night skies, city lights" },
      { name: "Macro Photography", detail: "Insects, flowers, tiny details" },
      { name: "Creative Conceptual", detail: "Themed shoots, props, smoke, fairy lights" },
    ],
  },
  {
    id: "nature",
    title: "Nature & travel",
    services: [
      { name: "Landscape Photography", detail: "Mountains, sunsets, rivers" },
      { name: "Travel Photography", detail: "Places, cultures, people on the road" },
      { name: "Wildlife & Birds", detail: "Sanctuaries, national parks" },
    ],
  },
  {
    id: "commercial",
    title: "Business & commercial",
    services: [
      { name: "Product Photography", detail: "E-commerce, Amazon/Flipkart listings, catalogues" },
      { name: "Food Photography", detail: "Restaurants, cafés, cloud kitchens, menus" },
      { name: "Brand & Lifestyle", detail: "Social media content for small businesses" },
      { name: "Automotive", detail: "Cars and bikes, dealership shoots" },
      { name: "Fitness & Gym", detail: "Trainers, athletes, gym promotions" },
      { name: "Sports Photography", detail: "Local tournaments, school/college sports" },
      { name: "Jewellery Photography", detail: "Close-up, high-detail shots for jewellers" },
    ],
  },
];

export const extras = [
  "Photo Editing & Retouching",
  "Reels / Short Video Shoots for Instagram",
  "Wedding Albums & Photo Books",
  "Framed Prints & Canvas Wall Art",
  "Drone Photography (where permitted)",
  "Photography Workshops for Beginners",
];

export const allServiceNames = [
  ...serviceGroups.flatMap((g) => g.services.map((s) => s.name)),
  ...extras,
  "Something else",
];

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
  { src: "/work/IMG_1535.jpg", ratio: TALL, title: "Bench, hard light", category: "Portrait", select: true },
  { src: "/work/IMG_1559.jpg", ratio: WIDE, title: "Mountain town from above", category: "Travel" },
  { src: "/work/IMG_1628.jpg", ratio: TALL, title: "Tail lights, black and white", category: "Creative", select: true },
  { src: "/work/IMG_2569.jpg", ratio: 1.5, title: "Sunny street", category: "Portrait" },
  { src: "/work/IMG_1565.jpg", ratio: WIDE, title: "Last light over the lake", category: "Nature", select: true },
  { src: "/work/IMG_1620.jpg", ratio: TALL, title: "Cattle in the haze", category: "Nature" },
  { src: "/work/IMG_1627.jpg", ratio: WIDE, title: "Road into town, moon up", category: "Travel" },
  { src: "/work/IMG_1540.jpg", ratio: WIDE, title: "On the boardwalk", category: "Portrait" },
  { src: "/work/IMG_1562.jpg", ratio: WIDE, title: "Mountain through the window", category: "Creative" },
  { src: "/work/IMG_1596.jpg", ratio: WIDE, title: "Clapping", category: "Portrait" },
  { src: "/work/IMG_1624.jpg", ratio: 1.5, title: "Farm at dusk", category: "Nature" },
  { src: "/work/IMG_1629.jpg", ratio: TALL, title: "Tail lights at sunset", category: "Creative" },
  { src: "/work/IMG_1560.jpg", ratio: WIDE, title: "Ridge line", category: "Travel" },
  { src: "/work/IMG_1619.jpg", ratio: 1.5, title: "Grazing, autumn", category: "Nature" },
  { src: "/work/IMG_1563.jpg", ratio: WIDE, title: "Cloud between the pines", category: "Creative" },
];
