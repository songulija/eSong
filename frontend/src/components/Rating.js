import React from 'react'

// creating Rating component as function
//creating 5 spin elements. they will have starts depending
//on rating
function Rating(props) {
    return (//if props.value is 1 then show full star, if 0.5 show half star else show 0 star
        <div className='rating'>
            <span>
                <i className={props.value >= 1 ? 'fas fa-star' : props.value >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i className={props.value >= 2 ? 'fas fa-star' : props.value >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i className={props.value >= 3 ? 'fas fa-star' : props.value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i className={props.value >= 4 ? 'fas fa-star' : props.value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i className={props.value >= 5 ? 'fas fa-star' : props.value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>{props.text && props.text}</span>
        </div>
    )
}

export default Rating
