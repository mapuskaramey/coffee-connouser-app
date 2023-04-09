import { useRouter } from "next/router";
import Card from "../../components/common/Card";
import { getCoffeeStores } from "../../lib/coffee-store.js"

import CardStyle from "../../styles/card.module.css"

import cls from "classnames"
import Rating from "../../components/Rating"
import CoffeeStorePayloads from '../../components/common/CoffeeStorePayloads'


const { FSQueryParams, UnsplashQueryParams } = CoffeeStorePayloads()

function redirectHome() {
    window.location.href = '/'
}

export async function getStaticPaths() {
    let coffeeStores = await getCoffeeStores(FSQueryParams, UnsplashQueryParams)
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
    let coffeeStores = await getCoffeeStores(FSQueryParams, UnsplashQueryParams)
    let box = coffeeStores.find(coffeestore => coffeestore.fsq_id == params.params.storeId)

    return {
        props: {
            coffeeStore: box
        }
    }
}

const storeId = ({ coffeeStore }) => {
    console.log({coffeeStore})
    const router = useRouter()
    return (
        <>
            <div className={cls(`${CardStyle.cardwrapper}`)}>
                <div
                    className={CardStyle.buttonwrapper}>
                    <button
                        onClick={redirectHome}
                        className={cls(CardStyle.btn, CardStyle.btnback, CardStyle.btnwhite, 'left')}>
                        Back
                    </button>
                </div>


                <div id={CardStyle.cardSingle}>
                    <Card
                        id={coffeeStore.fsq_id}
                        imgUrl={coffeeStore.unsplashImages}
                        name={coffeeStore.name}
                        key={coffeeStore.fsq_id}
                        location={coffeeStore.location}
                    />
                </div>
                <div className={cls(CardStyle.cardglassBox, CardStyle.cardglass)}>
                    <div className={cls(CardStyle.cardglass, CardStyle.h100, CardStyle.margin2)}>
                        <Rating
                            location={coffeeStore.location}
                            likes={coffeeStore.unsplashImages.likes}></Rating>
                        <button className={CardStyle.buttonVote}>submit my choice!</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default storeId