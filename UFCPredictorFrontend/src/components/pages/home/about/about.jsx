import styles from "./about.module.css"
import alex from "../../../../assets/alex.jpeg"

function About() {

    return (
        <>

            <div className={styles.container}>
                <div className={styles.image}>
                    <img src={alex} className={styles.alex}/>
                </div>
                <div className={styles.text}>
                    <div className={styles.top}>
                        <div className={styles.highlight}></div>
                        <div className={styles.title}>
                            How is the model able to predict fights?
                        </div>
                    </div>
                    <div className={styles.content}>
                        To forecast the results of UFC bouts, this model makes use of TensorFlow and
                        free public datasets on Kaggle. The program gains the ability to recognize patterns linked
                        to succesful fighters by examining fighter statistics including wins, losses, significant striker predict
                        miniute, reach, stance, age and many more. This project shows how easily accesible tools and data
                        can be apply machine learning to real-world sports analytics.
                    </div>
                </div>
            </div>

        </>
    )

}

export default About