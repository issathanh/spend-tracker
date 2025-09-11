import { Text, View,Image } from "react-native";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edirt this screen.</Text>
      <Link href="./about">Go to About</Link>

      <Image 
      source= {{uri: 'https://reactnative.dev/docs/assets/p_cat2.png'}}
      style={{width:200,height:200}}
      />  

      <Image 
      source = {require('@/assets/images/icon.png')}
      style={{width:200,height:200}}
      />
    </View>
  );
}
