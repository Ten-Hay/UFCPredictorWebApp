import Navbar from "../../layouts/navbar/navbar"
import styles from "./predict.module.css"
import { useState, useEffect } from 'react'
import Papa from 'papaparse'

function Predict() {

    const [section, setSection] = useState(0)
    const [fighterOne, setFighterOne] = useState('')
    const [fighterTwo, setFighterTwo] = useState('')


    const [fighterList, setFighterList] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [filteredFighters, setFilteredFighters] = useState([])

    const [winner, setWinner] = useState("Waiting...")

    const checkWinner = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/winner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    red: fighterOne,
                    blue: fighterTwo
                })
            })
            const data = await response.json()
            setWinner(data.winner)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleInputChange = (e, num) => {
        const value = e.target.value
        num === 1 ? setFighterOne(value) : setFighterTwo(value)


        const filtered = fighterList.filter(fighter =>
            fighter.name?.toLowerCase().includes(value.toLowerCase())
        )
        setFilteredFighters(filtered)
        setShowDropdown(value.length > 0)
    }

    const handleFighterSelect = (fighterName, num) => {
        { num === 1 ? setFighterOne(fighterName) : setFighterTwo(fighterName) }
        setShowDropdown(false)
    }

    const getFighterAge = (fighterName) => {
        const fighter = fighterList.find(f => f.name === fighterName)
        return fighter ? fighter.age : null
    }

    const getFighterHeight = (fighterName) => {
        const fighter = fighterList.find(f => f.name === fighterName)
        return fighter ? fighter.height : null
    }

    const getFighterWins = (fighterName) => {
        const fighter = fighterList.find(f => f.name === fighterName)
        return fighter ? fighter.wins : null
    }

    const getFighterLosses = (fighterName) => {
        const fighter = fighterList.find(f => f.name === fighterName)
        return fighter ? fighter.losses : null
    }

    useEffect(() => {
        fetch('/fighter_stats.csv')
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setFighterList(results.data)
                    }
                });
            })
            .catch(error => console.error('Error loading CSV:', error))
    }, [])


    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.wrapper}>


                    <div className={styles.progress}>

                        <div className={styles.item}>
                            <div className={section > 0 ? styles.dotFill : styles.dotEmpty}></div>
                            <div className={styles.title}>Red Fighter</div>
                        </div>

                        <div className={section > 0 ? styles.dashFill : styles.dashEmpty}></div>

                        <div className={styles.item}>
                            <div className={section > 1 ? styles.dotFill : section > 0 ? styles.dotEmpty : styles.dotDisabled}></div>
                            <div className={section > 0 ? styles.titleActive : styles.titleDisabled}>Blue Fighter</div>
                        </div>

                        <div className={section > 1 ? styles.dashFill : styles.dashEmpty}></div>

                        <div className={styles.item}>
                            <div className={section > 2 ? styles.dotFill : section > 1 ? styles.dotEmpty : styles.dotDisabled}></div>
                            <div className={section > 1 ? styles.titleActive : styles.titleDisabled}>Submit</div>
                        </div>

                    </div>

                    <form action="" className={styles.form}>
                        {section === 0 ?
                            <>
                                < div className={styles.input}>
                                    <div className={styles.label}>Enter Fighter One: </div>
                                    <div className={styles.options}>
                                        <input type="text" placeholder="e.g. Jon Jones, Conor McGregor, etc..."
                                            value={fighterOne}
                                            onChange={(e) => handleInputChange(e, 1)}
                                            onFocus={() => setShowDropdown(fighterOne.length > 0)}
                                            className={styles.enter} />
                                        {showDropdown ?
                                            <div className={styles.dropdown}>
                                                {filteredFighters.slice(0, 5).map((fighter, index) => (
                                                    <div
                                                        key={index}
                                                        className={styles.dropdownItem}
                                                        onClick={() => handleFighterSelect(fighter.name, 1)}
                                                    >
                                                        {fighter.name}
                                                    </div>
                                                ))}
                                            </div>
                                            : ""}

                                    </div>

                                </div>



                                <div className={styles.content}>
                                    <div className={styles.contentLabel}>
                                        Current Selected Fighter: {fighterOne}
                                    </div>

                                    <div className={styles.contentLabel}>
                                        Age: {getFighterAge(fighterOne)} yrs
                                    </div>

                                    <div className={styles.contentLabel}>
                                        Height: {getFighterHeight(fighterOne)} cm
                                    </div>

                                    <div className={styles.contentLabel}>
                                        Win Loss Ratio: W {getFighterWins(fighterOne)} - L {getFighterLosses(fighterOne)}
                                    </div>

                                </div>

                            </>
                            :
                            ""
                        }

                        {section === 1 ?
                            <>
                                < div className={styles.input}>
                                    <div className={styles.label}>Enter Fighter Two: </div>
                                    <div className={styles.options}>
                                        <input type="text" placeholder="e.g. Jon Jones, Conor McGregor, etc..."
                                            value={fighterTwo}
                                            onChange={(e) => handleInputChange(e, 2)}
                                            onFocus={() => setShowDropdown(fighterTwo.length > 0)}
                                            className={styles.enter} />
                                        {showDropdown ?
                                            <div className={styles.dropdown}>
                                                {filteredFighters.slice(0, 5).map((fighter, index) => (
                                                    <div
                                                        key={index}
                                                        className={styles.dropdownItem}
                                                        onClick={() => handleFighterSelect(fighter.name, 2)}
                                                    >
                                                        {fighter.name}
                                                    </div>
                                                ))}
                                            </div>
                                            : ""}

                                    </div>

                                </div>



                                <div className={styles.content}>
                                    <div className={styles.contentLabel}>
                                        Current Selected Fighter: {fighterTwo}
                                    </div>

                                    <div className={styles.contentLabel}>
                                        Age: {getFighterAge(fighterTwo)} yrs
                                    </div>

                                    <div className={styles.contentLabel}>
                                        Height: {getFighterHeight(fighterTwo)} cm
                                    </div>

                                    <div className={styles.contentLabel}>
                                        Win Loss Ratio: W {getFighterWins(fighterTwo)} - L {getFighterLosses(fighterTwo)}
                                    </div>

                                </div>

                            </>
                            :
                            ""
                        }

                        {section === 2 ?
                            <>
                                <div className={styles.vsTitle}>Predict Matchup</div>
                                <div className={styles.versus}>
                                    <div className={styles.one}>
                                        <div className={styles.vsItem}>
                                            {fighterOne}
                                        </div>
                                        <div className={styles.vsItem}>
                                            Age: {getFighterAge(fighterOne)} yrs
                                        </div>
                                        <div className={styles.vsItem}>
                                            Height: {getFighterHeight(fighterOne)} cm
                                        </div>
                                        <div className={styles.vsItem}>
                                            Win Loss Ratio: W {getFighterWins(fighterOne)} - L {getFighterLosses(fighterOne)}
                                        </div>
                                    </div>
                                    <div className={styles.vs}>VS</div>
                                    <div className={styles.two}>
                                        <div className={styles.vsItem}>
                                            {fighterTwo}
                                        </div>
                                        <div className={styles.vsItem}>
                                            Age: {getFighterAge(fighterTwo)} yrs
                                        </div>
                                        <div className={styles.vsItem}>
                                            Height: {getFighterHeight(fighterTwo)} cm
                                        </div>
                                        <div className={styles.vsItem}>
                                            Win Loss Ratio: W {getFighterWins(fighterTwo)} - L {getFighterLosses(fighterTwo)}
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            ""
                        }

                        {section === 3 ?
                            <>
                                <div className={styles.vsTitle}>The Winner Of:</div>
                                <div className={styles.versus}>
                                    <div className={styles.one}>
                                        <div className={styles.vsItem}>
                                            {fighterOne}
                                        </div>
                                    </div>
                                    <div className={styles.vs}>
                                        VS
                                    </div>
                                    <div className={styles.two}>
                                        <div className={styles.vsItem}>
                                            {fighterTwo}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.winnerReveal}>
                                    <div className={styles.winner}>
                                        {winner}
                                    </div>
                                </div>
                            </>
                            :
                            ""
                        }

                        <div className={styles.buttonWrapper}>
                            {section > 0 && section < 3 ?
                                <button type="button" onClick={() => setSection(section - 1)} className={styles.back}>
                                    ‹‹ Back
                                </button>
                                :
                                <div></div>
                            }

                            {section < 2 ?
                                <button type="button" onClick={() => {
                                    setSection(section + 1)
                                    checkWinner()
                                }} className={styles.next}>
                                    Next ››
                                </button>
                                :
                                ""
                            }

                            {section === 2 ?
                                <button type="button" onClick={() => setSection(section + 1)} className={styles.next}>
                                    Submit
                                </button>
                                :
                                ""
                            }

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Predict