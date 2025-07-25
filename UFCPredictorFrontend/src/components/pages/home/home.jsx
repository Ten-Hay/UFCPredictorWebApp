import styles from "./home.module.css"
import Navbar from "../../layouts/navbar/navbar"
import Landing from "./landing/landing"
import Footer from "../../layouts/footer/footer"
import Middle from "./middle/middle"
import Lines from "./lines/lines"
import About from "./about/about"

function Home() {

    return (
        <>
            <Navbar home="home"/>
            <Landing /> 
            <Middle />
            <Lines/>
            <About/>
            <Footer />
        </>
    )

}

export default Home