import { Button, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      <Text>Login to Spotify</Text>
      <Button title="Login" onPress={() => {}} />
    </View>
  );
}
