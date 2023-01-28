import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from './../Button'

export const FinishView = ({ navigation, positivePoints, negativePoints, playAgain, activeSeconds }) => {
    const navigateToSetScreen = () => {
        navigation.navigate('Sets')
    }

    const minutes = Math.floor(activeSeconds / 60)
    const seconds = activeSeconds - minutes * 60

    const activeTime = minutes > 0 ? `${minutes}min ${seconds}s` : `${seconds}s`

    return (

        <View style={styles.container}>
            <Text>Wynik {Math.round(positivePoints / (positivePoints + negativePoints) * 100)}%</Text>

            <Text>Dobre odpowiedzi: {positivePoints}</Text>

            <Text>Złe odpowiedzi: {negativePoints}</Text>

            <Text>Czas: {activeTime}</Text>

            <Button style={styles.buttonContainer} onPress={playAgain}>
                <Text>Zagraj jeszcze raz</Text>
            </Button>

            <TouchableOpacity onPress={navigateToSetScreen}>
                <Text>Wróć do listy</Text>
            </TouchableOpacity>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    buttonContainer: {
        padding: 16,
        marginTop: 32,
        marginBottom: 16
    }
})