import React from 'react';
import axios from 'axios';
import { View, Text, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import  {useEffect,useState} from 'react';
import { useRoute } from '@react-navigation/native';
import Fontisto from '@expo/vector-icons/Fontisto';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { ScrollView , TextInput, Button,   Platform , Alert  } from 'react-native';
import {
    IndexContainer,
    IndexTopContainer,
    IndexBottomContainer1,
    IndexOuterBoxContainer,
    IndexInnerBoxContainer,
    Avatar,
    BoxView,
    BoxText,
    EditButton,
    Cardcontainer,
    Divider,
    Card,
    Name,
    Email,
    Info,
    SkillsTitle,
    SmallRow,
    SkillsContainer,
    Skill,
    
   } from './../components/styles';

//icons
import {Feather} from '@expo/vector-icons';



import MapView, {Marker} from 'react-native-maps';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const ProfileIndex= () => {
    const navigation = useNavigation();
    const [locationmap, setLocationMap] = useState(null);
    const [isCoordinatesLoaded, setIsCoordinatesLoaded] = useState(false);
 const [coordinates, setCoordinates] = useState(null);

    const route = useRoute();
    const { profileData } = route.params; // Παίρνουμε τα δεδομένα που περάσαμε από την Home
  
// Συνάρτηση για να πάρω τις συντεταγμένες από την διεύθυνση εργασίας
const getCoordinatesFromAddress = async (address) => {
    try {
     
      const apiKey = 'AIzaSyBPQlkfGDQdpR2AFfRB18ZajhbMdpJWV1Q'; // Βάλε το Google Maps API Key σου
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
      const response = await axios.get(url);
      
      if (response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location;
        console.log("📝 JOB ADDRESS location", location );
        setCoordinates(location); // Αποθήκευση των συντεταγμένων
        return location; // Επιστροφή για χρήση εκτός της συνάρτησης
      } else {
        setError('Δεν βρέθηκε η διεύθυνση');
        setCoordinates(null)
        return null; // Επιστροφή για χρήση εκτός της συνάρτησης
      }
    } catch (err) {
      setError('Σφάλμα κατά τη λήψη συντεταγμένων');
      setCoordinates(null);
      return null; // Επιστροφή για χρήση εκτός της συνάρτησης
    }
  };
  useEffect(() => {
    console.log("🔍 useEffect εκτελείται...");
    console.log("📍 profileData:", profileData);
    console.log("📍 job_address:", profileData.profile.job_address);
  
    if (profileData?.profile?.job_address) {
      console.log("✅ profileData έχει διεύθυνση, εκτελώ mapData()");
      
      const mapData = async () => {
        const coords = await getCoordinatesFromAddress(profileData.profile.job_address);
        console.log("🗺️ Συντεταγμένες:", coords);
  
        if (coords) {
          setLocationMap(coords);
          setIsCoordinatesLoaded(true);
        }
      };
  
      mapData();
    }
  }, [profileData?.profile?.job_address]);// Εκτέλεση όταν αλλάξει το job_address
               
  useEffect(() => {
    if (locationmap) {
      console.log("🎯 Το locationmap ενημερώθηκε:", locationmap);
    }
  }, [locationmap]);

    
    return (

        <IndexContainer>
        <IndexTopContainer>
          <IndexOuterBoxContainer>
             <BoxText fontSize={22}> {profileData.profile ?  profileData.profile.jobTypeLabel : "Φόρτωση..."} </BoxText>
          <IndexInnerBoxContainer>
          <BoxView>
            
             <Avatar 
               source={ profileData.profile?.profile_picture 
                        ? { uri: profileData.profile.profile_picture } 
                        : require("./../assets/images/default-image.jpg") } // Χρησιμοποιούμε το URI για εξωτερικό URL
                 align="center"

              />
              
            </BoxView>
            <Name>{profileData.name ? profileData.name : "Φόρτωση..."}</Name>
            
            <EditButton onPress={() => navigation.navigate("ConversationList")}>
            <MaterialCommunityIcons
                 name='facebook-messenger'
                 size={29}
                 color='black'
             />
              </EditButton>
               
               </IndexInnerBoxContainer>
                      </IndexOuterBoxContainer>
                  </IndexTopContainer>
                  <ScrollView>
                  <IndexBottomContainer1>
              <Cardcontainer>
    
                  <Name>Φορέας Εργασίας: {profileData.profile.job_name ? profileData.profile.job_name : "Φόρτωση..."}</Name>
                  <Info> {profileData.profile ? profileData.profile.ministryLabel || profileData.profile.companyLabel || profileData.profile.specializationLabel : "Φωρτωση..."}</Info>
                  <Divider />
                  <SkillsTitle>Εξειδίκευση:  {profileData.profile ? profileData.profile.experience : "Φωρτωση..."}</SkillsTitle>
                  <Card>
       <SmallRow>
      <FontAwesome name="address-book-o" size={24} color="black" />
      <Info>   {profileData.profile ? profileData.profile.job_address: "Φόρτωση..."} </Info>
      </SmallRow>
      <SmallRow>
      <SimpleLineIcons name="phone" size={22} color="black" />
      <Info>  {profileData.profile ? profileData.profile.job_phone: "Φόρτωση..."} </Info>
      </SmallRow>
       <SmallRow>
       <Fontisto name="email" size={24} color="black" />
       <Email >  {profileData.email ?  profileData.email : "Φόρτωση..."}</Email>
      </SmallRow>
       </Card>

             
             </Cardcontainer>
             </IndexBottomContainer1>
          
       
   
    
         
      <IndexBottomContainer1 marginTop= {10}>
     <View style={styles.container}>
     {
  locationmap ? (
    <MapView
      style={styles.map}
      region={{
        latitude: locationmap?.lat || 0,
        longitude: locationmap?.lng || 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {/* Τα υπόλοιπα στοιχεία του χάρτη */}
    </MapView>
  ) : (
    <Text>Φόρτωση χάρτη...</Text> // Μπορείς να εμφανίσεις κάποιο loader αν χρειάζεται
  )
}
    </View>
    </IndexBottomContainer1>
    <Name>Τοποθεσία εργασίας</Name>
      
         </ScrollView>
         







      

      </IndexContainer>
    );
  };
  
  export default ProfileIndex;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: 360,
     
    },
  });