import React, {useState} from 'react';
import styles from './Style';
import {Text, View, TextInput, Pressable, ScrollView} from 'react-native';


export default function CarRoute() {
  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: '#fff', marginBottom: 100}}>
        <View style={styles.tabInner}>
          <View style={styles.formWrap}>
            <View style={styles.formGroup}>
              <View style={styles.inputIconBox}>
                <Text style={styles.inputLabel}>Title</Text>
              </View>
              <TextInput
                placeholder="Enter Title of the announcement"
                style={styles.input}
                placeholderTextColor="#9c9c9c"
              />
            </View>
            <View style={styles.formGroup}>
              <View style={styles.inputIconBox}>
                <Text style={styles.inputLabel}>Location</Text>
              </View>
              <TextInput
                placeholder="Enter Location of the announcement"
                style={styles.input}
                placeholderTextColor="#9c9c9c"
              />
            </View>

            <View style={styles.formGroup}>
              <View style={styles.inputIconBox}>
                <Text style={styles.inputLabel}>Contact number:</Text>
              </View>
              <TextInput
                placeholder="Enter contact number"
                style={styles.input}
                placeholderTextColor="#9c9c9c"
              />
            </View>

            <View style={styles.formGroup}>
              <View style={styles.inputIconBox}>
                <Text style={styles.inputLabel}>Description</Text>
              </View>
              <TextInput
                placeholder="Enter Description of the anouncement"
                style={styles.textArea}
                placeholderTextColor="#9c9c9c"
                multiline={true}
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>
            
          </View>

          <View style={[styles.formGroup, styles.dFlexCenter]}>
            <Pressable
              style={styles.addFlyerBtn}
              onPress={() => showErrorAlert()}>
              <Text style={styles.publish}>Publish</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
