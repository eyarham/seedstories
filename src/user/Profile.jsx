import { Alert, Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../_common/Spinner';
import { AuthUserContext } from '../auth/AuthUserContextProvider';
import api from '../database/api';
import { FirebaseContext } from '../firebase/FirebaseContextProvider';
import { UserContext } from './UserContextProvider';

const Profile = () => {
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [isDirty, setIsDirty] = useState();
  const [showAlert, setShowAlert] = useState();
  const [alertSeverity, setAlertSeverity] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const authUser = useContext(AuthUserContext);
  const { db } = useContext(FirebaseContext);
  const userContext = useContext(UserContext);
  useEffect(() => {
    if (userContext && userContext.id) {
      setUpdatedProfile(userContext)
    }
  }, [userContext])
  const showSuccessAlert = () => {
    setAlertSeverity("success");
    setAlertMessage("saved successfully");
    setShowAlert(true);
    setIsDirty(false);
  }
  const showErrorAlert = error => {
    setAlertSeverity("error");
    setAlertMessage(`error: ${error}`);
    setShowAlert(true);
  }
  const clearAlert = () => {
    setAlertSeverity("");
    setAlertMessage("");
    setShowAlert(false);

  }
  const onClickUpdate = async () => {
    clearAlert();
    const usersApi = api(db, "users", authUser.uid);
    if (userContext && userContext.id) {
      try {
        await usersApi.updateDoc(userContext.id, updatedProfile);
        showSuccessAlert();
      }
      catch (error) {
        showErrorAlert(error);
      }
    }
    else {
      try {
        await usersApi.createDoc({ ...updatedProfile, uid: authUser.uid });
        showSuccessAlert();
      }
      catch (error) {
        showErrorAlert(error);
      }
    }
  }
  const onFieldChange = e => {
    clearAlert();
    const newValue = {};
    newValue[e.target.name] = e.target.value;
    setUpdatedProfile({ ...updatedProfile, ...newValue })
    setIsDirty(true);
  }
  if (!updatedProfile) return <Spinner />
  const { displayName, pronouns } = updatedProfile;
  return (
    <div>
      <div>My Profile</div>
      <div>
        <TextField placeholder='display name' name="displayName" value={displayName || ""} onChange={onFieldChange} /></div>
      <div>
        <TextField placeholder='pronouns' name="pronouns" value={pronouns || ""} onChange={onFieldChange} />
      </div>
      <div>
        <Button variant="contained" disabled={!isDirty} onClick={onClickUpdate}>Update</Button>
      </div>
      <div>
        {showAlert && <Alert severity={alertSeverity}>{alertMessage}</Alert>}

      </div>
    </div>
  )
}

export default Profile