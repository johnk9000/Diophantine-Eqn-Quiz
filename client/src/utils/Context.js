import React, { createContext, useReducer, useContext} from 'react'

// Writing out the logic for the splash screen
const QuestContext = createContext()
const { Provider } = QuestContext

const reducer = (state, action) => {
    switch(action.type) {
        case 5:
            return { amount: 5 }
        case 10:
            return { amount: 10 }
        case  25:
            return { amount: 25}
        case 50: 
            return { amount: 50 }
        default:
            throw new Error(`invalid action type: ${action.type}`)
    }
}

const QuestProvider = ({value = 5, ...props}) => {
    const [state, dispatch] = useReducer(reducer, { amount: value })

    return <Provider value={[state, dispatch]} {...props} />
}

const useQuestContext = () => {
    return useContext(QuestionContext)
}

export { QuestProvider, useQuestContext }