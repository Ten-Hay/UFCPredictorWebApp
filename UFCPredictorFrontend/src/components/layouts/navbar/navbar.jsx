import styles from "./navbar.module.css"
import { Link } from 'react-router-dom';

function Navbar(props) {

    return (

        <div className={styles.container}>
            <Link to="/"><div className={styles.logo}>prdct</div></Link>

            <div className={styles.items}>
                <div className={styles.red}>
                    <Link to="/"><div className={styles.item}>Home</div></Link>
                </div>
                {props.home === "home" ? 
                <div className={styles.white}>
                    <Link to="/predict"><div className={styles.item}>Predict</div></Link>
                </div>
                : 
                <div className={styles.white2}>
                    <Link to="/predict"><div className={styles.item}>Predict</div></Link>
                </div>
                }
                
            </div>
            <div className={styles.start}>Start</div>
        </div>

    )

}

export default Navbar