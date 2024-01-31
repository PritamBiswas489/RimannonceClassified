import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Video from 'react-native-video';
import { getMediaUrl } from '../../config/utility';
 

const { width } = Dimensions.get('window');

const MediaSlider = ({ mediaItems }) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => handleItemClick(item)}>
        {item.type === 'images' ? (
          <Image source={{ uri: item.uri }} style={styles.image} />
        ) : (
          // <Image source={{ uri: item.uri }} style={styles.image} />
          <Video
            source={{ uri: item.uri }}
            style={styles.video}
            paused={index !== activeIndex}
            controls={false}
            poster={getMediaUrl()+'/images/play.png'} // Set the poster image URL
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
    );
  };

  const handleItemClick = (item) => {
    // Handle item click if needed
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={mediaItems}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={mediaItems.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationInactiveDot}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.8}
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
  image: {
    width,
    height: 200,
    resizeMode: 'cover',
  },
  video: {
    width,
    height: 200,
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  paginationInactiveDot: {
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
});

export default MediaSlider;
