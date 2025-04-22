/**
 *  Config file interface
 */
export interface Config {
  DD_VERSION_API: string;
  DD_CHAMPION_API: string;
  CN_CHAMPION_API: string;
  OUTPUT_FOLDER_NAME: string;
  OUTPUT_FILE_NAME: string;
  TARGET_LANGUAGES: string[];
  MESSAGE_ERROR: MessageSet;
  MESSAGE_SUCCESS: MessageSet;
}

/**
 * MessageSet interface
 */
export interface MessageSet {
  FOLDER_CREATE: string;
  DATA_FETCH?: string;
  JSON_WRITE: string;
  DATA_EXPORT?: string;
  PROCESS_ERROR?: string;
  PROCESS_COMPLETE?: string;
}
