import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

export function PlayListItem ({ set, style, navigation, deleteSet }) {
  const play = () => {
    navigation.push('Set', {
      setId: set.id
    })
  }

  return (
    <TouchableOpacity onPress={play} style={[styles.container, style]}>
      <Text style={styles.name}>
        {set.name}
      </Text>

      <Text>
        Pojęcia: {set.terms.length}
      </Text>

      <TouchableOpacity style={styles.deleteIconContainer} onPress={() => deleteSet(set.id)}>
        <AntDesign name="delete" size={20} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    // marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    elevation: 2,
  },
  name: {
    fontWeight: '600',
    fontSize: 18,
  },
  termsCount: {
    marginLeft: 16,
    fontSize: 16,
    color: 'gray'
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  }
});

