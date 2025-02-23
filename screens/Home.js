import React from 'react';
import { View, Text, TextInput, TouchableOpacity, } from 'react-native';
import { getProfileData , getUsersList, getProfileList } from "./../components/api";
import  {useEffect,useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import { Ionicons, Feather, MaterialCommunityIcons  } from '@expo/vector-icons';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ProfileIndex from './../screens/ProfileIndex';



import {
  IndexContainer,
  IndexTopContainer,
  IndexBottomContainer1,
  Avatar,
  SmallButton,
  Row,
  AppContainer,
  ImageBackground,
  

  
  
 } from './../components/styles';
import { StatusBar } from 'expo-status-bar';




const Home = () => {
  const navigation = useNavigation();
   const [profile, setProfile] = useState(null);
   const [profiles,setProfiles] = useState([]); //profiles list
      const [loading, setLoading] = useState(true);
      const [user, setUser] = useState(null);
      const [users, setUsers] = useState([]);
      const [searchQuery, setSearchQuery] = useState('');
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
            const profileResponse = await getProfileList();
            if (profileResponse) {
                 setProfiles(profileResponse);
                console.log("📋 Λίστα Προφίλ:", profileResponse);
            }
          } catch (error) {
            console.error("⚠️ Σφάλμα κατά τη λήψη της λίστας προφίλ:", error);
          }

          // καλώ το API για την ΛΙΣΤΑ των χρηστών
          try {
            const usersData = await getUsersList();
            if (usersData) {
              setUsers(usersData);
              console.log("👥 Λίστα χρηστών:", usersData);
            }
          } catch (error) {
            console.error("⚠️ Σφάλμα κατά τη λήψη της λίστας χρηστών:", error);
          }

        } else {
          console.log("⏹ Δεν βρέθηκε accessToken!");
        }
        setLoading(false);

      };
  
      fetchData();
    }, []);


    

    // Συνδυάζω τα δεδομένα των χρηστών και των προφίλ
    // για να τα εμφανισω στο ιδιο flatlis
  const combinedData = users.map((user, index) => {
    return {
      ...user,
      profile: profiles[index],  // Προσθέτουμε το επαγγελματικό προφίλ στον χρήστη
    };
  });



    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } 

     

  return (
    <IndexContainer>
      <IndexTopContainer>
        <Row>
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
        
                "Αναζήτηση χρήστη..."   
        </TextInput>
       
          <AppContainer>
           <SmallButton>
             <Feather 
                 name='search'
                 size={29}
                 color='black'
             />
           </SmallButton>
           <SmallButton onPress={() => navigation.navigate("ConversationList")}>
             <MaterialCommunityIcons
                 name='facebook-messenger'
                 size={29}
                 color='black'
             />
           </SmallButton>
           
        </AppContainer>
      </Row>
      </IndexTopContainer>
    
      <IndexBottomContainer1>
       <ImageBackground resizeMode="cover" source={require('./../assets/images/ww1.jpg')}>
      <FlatList
      data={combinedData}
      contentContainerStyle={{
        padding:7,
        paddingTop:StatusBar.currentHeight || 24
        }}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        
        <TouchableOpacity onPress={() => navigation.navigate("ProfileIndex", {profileData: item})} >

        <View style={{ padding:10, flexDirection:'row', marginBottom:10, backgroundColor: 'rgba(255, 255, 255, 0.8)',  borderRadius: 10,
           
           elevation:5
        }}>
         <Avatar 
                       source={ item.profile?.profile_picture 
                                ? { uri: item.profile.profile_picture } 
                                : require("./../assets/images/default-image.jpg") } // Χρησιμοποιούμε το URI για εξωτερικό URL
                                size={50}
                                align="right"


                      />
          <View>
          <Text style={{ fontSize: 21, fontWeight: '600'}}> {item.name || 'Όνομα μη διαθέσιμο'} </Text>
          <Text style={{fontSize:16, opacity: .7}}> {item.profile?.jobTypeLabel || 'Εργασία μη διαθέσιμη'}</Text>
          <Text style={{fontSize:14, opacity: .7}}> Φορέας Εργασίας: {item.profile?.job_name || 'Φορέας μη διαθέσιμος'}</Text>
          <Text style={{fontSize:14, opacity: .7, color: '#0099cc'}}>Εξειδίκευση: {item.profile?.experience || 'Εξειδίκευση μη διαθέσιμη'}</Text>
          {/* Πρόσθεσε οποιαδήποτε πεδία θέλεις από το προφίλ */}
        </View>
        </View>
       </TouchableOpacity> 
      
      )}
     
    />
          </ImageBackground>  
        </IndexBottomContainer1>
    </IndexContainer>
  )
};

export default Home;