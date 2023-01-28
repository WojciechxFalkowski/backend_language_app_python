import { View, Text, StyleSheet } from 'react-native'
import * as React from 'react'
import { Button } from './../../Button'

export const ChooseCorrect = ({ activeQuestion, answerModel, nextQuestion, setPointsValue }) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [isDisabled, setIsDisabled] = React.useState(false)
    const [trueButtonStyles, setTrueButtonStyles] = React.useState()
    const [trueTextStyles, setTrueTextStyles] = React.useState()
    const [falseButtonStyles, setFalseButtonStyles] = React.useState()
    const [falseTextStyles, setFalseTextStyles] = React.useState()

    const showNextQuestion = () => {
        nextQuestion()
    }

    const resetActionStates = () => {
        setIsDisabled(false)

        setTrueButtonStyles(null)
        setTrueTextStyles(null)
        setFalseButtonStyles(null)
        setFalseTextStyles(null)
    }

    const checkAnswer = (playerChosenValue) => {
        // setIsLoading(true)
        setIsDisabled(true)

        const isAnswerCorrect = activeQuestion.question === answerModel.question
        const isPlayerCorrect = isAnswerCorrect === playerChosenValue

        // setTimeout(() => {
        if (isPlayerCorrect) {
            if (playerChosenValue) {
                setPositiveButtonStyles(isPlayerCorrect)
            }
            else {
                setNegativeButtonStyles(isPlayerCorrect)
            }
        }
        else {
            if (playerChosenValue) {
                setPositiveButtonStyles(isPlayerCorrect)
            }
            else {
                setNegativeButtonStyles(isPlayerCorrect)
            }
        }
        // }, 2000)

        setTimeout(() => {
            setPointsValue(isPlayerCorrect)
            resetActionStates()
            showNextQuestion()
            setIsLoading(false)
        }, 300)
    }

    const setPositiveButtonStyles = (isAnswerCorrect) => {
        setTrueButtonStyles(isAnswerCorrect ? styles.checkContainerPositiveStyles : styles.checkContainerNegativeStyles)
        setTrueTextStyles(isAnswerCorrect ? styles.checkTextTrue : styles.checkTextFalse)
    }

    const setNegativeButtonStyles = (isAnswerCorrect) => {
        setFalseButtonStyles(isAnswerCorrect ? styles.checkContainerPositiveStyles : styles.checkContainerNegativeStyles)
        setFalseTextStyles(isAnswerCorrect ? styles.checkTextTrue : styles.checkTextFalse)
    }

    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <View style={styles.textContainer}>
                    <Text>
                        {activeQuestion.question}
                    </Text>
                </View>

                <View style={styles.textContainer}>
                    <Text>
                        {answerModel.answer}
                    </Text>
                </View>
            </View>

            <View style={styles.checkContainer}>
                <Button onPress={() => checkAnswer(true)} isDisabled={isLoading || isDisabled} isLoading={isLoading} style={[styles.checkContainerTrue, trueButtonStyles]}>
                    <Text style={[styles.checkButtonText, trueTextStyles]}>
                        Prawda
                    </Text>
                </Button>

                <Button onPress={() => checkAnswer(false)} isDisabled={isLoading || isDisabled} isLoading={isLoading} style={[styles.checkContainerFalse, falseButtonStyles]}>
                    <Text style={[styles.checkButtonText, falseTextStyles]}>
                        Fałsz
                    </Text>
                </Button>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
    },
    questionContainer: {
        display: 'flex',
    },
    textContainer: {
        display: 'flex',
        flexBasis: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkContainer: {
        display: 'flex',
        flexBasis: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    checkContainerTrue: {
        flexBasis: '45%',
    },
    checkContainerPositiveStyles: {
        borderColor: 'green',
        backgroundColor: 'green',
    },
    checkTextTrue: {
        color: 'white'
    },
    checkContainerFalse: {
        flexBasis: '45%',
    },
    checkTextFalse: {
        color: 'white'
    },
    checkContainerNegativeStyles: {
        borderColor: 'red',
        backgroundColor: 'red',
    },
    checkButton: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexBasis: '45%',
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: 'blue'
    },
    loadingWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'red',
    },
    loadingIcon: {},
    checkButtonText: {
        padding: 16,
        alignItems: 'center',
    }
})
