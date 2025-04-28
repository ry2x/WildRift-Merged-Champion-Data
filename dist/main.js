"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const path_1 = require("path");
const constant_js_1 = require("./constant.js");
function loadConfig() {
    try {
        const configPath = (0, path_1.join)(process.cwd(), 'config.json');
        return JSON.parse((0, fs_1.readFileSync)(configPath, 'utf8'));
    }
    catch (error) {
        console.error('Failed to load config file', error);
        throw error;
    }
}
const config = loadConfig();
async function createOutputDirectory() {
    try {
        (0, fs_1.mkdirSync)(config.OUTPUT_FOLDER_NAME, { recursive: true });
        console.log(config.MESSAGE_SUCCESS.FOLDER_CREATE);
    }
    catch (error) {
        console.error(config.MESSAGE_ERROR.FOLDER_CREATE, error);
        throw error;
    }
}
async function writeJsonFile(data, lang) {
    try {
        const outputPath = (0, path_1.join)(config.OUTPUT_FOLDER_NAME, config.OUTPUT_FILE_NAME.replace('{lang}', lang));
        (0, fs_1.writeFileSync)(outputPath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(config.MESSAGE_SUCCESS.JSON_WRITE.replace('{lang}', lang));
    }
    catch (error) {
        console.error(config.MESSAGE_ERROR.JSON_WRITE.replace('{lang}', lang), error);
        throw error;
    }
}
async function fetchData(url) {
    try {
        return await axios_1.default.get(url);
    }
    catch (error) {
        console.error(config.MESSAGE_ERROR.DATA_FETCH, error);
        throw error;
    }
}
function extractChampionNameFromPoster(posterUrl) {
    const match = posterUrl.match(/\/([A-Za-z]+)_\d+\.jpg$/);
    return match ? match[1] : null;
}
function addIdToCnData(cnData) {
    return Object.values(cnData.heroList).map((hero) => {
        const id = extractChampionNameFromPoster(hero.poster);
        return { ...hero, id: id || hero.heroId };
    });
}
function convertLanes(lanesCn) {
    return lanesCn
        .split(';')
        .map((lane) => constant_js_1.LANE_MAPPING[lane.trim()])
        .filter(Boolean);
}
function createBaseChampion(champion) {
    return {
        id: champion.id,
        key: parseInt(champion.key, 10),
        name: champion.name,
        title: champion.title,
        describe: champion.blurb,
        roles: champion.tags.map((tag) => tag.toLowerCase()),
        type: champion.partype,
    };
}
function mapWildRiftChampion(champion, cnChampion) {
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
    };
}
function mapNonWildRiftChampion(champion) {
    return {
        ...createBaseChampion(champion),
        hero_id: 0,
        is_wr: false,
        lanes: constant_js_1.NO_WR_LANE[champion.id] ?? [],
        is_free: false,
        difficult: 0,
        damage: 0,
        survive: 0,
        utility: 0,
    };
}
async function mergingChampionData(cnData, lang, patch) {
    const riotChampionData = await fetchData(config.DD_CHAMPION_API.replace('{version}', patch).replace('{lang}', lang));
    return Object.values(riotChampionData.data.data).map((champion) => {
        const cnChampion = cnData.find((cnHero) => cnHero.id.toLowerCase() === champion.id.toLowerCase());
        return cnChampion
            ? mapWildRiftChampion(champion, cnChampion)
            : mapNonWildRiftChampion(champion);
    });
}
async function main() {
    try {
        await createOutputDirectory();
        const [ddPatchListResponse, cnChampionResponse] = await Promise.all([
            fetchData(config.DD_VERSION_API),
            fetchData(config.CN_CHAMPION_API),
        ]);
        const ddLatestPatch = ddPatchListResponse.data[0];
        const editedCnData = addIdToCnData(cnChampionResponse.data);
        const PromiseData = config.TARGET_LANGUAGES.map(async (lang) => {
            const mergedData = await mergingChampionData(editedCnData, lang, ddLatestPatch);
            await writeJsonFile(mergedData, lang);
        });
        await Promise.all(PromiseData);
        console.log(config.MESSAGE_SUCCESS.PROCESS_COMPLETE);
    }
    catch (error) {
        console.error(config.MESSAGE_ERROR.PROCESS_ERROR, error);
        process.exit(1);
    }
}
main();
