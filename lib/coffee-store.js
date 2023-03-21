import { createApi } from 'unsplash-js'

    let FSQData = '', coffeeStoreData='';
    let searchText= 'coffee store',
        latlong= '19.382656374465594, 72.83193211801299',
        limit=  30
    

    /** unsplash api accessKey pass */
    const unsplashApi = createApi({
        accessKey: process.env.UNSPLASH_ACCESSKEY
    })
  
      /** generate URI */
    function getFSQURI() {
        return `${process.env.FORSQUAREPLACES_URI}?query=${searchText}&ll=${latlong}&limit=${limit}`
    }



export const getCoffeeStores = async () => {



        /**
        * unsplash api call
        */
        const unsplashRequest = await unsplashApi.search.getPhotos({
                                                                        query: 'coffee store',
                                                                        page: 1,
                                                                        perPage: 40,
                                                                        color:'black_and_white'
                                                                    })
        // const unsplashApiResponse = await unsplashApi.photos.get({ photoId: '', query: 'coffee' }, {
        //     headers: {
        //         Accept: 'application/json'
        //     }
        // })

        const unsplashImagesResponse = unsplashRequest.response.results // type returns array
        try {
                /**
                 * Forsquare api call
                 */
                let FSQAPIPayload = {   method: 'GET',
                                        headers: {
                                                    Accept: 'application/json',
                                                    Authorization: process.env.FORSQUAREPLACES_APIKEY
                                                }
                                    }
                FSQData = await fetch(
                                        getFSQURI(), 
                                        FSQAPIPayload
                                    )
                                .then( res => res.json() )
                                .then( jsonRes => jsonRes )
                                .catch(error => console.log('promise failed FSQData Error:' + error))


                
                
                // if (FSQData.results.length) {
                //     coffeeStoreData = FSQData.results.map((obj, index) => {
                //         return {
                //             'fsq_id': obj.fsq_id,
                //             'categories': obj.categories,
                //             'name': obj.name,
                //             'location': obj.location,
                //             'unsplashImages': unsplashImagesResponse[index]
                //         }
                //     })
                //     coffeeStoreData.error='',
                //     coffeeStoreData.code=200,
                //     coffeeStoreData.message= 'Sucess'
                // } else {
                //     coffeeStoreData = {
                //         data: '',
                //         error: 'no data found!',
                //         code: 404
                //     }
                // }

                // return coffeeStoreData

            }catch(error) {
                console.log('Error getCoffeStores: ', error);
            }
    
}


