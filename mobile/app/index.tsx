import { Text, View,Image,StyleSheet } from "react-native";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.heading}>Edit app/index.tsx to edirt this screen.</Text>
      <Link href="./about">Go to About</Link>

      <Image 
      source= {{uri: 'https://reactnative.dev/docs/assets/p_cat2.png'}}
      style={styles.image}
      />  

      <Image 
      source = {require('@/assets/images/icon.png')}
      style={styles.image}
      />
    </View>
  );
}
//view == div

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple"
  },
  image: {
    width: 200,
    height: 200,
  },
  heading: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },
})