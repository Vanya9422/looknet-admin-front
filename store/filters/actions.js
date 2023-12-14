import { serialize } from 'object-to-formdata';

export default {
    async GET_FILTERS({}, {category}){
        const list = await this.$axios.$get(`/admin/filters?page=1&search=category_id:${category}&with=answers&orderBy=order&sortedBy=asc`);
        
        return list;
    },
    async GET_ANSWERS({}, {filter}){
        const list = await this.$axios.$get(`/filters/answers?search=filter_id:${filter}`);
        return list;
    },
    async UPDATE_FILTERS({}, {list}){
        const serializedList = serialize(list)
        const request = await this.$axios.$put(`/admin/filters`, list);
        return request;
    },
    async DELETE_FILTER({}, {slug}){
        const request = await this.$axios.$delete(`/admin/filters/${slug}`);
        return request;
    },
    async DELETE_ANSWER({}, {id}){
        const request = await this.$axios.$delete(`/admin/filters/answers/${id}`);
        return request;
    },
}