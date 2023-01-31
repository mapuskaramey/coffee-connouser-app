import { createApi } from 'unsplash-js';

    /** unsplash api accessKey pass */
    const unsplashApi = createApi({
        accessKey: process.env.UNSPLASH_ACCESSKEY
    })
    
    /** template */
    function getCoffeeStoreFromFSQ(query, limit=10, ll='', appToken='') {
        return `${process.env.FORSQUAREPLACES_URI}?query=${query}&ll=${ll}&session_token=${appToken}&limit=${limit}`
    }


export const getCoffeeStores = async () => {

   /**
    * unsplash api call
    * Below we can use commented method as well... but in here I have implemented GET method by reading docs.
    */

   // 1. method ----
    const unsplashRequest = await unsplashApi.search.getPhotos({
        query: 'coffee store',
        page: 1,
        perPage: 40,
        color:'black_and_white'
    })

    // 2. method ----
    // const unsplashApiResponse = await unsplashApi.photos.get({ photoId: '', query: 'coffee' }, {
    //     headers: {
    //         Accept: 'application/json'
    //     }
    // })

    const unsplashImagesResponse = unsplashRequest.response.results // Array type returns

    let query= 'coffee store', latLong = '19.380452591991578,-72.82874228525046', limit = 30, FSQData = '', coffeeStoreData=''
    try {
        /**
         * Forsquare api call
         */
        let FSQAPIPayloads = {
            method: 'GET',
            headers: {
                        Accept: 'application/json',
                        Authorization: process.env.FORSQUAREPLACES_APIKEY
                    }
        }

        FSQData = await fetch(
            getCoffeeStoreFromFSQ(query, limit), 
            FSQAPIPayloads
        )
        .then( res => res.json() )
        .then( jsonRes => jsonRes )
        .catch(error => console.log('promise failed FSQData Error:' + error))
        
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
        }
            return coffeeStoreData
        }
        catch(error) {
            console.log('Error getCoffeStores: ', error);
        }
    
}


