import {CoursesApi} from "../../api/courses-api";
import {Country} from "../../api/country-api";
import {reformatObjectArray} from "../../helper/reformatObjectArray";

export const actions = {

    GET_COURSES_WITH_SERVER({commit}) {
        CoursesApi.getCourses()
            .then(res => {
                commit('SET_COURSES_WITH_SERVER', res.body);
                commit('UPDATE_SPINNER', false)
            })
    },

    GET_COURSE_WITH_SERVER({commit}, id) {
       return CoursesApi.getOneCourse(id)
            .then(res => {
                commit('SET_COURSE_WITH_SERVER', res.body);
                commit('UPDATE_SPINNER', false)
                return res.body;
            })
    },

    GET_COUNTRIES_WITH_SERVER({commit, dispatch}, name) {
        Country.getCountries()
            .then(res => {
                if (res.body.error) return;
                commit('SET_COUNTRIES_WITH_SERVER', res.body);
                const data = name ? reformatObjectArray(res.body).find(item => item.name == name) : null;
                dispatch('GET_CITIES_WITH_SERVER', data && data.id ?  data.id : res.body[0].id)
            })
    },

    GET_CITIES_WITH_SERVER({commit}, code) {
        commit('SET_CITIES_WITH_SERVER', []);
        Country.getCountry(code)
            .then(res => {
                commit('SET_CITIES_WITH_SERVER', res.body);
                commit('UPDATE_SPINNER', false);
            })
    },

    UPDATE_DATA_FOR_SERVER({dispatch}, item) {
        CoursesApi.updateCourse(item.id, item.value)
            .then(() => dispatch('GET_COURSE_WITH_SERVER', item.id))
    },

    CREATE_DATA_FOR_SERVER({commit}, item) {
        commit('UPDATE_SPINNER', true);
        return CoursesApi.createCourse(item)
            .then((item) => item.body.id)
    }

};

