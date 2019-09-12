import Vue from 'vue';
const coursesUrl='https://5d5e40fef30df20014d420c8.mockapi.io/api/v1/';

export class CoursesApi{

    static getCourses(){
        return Vue.http.get(`${coursesUrl}course`)
    }

    static getOneCourse(id){
        return Vue.http.get(`${coursesUrl}course/${id}`)
    }

    static updateCourse(id, data){
        return Vue.http.put(`${coursesUrl}course/${id}`, data)
    }

    static createCourse(data){
        return Vue.http.post(`${coursesUrl}course`, data)
    }

}
