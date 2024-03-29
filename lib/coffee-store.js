import { createApi } from 'unsplash-js';

    /** unsplash api accessKey pass */
    const unsplashApi = createApi({
        accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESSKEY
    })
    
    /** generate URI */
    function getCoffeeStoresFromFSQ(query, limit=10, ll='', appToken='') {
        return `${process.env.NEXT_PUBLIC_FORSQUAREPLACES_URI}?query=${query}&ll=${ll}&session_token=${appToken}&limit=${limit}`
    }

let query= 'coffee store', latLong = '19.380452591991578,-72.82874228525046', limit = 30, FSQData = '', coffeeStoreData=''

export const getCoffeeStores = async (query='') => {

   /**
    * unsplash api call
    */
    const unsplashRequest = await unsplashApi.search.getPhotos({
        query: 'coffee store',
        page: 1,
        perPage: 40,
        color:'black_and_white'
    })
    
    const unsplashImagesResponse = unsplashRequest.response.results

try {
    /**
     * Forsquare api call
     */
    let FSQAPIPayload = {
                            method: 'GET',
                            headers: {
                                        Accept: 'application/json',
                                        Authorization: process.env.NEXT_PUBLIC_FORSQUAREPLACES_APIKEY
                                    }
                        }
    FSQData = await fetch( getCoffeeStoresFromFSQ(query, limit),  FSQAPIPayload)
                    .then( res => res.json() )
                    .then( jsonRes => jsonRes )
                    .catch(error => console.log('promise failed FSQData Error: ' +error))
    
    if (FSQData.results.length) {
        coffeeStoreData = FSQData.results.map((obj, index) => {
            return {
                'fsq_id': obj.fsq_id,
                'categories': obj.categories,
                'name': obj.name,
                'location': obj.location,
                'unsplashImages': unsplashImagesResponse[index]
            }
        })
        coffeeStoreData.error='',
        coffeeStoreData.code=200,
        coffeeStoreData.message= 'Sucess'
    } else {
        coffeeStoreData = {
            data: '',
            error: 'no data found!',
            code: 404
        }
    }
        return coffeeStoreData
}
catch(error) {
    console.log('Error getCoffeStores: ', error);
}
    
}


