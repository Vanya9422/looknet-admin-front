import aliasApi from "~/core/helpers/aliasApi";
import model from "~/core/base/model";
import answer from "~/core/models/answer";
import filterHelper from "~/core/helpers/filterHelper";

export default class extends model {

    /*
    ** Фильтр имеет несколько типов [type] (от 1 до 4)
    ** type = 0: (по умолчанию) Главный фильтр, может хранить подфильтры
    ** type = 1: Подфильтр
    ** type = 2: Это фильтр со значениями true/false
    ** type = 3: Фильтр с возможностью ручного ввода значений
    **/

    answers = [];
    name = "";
    type = 0;
    sub_filter_names = '';

    constructor(data){
        super();
        super.initializeParameters(data);
        this.setUpMyAnswers()
        this.manageEmptyAnswers()

        // if(this.isMainFilter) this.sub_filter_names = []
    }

    get isAnswersAccept(){
        return this.type !== 2 && this.type !== 3
    }

    get haveSubfilter(){
        const list = this.answers.filter(instance => instance.haveSubfilter === true)
        return list.length > 0
    }

    get isMainFilter(){
        return this.type === 0 && !this?.answer_id
    }

    get hierarchyLevel(){
        if(!this.isMainFilter || !this?.answers) return 0;

        const hierarchyLevels = filterHelper.getFilterNestedLevels(this?.answers);
        if(!hierarchyLevels?.length) return 0;
        const maxLevel = Math.max( ...hierarchyLevels )
        return maxLevel;
    }

    set nested ({value, number}){
        const protect = this.sub_filter_names ? this.sub_filter_names : '{}';
        const now = JSON.parse(protect);
        now[number] = value;

        this.sub_filter_names = JSON.stringify(now)
    }
    get nested(){
        const protect = this.sub_filter_names ? this.sub_filter_names : '{}';
        return JSON.parse(protect)
    }

    async getAnswers(){
        if (!super.isRegistred) return false;

        await aliasApi.call('filters/GET_ANSWERS', {
            filter: this.id
        })
    }

    addAnswer(params){
        this.answers.push(new answer(params));
    }

    async removeAnswer(index){
        const answer = this.answers[index];
        this.answers.splice(index, 1);
        await answer.delete();
    }

    async delete(callback){
        if (super.isRegistred){
            await aliasApi.call('filters/DELETE_FILTER', {
                slug: this.slug
            })
        }

        if (typeof callback === 'function') {
            callback(this?.id)
        }
    }

    manageEmptyAnswers(){
        if(this.answers.length > 0) return false;

        if(this.type !== 2 && this.type !== 3){
            this.addAnswer();  return false;
        }

        const answersList = [
            {
                "name": "Yes",
                "boolean_value": 1,
                "order": 1
            },
            {
                "name": "No",
                "boolean_value": 0,
                "order": 2
            },
        ]

        answersList.forEach(params => {
            this.addAnswer(params);
        });
    }

    setUpMyAnswers(){
        if(!this?.answers || !this?.answers.length) return false;
        this.answers = this.answers.map(item => new answer(item))
    }
}
