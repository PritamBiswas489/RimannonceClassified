import React, {useState} from 'react';
import styles from './Style';
import {Text, View, TextInput, Pressable, ScrollView, Button} from 'react-native';
import CalendarTextField from '../../CalendarTextField/CalendarTextField';
 

export default function GpDliveryRoute() {
 
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
                <Text style={styles.inputLabel}>Date of departure</Text>
              </View>
              <CalendarTextField/>
            </View>
            
            <View style={styles.formGroup}>
              <View style={styles.inputIconBox}>
                <Text style={styles.inputLabel}>Origin Location</Text>
              </View>
              <TextInput
                placeholder="Enter Origin Location"
                style={styles.input}
                placeholderTextColor="#9c9c9c"
              />
            </View>

            <View style={styles.formGroup}>
              <View style={styles.inputIconBox}>
                <Text style={styles.inputLabel}>Destination Location</Text>
              </View>
              <TextInput
                placeholder="Enter Destination Location"
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
                keyboardType="phone-pad"
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
