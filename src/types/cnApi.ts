/**
 * The type of data returned by the cn not the officially API for champions.
 */
export interface HeroData {
  heroList: HeroList;
}

/**
 * A collection of heroes indexed by their heroId.
 * Acts as a dictionary/map of Hero objects.
 */
export interface HeroList {
  [key: string]: Hero;
}

/**
 * Represents a single hero/champion with all their detailed information.
 * Contains basic info, image urls, pricing, and gameplay statistics.
 */
export interface Hero {
  heroId: string;
  name: string;
  title: string;
  roles: string[];
  lane: string;
  intro: string;
  avatar: string;
  card: string;
  poster: string;
  highlightprice: string;
  couponprice: string;
  alias: string;
  tags: string;
  searchkey: string;
  isWeekFree: string;
  difficultyL: string;
  damage: string;
  surviveL: string;
  assistL: string;
}

/**
 * Added id param which is same id from riot API.
 * This id is extracted from the poster url.
 */
export interface EditedHero extends Hero {
  id: string;
}
