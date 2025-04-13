import cornMitt from "@/mitt/mitt.js";

export function useListUpdate(hook: Function) {
    async function update() {
        hook();
    }

    update();

    cornMitt.on("list:update", update);
    cornMitt.on("list:delete", update);
    cornMitt.on("list:add", update);

    return {

    }
}