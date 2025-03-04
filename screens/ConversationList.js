import React from 'react';
import { View, Text, Button,TextInput , TouchableOpacity} from 'react-native';
import { getUserData, getUsersList, getProfileList, getProfileById} from "../components/api";
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
  Avatar,
  SmallButton,
  Row,
  BoxView,
  BackgroundImage,
  

  
  
 } from '../components/styles';
import { StatusBar } from 'expo-status-bar';
import { Header } from 'react-native/Libraries/NewAppScreen';

const ConversationList = () => {
    const [conversations, setConversations] = useState([]);
    const [token, setToken] = useState(null);
    const navigation = useNavigation();

 // Κλήση API για να λάβουμε τις συνομιλίες

  const fetchConversations = async () => {
    const accessToken = await SecureStore.getItemAsync('accessToken');

    if (accessToken) {
      try {
         //1. Τα δεδομένα του συνδεδεμένου χρήστη
         const userData = await getUserData();
         
         console.log('AAAAAAAAAAAAAAAAAAAA:', userData.id);

        //  Παίρνουμε τα δεδομένα των χρηστών
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
const conversationList =await Promise.all(conversationsData.map(async (conversation) => {
  // 4.Αντιστοίχιση των IDs των συμμετεχόντων με τα ονόματα
 // const participantsNames = conversation.participants.map(id => usersMap[id]);
 const otherParticipantId = conversation.participants.find(id => id !== userData.id);
 console.log('OTHER PARTIPANTID:', otherParticipantId);
  const otherParticipant = usersMap[otherParticipantId] || 'Άγνωστος Χρήστης';
  console.log('OTHER PARTIPANT:', otherParticipant);
  
  
  let profilePicture = null;
  // 5. Αν υπάρχουν τουλάχιστον δύο συμμετέχοντες στη συνομιλία, πάρε την εικόνα του δεύτερου
  //if (conversation.participants.length > 1) {
    if (otherParticipantId) { 
  console.log(`Fetching profile for user with ID: `, otherParticipantId);
    try {
      const profilePictureUrl = await getProfileById(otherParticipantId); // Αν ο δεύτερος χρήστης έχει το προφίλ
      profilePicture =profilePictureUrl;
      
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  return {
    ...conversation, // Διατηρούμε τα υπόλοιπα δεδομένα της συνομιλίας
    //otherParticipantName: otherParticipant.name,
    otherParticipantId: otherParticipant.id,
    otherParticipant,
    //participantsNames, // Προσθέτουμε τα ονόματα των συμμετεχόντων
    profilePicture,
  };
}));



console.log('Fetched conversationList:', conversationList);
setConversations(conversationList); // Ενημερώνουμε την κατάσταση

        

      

  } catch (error) {
        console.error('Error fetching conversations:', error);
  }
    } else {
      console.log('No access token');
    }
  };

// useEffect για αρχική φόρτωση δεδομένων
useEffect(() => {
  fetchConversations();
}, []);

// useEffect για ανανέωση όταν επιστρέφουμε στη σελίδα
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
      fetchConversations(); 
  });

  return unsubscribe;
}, [navigation]);
 

  return (

    <IndexContainer>
     <IndexTopContainer >
     <BoxView> 
             <Row marginTop={2} alignItems={'center'}>
              <TextInput style={{
                          height: 45,
                      borderColor: '#EEEEEE',  // Μπλε περίγραμμα
                      borderWidth: 2,
                      borderRadius: 10,  // Στρογγυλεμένες γωνίες
                      paddingHorizontal: 15,
                      backgroundColor: '#fff',  // Λευκό φόντο
                      fontSize: 16,
                      color: '#000',
                      alignItems: 'center' ,
                      marginTop:5,
                      marginLeft:5,
                      width: '80%'}}
                      >
                      
                              "Αναζήτηση chat..."   
                      </TextInput>
                <SmallButton>
                  <Feather 
                      name='search'
                      size={29}
                      color='black'
                  />
                </SmallButton>
                
               
                </Row>
                </BoxView> 
           </IndexTopContainer>


    <IndexBottomContainer1>
    <BackgroundImage
     source={require('./../assets/images/pattern1.jpg')} // Αντικαταστήστε με τη διαδρομή της εικόνας σας
    resizeMode="repeat" // Επαναλαμβάνει την εικόνα για να καλύψει όλο το φόντο
   
  >
    <View style={{ flex: 1, padding:5 }}>
   
  
    
       <FlatList
           data={conversations} 
           contentContainerStyle={{
                   padding:7,
                   paddingTop:StatusBar.currentHeight || 10
                   }}
           keyExtractor={item => item.id.toString()}
           renderItem={({ item }) => (
           
            <TouchableOpacity
            onPress={() => {
                  console.log('Navigating to ConversationDetail with id:', item.id);
                  try {
                    navigation.navigate('ConversationDetail', { conversationId: item.id });
                  } catch (error) {
                  console.error('Navigation error:', error);
                  }
                }}
                >
                 <View style={{ padding: 10, flexDirection: 'row', marginBottom: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 10, elevation: 5 }}>
                              <Avatar 
                                                   source={ item.profilePicture 
                                                            ? { uri: item.profilePicture } 
                                                            : require("./../assets/images/default-image.jpg") } // Χρησιμοποιούμε το URI για εξωτερικό URL
                                                            size={50}
                                                            align="right"
                            
                            
              />
            
                          <View>
                             <Text style={{ marginTop: 10, fontSize: 19, fontWeight: '600'}}>
                                {/*{item.participantsNames[1]}*/}
                                {item.otherParticipant || 'Άγνωστος Χρήστης'}
                              </Text>
                            <Text style={{fontSize:16, opacity: .7 , marginBottom: 10}}>
                                Ημ/νια {new Date(item.created_at).toLocaleString()}
                            </Text>
                           
                          
                           
                           </View>
                           

          {item.unread_messages > 0 && (
    <View style={{
      width: 24,
      height: 24,
      backgroundColor: 'red',
      borderRadius: 9,
      marginLeft: 15,
      marginTop:20,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
        {item.unread_messages}
      </Text>
    </View>)}
        

                       </View>
                   
          
         
                  </TouchableOpacity>
           )}
         />
                    
               
                
      
    
    </View>
    </BackgroundImage>
    </IndexBottomContainer1>
    </IndexContainer>
  );
};

export default ConversationList;