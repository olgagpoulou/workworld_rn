import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, Image , StyleSheet,  Platform , Alert  } from 'react-native';
import { Formik } from 'formik';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker'; // Για την επιλογή εικόνας
//colors
import { Colors } from './../components/styles';

import {
    StyledContainer,
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
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
    ProfileImageImages,
  
    
   } from './../components/styles';
import styled from 'styled-components';

  // import styles from './../components/styles';  



const ProfileScreen = () => {
    const [photo, setPhoto] = useState(null); // Για την αποθήκευση της εικόνας

 // Επικύρωση φόρμας με Yup
 const validationSchema = Yup.object({
    jobType: Yup.string().required('Απαιτείται τύπος εργασίας'),
  
    ministry: Yup.string().when('jobType', {
      is: 'public',
      then: Yup.string().required('Απαιτείται Υπουργείο'),
      otherwise: Yup.string().nullable(),
    }),
  
    companyType: Yup.string().when('jobType', {
      is: 'private',
      then: Yup.string().required('Απαιτείται τύπος εταιρείας'),
      otherwise: Yup.string().nullable(),
    }),
  
    specialization: Yup.string().when('jobType', {
      is: 'freelancer',
      then: Yup.string().required('Απαιτείται ειδικότητα'),
      otherwise: Yup.string().nullable(),
    }),
  
    profilePicture: Yup.mixed().required('Απαιτείται φωτογραφία προφίλ'),
  
    job_name: Yup.string().required('Απαιτείται Φορέας Εργασίας'),
  
    experience: Yup.string().required('Απαιτείται Τομέας Ειδίκευσης'),
  
    job_address: Yup.string().required('Απαιτείται Διεύθυνση Εργασίας'),
  
    Job_phone: Yup.string()
      .required('Απαιτείται Τηλέφωνο Εργασίας')
      .matches(/^[0-9]{10}$/, 'Το τηλέφωνο πρέπει να αποτελείται από 10 ψηφία'),
  });
  

   // Χειριστής υποβολής
   const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('job_type', values.jobType);
    if (values.jobType === 'public') {
      formData.append('ministry', values.ministry);
    } else if (values.jobType === 'private') {
      formData.append('company_type', values.companyType);
    } else if (values.jobType === 'freelancer') {
      formData.append('specialization', values.specialization);
    }
    formData.append('job_name', values.job_name);
    formData.append('experience', values.experience);
    formData.append('job_address', values.job_address);
    formData.append('job_phone', values.job_phone);


    if (photo) {
      formData.append('profile_picture', {
        uri: photo.uri,
        name: photo.fileName,
        type: 'image/jpeg',
      });
    }

// Αποστολή δεδομένων στο API
axios
.put('http://192.168.1.131:8000/profiles/', formData, {
  headers: {
    Authorization: `Bearer yourToken`,
    'Content-Type': 'multipart/form-data',
  },
})
.then((response) => {
  console.log('Profile updated:', response.data);
  // Μπορείς να κατευθύνεις τον χρήστη στην επόμενη οθόνη αν θες
})
.catch((error) => console.log(error));
};

 // Συνάρτηση για να ανοίξουμε την κάμερα ή το gallery για να επιλέξει εικόνα ο χρήστης
 const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result);
    }
  };

  return (
    <StyledContainer>
      
        <PageTitle>Προφίλ</PageTitle>

        <Formik
          initialValues={{
            jobType: '',
            ministry: '',
            companyType: '',
            specialization: '',
            profilePicture: null,
            job_name: '',
            experience: '',
            job_address: '',
            job_phone: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <>
              {/* Τύπος Εργασίας - Picker */}
          <Picker
            selectedValue={values.jobType}
            onValueChange={(itemValue) => setFieldValue('jobType', itemValue)}
            style={styled.pickerStyle}
          >
           
            <Picker.Item label="Δημόσιος Υπάλληλος" value="public" />
            <Picker.Item label="Ιδιωτικός Υπάλληλος" value="private" />
            <Picker.Item label="Ελεύθερος Επαγγελματίας" value="freelancer" />
          </Picker>
          {errors.jobType && touched.jobType && <Text style={styles.error}>{errors.jobType}</Text>}

              {/* Επιλογές ανάλογα με τον Τύπο Εργασίας */}
              {values.jobType === 'public' && (
                <Picker
                  selectedValue={values.ministry}
                  onValueChange={(itemValue) => setFieldValue('ministry', itemValue)}
                >
                  <Picker.Item label="Υπουργείο Παιδείας" value="education" />
                  <Picker.Item label="Υπουργείο Υγείας" value="health" />
                  <Picker.Item label="Υπουργείο Οικονομικών" value="finance" />
                </Picker>
              )}

              {values.jobType === 'private' && (
                <Picker
                  selectedValue={values.companyType}
                  onValueChange={(itemValue) => setFieldValue('companyType', itemValue)}
                >
                  <Picker.Item label="Τεχνολογία" value="tech" />
                  <Picker.Item label="Χρηματοοικονομικά" value="finance" />
                  <Picker.Item label="Λιανικό Εμπόριο" value="retail" />
                </Picker>
              )}

              {values.jobType === 'freelancer' && (
                <Picker
                  selectedValue={values.specialization}
                  onValueChange={(itemValue) => setFieldValue('specialization', itemValue)}
                >
                  <Picker.Item label="Γιατρός" value="doctor" />
                  <Picker.Item label="Δικηγόρος" value="lawyer" />
                  <Picker.Item label="Μηχανικός" value="engineer" />
                </Picker>
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
              <StyledButton onPress={pickImage}>
                <ButtonText>Επιλέξτε Φωτογραφία Προφίλ</ButtonText>
              </StyledButton>
              {photo && <ProfileImageImages source={{ uri: photo.uri }} />}
              {errors.profilePicture && touched.profilePicture && <MsgBox>{errors.profilePicture}</MsgBox>}

              {/* Υποβολή */}
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Υποβολή</ButtonText>
              </StyledButton>
            </>
          )}
        </Formik>
      
   </StyledContainer>
  );
};

export default ProfileScreen;
