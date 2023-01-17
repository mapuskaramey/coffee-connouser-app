import { useRouter } from "next/router"
import coffeeStoreData from "../../data/coffee-stores.json"

import Card from '../../components/Card'

import cardStyle from '../../styles/card.module.css'


export async function getStaticPaths () {
   /* set dyanamic paths & remove manually updates */
   /** 
    * Note: fallback-false then any path not return by getStaticPath() will return 404 page
    * */ 

   const paths = coffeeStoreData.map(store => {
    return {
                params:  {
                            storeId: store.storeId 
                        }
            }
   })

    return {
        paths,
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
    // console.log(getStaticPaths.fallback);
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