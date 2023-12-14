import instances from "~/core/helpers/instances";
import aliasApi from "~/core/helpers/aliasApi";
import filter from "~/core/models/filter";
import controller from "~/core/base/controller";

export default class extends controller {

    constructor(data){
        super(data);
    }

    async init(params = {})
    {
        const mergeParams = {
            category: this.category,
            ...params
        }
        const request = await aliasApi.call('filters/GET_FILTERS', mergeParams)
        this.build(request)
    }

    async save(){
        const difference = super.getDifference();

        if(!difference || !difference.length){
            return false;
        }

        try {
            const request = await aliasApi.call('filters/UPDATE_FILTERS', {
                list: difference
            })
        } catch (error) {
            console.error('filters not saved')
            // const raw = super.getRaw()
            // console.log('возникла ошибка', {
            //     error: error,
            //     difference: difference,
            //     raw: raw,
            //     initial: this.initialState
            // })
        }

        // this.clearInstances()
        await this.init()
    }

    async removeFilter(index){
        const filter = this.instances[index];
        this.instances.splice(index, 1);
        await filter.delete();
    }

    build(request){
        // this.raw = [];
        // this.instances = [];

        this.setUpInstances(request?.data)
        this.setUpInitial(request?.data)
        this.meta = request?.meta;
    }

    addFilter(initial){
        this.instances.push(new filter(initial))
    }

    clearInstances(){
        this.instances.splice(0);
    }

    setUpInstances(list = [])
    {
        const result = (list || []);
        this.instances = result
            .map(item => {
                if (item.answer_id) return false;
                return new filter(item)
            })
            .filter(item => item)
    }
}
