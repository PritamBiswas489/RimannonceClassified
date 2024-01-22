import React from 'react';
import {View, RefreshControl, Text, Pressable, Image} from 'react-native';
import styles from './Style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import MediaSlider from '../../components/MediaSlider/MediaSlider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function ProductDetails() {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handlePress = () => {
    // Handle press event
    console.log('Pressed!');
  };
  const data = [
    {label: 'Marque', value: 'Toyota'},
    {label: 'Modèle', value: 'Corolla'},
    {label: 'Année', value: '2017'},
    {label: 'Transmission', value: 'automatique'},
    {label: 'Couleur', value: 'mente'},
    {label: 'Carburant', value: 'essence'},
    {label: 'État', value: 'excellent'},
    {label: 'Boite et moteur', value: 'excellent'},
    {label: 'Peinture', value: 'jamais'},
    {label: 'touchéChoque', value: 'jamais'},
    {label: 'Suspension', value: 'calme'},
    {label: 'Climatisation', value: '10/10'},
    {label: 'Kilométrage', value: '147.800 km = 92.000 miles'},
  ];

  const mediaItems = [
    {
      type:'video',
      uri: 'https://pritamaqua.aqualeafitsol.com/videos/ElephantsDream.mp4',
    },
    
    {
      type:'image',
      uri: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
      type:'image',
      uri: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
      type:'image',
      uri: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
      type:'video',
      uri: 'https://pritamaqua.aqualeafitsol.com/videos/BigBuckBunny.mp4',
    },
  ];
  const sliderWidth = 400;
  const itemWidth = 300;

  const renderItem = ({item, index}) => (
    <View style={styles.slide}>
      <Image
        style={styles.image}
        source={{uri: item.illustration}}
        resizeMode="cover"
      />
      {/* <Text style={styles.title}>{item.title}</Text> */}
    </View>
  );
  return (
    <>
      <SafeAreaView style={styles.body}>
        <GestureHandlerRootView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.container}>
              <View style={styles.sliderBox}>
                <MediaSlider mediaItems={mediaItems}/> 
                {/* <Carousel
                  data={entries}
                  renderItem={renderItem}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                /> */}
              </View>
              <View style={styles.descriptionDetails}>
                <Text style={styles.descTitle}>Lorem Ipsum is simply</Text>
                <Text style={styles.descSubTitle}>vendue loue</Text>
                <Text style={styles.descPrice}>395,000 MRU</Text>
              </View>
              <View style={styles.description}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <View style={styles.descriptionArea}>
                  {data.map((item, index) => (
                    <View
                      key={index}
                      style={[
                        styles.descriptionBox,
                        index % 2 === 0 ? styles.evenBox : styles.oddBox,
                      ]}>
                      <Text style={styles.left}>{item.label}</Text>
                      <Text style={styles.right}>{item.value}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.submitArea}>
                <Pressable
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed
                        ? 'rgba(0, 169, 184, 0.1)'
                        : 'transparent',
                    },
                    styles.pressableContainer,
                  ]}
                  android_ripple={{color: 'rgba(0, 169, 184, 0.1)'}} // Ripple effect for Android
                  onPress={handlePress}>
                  <View style={styles.nextBtnArea}>
                    <Text style={styles.nextBtn}>Submit your Request</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
  );
}
