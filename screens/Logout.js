import React from 'react';
import * as SecureStore from 'expo-secure-store'; // Εισαγωγή της βιβλιοθήκης SecureStore
import { useNavigation } from '@react-navigation/native';
import { Button, View } from 'react-native';


import { StatusBar } from 'expo-status-bar';

//formik;
import { Formik } from 'formik';

//Yup
import * as Yup from 'yup'; // Για επικύρωση (προαιρετικά)

//icons
import {Octicons,Ionicons,Fontisto} from '@expo/vector-icons';


import {
    StyledContainer,
    InnerConatiner,
    Background,
    PageTitle,
    Overlay,
    LoginContainer,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
    
   } from './../components/styles';
   
  



const Logout = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Διαγραφή του token από το Secure Storage
      await SecureStore.deleteItemAsync('token'); // Διαγράφει το token από το Secure Storage

      // Ανακατεύθυνση στην οθόνη Login
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error: ', error);
    }
  };

  return (
     <StyledContainer>
            <StatusBar style="dark" />
            <InnerConatiner>
            <PageTitle>Work World</PageTitle>
                <Background resizeMode="cover" source={require('./../assets/images/ww1.jpg')}>
                  <Overlay />
                  
                    <LoginContainer>
                        <SubTitle>Account Logout</SubTitle>

                        <Formik
                        >
                              {({
                                    handleChange, // Ενημερώνει τις τιμές των πεδίων
                                    handleBlur,   // Ελέγχει αν ένα πεδίο έχασε την εστίαση
                                    handleSubmit, // Υποβάλλει τα δεδομένα
                                    values,       // Περιέχει τις τιμές των πεδίων
                                    errors,       // Περιέχει τα σφάλματα
                                    touched,      // Ελέγχει αν ένα πεδίο έχει τροποποιηθεί
                                }) => (
                                    <StyledFormArea>
                                        
                                        <StyledButton onPress={(handleLogout)   } >
                                            <ButtonText >
                                                Logout
                                            </ButtonText>
                                        </StyledButton>
                                        <Line />
                                        
                                        <ExtraView>
                                            <ExtraText>You don't want to log out yet? </ExtraText>
                                            <TextLink onPress={() =>  navigation.navigate("Home")}>
                                                <TextLinkContent> Cancel</TextLinkContent>
                                            </TextLink>
                                        </ExtraView>

                                    </StyledFormArea>
                                )

                              }  
                              </Formik>
                    </LoginContainer> 

                </Background>

           

            </InnerConatiner>
         

        </StyledContainer>

    );
};

export default Logout;