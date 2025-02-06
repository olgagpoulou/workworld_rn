import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import React, { useState,useEffect } from 'react';




export const getProfileData = async () => {
  

  /*κανω τις αντιστοιχιες γιατι θελω να εμφανιζω τα labels*/
  const jobTypeLabels = {
    public: 'Δημόσιος Υπάλληλος',
    private: 'Ιδιωτικός Υπάλληλος',
    freelancer: 'Ελεύθερος Επαγγελματίας',
  };

  const ministryLabels = {
    education: 'Υπουργείο Παιδείας',
    health: 'Υπουργείο Υγείας',
    finance: 'Υπουργείο Οικονομικών',
  };

  const companyTypeLabels = {
    tech: 'Τεχνολογία',
    finance: 'Χρηματοοικονομικά',
    retail: 'Λιανικό Εμπόριο',
  };

  const specializationLabels = {
    doctor: 'Γιατρός',
    lawyer: 'Δικηγόρος',
    engineer: 'Μηχανικός',
  };

    console.log("Fetching profile data...");
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      console.log('Access token:ΓΓΓΓΓΓΓΓΓΓΓΓΓΓΓΓ', accessToken);
      if (accessToken) {
        const response = await axios.get(`http://192.168.1.131:8000/api/profile/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const updatedData ={
          ...response.data,
        jobTypeLabel: jobTypeLabels[response.data.job_type] || response.data.job_type,
        ministryLabel: ministryLabels[response.data.ministry] || response.data.ministry,
        companyTypeLabel :companyTypeLabels[response.data.company_type] || response.data.company_type,
        specializationLabel: specializationLabels[response.data.specialization] || response.data.specialization
        };
        console.log('Responsekkkkkkkkkkk Profildata from API:', updatedData);
        return updatedData;
      } else {
        console.log('No access token found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      return null;
    }


};

//-----getprofilelist----

export const getProfileList = async () => {
  

  /*κανω τις αντιστοιχιες γιατι θελω να εμφανιζω τα labels*/
  const jobTypeLabels = {
    public: 'Δημόσιος Υπάλληλος',
    private: 'Ιδιωτικός Υπάλληλος',
    freelancer: 'Ελεύθερος Επαγγελματίας',
  };

  const ministryLabels = {
    education: 'Υπουργείο Παιδείας',
    health: 'Υπουργείο Υγείας',
    finance: 'Υπουργείο Οικονομικών',
  };

  const companyTypeLabels = {
    tech: 'Τεχνολογία',
    finance: 'Χρηματοοικονομικά',
    retail: 'Λιανικό Εμπόριο',
  };

  const specializationLabels = {
    doctor: 'Γιατρός',
    lawyer: 'Δικηγόρος',
    engineer: 'Μηχανικός',
  };

    console.log("Fetching profile data...");
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      console.log('Access token:ΓΓΓΓΓΓΓΓΓΓΓΓΓΓΓΓ', accessToken);
      if (accessToken) {
        const response = await axios.get('http://192.168.1.131:8000/api/user_profiles/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        

        console.log("Raw API Response:", response.data);

      // Μετατροπή του αντικειμένου σε array
      const profilesArray = Object.values(response.data);

      // Προσθήκη labels στο κάθε profile
      const updatedProfiles = profilesArray.map(profile => ({
        ...profile,
        jobTypeLabel: jobTypeLabels[profile.job_type] || profile.job_type,
        ministryLabel: ministryLabels[profile.ministry] || profile.ministry,
        companyTypeLabel: companyTypeLabels[profile.company_type] || profile.company_type,
        specializationLabel: specializationLabels[profile.specialization] || profile.specialization
      }));

      console.log('Updated Profile Data:', updatedProfiles);
      return updatedProfiles;
    } else {
      console.log('No access token found');
      return [];
    }
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return [];
  }
};


//-----ews wdv-------




export const getUserData = async () => {
 
  try {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    console.log('Access token:UUUUUUUUUUUUUUU', accessToken);
       if (accessToken){
        const response = await axios.get('http://192.168.1.131:8000/api/user/', {
        headers: { Authorization: `Bearer ${accessToken}` },
          });
        console.log('Response user from API:', response.data);
       

        return response.data;
       } else {

        console.log('not access Token', accessToken);
       }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }

};


export const getUsersList = async () => {
  
  try {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    if (!accessToken) {
      console.log("⏹ Δεν βρέθηκε accessToken!");
      return null;
    }

    const response = await axios.get('http://192.168.1.131:8000/api/users/', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("📝 Λίστα profil:", response.data);
    return response.data;
    console.log("📝 Λίστα χρηστών11111111111:", response.updatedData);
  } catch (error) {
    console.error("❌ Σφάλμα στη λήψη χρηστών:", error);
    return null;
  }
};