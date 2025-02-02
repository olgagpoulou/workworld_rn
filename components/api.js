import axios from 'axios';


export const getProfileData = async () => {
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


}