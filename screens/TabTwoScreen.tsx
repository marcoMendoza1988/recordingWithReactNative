import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { RootTabScreenProps } from '../types';

export default function TabTwoScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [cameraRef, setCameraRef] = useState<any>(null)
  const [type, setType] = useState(CameraType.back);
  const [ recording, setRecording ] = useState<boolean>(false);
  const [ urlRecording, setUrlRecording ] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await Camera.requestMicrophonePermissionsAsync();
        // await Audio.requestPermissionsAsync();
        // await Audio.setAudioModeAsync({
        //     allowsRecordingIOS: true,
        //     playsInSilentModeIOS: true,
        // });
        setHasPermission(status === 'granted');
      } catch (error) {
        alert(JSON.stringify(error));
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <View style={{ width: 300, height: 500 }}>
        <Camera
          style={{ flex: 1 }}
          type={type}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              justifyContent: "flex-end",
              marginBottom: 16
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.2,
                  alignSelf: "flex-end",
                }}
                onPress={() => {
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
              >
                <Ionicons
                  name={
                    Platform.OS === "ios" ? "ios-camera-reverse" : "md-camera-reverse"
                  }
                  size={40}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={async () => {
                  if (cameraRef) {
                    let photo = await cameraRef.takePictureAsync();
                    console.log("photo", photo);
                  }
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 25,
                    borderColor: "white",
                    height: 50,
                    width: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 25,
                      borderColor: "white",
                      height: 40,
                      width: 40,
                      backgroundColor: "white",
                    }}
                  ></View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={async () => {
                  if (!recording) {
                    setRecording(true);
                    let video = await cameraRef.recordAsync();
                    console.log("video", video.uri);
                    setUrlRecording(video.uri)
                  } else {
                    setRecording(false);
                    cameraRef.stopRecording();
                  }
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 25,
                    borderColor: recording ? 'red' : 'green',
                    height: 50,
                    width: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 25,
                      borderColor: recording ? 'red' : 'green',
                      height: 40,
                      width: 40,
                      backgroundColor: recording ? 'red' : 'green',
                    }}
                  ></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      </View>
      <View>
        {urlRecording && <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={async () => {
            navigation.navigate('Player', { videoRef: urlRecording });
          }}
        >
          <View
            style={{
              borderWidth: 2,
              borderRadius: 50,
              height: 100,
              width: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>PLAY NOW</Text>
          </View>
        </TouchableOpacity>}
      </View>
    </View>
  );
}
