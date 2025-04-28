import axios, { AxiosResponse } from 'axios';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { LANE_MAPPING, NO_WR_LANE } from './constant.js';
import { EditedHero, HeroData } from './types/cnApi.js';
import { Lanes, MergedChamp, Roles } from './types/merged.js';
import { ChampionData, DDPatchList } from './types/riotApi';
import { Config } from './types/type.js';

/**
 * Loads configuration from config.json file
 * @throws Error if config file cannot be loaded or parsed
 * @returns Parsed configuration object
 */
function loadConfig(): Config {
  try {
    const configPath = join(process.cwd(), 'config.json');
    return JSON.parse(readFileSync(configPath, 'utf8')) as Config;
  } catch (error) {
    console.error('Failed to load config file', error);
    throw error;
  }
}

const config = loadConfig();

/**
 * Creates output directory for storing generated files
 * Creates directory recursively if it doesn't exist
 * @throws Error if directory creation fails
 */
async function createOutputDirectory(): Promise<void> {
  try {
    mkdirSync(config.OUTPUT_FOLDER_NAME, { recursive: true });
    console.log(config.MESSAGE_SUCCESS.FOLDER_CREATE);
  } catch (error) {
    console.error(config.MESSAGE_ERROR.FOLDER_CREATE, error);
    throw error;
  }
}

/**
 * Writes data to JSON file in specified language
 * @param data - Champion data to write
 * @param lang - Target language for output file
 * @throws Error if file writing fails
 */
async function writeJsonFile(data: MergedChamp[] | EditedHero[], lang: string): Promise<void> {
  try {
    const outputPath = join(
      config.OUTPUT_FOLDER_NAME,
      config.OUTPUT_FILE_NAME.replace('{lang}', lang),
    );
    writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(config.MESSAGE_SUCCESS.JSON_WRITE.replace('{lang}', lang));
  } catch (error) {
    console.error(config.MESSAGE_ERROR.JSON_WRITE.replace('{lang}', lang), error);
    throw error;
  }
}

/**
 * Generic function to fetch data from API endpoints
 * @param url - API endpoint URL
 * @returns Promise resolving to API response
 * @throws Error if API request fails
 */
async function fetchData<T>(url: string): Promise<AxiosResponse<T>> {
  try {
    return await axios.get<T>(url);
  } catch (error) {
    console.error(config.MESSAGE_ERROR.DATA_FETCH, error);
    throw error;
  }
}

/**
 * Extracts champion name from poster URL using regex
 * @param posterUrl - URL of champion poster image
 * @returns Extracted champion name or null if not found
 */
function extractChampionNameFromPoster(posterUrl: string): string | null {
  const match = posterUrl.match(/\/([A-Za-z]+)_\d+\.jpg$/);
  return match ? match[1] : null;
}

/**
 * Adds unique ID to champion data from CN API
 * Uses poster URL to extract champion name as ID
 * @param cnData - Raw champion data from CN API
 * @returns Array of champion data with added IDs
 */
function addIdToCnData(cnData: HeroData): EditedHero[] {
  return Object.values(cnData.heroList).map((hero) => {
    const id = extractChampionNameFromPoster(hero.poster);
    return { ...hero, id: id || hero.heroId };
  });
}

/**
 * Converts CN lane format to standardized lane enum
 * Splits lane string and maps to standard format
 * @param lanesCn - Semicolon-separated lane string from CN API
 * @returns Array of standardized lane enums
 */
function convertLanes(lanesCn: string): Lanes[] {
  return lanesCn
    .split(';')
    .map((lane) => LANE_MAPPING[lane.trim()])
    .filter(Boolean) as Lanes[];
}

/**
 * Creates a base champion object with common properties shared between WR and non-WR champions
 * @param champion - Champion data from Riot API
 * @returns Partial champion object with base properties
 */
function createBaseChampion(champion: ChampionData['data'][string]): Partial<MergedChamp> {
  return {
    id: champion.id,
    key: parseInt(champion.key, 10),
    name: champion.name,
    title: champion.title,
    describe: champion.blurb,
    roles: champion.tags.map((tag) => tag.toLowerCase() as Roles),
    type: champion.partype,
  };
}

/**
 * Maps champion data specifically for Wild Rift champions
 * Combines base champion data with Wild Rift specific attributes
 * @param champion - Champion data from Riot API
 * @param cnChampion - Champion data from CN API
 * @returns Fully mapped Wild Rift champion data
 */
function mapWildRiftChampion(
  champion: ChampionData['data'][string],
  cnChampion: EditedHero,
): MergedChamp {
  return {
    ...createBaseChampion(champion),
    hero_id: parseInt(cnChampion.heroId, 10),
    is_wr: true,
    lanes: convertLanes(cnChampion.lane),
    is_free: cnChampion.isWeekFree === '1',
    difficult: parseInt(cnChampion.difficultyL, 10),
    damage: parseInt(cnChampion.damage, 10),
    survive: parseInt(cnChampion.surviveL, 10),
    utility: parseInt(cnChampion.assistL, 10),
  } as MergedChamp;
}

/**
 * Maps champion data for non-Wild Rift champions
 * Sets default values for Wild Rift specific attributes
 * @param champion - Champion data from Riot API
 * @returns Mapped non-Wild Rift champion data with default values
 */
function mapNonWildRiftChampion(champion: ChampionData['data'][string]): MergedChamp {
  return {
    ...createBaseChampion(champion),
    hero_id: 0,
    is_wr: false,
    lanes: NO_WR_LANE[champion.id] ?? [],
    is_free: false,
    difficult: 0,
    damage: 0,
    survive: 0,
    utility: 0,
  } as MergedChamp;
}

/**
 * Merges champion data from Riot API with CN API data
 * Fetches champion data for specified language and patch
 * @param cnData - Array of champion data from CN API
 * @param lang - Target language for champion data
 * @param patch - Game version/patch
 * @returns Array of merged champion data
 */
async function mergingChampionData(
  cnData: EditedHero[],
  lang: string,
  patch: string,
): Promise<MergedChamp[]> {
  const riotChampionData = await fetchData<ChampionData>(
    config.DD_CHAMPION_API.replace('{version}', patch).replace('{lang}', lang),
  );

  return Object.values(riotChampionData.data.data).map((champion) => {
    const cnChampion = cnData.find(
      (cnHero) => cnHero.id.toLowerCase() === champion.id.toLowerCase(),
    );

    return cnChampion
      ? mapWildRiftChampion(champion, cnChampion)
      : mapNonWildRiftChampion(champion);
  });
}

async function main(): Promise<void> {
  try {
    // Create output directory at the beginning
    await createOutputDirectory();

    // Fetch initial data
    const [ddPatchListResponse, cnChampionResponse] = await Promise.all([
      fetchData<DDPatchList>(config.DD_VERSION_API),
      fetchData<HeroData>(config.CN_CHAMPION_API),
    ]);

    const ddLatestPatch = ddPatchListResponse.data[0];
    const editedCnData = addIdToCnData(cnChampionResponse.data);

    // Process all target languages concurrently
    const PromiseData = config.TARGET_LANGUAGES.map(async (lang) => {
      const mergedData = await mergingChampionData(editedCnData, lang, ddLatestPatch);
      await writeJsonFile(mergedData, lang);
    });

    await Promise.all(PromiseData);

    console.log(config.MESSAGE_SUCCESS.PROCESS_COMPLETE);
  } catch (error) {
    console.error(config.MESSAGE_ERROR.PROCESS_ERROR, error);
    process.exit(1);
  }
}

main();
