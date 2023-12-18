import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import handleRequestPermissions from './src/utils/permissions';
import RecorderScreen from './src/screens/RecorderScreen';

const App = () => {

  useEffect(() => {
    handleRequestPermissions();
  }, []);

  return <View style={styles.container}>
    <RecorderScreen />
  </View>;
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
