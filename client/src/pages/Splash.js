import React, { useEffect, useState } from 'react'
import API from "../utils/API";
import Start from './components/Start'
import { MathIntro } from './components/Preambles'
import { useQuestContext } from '../utils/Context'

function Splash() {
    //const [subject, setSubject] = useState([])
    //const [NoQuest, setNoQuest] = useState()
    const [state, dispatch] = useQuestContext()
    // Load all quiz questions (id'd by subject state) and store the questions in setSubject
    useEffect( () => { loadQuestions() } )

    // Loads questions from database
    function loadQuestions() {
        API.getQuestions().then(res => setSubject(res.data))
        .catch(err => console.log(err))
    }

    return (
        //Dropdown form for quiz subject *ICEBOX
        //Dropdown form for number of questions
        <div className="container">
            <MathIntro></MathIntro>
           <form id="noQuest" style="--animation-order: 5" type="submit">
               <h3>Number of Questions: </h3>
            <input placeholder="1-100" id="QNo"/>
          </form>
        
        <Start
            disabled={!(subject && NoQuest)}
            onClick={() => {}}
        > start <Start/></div>
    )
}