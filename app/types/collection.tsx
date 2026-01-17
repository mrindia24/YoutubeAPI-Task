import { Video } from "./video";

export interface Collection {
  id: string;
  name: string;
  videos: Video[];
  createdAt: unknown;
}
