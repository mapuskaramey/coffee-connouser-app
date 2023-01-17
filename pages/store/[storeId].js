import { useRouter } from "next/router"
import coffeeStoreData from "../../data/coffee-stores.json"

import Card from '../../components/Card'

import cardStyle from '../../styles/card.module.css'


export async function getStaticPaths () {
   /* set dyanamic paths & remove manually updates */
    return {
                paths: [
                            {params: {storeId: '0'} },
                            {params: {storeId: '1'} },
                            {params: {storeId: '300'} }
                        ],
                fallback: false
            }
}


export function getStaticProps (coffeeStore) {
    let parmId = coffeeStore.params.storeId
    return {
                props: {
                        coffeeStore: coffeeStoreData.find(store  => {
                            return store.storeId == parmId
                        })
                    }
            }
}

export default function storeId ({coffeeStore}) {
    return (
                <>
                    <a href="http://localhost:3000/"> 
                        <button className="return-btn">Return to Home </button>
                    </a>
                    <br />
                    <div id={cardStyle.cardSingle}>
                        <Card
                        name={coffeeStore.name}
                        id={coffeeStore.storeId}
                        imgUrl={coffeeStore.imgUrl}/>
                    </div>
                </>
            )
}