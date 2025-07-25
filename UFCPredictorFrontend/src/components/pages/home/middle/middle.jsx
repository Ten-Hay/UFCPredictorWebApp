import styles from "./middle.module.css"
import champ from "../../../../assets/champ.jpeg"
import { Link } from "react-router"

function Middle() {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.title}>Predict Fight Results Using Machine Learning</div>
                    <Link to="/predict"><div className={styles.button}>PREDICT NOW</div></Link>
                </div>
                <div className={styles.right}>

                    <div className={styles.square1}>
                        <div className={styles.square2}>
                            <div className={styles.square3}>
                                <div className={styles.square4}>
                                    <div className={styles.square5}>
                                        <div className={styles.square6}>
                                            <img src={champ} className={styles.champ}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )

}

export default Middle