import Vue from "vue";
import Vuex from "vuex";
import { ScrollStatus } from "../constant/status";

Vue.use(Vuex);

export const store = new Vuex.Store<{
    scrollStatus: ScrollStatus
    clickedImage: string | undefined
}>({
    state: {
        scrollStatus: ScrollStatus.PART_1,
        clickedImage: undefined
    },
});