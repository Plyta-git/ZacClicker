// Group by feature
export const ALERT_CONFIG = {
  MIN_DELAY: 5000,
  MAX_DELAY: 60000,
  LEVEL_FACTOR: 4500,
  RANDOM_DELAY: 5000,
  VISIBLE_DURATION: 3000,
  REWARD_BASE: 15,
  REWARD_LEVEL_MULTIPLIER: 0.5,
};

export const REACTION_TEST_CONFIG = {
  COOLDOWN_MS: 60 * 1000,
  LAST_TEST_KEY: "reaction_time_last_test",
  DELAY_MIN: 1000,
  DELAY_MAX: 3000,
  POINTS_TIER_1_MS: 300,
  POINTS_TIER_1_VAL: 5,
  POINTS_TIER_2_MS: 200,
  POINTS_TIER_2_VAL: 20,
  POINTS_TIER_3_MS: 150,
  POINTS_TIER_3_VAL: 100,
  POINTS_TIER_4_MS: 100,
  POINTS_TIER_4_VAL: 400,
};

export const GUCCI_ARMIA_CONFIG = {
  SPEED_MIN: 0.15,
  SPEED_RANDOM: 0.05,
  WALL_LEFT: 0,
  WALL_RIGHT: 95,
  WALL_TOP: 0,
  WALL_BOTTOM: 95,
};

export const SHOW_EMOTE_CONFIG = {
  DELAY_MIN: 2000,
  DELAY_RANDOM: 10000,
  LEAVING_TIMEOUT: 2000,
  REMOVE_TIMEOUT: 3000,
};

export const SLOT_MACHINE_CONFIG = {
  SLIDES_COUNT: 10,
  WIN_CHANCE: 5,
  WIN_POINTS: 200,
  SPIN_DURATION: 1000,
  REEL_STOP_DELAY: 200,
};

export const ZAC_BUTTON_CONFIG = {
  CLICK_TIMEOUT: 150,
};

export const STORE_CONFIG = {
  MIN_POINTS_RATIO: 0.6,
};

export const TTS_CONFIG = {
  VOICE: "Jacek",
  VOLUME: 1.0,
  RATE: 1.4,
};

export const MEDIA_PLAYER_CONFIG = {
  ENDED_FLAG_THRESHOLD: 0.98,
};

export const TWITCH_CHAT_CONFIG = {
  MAX_MESSAGES: 100,
  SCROLL_THRESHOLD_RATIO: 0.1,
};

export const ADS_VIDEO_CONFIG = {
  // Minimum and maximum interval between video ads (milliseconds)
  INTERVAL_MIN: 30000, // 30s
  INTERVAL_MAX: 90000, // 90s
  // Percentages used to calculate random absolute positioning and size.
  WIDTH_PERCENT: 15, // width of the player in vw
  HEIGHT_PERCENT: 15, // not used directly (ReactPlayer keeps aspect ratio)
  VOLUME: 0.1,
};
