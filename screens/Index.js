import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import React, {useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Button, Image , StyleSheet,  Platform , Alert  } from 'react-native';

//formik;
import { Formik } from 'formik';


//Yup
import * as Yup from 'yup'; // Για επικύρωση (προαιρετικά)

//icons
import {Feather} from '@expo/vector-icons';
import { getProfileData,getUserData } from "./../components/api";






import {
    IndexContainer,
    IndexTopContainer,
    IndexBottomContainer,
    IndexOuterBoxContainer,
    IndexInnerBoxContainer,
    Avatar,
    BoxView,
    BoxText,
    EditButton,
    Background,
    PageTitle,
    Overlay,
    LoginContainer,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputText,
    StyledInputLabel,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
    
   } from './../components/styles';

  
   const Index = ({navigation}) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    console.log("Η ProfileScreen φορτώθηκε!"); 

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
            } else {
                console.log("⚠️ Δεν βρέθηκαν δεδομένα προφίλ!");
            }
          const userData = await getUserData();
            if (userData) {
              setUser(userData);
            }

        } else {
        console.log("⏹ Δεν βρέθηκε accessToken!");
        }
      }
  
      fetchData();
    },[]);
  
    

    return (
    <IndexContainer>
        <IndexTopContainer>
          <IndexOuterBoxContainer>
             <BoxText fontSize={22}> {profile ?  profile.jobTypeLabel : "Φόρτωση..."} </BoxText>
          <IndexInnerBoxContainer>
          
            <BoxView>
              <EditButton onPress={() => navigation.navigate("EditProfile")}>
                <Feather name="edit" size={24} color="#3498db" />
              </EditButton>
             <Avatar 
               source={ profile?.profile_picture 
                        ? { uri: profile.profile_picture } 
                        : require("./../assets/images/default-image.jpg") } // Χρησιμοποιούμε το URI για εξωτερικό URL
                 align="center"

              />
            </BoxView>
          
          <BoxText align="center" >Ονοματεπώνυμο: {user ?  user.name : "Φόρτωση..."}</BoxText>
                   
             <BoxText align="center">Email</BoxText>
         </IndexInnerBoxContainer>
        </IndexOuterBoxContainer>
    </IndexTopContainer>
    <IndexBottomContainer>
        <PageTitle>ena kommati rgtgynnnnnnnnnnnnnnrghr</PageTitle>
    </IndexBottomContainer>
    </IndexContainer>
    
    

        
    )

   };

   export default Index;