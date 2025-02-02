import React, { useState,useEffect } from 'react';
import { ScrollView } from 'react-native'; // Import ScrollView
import { View, Text, TextInput, Button, Image , StyleSheet,  Platform , Alert  } from 'react-native';
import { Formik } from 'formik';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker'; // Για την επιλογή εικόνας
//colors
import { Colors } from './../components/styles';


import {
    StyledContainer,
    FormCard,
    PageTitle,
    StyledInputProfileText,
    StyledButton,
    ButtonText,
    MsgBox,
    ExtraText,
    ExtraView,
    PickerStyle,
   } from './../components/styles';
import styled from 'styled-components';

 

const EditProfile = ({navigation,route}) => {
    const { profileId } = route.params; 
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);


  useEffect(() => {
    console.log('Profile screen loaded');  // Έλεγχος για φόρτωση
    fetchProfileData();
  }, []);

// Συνάρτηση για να ανοίξουμε την κάμερα ή το gallery για να επιλέξει εικόνα ο χρήστης
 const pickImage = async () => {
  // Ζητάμε άδεια για τη χρήση της κάμερας και της γκαλερί
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  console.log("Άδεια status:", status);
  if (status !== 'granted') {
    alert('Η άδεια για την πρόσβαση στις εικόνες είναι απαραίτητη');
    return;
  }

  //απο εδω
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,  
    allowsEditing: true, // Επιτρέπει την επεξεργασία
    aspect: [4, 3], // Αναλογία εικόνας (προαιρετικό)
    quality: 1, // Ποιότητα εικόνας
  });  
  console.log("Αποτέλεσμα από την βιβλιοθήκη εικόνας:", result);

//εξτρα ελεγχος γιατι ενω επιλεγω εικονα, βγαζει σφαλμα
if (!result.canceled && result.assets && result.assets[0] && result.assets[0].uri) {
  console.log("Επιλέχθηκε η εικόνα:", result.assets[0]);
  console.log('URI εικόνας:', result.assets[0].uri);
  setPhoto(result.assets[0]);  // Αποθήκευση εικόνας στο state
  console.log("LLLLLLLLLLLLLΗ εικόνα αποθηκεύτηκε στο state:", result.assets[0]);
} else {
  console.log("Η επιλογή εικόνας ακυρώθηκε ή δεν υπάρχει αποτέλεσμα");
}
};

  const [initialValues, setInitialValues] = useState({
    jobType: '',
    companyType: '',
    specialization: '',
    profilePicture: null,
    job_name: '',
    experience: '',
    job_address: '',
    job_phone: '',
  });

// Φόρτωση των δεδομένων του προφίλ
const fetchProfileData = async () => {
    console.log("Fetching profile data...");
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      console.log('Access token:ΓΓΓΓΓΓΓΓΓΓΓΓΓΓΓΓ', accessToken);
      if (accessToken) {
        const response = await axios.get(`http://192.168.1.131:8000/api/profile/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log('Response ααααααααααααααfrom API:', response.data);
        setInitialValues({
            jobType: response.data.job_type || '' ,
            ministry: response.data.ministry || '',
            companyType: response.data.company_type || '',
            specialization: response.data.specialization || '',
            profilePicture: response.data.profile_picture || '',
            job_name: response.data.job_name || '',
            experience: response.data.experience || '',
            job_address: response.data.job_address || '',
            job_phone: response.data.job_phone || '',
          });
          console.log('Response data from API:',initialValues);
      } else {
        console.log('No access token found');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }finally {
      setLoading(false);  // Σταματάμε το loading
    }
  };  

   //hundleupdateprofile εμφανιζω οτι υπαρχει στο προφιλ
   const handleUpdateProfile = async (values) => 
  {
    console.log("Submitting updated profile:", values);  
   
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      console.log("TOKEN:", accessToken);
      const response = await axios.put('http://192.168.1.131:8000/api/profile/', values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Profile updated successfully:', response.data);
      alert('Το προφίλ ενημερώθηκε επιτυχώς!');
    } catch (error) {
      // Εδώ προσθέτουμε το error.response για να δούμε την ακριβή αιτία του σφάλματος
    if (error.response) {
      // Αν το API επιστρέψει σφάλμα με απόκριση
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      alert(`Υπήρξε σφάλμα κατά την ενημέρωση του προφίλ: ${error.response.data.detail || 'Άγνωστο σφάλμα'}`);
    } else {
    // Αν δεν υπάρχει απόκριση (π.χ., πρόβλημα δικτύου)
    console.error('Error without response:', error);
    alert('Υπήρξε σφάλμα κατά την ενημέρωση του προφίλ.');
    }
  } finally {
      setLoading(false);
    }
    console.log("Εκτελείται το ProfileScreen");
  };
  
  
  return (
    
    
      <StyledContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
      
      
        <PageTitle>Επαγγελματικό Προφίλ</PageTitle>
        
        <Formik
          initialValues={initialValues}
          enableReinitialize={true} // Επιτρέπει στο Formik να ενημερώνεται όταν αλλάζουν τα δεδομένα
             onSubmit={handleUpdateProfile}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <>
             
              {/* Τύπος Εργασίας - Picker */}
            <FormCard>
            <ExtraView>
              <ExtraText> Επιλογή Καθεστώτος Εργασίας</ExtraText>
            </ExtraView>
           
            <PickerStyle 
            selectedValue={values.jobType}
            onValueChange={(itemValue) => setFieldValue('jobType', itemValue)}
            
           
          >
            <Picker.Item label="Δημόσιος Υπάλληλος" value="public" />
            <Picker.Item label="Ιδιωτικός Υπάλληλος" value="private" />
            <Picker.Item label="Ελεύθερος Επαγγελματίας" value="freelancer" />
            </PickerStyle>
         
          {errors.jobType && touched.jobType && <Text style={styles.error}>{errors.jobType}</Text>}
           

              {/* Επιλογές ανάλογα με τον Τύπο Εργασίας */}
              
              {values.jobType === 'public' && (
                <>
             {/* Τίτλος πάνω από το Picker */}
                <ExtraView>
                  <ExtraText>Επιλογή Υπεύθυνου Υπουργείου</ExtraText>
                </ExtraView>
                
                <Picker
                  selectedValue={values.ministry}
                  onValueChange={(itemValue) => setFieldValue('ministry', itemValue)}
                  style={styled.pickerStyle}
                >
                  <Picker.Item label="Υπουργείο Παιδείας" value="education" />
                  <Picker.Item label="Υπουργείο Υγείας" value="health" />
                  <Picker.Item label="Υπουργείο Οικονομικών" value="finance" />
                </Picker>
               </> 
              )}
              
              {values.jobType === 'private' && (
                <>
             {/* Τίτλος πάνω από το Picker */}
                <ExtraView>
                  <ExtraText>Τομέας Εργασίας</ExtraText>
                </ExtraView>

                <Picker
                  selectedValue={values.companyType}
                  onValueChange={(itemValue) => setFieldValue('companyType', itemValue)}
                >
                  <Picker.Item label="Τεχνολογία" value="tech" />
                  <Picker.Item label="Χρηματοοικονομικά" value="finance" />
                  <Picker.Item label="Λιανικό Εμπόριο" value="retail" />
                </Picker>
                </>
              )}

              {values.jobType === 'freelancer' && (
                <>
             {/* Τίτλος πάνω από το Picker */}
                <ExtraView>
                  <ExtraText>Ειδικότητα</ExtraText>
                </ExtraView>

                <Picker
                  selectedValue={values.specialization}
                  onValueChange={(itemValue) => setFieldValue('specialization', itemValue)}
                >
                  <Picker.Item label="Γιατρός" value="doctor" />
                  <Picker.Item label="Δικηγόρος" value="lawyer" />
                  <Picker.Item label="Μηχανικός" value="engineer" />
                </Picker>
                </>
              )}
              <StyledInputProfileText
                    label="Φορέας Εργασίας"
                    placeholder="Φορέας Εργασίας"
                    onChangeText={handleChange('job_name')}
                    onBlur={handleBlur('job_name')}
                    value={values.job_name}
                />
                 <StyledInputProfileText
                    label="Τομέας Εξειδίκευσης"
                    placeholder="Τομέας Εξειδίκευσης"
                    onChangeText={handleChange('experience')}
                    onBlur={handleBlur('experience')}
                    value={values.experience}
                />
                 <StyledInputProfileText
                    label="Διεύθυνση Εργασίας"
                    placeholder="Διεύθυνση Εργασίας"
                    onChangeText={handleChange('job_address')}
                    onBlur={handleBlur('job_address')}
                    value={values.job_address}
                />
                 <StyledInputProfileText
                    label="Τηλέφωνο Εργασίας"
                    placeholder="Τηλέφωνο Εργασίας"
                    onChangeText={handleChange('job_phone')}
                    onBlur={handleBlur('job_phone')}
                    value={values.job_phone}
                />
               
               {/*eikona apo api*/}
               {initialValues.profilePicture && (
          <Image
            source={{ uri: initialValues.profilePicture }} // Εδώ χρησιμοποιούμε το URI της εικόνας από το API
            style={{ width: 150, height: 150, borderRadius: 75 }}
          />
        )}

              {/* Επιλογή Εικόνας */}
              <StyledButton jobprofilebutton={true} onPress={pickImage}>
                <ButtonText>Επιλέξτε Φωτογραφία Προφίλ</ButtonText>
              </StyledButton>
              {photo && <Image source={{ uri: photo.uri }} style={{ width: 150, height: 150, borderRadius: 75 }} />}

              {errors.profilePicture && touched.profilePicture && <MsgBox>{errors.profilePicture}</MsgBox>}

              {/* Υποβολή */}
              <StyledButton jobprofilebutton={true} onPress={handleSubmit}>
              <ButtonText>Ενημέρωση</ButtonText>
              </StyledButton>


              
              </FormCard>
             
              </>
          )}
       
        </Formik>
      </ScrollView>
    </StyledContainer>
   
     );

    }

export default EditProfile;