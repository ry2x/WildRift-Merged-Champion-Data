/** Merged champion data combining RiotAPI and CN API. */
export interface MergedChamp {
  /** Champion ID (e.g., "Ahri"). */
  id: string;
  /** Hero ID for Wild Rift. */
  hero_id: number;
  /** Champion key for League of Legends. */
  key: number;
  /** Champion name. */
  name: string;
  /** Champion title. */
  title: string;
  /** Champion description. */
  describe: string;
  /** Champion roles. */
  roles: Roles[];
  /** Champion type. */
  type: string;
  /** Whether the champion is implemented in Wild Rift. */
  is_wr: boolean;
  /** Recommended lanes. */
  lanes: Lanes[];
  /** Whether the champion is currently free to play. */
  is_free: boolean;
  /** Difficulty rating (1-3). */
  difficult: number;
  /** Damage rating (1-3). */
  damage: number;
  /** Survivability rating (1-3). */
  survive: number;
  /** Utility rating (1-3). */
  utility: number;
}

/**
 * Literal types for the lanes in RiotAPI.
 */
export type Lanes = 'mid' | 'jungle' | 'top' | 'support' | 'ad';

/**
 * Literal types for the roles in RiotAPI.
 */
export type Roles = 'fighter' | 'mage' | 'assassin' | 'marksman' | 'support' | 'tank';
