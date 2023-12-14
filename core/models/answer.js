import model from "~/core/base/model";
import filter from "~/core/models/filter";
import aliasApi from "~/core/helpers/aliasApi";

export default class extends model {
    name = "";
    sub_filters = [];

    constructor(data = {}){
        super();
        super.initializeParameters(data);
        this.setUpMySubfilters()
    }

    async delete(callback){
        if (super.isRegistred){
            await aliasApi.call('filters/DELETE_ANSWER', {
                id: this.id
            })
        }

        if (typeof callback === 'function') {
            callback(this?.id)
        }
    }

    get haveSubfilter(){
        return this.sub_filters.length > 0
    }

    get placeholder(){
        if(this.boolean_value === 1) return 'Yes';
        if(this.boolean_value === 0) return 'No';
        return '';
    }

    addSubfilter(params){
        if(this.sub_filters.length > 0) return false; 
        this.sub_filters.push(new filter(params));
    }

    async removeSubfilter(index = 0){
        const subfilter = this.sub_filters?.[index];
        if(!subfilter) return false;
        this.sub_filters.splice(index, 1);
        await subfilter.delete();
    }
    
    setUpMySubfilters(){
        if(!this?.sub_filters || this?.sub_filters.length === 0) return false;
        this.sub_filters = this.sub_filters.map(item => new filter(item))
    }
}