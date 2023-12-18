import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { startBackgroundTask, stopBackgroundTask } from '../utils/backgroundActions';

const audioRecorderPlayer = new AudioRecorderPlayer();

const Recorder = () => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [recordSecs, setRecordSecs] = useState<number | undefined>();
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

    return <>
        {isRecording && !isPaused && <Text>Recording in progress</Text>}
        {isRecording && isPaused && <Text>Recording paused</Text>}
        <Button 
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? () => stopBackgroundTask(stopRecording) : () => startBackgroundTask(startRecording)}/>
    </>
}

export default Recorder;