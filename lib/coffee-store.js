import { createApi } from 'unsplash-js'

/**
 * show default ll -> 43.55189938044043,-109.93228922876075 // USA -> 10 records found!!!
 * else fetch from user's ll -> 19.115577115519436,72.86921364679485 // Andheri -> fetching more then 10 records!!!
 */
    let queryParams = {
        searchText: 'coffee store',
        latlong: '43.55189938044043,-109.93228922876075',//'19.115577115519436,72.86921364679485',
        limit: 30
    }
    let FSQData = '', coffeeStoreData=''

//--------------------- variables declared


    /** unsplash api accessKey pass */
    const unsplashApi = createApi({
        accessKey: process.env.UNSPLASH_ACCESSKEY
    })
  
    /** generate URI */
    export function getFSQURI({searchText, latlong, limit}) {
        console.log(`${process.env.FORSQUAREPLACES_URI}?query=${searchText}&ll=${latlong}&limit=${limit}`)
        return `${process.env.FORSQUAREPLACES_URI}?query=${searchText}&ll=${latlong}&limit=${limit}`
    }

    /**  [UNSPLASH API CALL]  function returns array of objects  */
    export async function callUnsplashImagesAPI () {
        const unsplashImagesRequest = await unsplashApi.search.getPhotos({
            query: 'coffee store',
            page: 1,
            perPage: 30,
            color:'black_and_white'
        })

        return unsplashImagesRequest.response.results
    }

    export async function callFSQAPI () {
        let FSQAPIPayload = {   
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: process.env.FORSQUAREPLACES_APIKEY
            }
        }
        let FSQapiData = await fetch(getFSQURI({...queryParams}), FSQAPIPayload)
        .then(res => res.json())
        .then(jsonRes => jsonRes)
        .catch(error => console.log('promise failed FSQData Error:' + error))
        return FSQapiData
    }




export const getCoffeeStores = async () => {

    const unsplashImagesResponse = await callUnsplashImagesAPI()
    .then(resp => resp)
    
    const FSQData = await callFSQAPI()
        .then(resp => resp)

        console.log({FSQData})

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


