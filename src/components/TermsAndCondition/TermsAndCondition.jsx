import React from 'react';
import { View, Text, ScrollView, Modal, Button, StyleSheet } from 'react-native';

const TermsAndCondition = ({toggleTcModal,setTcModalVisible}) => {
  
  return (
    <View style={styles.container}>


      <Modal
        animationType="slide"
        transparent={false}
        visible={true}
        onRequestClose={toggleTcModal}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.scrollContainer}>
            {/* Your large content goes here */}
            <Text style={styles.largeContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor justo eu dui
              venenatis, eu facilisis leo sagittis. Sed sit amet sapien eu elit mollis euismod
              vitae vel nisi. Sed eu eros quis purus fermentum tristique. Nulla facilisi.
              Suspendisse auctor ante vel tincidunt fermentum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor justo eu dui
              venenatis, eu facilisis leo sagittis. Sed sit amet sapien eu elit mollis euismod
              vitae vel nisi. Sed eu eros quis purus fermentum tristique. Nulla facilisi.
              Suspendisse auctor ante vel tincidunt fermentum.
              Suspendisse auctor ante vel tincidunt fermentum.

              Suspendisse auctor ante vel tincidunt fermentum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor justo eu dui
              venenatis, eu facilisis leo sagittis. Sed sit amet sapien eu elit mollis euismod
              vitae vel nisi. Sed eu eros quis purus fermentum tristique. Nulla facilisi.
              Suspendisse auctor ante vel tincidunt fermentum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor justo eu dui
              venenatis, eu facilisis leo sagittis. Sed sit amet sapien eu elit mollis euismod
              vitae vel nisi. Sed eu eros quis purus fermentum tristique. Nulla facilisi.
              Suspendisse auctor ante vel tincidunt fermentum.
              Suspendisse auctor ante vel tincidunt fermentum.

              Suspendisse auctor ante vel tincidunt fermentum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor justo eu dui
              venenatis, eu facilisis leo sagittis. Sed sit amet sapien eu elit mollis euismod
              vitae vel nisi. Sed eu eros quis purus fermentum tristique. Nulla facilisi.
              Suspendisse auctor ante vel tincidunt fermentum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor justo eu dui
              venenatis, eu facilisis leo sagittis. Sed sit amet sapien eu elit mollis euismod
              vitae vel nisi. Sed eu eros quis purus fermentum tristique. Nulla facilisi.
              Suspendisse auctor ante vel tincidunt fermentum.
              Suspendisse auctor ante vel tincidunt fermentum.

              Suspendisse auctor ante vel tincidunt fermentum.

            </Text>
          </ScrollView>

          <Button title="Close Modal" onPress={toggleTcModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  largeContent: {
    fontSize: 18,
    textAlign: 'justify',
    color:'black'
  },
});

export default TermsAndCondition;
