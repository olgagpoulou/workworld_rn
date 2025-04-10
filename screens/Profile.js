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
    ProfileContainer,
    InnerConatiner,
    Background,
    PageTitle,
    Overlay,
    LoginContainer,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputText,
    StyledInputProfileText,
    StyledInputLabel,
    StyledButton,
    ButtonText,
    MsgBox,
    ProfileImage,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
    ProfileImageImages,
    PickerStyle,
    PickerView
   
  
    
   } from './../components/styles';
import styled from 'styled-components';

 


const Profile = ({navigation}) => {

  useEffect(() => {
    console.log('Profile screen loaded');  // Έλεγχος για φόρτωση
  }, []);


    const [photo, setPhoto] = useState(null); // Για την αποθήκευση της εικόνας
  
  // Επικύρωση φόρμας με Yup
  const validationSchema = Yup.object().shape({
    jobType: Yup.string().required('Απαιτείται τύπος εργασίας'),
  
    ministry: Yup.string().when('jobType', (jobType, schema) =>
      jobType === 'public' ? schema.required('Απαιτείται Υπουργείο') : schema.nullable()
    ),
  
    companyType: Yup.string().when('jobType', (jobType, schema) =>
      jobType === 'private' ? schema.required('Απαιτείται τύπος εταιρείας') : schema.nullable()
    ),
  
    specialization: Yup.string().when('jobType', (jobType, schema) =>
      jobType === 'freelancer' ? schema.required('Απαιτείται ειδικότητα') : schema.nullable()
    ),
  
    
    profilePicture: Yup.mixed() //εχω προβλημα εδω
    .required('Απαιτείται φωτογραφία προφίλ')
    .test('fileExists', 'Πρέπει να επιλέξετε μια εικόνα',
       (value) => { return  value && value.uri !== 'file://' && value.uri !== '';}),

    job_name: Yup.string().required('Απαιτείται Φορέας Εργασίας'),
  
    experience: Yup.string().required('Απαιτείται Τομέας Ειδίκευσης'),
  
    job_address: Yup.string().required('Απαιτείται Διεύθυνση Εργασίας'),
  
    job_phone: Yup.string()
      .required('Απαιτείται Τηλέφωνο Εργασίας')
      .matches(/^[0-9]{10}$/, 'Το τηλέφωνο πρέπει να αποτελείται από 10 ψηφία'),
  });
  
    



   // ενημερωση του formData με τα δεδομενα και αποστολή(καλώντας την συναρτησ αποστολης)
   const handleSubmit = (values) => {
    console.log('handleSubmit εκτελέστηκε');
    console.log('Τιμές από τη φόρμα:', values);

   const formData = new FormData();
    formData.append('job_type', values.jobType);

    if (values.jobType === 'public') {
      
      formData.append('ministry', values.ministry);
      console.log('Adding ministry', values.ministry);
    } else if (values.jobType === 'private') {
      console.log('Adding company_type');
      formData.append('company_type', values.companyType);
    } else if (values.jobType === 'freelancer') {
      console.log('Adding specialization');
      formData.append('specialization', values.specialization);
    }
    formData.append('job_name', values.job_name);
    formData.append('experience', values.experience);
    formData.append('job_address', values.job_address);
    formData.append('job_phone', values.job_phone);

  
    // Προσθήκη της εικόνας αν υπάρχει
     if (photo && photo.uri) {
    formData.append('profile_picture', {
      uri: photo.uri,
      name: photo.fileName || 'default_image.jpg', // Εάν το fileName δεν υπάρχει, χρησιμοποίησε κάποιο default
      type: photo.mimeType || 'image/jpeg', // Εάν το mimeType δεν υπάρχει, χρησιμοποίησε 'image/jpeg'
    });
  } else {
    console.log("Δεν επιλέχθηκε εικόνα ή δεν είναι έγκυρη.");
  }    


     // Debugging: Log το περιεχόμενο του formData
  console.log('111111111111111formData περιεχόμενο:');
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }

      
    // Καλούμε την συνάρτηση  που στέλνει τα δεδομένα στο API ώστε πατώντας το button=Υποβολή να διαβαζει τα data απο την φόρμα, να τα αποθηκευσει και να καλει την συναρτηση για αποστολη
    console.log('Αποστολή δεδομένων στο API:', formData);
    console.log('Κλήση της συνάρτησης submitProfileData');
    submitProfileData(formData);
  
    console.log('Η συνάρτηση submitProfileData εκτελέστηκε');
   };
   

// Αποστολή δεδομένων στο API
const submitProfileData = async (formData) => {
  console.log('αααααααααformData προς αποστολή:');
for (let pair of formData.entries()) {
  console.log(`${pair[0]}:`, pair[1]);
}
  console.log("Δεδομένα που στέλνονται στο API:", formData);  // Προσθήκη για debugging
  try {
    // Ανάκτηση του access token από το SecureStore
    const accessToken = await SecureStore.getItemAsync('accessToken');
    console.log('Ανακτήθηκε το access token:', accessToken);  // Log για το token

    if (accessToken) { 
      console.log('formData:', formData); 
      // Στείλε τα δεδομένα στο API με το token στον header
      const response = await axios.post('http://192.168.1.131:8000/api/profile/create/', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
          
        },
        
      });
      console.log('Headers που στέλνονται στο API:', response.headers);
      console.log('Profile updated successfully:', response.data);
    } else {
      console.log('No access token found');
    }
  } catch (error) {
    console.error('Error submitting profile data:', error);
  }
};


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

  return (
    
      <StyledContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
      
      
        <PageTitle>Επαγγελματικό Προφίλ</PageTitle>
        
        <Formik
          initialValues={{
            jobType: '',
            ministry: '',
            companyType: '',
            specialization: '',
            profilePicture: {},
            job_name: '',
            experience: '',
            job_address: '',
            job_phone: '',
          }}
          //validationSchema={validationSchema}
          /*onSubmit={handleSubmit}*/
          onSubmit={(values) => {
          console.log('Form submitted. Form values:', values);  // Προσθήκη log για να δούμε αν καλείται το onSubmit
          handleSubmit(values);  // Καλεί την handleSubmit, αν δεν εμφανίζεται το log εδώ το πρόβλημα είναι σε αυτήν
          }}
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
              

              {/* Επιλογή Εικόνας */}
              <StyledButton jobprofilebutton={true} onPress={pickImage}>
                <ButtonText>Επιλέξτε Φωτογραφία Προφίλ</ButtonText>
              </StyledButton>
              {photo && <Image source={{ uri: photo.uri }} style={{ width: 150, height: 150, borderRadius: 75 }} />}

              {errors.profilePicture && touched.profilePicture && <MsgBox>{errors.profilePicture}</MsgBox>}

              {/* Υποβολή */}
              <StyledButton jobprofilebutton={true}  onPress={() => {
                  console.log('Υποβολή πατημένο');
                  console.log('Εκτελείται το handleSubmit');
                   handleSubmit();  // Εδώ καλείται η handleSubmit
                    }}>
                <ButtonText>Υποβολή</ButtonText>
              </StyledButton>


              
              </FormCard>
             
              </>
          )}
       
        </Formik>
      </ScrollView>
    </StyledContainer>
   
     );

}


export default Profile;
