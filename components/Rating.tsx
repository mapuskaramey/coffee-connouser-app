import StarModule from "../styles/star.module.css"

const Rating = ({location, likes }) => {
    const { address, country } = location

    return (
        <>
            <address>
                <p>Address: {address}</p>
                <p>Location: {country}</p>
            </address>
            
            <p>Rating in avarage: <strong>5 / 10</strong></p>
            
            <p>likes: <span className="material-symbols-outlined"> favorite </span> {likes}</p>
            
            <p className={StarModule.rate}>
                <input type="radio" id="star5" name="rate" value="5" />
                <label htmlFor="star5" title="5 star">5 stars</label>
                <input type="radio" id="star4" name="rate" value="4" />
                <label htmlFor="star4" title="4 star">4 stars</label>
                <input type="radio" id="star3" name="rate" value="3" />
                <label htmlFor="star3" title="3 star">3 stars</label>
                <input type="radio" id="star2" name="rate" value="2" />
                <label htmlFor="star2" title="2 star">2 stars</label>
                <input type="radio" id="star1" name="rate" value="1" />
                <label htmlFor="star1" title="1 star">1 star</label>
            </p>
        </>
    )
}

export default Rating