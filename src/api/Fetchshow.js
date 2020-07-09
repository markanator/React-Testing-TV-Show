import axios from 'axios';

export const fetchShow = async() => {
    return axios
        .get("https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes")
        .then(res => {
            console.log(res);
            return res.data;
        })
        .catch(err => {
            console.error("error fetching data from api, err: ", err.message);
        });
};