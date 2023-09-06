import axios from 'axios';

export const getAds = (id = null) => {
    if (id) {
        return axios(`/api/ads/${id}`)
    }

    return axios('/api/ads');
}

export const getAdsByPage = (page) => {
    return axios(`/api/ads?page=${page}`);
}

export const updateAd = (params) => {
    return axios({
        method: 'PUT',
        url: `/api/ads/${params['id']}`,
        data: {
            title: params['title'],
            description: params['description'],
            url: params['url'],
        }
    })
}

export const createAd = (params) => {
    return axios({
        method: 'POST',
        url: `/api/ads`,
        data: {
            title: params['title'],
            description: params['description'],
            url: params['url'],
        }
    })
}

export const deleteAd = (id) => {
    return axios({
        method: 'DELETE',
        url: `/api/ads/${id}`,
    })
}
