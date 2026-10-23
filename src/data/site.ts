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
  src: "https://picsum.photos/seed/dshnt-aperture/1400/1400",
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

// Portfolio. Replace `src` with Dishant's own photos (e.g. "/work/portrait-01.jpg"),
// keep `ratio` honest (w/h) so the wall lays out without jumping, and set
// `select: true` on the frames he'd pick first.
export type Category = "Portrait" | "Creative" | "Nature" | "Commercial";
export type Frame = {
  src: string;
  title: string;
  category: Category;
  ratio: number;
  exif: string;
  select?: boolean;
};

const ph = (seed: string, w: number, h: number) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const categories: Category[] = ["Portrait", "Creative", "Nature", "Commercial"];

export const frames: Frame[] = [
  { src: ph("dshnt-p1", 900, 1125), ratio: 4 / 5, title: "Window light portrait", category: "Portrait", exif: "85mm · f/1.8 · 1/200 · ISO 200", select: true },
  { src: ph("dshnt-c1", 1200, 800), ratio: 3 / 2, title: "Old city, early morning", category: "Creative", exif: "35mm · f/5.6 · 1/500 · ISO 100" },
  { src: ph("dshnt-n1", 1200, 900), ratio: 4 / 3, title: "Ridge at golden hour", category: "Nature", exif: "24mm · f/8 · 1/250 · ISO 100", select: true },
  { src: ph("dshnt-b1", 1000, 1000), ratio: 1, title: "Café menu shoot", category: "Commercial", exif: "50mm · f/2.8 · 1/160 · ISO 400" },
  { src: ph("dshnt-p2", 900, 1125), ratio: 4 / 5, title: "Studio headshot", category: "Portrait", exif: "85mm · f/4 · 1/160 · ISO 100" },
  { src: ph("dshnt-c2", 1200, 800), ratio: 3 / 2, title: "Light trails, highway", category: "Creative", exif: "18mm · f/11 · 20s · ISO 100", select: true },
  { src: ph("dshnt-n2", 900, 1125), ratio: 4 / 5, title: "Kingfisher, wetlands", category: "Nature", exif: "300mm · f/5.6 · 1/2000 · ISO 800" },
  { src: ph("dshnt-b2", 1000, 1000), ratio: 1, title: "Product on stone", category: "Commercial", exif: "100mm · f/8 · 1/125 · ISO 100", select: true },
  { src: ph("dshnt-p3", 1200, 900), ratio: 4 / 3, title: "Lookbook, outdoors", category: "Portrait", exif: "50mm · f/2 · 1/1000 · ISO 100" },
  { src: ph("dshnt-c3", 900, 1125), ratio: 4 / 5, title: "Monochrome market", category: "Creative", exif: "35mm · f/4 · 1/320 · ISO 400" },
  { src: ph("dshnt-n3", 1200, 800), ratio: 3 / 2, title: "River after the rain", category: "Nature", exif: "16mm · f/16 · 2s · ISO 50" },
  { src: ph("dshnt-b3", 1200, 900), ratio: 4 / 3, title: "Bike at the dealership", category: "Commercial", exif: "24mm · f/5.6 · 1/200 · ISO 200" },
  { src: ph("dshnt-p4", 900, 1125), ratio: 4 / 5, title: "Candid, on the rooftop", category: "Portrait", exif: "35mm · f/1.4 · 1/800 · ISO 100", select: true },
  { src: ph("dshnt-c4", 1000, 1000), ratio: 1, title: "Dew on a leaf", category: "Creative", exif: "100mm macro · f/11 · 1/200 · ISO 200" },
  { src: ph("dshnt-n4", 900, 1125), ratio: 4 / 5, title: "Trail through the pines", category: "Nature", exif: "35mm · f/8 · 1/160 · ISO 200" },
  { src: ph("dshnt-b4", 1200, 800), ratio: 3 / 2, title: "Gym campaign", category: "Commercial", exif: "50mm · f/2.8 · 1/500 · ISO 640" },
];
