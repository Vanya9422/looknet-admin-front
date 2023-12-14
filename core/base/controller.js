import aliasApi from "~/core/helpers/aliasApi";
import {differenceWith, isEqual} from 'lodash'

export default class {
    instances = [];
    initialState = []

    constructor(data){
        this.instances = data?.instances || [];
        this.meta = null;

        if(data?.props) Object.assign(this, data?.props);
        if(data?.api) aliasApi.add(data?.api)
    }

    getRaw(){
        return this.instances.map(item => {
            return JSON.parse(JSON.stringify(item))
        })
    }
    
    getDifference(){
        const rawData = this.getRaw();
        return differenceWith(
            rawData, this.initialState, isEqual
        )
    }

    setUpInitial(params){
        this.initialState = JSON.parse(JSON.stringify(params))
    }

    destroy(){
        this.instances = [];
        return null;
    }
}