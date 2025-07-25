import styles from "./lines.module.css"

function Lines(){

    return(
        <>
        <div className={styles.container}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
        </div>
        </>
    )

}

export default Lines