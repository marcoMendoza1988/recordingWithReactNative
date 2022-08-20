import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { Text, View } from '../components/Themed';
import React, { useState } from 'react';
import { Button } from 'react-native';

export default function PlayerScreen({ route }: any) {
    const { videoRef } = route.params;
    const video = React.useRef<any>(null);
    const [ status, setStatus ] = useState<any>('')

    return (
        <View>
        <Text>Preview Recording</Text>
        <View>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: videoRef,
                }}
                useNativeControls={false}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(status)}
            />
        </View>
        <View>
            <Button
                title={status.isPlaying ? 'Pause' : 'Play'}
                onPress={() =>
                    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                }
            />
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    video: {
      alignSelf: 'center',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height / 2
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
});
