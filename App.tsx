import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const App = () => {

  const handleRequestPermissions = async () => {
    try {
      const micResult = await request(PERMISSIONS.IOS.MICROPHONE);
      if (micResult === 'granted') {
        console.log('Microphone permission granted');
      } else {
        console.log('Microphone permission denied');
      }

      const mediaLibraryResult = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
      if (mediaLibraryResult === 'granted') {
        console.log('Media library permission granted');
      } else {
        console.log('Media library permission denied');
      }
    } catch (error) {
      console.error('Error requesting permission: ', error);
    }
  };

  useEffect(() => {
    handleRequestPermissions();
  }, []);

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordSecs, setRecordSecs] = useState();
  const [recordTime, setRecordTime] = useState<string | undefined>();
  
  const startRecording = async () => {
    try {
      console.log("Recording is starting ...");
      setIsRecording(true);
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e: any) => { 
        setRecordSecs(e.current_position);
        setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
      });
      console.log(result);
      // Logic for starting recording
      console.log("Recording started ...");
    } catch (error) {
      console.error('Error starting recording: ', error);
    }

  };

  const stopRecording = async () => {
    try {
      console.log("Recording is stopping ...");
      setIsRecording(true);
      if (isPaused) {
        setIsPaused(false);
      }
      // Logic for stopping recording
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordSecs(undefined);
      console.log(result);
      console.log("Recording stopped ...");
      } catch (error) {
        console.error('Error stopping recording: ', error);
      }
  };

  const pauseRecording = async () => {
    try {
      console.log("Recording is pausing ...");
      setIsPaused(true);
      // Logic for pausing recording
      const result = await audioRecorderPlayer.pauseRecorder();
      console.log(result);
      console.log("Recording paused ...");
    } catch (error) { 
      console.error('Error pausing recording: ', error);
    }
  };

  const resumeRecording = async () => {
    try {
      console.log("Recording is resuming ...");
      setIsPaused(false);
      // Logic for resuming recording
      console.log("Recording resumed ...");
    } catch (error) {
      console.error('Error resuming recording: ', error);
    }
  };

  return <View style={styles.container}>
    <Text>Voice Memo Application</Text>
    {isRecording && !isPaused && <Text>Recording in progress</Text>}
    {isRecording && isPaused && <Text>Recording paused</Text>}
    <Button 
      title={isRecording ? "Stop Recording" : "Start Recording"}
      onPress={isRecording ? stopRecording : startRecording}/>
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
