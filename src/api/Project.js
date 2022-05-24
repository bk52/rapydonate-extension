import { API_URLS, api } from './API_ROOT';

export const GetProject = async (siteUrl) => {
    try {
        const res = await api.post(API_URLS.COUNTRIES, { siteUrl });
        return res?.data?.project
    }
    catch (e) {
        console.error(e)
    }
}