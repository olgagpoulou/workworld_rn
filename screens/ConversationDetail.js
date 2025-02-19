import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { getUserData, getProfileById } from './../components/api';
import MessageItem from './../components/MessageItem';
import { WebView } from 'react-native-webview';
import { Ionicons, Feather, MaterialCommunityIcons  } from '@expo/vector-icons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';



import {
  
    IndexContainer,
    IndexTopContainer,
    IndexBottomContainer1,
    BackgroundImage,
    BoxText,
    Avatar,
    SmallButton,
    Row,
    SmallRow,
    RightIcon
    
    }
    
    from  '../components/styles';

const ConversationDetail = ({ route, navigation }) => {
  const { conversationId } = route.params || {}; // Παίρνουμε το conversationId από τα params της πλοήγησης
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Προσθήκη loading state
  
  //Συναρτήσεις για κλήση και βιντεοκλήση
  
  
    // Συνάρτηση για την απλή κλήση (μόνο ήχος)
    const startCall = () => {
      const roomName = `Call_${Date.now()}`; // Δημιουργούμε ένα μοναδικό όνομα δωματίου
      navigation.navigate('JitsiCall', { roomName, isVideoCall: false });
    };
  
    // Συνάρτηση για τη βιντεοκλήση
    const startVideoCall = () => {
      const roomName = `VideoCall_${Date.now()}`; // Δημιουργούμε ένα μοναδικό όνομα δωματίου
      navigation.navigate('JitsiCall', { roomName, isVideoCall: true });
    };
 

  useEffect(() => {
    if (!conversationId || isLoading) return;

    const fetchCurrentUserId = async () => {
        if (currentUserId) return; // Αν το userId έχει ήδη φορτωθεί, δεν το καλούμε ξανά
      const userData = await getUserData();
      if (userData && userData.id) {
        setCurrentUserId(userData.id);
      } else {
        console.log('Unable to fetch user data or user ID is missing.');
      }
    };

    const fetchMessages = async () => {
     // if (isLoading) return; // Έλεγχος για να μην ξεκινήσει το αίτημα αν είναι ήδη σε φόρτωση
      setIsLoading(true); // Θέτουμε το isLoading σε true για να αποτρέψουμε νέα αιτήματα

      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (accessToken) {
        try {
          const response = await axios.get(
            `http://192.168.1.131:8000/api/conversations/${conversationId}/messages/`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          const messagesWithSender = response.data.map(message => ({
            ...message,
            isCurrentUser: message.sender === currentUserId, // Συγκρίνουμε το sender με το currentUserId
          }));
          setMessages(messagesWithSender); // Ενημερώνουμε τα μηνύματα
        } catch (error) {
          console.error('Error fetching messages:', error);
        } finally {
          setIsLoading(false); // Θέτουμε το isLoading σε false όταν ολοκληρωθεί το αίτημα
        }
      } else {
        console.log('No access token');
      }
    };

    fetchCurrentUserId(); // Φορτώνουμε το userId
    fetchMessages(); // Φορτώνουμε τα μηνύματα

  }, [conversationId, isLoading]); // Καλείται ξανά όταν αλλάζει το conversationId ή isLoading

  const handleSendMessage = async () => {
    if (!currentUserId) {
      console.log('Current user ID not fetched yet');
      return;
    }

    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (accessToken && newMessage.trim()) {
        const data = { content: newMessage };
        const response = await axios.post(
          `http://192.168.1.131:8000/api/conversations/${conversationId}/messages/`,
          data,
          { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' } }
        );

       
        // Προσθήκη του νέου μηνύματος στα μηνύματα
        setMessages(prevMessages => [
          ...prevMessages, 
          { ...response.data, isCurrentUser: response.data.sender === currentUserId }
        ]);
        setNewMessage(''); // Άδειασμα του πεδίου
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, padding: 10 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
       <IndexContainer>
        
        <IndexTopContainer  width={'100%'} alignItem={'right'}>
       <SmallRow>
        <SmallButton onPress={startCall}>
        <SimpleLineIcons name="phone" size={29} color="black" />
           </SmallButton>
           <SmallButton onPress={startVideoCall}>
           <Feather name="video" size={29} color="black" />
           </SmallButton>
           </SmallRow>
        </IndexTopContainer> 
        
        <IndexBottomContainer1 >
          <BackgroundImage
               source={require('./../assets/images/pattern6.jpg')} // Αντικαταστήστε με τη διαδρομή της εικόνας σας
              resizeMode="repeat" // Επαναλαμβάνει την εικόνα για να καλύψει όλο το φόντο
             
            >
      
      
      
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageItem item={item} currentUserId={currentUserId} />}
        keyExtractor={item => (item.id ? item.id.toString() : item.message_id.toString())} // Έλεγχος για την ύπαρξη id
      />

      </BackgroundImage>
      </IndexBottomContainer1>
      </IndexContainer>
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Γράψτε το μήνυμά σας..."
        style={{
          height: 60, 
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