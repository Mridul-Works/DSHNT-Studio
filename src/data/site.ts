// All site content lives here. Edit this file to change copy, services or photos.

export const site = {
  name: "DSHNT Studio",
  owner: "Dishant",
  tagline: "Passion in every frame",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  // TODO: replace with the real profile links.
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Behance", href: "https://www.behance.net/" },
  ],
};

export const story = {
  quote: "My first salary bought a camera. The rest is history.",
  paragraphs: [
    "Most people spend their first salary on themselves. Dishant spent his on a DSLR.",
    "Photography has always been the thing he loves more than anything, and that first camera turned a passion into a craft. Today DSHNT Studio is where that passion becomes his full-time work.",
    "Every frame you see here was taken by someone who chose the camera before anything else.",
  ],
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

// Portfolio. Replace `src` with Dishant's own photos (e.g. "/work/portrait-01.jpg")
// and set `select: true` on the frames he'd circle on a contact sheet.
export type Category = "Portrait" | "Creative" | "Nature" | "Commercial";
export type Frame = {
  src: string;
  title: string;
  category: Category;
  exif: string;
  select?: boolean;
};

const ph = (seed: string, w = 900, h = 1125) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const categories: Category[] = ["Portrait", "Creative", "Nature", "Commercial"];

export const frames: Frame[] = [
  { src: ph("dshnt-p1"), title: "Window light portrait", category: "Portrait", exif: "85mm · f/1.8 · 1/200 · ISO 200", select: true },
  { src: ph("dshnt-c1"), title: "Old city, early morning", category: "Creative", exif: "35mm · f/5.6 · 1/500 · ISO 100" },
  { src: ph("dshnt-n1"), title: "Ridge at golden hour", category: "Nature", exif: "24mm · f/8 · 1/250 · ISO 100", select: true },
  { src: ph("dshnt-b1"), title: "Café menu shoot", category: "Commercial", exif: "50mm · f/2.8 · 1/160 · ISO 400" },
  { src: ph("dshnt-p2"), title: "Studio headshot", category: "Portrait", exif: "85mm · f/4 · 1/160 · ISO 100" },
  { src: ph("dshnt-c2"), title: "Light trails, highway", category: "Creative", exif: "18mm · f/11 · 20s · ISO 100", select: true },
  { src: ph("dshnt-n2"), title: "Kingfisher, wetlands", category: "Nature", exif: "300mm · f/5.6 · 1/2000 · ISO 800" },
  { src: ph("dshnt-b2"), title: "Product on stone", category: "Commercial", exif: "100mm · f/8 · 1/125 · ISO 100", select: true },
  { src: ph("dshnt-p3"), title: "Lookbook, outdoors", category: "Portrait", exif: "50mm · f/2 · 1/1000 · ISO 100" },
  { src: ph("dshnt-c3"), title: "Monochrome market", category: "Creative", exif: "35mm · f/4 · 1/320 · ISO 400" },
  { src: ph("dshnt-n3"), title: "River after the rain", category: "Nature", exif: "16mm · f/16 · 2s · ISO 50" },
  { src: ph("dshnt-b3"), title: "Bike at the dealership", category: "Commercial", exif: "24mm · f/5.6 · 1/200 · ISO 200" },
  { src: ph("dshnt-p4"), title: "Candid, on the rooftop", category: "Portrait", exif: "35mm · f/1.4 · 1/800 · ISO 100", select: true },
  { src: ph("dshnt-c4"), title: "Dew on a leaf", category: "Creative", exif: "100mm macro · f/11 · 1/200 · ISO 200" },
  { src: ph("dshnt-n4"), title: "Trail through the pines", category: "Nature", exif: "35mm · f/8 · 1/160 · ISO 200" },
  { src: ph("dshnt-b4"), title: "Gym campaign", category: "Commercial", exif: "50mm · f/2.8 · 1/500 · ISO 640" },
];

export const hero = {
  src: ph("dshnt-hero", 2000, 1300),
  exif: ["50mm", "f/1.8", "1/250", "ISO 200"],
};
