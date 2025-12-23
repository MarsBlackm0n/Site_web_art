import { Artwork } from "@/types/artwork";

export const artworks: Artwork[] = [
  {
    id: "1",
    slug: "study-of-lines",
    title: "Study of Lines",
    year: 2023,
    type: "drawing",
    image: "https://picsum.photos/600/800?1",
    visibility: "public",
  },
  {
    id: "2",
    slug: "deep-blue",
    title: "Deep Blue",
    year: 2024,
    type: "painting",
    image: "https://picsum.photos/600/800?2",
    visibility: "public",
  },
  {
    id: "3",
    slug: "private-work-example",
    title: "Private work example",
    year: 2022,
    type: "drawing",
    image: "https://picsum.photos/600/800?3",
    visibility: "private",
  },
];
