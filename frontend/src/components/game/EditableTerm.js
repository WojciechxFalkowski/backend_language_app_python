import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as React from 'react'

export const EditableTerm = ({ term, style, isEditMode, setEditMode, editTerm, deleteTerm }) => {
    const [questionEditValue, setQuestionEditValue] = React.useState(term.question)
    const [answerEditValue, setAnswerEditValue] = React.useState(term.answer)

    return (
        <View style={[styles.termInnerContainer, style]}>
            <View style={styles.termContentContainer}>
                <View style={styles.questionContainer}>
                    {isEditMode ? <TextInput
                        style={styles.textInput}
                        onChangeText={setQuestionEditValue}
                        value={questionEditValue}
                        placeholder={'Dodaj pojęcie'}
                      /> :
                      <Text style={styles.questionText}>
                          {term.question}
                      </Text>}
                </View>

                <View style={styles.answerContainer}>
                    {isEditMode ? <TextInput
                        style={styles.textInput}
                        onChangeText={setAnswerEditValue}
                        value={answerEditValue}
                        placeholder={'Dodaj odpowiedź'}
                    /> :
                        <Text style={styles.answerText}>
                            {term.answer}
                        </Text>}
                </View>
            </View>

            <View style={styles.termIconsContainer}>
                {
                    isEditMode ?
                        <TouchableOpacity style={styles.termIconWrapper} onPress={() => editTerm(term.id, questionEditValue, answerEditValue)}>
                            <AntDesign name="check" size={18} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.termIconWrapper} onPress={() => setEditMode(term.id)}>
                            <Feather name="edit" size={18} />
                        </TouchableOpacity>
                }



                <TouchableOpacity onPress={() => deleteTerm(term.id)}>
                    <AntDesign name="delete" size={18} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    termInnerContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        // height: 50
    },
    termContentContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
    },
    answerContainer: {
        flex: 1,
        marginRight: 4,
        justifyContent: 'center',
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    answerText: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 16,
    },
    questionContainer: {
        flex: 1,
        marginLeft: 4,
        justifyContent: 'center',
    },
    questionText: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 16,
    },
    termIconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    termIconWrapper: {
        marginHorizontal: 16
    }
})
