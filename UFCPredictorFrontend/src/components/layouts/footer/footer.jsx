import styles from "./footer.module.css"

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.text}>© {new Date().getFullYear()} prdct. Creative Commons License.</p>
            </div>
        </footer>
    )
}

export default Footer