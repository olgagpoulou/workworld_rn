import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { getUserData, getProfileById } from "./../components/api";
import { Avatar } from './styles';


// Συναρτησιακό component για την απόδοση κάθε μηνύματος
const MessageItem = ({ item, currentUserId }) => {
    const isCurrentUser = item.sender === currentUserId;
    const [profilePicture, setProfilePicture] = useState(null);
  
    useEffect(() => {
      const fetchProfilePicture = async () => {
        const pictureUrl = await getProfileById(item.sender);
        setProfilePicture(pictureUrl);
      };
      fetchProfilePicture();
    }, [item.sender]);
  
    return (
        <View
        style={{
            flexDirection:isCurrentUser ? 'row-reverse' : 'row',// Αν το μήνυμα ανήκει στον τρέχοντα χρήστη, τοποθετήστε το αριστερα
          padding: 10,
          marginBottom: 10,
          alignItems: 'center',
        }}
      >
    
        {!isCurrentUser && (
          <Avatar
            source={
              profilePicture
                ? { uri: profilePicture }
                : require('./../assets/images/default-image.jpg')
            }
            size={40}
          align="right"
          />
        )}
       
        <View
          style={{
            backgroundColor: isCurrentUser ? '#DCF8C6' : '#E5E5EA',
            borderRadius: 10,
            padding: 10,
            maxWidth: '75%',
          }}
        >
          <Text style={{ fontSize: 16 }}>{item.content}</Text>
        </View>
        {isCurrentUser && (
          <Avatar
            source={
              profilePicture
                ? { uri: profilePicture }
                : require('./../assets/images/default-image.jpg')
            }
            size={40}
          align="left"
          />
        )}
      </View>
    );
  };
  
  export default MessageItem;