import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns'; // Optional: Use date-fns for date formatting

const CalendarTextField = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [textValue, setTextValue] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    setTextValue(format(date, 'MM/dd/yyyy')); // Format the date as needed
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 8 }}
          placeholder="Select Date"
          value={textValue}
          editable={false}
        />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default CalendarTextField;
