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
        console.log('Response ααααααααααααααfrom API:', response.data);

        const updatedData ={
          ...response.data,
        jobTypeLabel: jobTypeLabels[response.data.job_type] || response.data.job_type,
        ministryLabel: ministryLabels[response.data.ministry] || response.data.ministry,
        companyTypeLabel :companyTypeLabels[response.data.company_type] || response.data.company_type,
        specializationLabel: specializationLabels[response.data.specialization] || response.data.specialization
        };
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


export const getUserData = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync('accessToken');
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