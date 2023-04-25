
const CoffeeStorePayloads = () => {
    
    let FSQueryParams = {
        searchText: 'coffee store',
        latlong: process.env.NEXT_PUBLIC_INIT_LATLONG,
        limit: 30
    },
    
    UnsplashQueryParams = {
        query: 'coffee store',
        page: 1,
        perPage: 30,
        color: 'black_and_white'
    }

    return {
            UnsplashQueryParams,
            FSQueryParams
        }
}
export default CoffeeStorePayloads