import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';

const VideoPlayer = ({ videoUri }) => {
  const [paused, setPaused] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    setPaused(!paused);
  };

  const handleProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const handleEnd = () => {
    setCurrentTime(totalDuration);
    setPaused(true);
  };

  const handleSeek = (time) => {
    videoRef.current.seek(time);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: videoUri }}
        style={styles.videoPlayer}
        paused={paused}
        onLoad={(data) => setTotalDuration(data.duration)}
        onProgress={handleProgress}
        onEnd={handleEnd}
        resizeMode="cover"
      />
       <View style={styles.controls}>
        <TouchableOpacity onPress={() => handleSeek(currentTime - 10)}>
          <Icon name="backward" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <Icon name={paused ? 'play' : 'pause'} size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSeek(currentTime + 10)}>
          <Icon name="forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    width: 400,
    height: 400,
  },
  controls: {
    position: 'absolute',
    bottom: 180,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    color:'black'
  },
});

export default VideoPlayer;
