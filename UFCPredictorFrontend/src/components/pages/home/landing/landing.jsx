import styles from "./landing.module.css"
import knockout from "../../../../assets/knock.png"

function Landing() {

    return (
        <>
            <div className={styles.container}>

                <div className={styles.left}>
                </div>

                <div className={styles.right}></div>
                <div className={styles.image}>
                    <img src={knockout} alt="" className={styles.knockout} />
                </div>
                <div className={styles.topText}>
                    <div className={styles.see}>
                        SEE
                    </div>
                    <div className={styles.the}>
                        THE
                    </div>
                </div>
                <div className={styles.bottomText}>
                    <div className={styles.fut}>
                        FUT
                    </div>
                    <div className={styles.ure}>
                        URE
                    </div>
                </div>
            </div>
        </>
    )

}

export default Landing