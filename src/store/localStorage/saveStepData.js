

export class StepData{

    static setStepData(data){
        return localStorage.setItem('stepData', JSON.stringify(data));
    }

    static getStepData(){
        try {
            return  JSON.parse(localStorage.getItem('stepData'));
        } catch (e){
            return {}
        }
    }

    static clearStepData(){
        return localStorage.clear();
    }
}
