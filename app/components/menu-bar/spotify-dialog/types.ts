interface Common {
  id: string;
  type: string;
  name: string;
  webUrl: string;
  images: Array<SpotifyApi.ImageObject>;
}
interface Artist {
  name: string;
  webUrl: string;
}

export type Album = Common & {
  artists: Array<Artist>;
  tracksCount: number;
};
export type Playlist = Common & {
  tracksCount: number;
};
export type Track = Common & {
  artists: Array<Artist>;
  duration: number;
  album: Pick<Album, "name" | "webUrl">;
};
