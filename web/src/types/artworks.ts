export type Artwork = {
  id: string;
  slug: string;
  title: string;
  year?: number;
  type: "drawing" | "painting";
  image: string;
  visibility: "public" | "private";
};
