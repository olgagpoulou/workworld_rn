import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Button, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SecureStore from 'expo-secure-store';


const Messages = ({ route, navigation }) => {
    const { conversationId } = route.params; // Παίρνουμε το conversationId από το route
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [token, setToken] = useState(null);
  
    useEffect(() => {
      const fetchMessages = async () => {
        const accessToken = await SecureStore.getItemAsync('accessToken');
        if (accessToken) {
          const response = await axios.get(`http://192.168.1.131:8000/api/messages/${conversationId}/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setMessages(response.data);
        } else {
          console.log('Not Access Token', accessToken);
        }
      };
  
      fetchMessages();
    }, [conversationId]);
  
    const sendMessage = async () => {
      if (newMessage.trim() === '') return; // Αν το μήνυμα είναι κενό, δεν αποστέλλουμε τίποτα
  
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (accessToken) {
        const response = await axios.post(
          `http://192.168.1.131:8000/api/messages/${conversationId}/`,
          { text: newMessage },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setMessages([...messages, response.data]); // Προσθήκη του νέου μηνύματος στη λίστα
        setNewMessage(''); // Καθαρισμός του πεδίου εισαγωγής
      } else {
        console.log('Not Access Token');
      }
    };
  
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <Text>{item.sender.name}: {item.text}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Γράψε το μήνυμά σου..."
          style={{ borderColor: '#ccc', borderWidth: 1, padding: 10, marginBottom: 10 }}
        />
        <Button title="Στείλε Μήνυμα" onPress={sendMessage} />
      </View>
    );
  };
  
  export default Messages;