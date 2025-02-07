import React from 'react';
import { View, Text, Button } from 'react-native';
import { getProfileData , getUsersList, getProfileList } from "../components/api";
import  {useEffect,useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import { Ionicons, Feather, MaterialCommunityIcons  } from '@expo/vector-icons';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";





import {
  IndexContainer,
  IndexTopContainer,
  IndexBottomContainer1,
  Image,
  Avatar,
  PageTitle,
  SmallButton,
  Row,
  AppContainer,
  ImageBackground,
  TouchableOpacity,
  Email

  
  
 } from '../components/styles';
import { StatusBar } from 'expo-status-bar';

const ConversationList = () => {
    const [conversations, setConversations] = useState([]);
    const [token, setToken] = useState(null);
    const navigation = useNavigation();

 // Κλήση API για να λάβουμε τις συνομιλίες
 useEffect(() => {
  const fetchConversations = async () => {
    const accessToken = await SecureStore.getItemAsync('accessToken');

    if (accessToken) {
      try {
      
        // 1. Παίρνουμε τα δεδομένα των χρηστών
        const usersList = await getUsersList();
        // Δημιουργία του map για τα ονόματα των χρηστών
           const usersMap = usersList.reduce((acc, user) => {
                           acc[user.id] = user.name;
                           return acc;
                          }, {});
        console.log('Fetched users:', usersMap);

         // 2.Παίρνουμε τις συνομιλίες
      const conversationResponse = await axios.get('http://192.168.1.131:8000/api/conversations/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const conversationsData = conversationResponse.data;
      console.log('Conversation Data:', conversationsData);

      //3. Δημιουργία λίστας συνομιλιών με τα ονόματα των χρηστών
const conversationList = conversationsData.map(conversation => {
  // 4.Αντιστοίχιση των IDs των συμμετεχόντων με τα ονόματα
  const participantsNames = conversation.participants.map(id => usersMap[id]);
  
  return {
    ...conversation, // Διατηρούμε τα υπόλοιπα δεδομένα της συνομιλίας
    
    participantsNames // Προσθέτουμε τα ονόματα των συμμετεχόντων
  };
});

console.log('Fetched conversationList:', conversationList);
setConversations(conversationList); // Ενημερώνουμε την κατάσταση

        

      

      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    } else {
      console.log('No access token');
    }
  };

  fetchConversations();
}, []);
const renderItem = ({ item }) => (
    
   
  <TouchableOpacity
  onPress={() => {
    console.log('Navigating to ConversationDetail with id:', item.id); // Για να δεις το αντικείμενο συνομιλίας
  navigation.navigate('ConversationDetail', { conversationId: item.id })
  }}
>
  <View style={{ padding: 10, borderBottomWidth: 1 }}>
    <Text>{item.participants.map(participant => participant.name).join(', ')}</Text>
    <Text>{item.last_message}</Text>
  </View>
</TouchableOpacity>)

  return (
    <IndexBottomContainer1>
    <View style={{ flex: 1, padding: 20 }}>
    
       <FlatList
           data={conversations} //Εδω εχω προβλημα!!!
           keyExtractor={item => item.id.toString()}
           renderItem={({ item }) => (
                        <View style={{ padding: 10, flexDirection: 'row', marginBottom: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 10, elevation: 5 }}>
                            <Email>Συνομιλία με: {item.participantsNames.join(' και ')}</Email>
                            <Text>Δημιουργήθηκε στις: {new Date(item.created_at).toLocaleString()}</Text>
                        </View>
                    )}
                />
                <Email>email</Email>
      <Button
        title="Νέα Συνομιλία"
        onPress={() => navigation.navigate('ConversationDetail')}
      />
    </View>
    </IndexBottomContainer1>
  );
};

export default ConversationList;