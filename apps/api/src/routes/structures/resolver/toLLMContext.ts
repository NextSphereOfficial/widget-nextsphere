import type { StructureConfig } from "../../../types/Structure.js";
import { mergeDefaultsWithOverrides } from "./mergeConfig.js";

export type LLMContext = {
  structure: { id: string; name: string; locale: string; timezone: string };
  room?: { id: string; name: string };
  info: {
    wifi?: { ssid: string; password?: string };
    checkin?: { from?: string; method?: string; instructions?: string };
    checkout?: { until?: string; instructions?: string };
    rules?: string[];
    emergencies?: { number?: string; instructions?: string };
    faqs?: { q: string; a: string }[];
    assets?: { photos?: string[]; documents?: string[] };
  };
  version: string;
};

export function toLLMContext(cfg: StructureConfig, roomId?: string, redactSecrets = false): LLMContext {
  const room = roomId ? cfg.rooms.find(r => r.id === roomId) : undefined;
  const info = mergeDefaultsWithOverrides(cfg.defaults, room?.overrides);

  if (redactSecrets && info?.wifi?.password) info.wifi.password = "******";
  if (redactSecrets && info?.checkin?.instructions) {
    info.checkin.instructions = "[istruzioni check-in disponibili su richiesta]";
  }

  return {
    structure: cfg.structure,
    room: room ? { id: room.id, name: room.name } : undefined,
    info: {
      wifi: info.wifi,
      checkin: info.checkin,
      checkout: info.checkout,
      rules: info.rules,
      emergencies: info.emergencies,
      faqs: info.faqs,
      assets: (room?.overrides as any)?.assets
    },
    version: cfg.version
  };
}
