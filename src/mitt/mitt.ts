import mitt from "mitt";
import type {Events} from "@/mitt/events.ts";


export const cornMitt = mitt<Events>();

export default cornMitt;