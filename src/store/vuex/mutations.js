/* eslint-disable */
import {reformatObjectArray} from "../../helper/reformatObjectArray";

export const mutations = {
    SET_COURSES_WITH_SERVER(state, data){
        state.courses = data
    },
    SET_COURSE_WITH_SERVER(state, data){
        state.course = data
    },
    SET_COUNTRIES_WITH_SERVER(state, data){
        state.countries = reformatObjectArray(data);
    },
    SET_CITIES_WITH_SERVER(state, data){
        state.cities = reformatObjectArray(data);
    },
    UPDATE_DATA_FOR_LOCAL(state, data){
        state.course = data;
    },
    UPDATE_SPINNER(state, data){
        state.active = data
    }
};
