import React from 'react';
import { View, Text } from 'react-native';
import { getProfileData } from "./../components/api";
import  {useEffect,useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import { Ionicons, Feather, MaterialCommunityIcons  } from '@expo/vector-icons';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';


import {
  IndexContainer,
  IndexTopContainer,
  IndexBottomContainer,
  Image,
  Avatar,
  PageTitle,
  SmallButton,
  Row,
  AppContainer
  
  
 } from './../components/styles';




const Home = () => {

   const [profile, setProfile] = useState(null);
   const [profiles,setProfiles] = useState([]); //profiles list
      const [loading, setLoading] = useState(true);
      const [user, setUser] = useState(null);
      console.log("Η ProfileScreen φορτώθηκε!"); 
  
      useEffect(() => { 
        console.log("🔄 useEffect ξεκίνησε...");
  
        const fetchData = async () => {
          const accessToken = await SecureStore.getItemAsync('accessToken');
           if (accessToken) {
            // καλω το API για το προσωπικο προφιλ χρηστη
            const data = await getProfileData();        
              if (data) {
                  setProfile(data);
                  console.log("📝 profile ενημερώθηκε:", data);
              } else {
                  console.log("⚠️ Δεν βρέθηκαν δεδομένα προφίλ!");
              }
          // καλω το API για την ΛΙΣΤΑ των προφιλ
          try {
            const profileResponse = await axios.get('http://192.168.1.131:8000/api/user_profiles/', {
              headers: {
                Authorization: `Bearer ${accessToken}`, 
              },
            });
            setProfiles(profileResponse.data);
            console.log("📋 Λίστα Προφίλ:", profileResponse.data);
          } catch (error) {
            console.error("⚠️ Σφάλμα κατά τη λήψη της λίστας προφίλ:", error);
          }
        } else {
          console.log("⏹ Δεν βρέθηκε accessToken!");
        }
        setLoading(false);
      };
  
      fetchData();
    }, []);

    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } 





  return (
    <IndexContainer>
      <IndexTopContainer>
        <Row>
      
        <Avatar 
                       source={ profile?.profile_picture 
                                ? { uri: profile.profile_picture } 
                                : require("./../assets/images/default-image.jpg") } // Χρησιμοποιούμε το URI για εξωτερικό URL
                                size={50}
                                align="right"  

                      />
          <AppContainer>
           <SmallButton>
             <Feather 
                 name='search'
                 size={29}
                 color='black'
             />
           </SmallButton>
           <SmallButton>
             <MaterialCommunityIcons
                 name='facebook-messenger'
                 size={29}
                 color='black'
             />
           </SmallButton>
           
        </AppContainer>
      </Row>
      </IndexTopContainer>
    
      <IndexBottomContainer>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={({ item }) => {
        console.log(item);  // Προσθήκη για να δεις τα δεδομένα του item
        return (
            <View>
           <Text>{item.job_name || 'No specialization available'}</Text>
              {/* Πρόσθεσε και άλλα πεδία αν χρειάζεσαι */}
            </View>
              );
        }}
      />
      </IndexBottomContainer>
    </IndexContainer>
  );
};

export default Home;