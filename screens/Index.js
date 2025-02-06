import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import  {useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView,View, Text, TextInput, Button, Image ,  Platform , Alert  } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

//formik;
import { Formik } from 'formik';


//Yup
import * as Yup from 'yup'; // Για επικύρωση (προαιρετικά)

//icons
import {Feather} from '@expo/vector-icons';
import { getProfileData,getUserData } from "./../components/api";
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';





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
    Header,
    Card,
    Name,
    Email,
    Info,
    SkillsTitle,
    SmallRow,
    SkillsContainer,
    Skill,
    
   } from './../components/styles';

  
   const Index = ({navigation}) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [coordinates, setCoordinates] = useState(null);
    const [loginStatus, setLoginStatus] = useState(false);
  const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [location, setLocation] = useState(null);
    const [locationmap, setLocationMap] = useState(null);
    const [isCoordinatesLoaded, setIsCoordinatesLoaded] = useState(false);

   
    console.log("Η ProfileScreen φορτώθηκε!"); 
   
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
      console.log("🔄 useEffect ξεκίνησε...");

      const fetchData = async () => {
        const accessToken = await SecureStore.getItemAsync('accessToken');
        console.log("accessToken ανακτήθηκε:", accessToken); 
         if (accessToken) {
              console.log("📡 Καλούμε τη getProfileData...");
              const data = await getProfileData();
          
              console.log("✅ Δεδομένα που επιστράφηκαν:", data);
      
              if (data) {
                setProfile(data);
                console.log("📝 profile ενημερώθηκε:", data);
                // Κλήση για συντεταγμένες μετά την ενημέρωση του προφίλ
                 const coords = await getCoordinatesFromAddress(data.job_address);
                 console.log("📝 addressssssss ", coords);

                   if (coords) {
                    setTimeout(() => {
                    console.log("⚠️ Η διεύθυνση επιστράφηκε σωστά!", coords);
                     setLocationMap(coords); // Άμεση ενημέρωση της τοποθεσίας
                    }, 10); 
                     console.log("⚠️ Η διεύθυνση επιστράφηκε σωστά!", locationmap);
                    } else {
                      console.log("⚠️ Η διεύθυνση δεν επιστράφηκε σωστά!");
                    }

              } else {
                console.log("⚠️ Δεν βρέθηκαν δεδομένα προφίλ!");
                }
              } else {
                  console.log("⏹ Δεν βρέθηκε accessToken!");
              }

          if (accessToken) {
                console.log("📡 Καλούμε τη getUserData...");
                const userData = await getUserData();
         
                 if (userData) {
                    setUser(userData);
                  } else {
                    console.log("⚠️ Δεν βρέθηκαν δεδομένα user!");
                  }
                  } else {
                  console.log("⏹ Δεν βρέθηκε accessToken!");
                  }  
                  
                  setLoading(false);
      };
           
          fetchData();
                },[]);
                useEffect(() => {
                  if (locationmap) {
                    setIsCoordinatesLoaded(true); // Όταν ενημερωθούν οι συντεταγμένες, βάζουμε την τιμή σε `true`
                  }
                }, [locationmap]); // Παρακολουθούμε την αλλαγή στο locationmap
   
    return (
      
    <IndexContainer>
        <IndexTopContainer>
          <IndexOuterBoxContainer>
             <BoxText fontSize={22}> {profile ?  profile.jobTypeLabel : "Φόρτωση..."} </BoxText>
          <IndexInnerBoxContainer>
          
            <BoxView>
            
             <Avatar 
               source={ profile?.profile_picture 
                        ? { uri: profile.profile_picture } 
                        : require("./../assets/images/default-image.jpg") } // Χρησιμοποιούμε το URI για εξωτερικό URL
                 align="center"

              />
              
            </BoxView>
           
          <Name>{user ?  user.name : "Φόρτωση..."}</Name>
          <EditButton onPress={() => navigation.navigate("EditProfile")}>
              <Feather name="edit" size={24} color="#3498db" />
              </EditButton>
         </IndexInnerBoxContainer>
        </IndexOuterBoxContainer>
    </IndexTopContainer>
    <ScrollView>
    <IndexBottomContainer1>
    <Cardcontainer>
    
      <Name>Φορέας Εργασίας: {profile ? profile.job_name : "Φωρτωση..."}</Name>
      <Info> {profile ? profile.ministryLabel || profile.companyLabel || profile.specializationLabel : "Φωρτωση..."}</Info>
      <Divider />
      <SkillsTitle>Εξειδίκευση:  {profile ? profile.experience : "Φωρτωση..."}</SkillsTitle>
       <Card>
       <SmallRow>
      <FontAwesome name="address-book-o" size={24} color="black" />
      <Info>   {profile ? profile.job_address: "Φόρτωση..."} </Info>
      </SmallRow>
      <SmallRow>
      <SimpleLineIcons name="phone" size={22} color="black" />
      <Info>  {profile ? profile.job_phone: "Φόρτωση..."} </Info>
      </SmallRow>
       <SmallRow>
       <Fontisto name="email" size={24} color="black" />
       <Email >  {user ?  user.email : "Φόρτωση..."}</Email>
      </SmallRow>
       </Card>
      </Cardcontainer>
      </IndexBottomContainer1>

      <IndexBottomContainer1 marginTop= {10}>
     <View style={styles.container}>
     {
        isCoordinatesLoaded ? (
    <MapView
      style={styles.map}
      region={{
        latitude: locationmap.lat, // Συντεταγμένες
        longitude: locationmap.lng,
        latitudeDelta: 0.01, // Zoom level
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
     
     
   
   
        
    )

   };

   export default Index;

   const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: 360,
     
    },
  });