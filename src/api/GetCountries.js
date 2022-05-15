import axios from 'axios'

const GetCountries = async () => {
    try {
        const res = await axios.get(`http://localhost:9600/api/countries`, {
            headers: {
                'apikey': 'ZM86vZa8Vl'
            }
        });
        const countries = res?.data?.data;
        return countries;
    }
    catch (e) {
        console.error(e)
    }
}

export default GetCountries;