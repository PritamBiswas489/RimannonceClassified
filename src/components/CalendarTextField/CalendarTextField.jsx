import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns'; // Optional: Use date-fns for date formatting

const CalendarTextField = ({textValue, setTextValue}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
   
  
  const showDatePicker =() => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker =  () => {
    setDatePickerVisibility(false);
  } ;

  const handleConfirm =  (date) => {
    hideDatePicker();
    setTextValue(format(date, 'yyyy-MM-dd')); // Format the date as needed
    setSelectedDate(date);
  }

  return (
    <View >
      <TouchableOpacity  onPress={showDatePicker}>
        <TextInput
          style={{  height: 40, borderColor: '#ededed', borderWidth: 1, padding: 8, color:'black' }}
          placeholder="Select Date"
          value={textValue}
          editable={false}
          placeholderTextColor="#9c9c9c"
        />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={selectedDate}
      />
    </View>
  );
};

export default CalendarTextField;
