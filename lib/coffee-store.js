import { createApi } from 'unsplash-js'

/** unsplash api accessKey pass */
const unsplashApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESSKEY
})

/** generate URI */
export function getFSQURI(queryParams) {
    const { searchText, latlong, limit } = queryParams
    return `${process.env.NEXT_PUBLIC_FORSQUAREPLACES_URI}?query=${searchText}&ll=${latlong}&limit=${limit}`
}

/**  [UNSPLASH API CALL]  function returns array of objects  `https://api.unsplash.com/search/photos?` */
export async function callUnsplashAPI(queryParams) {
    // const { query, page, perPage, color } = queryParams
    const unsplashImagesRequest = await unsplashApi.search.getPhotos({ ...queryParams })
    return unsplashImagesRequest.response.results
}

/**  [FORSQUARE API CALL]  function returns array of objects  */
export async function callFSQAPI(queryParams) {
    let payloads = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_FORSQUAREPLACES_APIKEY
        }
    }
    let FSQapiData = await fetch(getFSQURI({ ...queryParams }), payloads)
        .then(res => res.json())
        .then(jsonRes => jsonRes)
        .catch(error => console.log('promise failed FSQData Error:' + error))
    return FSQapiData
}

export const getCoffeeStores = async (FSQueryParams, UnsplashQueryParams) => {
    let coffeeStoreData = ''
    // if (Object.keys(FSQueryParams).length <= 0 && Object.keys(UnsplashQueryParams).length <= 0) {
    //     console.log(`Error: you cann't pass empty argument to function!!! `)
    //     return false
    // }

    const unsplashImagesResponse = await callUnsplashAPI(UnsplashQueryParams)
        .then(resp => resp)

    const FSQDataResponse = await callFSQAPI(FSQueryParams)
        .then(resp => resp)

    if (FSQDataResponse.results.length) {
        coffeeStoreData = FSQDataResponse.results.map((obj, index) => {
            return {
                'fsq_id': obj.fsq_id,
                'categories': obj.categories,
                'name': obj.name,
                'location': obj.location,
                'unsplashImages': unsplashImagesResponse[index]
            }
        })
        coffeeStoreData.error = '',
            coffeeStoreData.code = 200,
            coffeeStoreData.message = 'Success'
    } else {
        coffeeStoreData = {
            data: '',
            error: 'no data found!',
            code: 404
        }
    }

    return coffeeStoreData
}


