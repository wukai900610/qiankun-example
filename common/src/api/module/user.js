import axios from "../../fetch";

export default {
    findingSemester(params = {},config = {}){
        return axios.instance({
            url: '/api/examination/exam/findingSemester',
            method: 'get',
            params,
            config
        });
    },
    marking(data = {},config = {}){
        return axios.instance({
            url: '/api/examination/exam/marking',
            method: 'post',
            data,
            config
        });
    }
}