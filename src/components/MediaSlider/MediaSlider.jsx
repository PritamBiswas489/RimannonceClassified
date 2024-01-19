import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import Video from 'react-native-video';

const { width } = Dimensions.get('window');

const MediaSlider = ({ mediaItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  const renderMedia = (media, index) => {
    if (media.type === 'image') {
      return <SliderBox key={index} images={[media.uri]} />;
    } else if (media.type === 'video') {
      return (
        <Video
          key={index}
          ref={videoRef}
          source={{ uri: media.uri }}
          style={styles.video}
          paused={currentIndex !== index}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* {mediaItems.map((media, index) => renderMedia(media, index))} */}
      <SliderBox
        images={mediaItems.filter((media) => media.type === 'image').map((media) => media.uri)}
        onPositionChanged={(index) => {
          setCurrentIndex(index);
          if (videoRef.current) {
            videoRef.current.seek(0); // Reset video playback when switching images
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width,
    height: 200,
  },
});

export default MediaSlider;
