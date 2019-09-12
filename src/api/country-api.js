import Vue from 'vue';

export class Country{

    static getCountries(){
        return Vue.http.get('http://htmlweb.ru/geo/api.php?location&json')
    }

    static getCountry(code){
        return Vue.http.get(`http://htmlweb.ru/geo/api.php?country=${code}&json&perpage=300&limit=3000`)
    }

}
