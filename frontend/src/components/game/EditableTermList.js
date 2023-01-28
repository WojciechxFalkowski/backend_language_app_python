import { View, Button, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import * as React from 'react'
import { EditableTerm } from './EditableTerm'
import AntDesign from '@expo/vector-icons/AntDesign';

export const EditableTermList = ({
                                   set,
                                   deleteTerm,
                                   addTerm,
                                   setAddTermMode,
                                   isModeAddNewTerm,
                                   deleteAddedTerm,
                                   updateTerm
                                 }) => {

  const [editedTermId, setEditedTermId] = React.useState(null)
  const setEditMode = (termId) => {
    setEditedTermId(termId)
  }

  const editTerm = (termId, termQuestion, termAnswer) => {
    updateTerm(termId, termQuestion, termAnswer)
    setEditedTermId(null)
  }

  return (
    <View style={styles.termsContainer}>
      <FlatList
        data={set.terms}
        renderItem={({ item }, index) => <EditableTerm term={item} style={styles.termContainer}
                                                       isEditMode={editedTermId === item.id} key={index}
                                                       setEditMode={setEditMode} editTerm={editTerm}
                                                       deleteTerm={deleteTerm} />}
      />
      {/*{set.terms.map((term, index) => (*/}
      {/*    <EditableTerm term={term} style={styles.termContainer} isEditMode={editedTermId === term.id} key={index} setEditMode={setEditMode} editTerm={editTerm} deleteTerm={deleteTerm} />*/}
      {/*))}*/}

      {isModeAddNewTerm ? <EditableTerm term={{
          id: set.terms.length,
          question: '',
          answer: '',
          points: {
            positive: 0,
            negative: 0
          }
        }} style={styles.termContainer} isEditMode={true} setEditMode={setEditMode} editTerm={addTerm}
                                        deleteTerm={deleteAddedTerm} />
        :
        <TouchableOpacity onPress={setAddTermMode} style={styles.addTermContainer}>
          <AntDesign name="pluscircleo" size={30} />
        </TouchableOpacity>}
    </View>
  )
}

const styles = StyleSheet.create({
  termsContainer: {
    padding: 16,
    height: '100%'
  },
  termContainer: {
    marginTop: 16
  },
  addTermContainer: {
    marginTop: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    height: 50
  }
})
