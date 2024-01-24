import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const DynamicForm = () => {
  const [fields, setFields] = useState([{ key: 1, value: '' }]);

  const addField = () => {
    const newKey = fields.length + 1;
    setFields([...fields, { key: newKey, value: '' }]);
  };

  const removeField = (key) => {
    const updatedFields = fields.filter((field) => field.key !== key);
    setFields(updatedFields);
  };

  const handleInputChange = (key, value) => {
    const updatedFields = fields.map((field) =>
      field.key === key ? { ...field, value } : field
    );
    setFields(updatedFields);
  };

  return (
    <View style={styles.container}>
      {fields.map((field) => (
        <View key={field.key} style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Field ${field.key} title`}
            placeholderTextColor="#A9A9A9"
            value={field.value}
            onChangeText={(text) => handleInputChange(field.key, text)}
          />
           <TextInput
            style={styles.input}
            placeholder={`Field ${field.key} value`}
            placeholderTextColor="#A9A9A9"
            value={field.value}
            onChangeText={(text) => handleInputChange(field.key, text)}
          />
          <Button title="Remove" onPress={() => removeField(field.key)} />
        </View>
      ))}
      <Button title="Add Field" onPress={addField} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    padding: 8,
    color:'black'
    
  },
});

export default DynamicForm;
