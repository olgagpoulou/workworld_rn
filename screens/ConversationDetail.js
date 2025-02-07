import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import SecureStore from 'expo-secure-store';

const ConversationDetail = ({ route, navigation }) => {
  const { conversationId } = route.params || {}; // Παίρνουμε το conversationId από τα params της πλοήγησης
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

    // Ελέγξτε την τιμή του conversationId
    console.log('conversationId:', conversationId);

  if (!conversationId) {
    return <Text marginTop={50}>Δεν υπάρχει id συνομιλίας</Text>; // Αν δεν υπάρχει, εμφάνιση μηνύματος ή χειρισμός του σφάλματος
  }


  useEffect(() => {
    const fetchMessages = async () => {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      
      if (accessToken) {
        try {
          const response = await axios.get(`http://192.168.1.131:8000/api/conversations/${conversationId}/messages/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setMessages(response.data); // Αποθηκεύουμε τα μηνύματα στο state
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      } else {
        console.log('No access token');
      }
    };

    fetchMessages(); // Καλούμε τη συνάρτηση για να πάρουμε τα μηνύματα
  }, [conversationId]); // Καλείται ξανά αν αλλάξει το conversationId

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text><strong>{item.sender.name}</strong></Text>
      <Text>{item.content}</Text>
    </View>
  );

  const handleSendMessage = async () => {
    const accessToken = await SecureStore.getItemAsync('accessToken');

    if (accessToken && newMessage.trim()) {
      try {
        const response = await axios.post(`http://192.168.1.131:8000/api/conversations/${conversationId}/messages/`, 
          { content: newMessage },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        
        // Προσθήκη του νέου μηνύματος στην αρχή της λίστας
        setMessages([response.data, ...messages]);
        setNewMessage(''); // Καθαρισμός του input πεδίου
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      console.log('Message is empty or no access token');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 10 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        inverted // Τοποθετούμε τα πιο πρόσφατα μηνύματα από κάτω
      />
      
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Γράψτε το μήνυμά σας..."
        style={{
          height: 40, 
          borderColor: 'gray', 
          borderWidth: 1, 
          marginBottom: 10, 
          paddingHorizontal: 10
        }}
      />
      <Button title="Αποστολή" onPress={handleSendMessage} />
    </KeyboardAvoidingView>
  );
};

export default ConversationDetail;
