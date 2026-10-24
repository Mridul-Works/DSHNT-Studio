import type { Metadata } from "next";
import Header from "@/components/v2/Header";
import Wall from "@/components/v2/Wall";
import Footer from "@/components/v2/Footer";

export const metadata: Metadata = {
  title: "Work · DSHNT Studio",
  description: "Every photograph on the site, in one place. Portraits, places and creative work by Dishant.",
};

// /v2/work — the full index. /v2 shows a selection in the scroll gallery;
// this page lists every frame.
export default function WorkPage() {
  return (
    <>
      <Header home="/v2" />
      <main>
        <Wall />
      </main>
      <Footer home="/v2" />
    </>
  );
}
