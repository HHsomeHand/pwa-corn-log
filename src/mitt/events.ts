import type {NumberPopupEvents} from "@/mitt/events/cornNumberPopupEvents.ts";
import type {PowerfulListEvents} from "@/mitt/events/cornPowerfulListEvents.ts";
import type {LockViewEvents} from "@/mitt/events/lockViewEvents.ts";

export type Events = NumberPopupEvents & PowerfulListEvents & LockViewEvents;
