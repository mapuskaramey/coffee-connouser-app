import { useRouter } from "next/router";
import Card from "../../components/Card";
import { getCoffeeStores } from "../../lib/coffee-store.js"

import CardStyle from "../../styles/card.module.css"

import cls from "classnames"

function redirectHome() {
    window.location.href = '/'
}

export async function getStaticPaths() {
    let coffeeStores = await getCoffeeStores()
    let paths = coffeeStores.map(store => {
        return {
                params: { storeId: `${store.fsq_id}` }
            }
    })

    return {
        paths,
        fallback: false
    }
}


export async function getStaticProps(params) {
    let coffeeStores = await getCoffeeStores()
    let box = coffeeStores.find(coffeestore => coffeestore.fsq_id == params.params.storeId)

    return {
        props: {
            coffeeStore: box
        }
    }
}


const storeId = ({coffeeStore}) => {
    const router = useRouter()
    return (
        <>
            <div className={cls(`${CardStyle.cardwrapper}`)}>
                <button
                onClick={redirectHome}
                className={cls(CardStyle.btn, CardStyle.btnback, CardStyle.btnwhite)}> 
                Back
                </button>
                <div id={CardStyle.cardSingle}>
                    <Card 
                    id={coffeeStore.fsq_id}
                    imgUrl={coffeeStore.unsplashImages}
                    name={coffeeStore.name}
                    key={coffeeStore.fsq_id}
                    location={coffeeStore.location}
                />
            </div>
           </div>
        </>
    )
}


export default storeId