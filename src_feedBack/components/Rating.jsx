import React, { useState } from 'react';
import styles from './Rating.module.css';
import star from '../assets/icon-star.svg';
import result from '../assets/illustration-thank-you.svg';

export default function Rating() {
    const [rate, setRate] = useState();
    const [submmited, setSubmmited] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmmited(rate);
    }

    return (!submmited ?
        <>
            <form onSubmit={handleSubmit} className={styles.panel}>
                <img src={star} className={styles.star} alt="rate" />
                <h1 className={styles.header}>How did we do?</h1>
                <p className={styles.title}>
                    Please let us know how we did with your support request.
                    All feedback is appreciated to help us improve our offering!
                </p>
                <div className={styles.group}>
                    {
                        [1, 2, 3, 4, 5].map((item, key) =>
                            <button
                                type='button'
                                key={key}
                                className={styles.rating}
                                onClick={() => setRate(item)}
                            >{item}</button>
                        )
                    }
                </div>

                <button
                    type='submit'
                    disabled={rate === undefined}
                    className={styles.submit}
                >Submit
                </button>
            </form>
        </>
        :
        <>
            <div className={styles.thxPanel}>
                <img src={result} alt="thx" />
                <p className={styles.result}>
                    You rated {rate} out of 5 star
                </p>
                <h1 className={styles.header}>Thank you!</h1>
                <p className={styles.title}>
                We appreciate you taking the time to give a rating. 
                If you ever need more support, don't hesitate to get in touch!
                </p>
            </div>
        </>
    )
}
