import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, where } from "firebase/firestore";

// import { getCurrentSub } from "../user/api";
// Allows for better testing experience
const firebase = {
  collection, doc, getDoc, getFirestore, setDoc, deleteDoc
}

const api = (db, collectionString) => {
  // var db;
  // const getDb = () => {
  //   if (!db) { db = firebase.getFirestore(); }
  //   return db;
  // }
  var coll;
  const getCollection = () => {
    if (!coll) { coll = firebase.collection(db, collectionString); }
    return coll;
  }
  const getDocRef = (id) => {
    return firebase.doc(db, collectionString, id);
  }

  const getDocuments = async () => {
    const q = query(getCollection());
    const snapshot = await getDocs(q);
    return snapshot.docs;
  }

  const getDocsSub = (callback) => {
    const q = query(getCollection());
    const unsub = onSnapshot(q, snapshot => {
      callback(snapshot.docs);
    });
    return unsub;
  }
  const getById = async id => {
    const docRef = getDocRef(id);
    return await firebase.getDoc(docRef);
  }
  const getByIdSub = (id, callback) => {
    const unsub = onSnapshot(getDocRef(id), (docSnapshot) => {
      callback(docSnapshot);
    });
    return unsub;
  }

  const createDoc = async (doc, userId) => {

    const docToAdd = {
      createdBy: (userId) || "unknown",
      createdDate: new Date(),
      ...doc
    }
    return await addDoc(getCollection(), docToAdd);
  }

  const set = async (id, data) => {
    const docRef = getDocRef(id);
    const doc = await firebase.getDoc(docRef);
    const updatedData = { ...doc.data(), ...data };
    await firebase.setDoc(getDocRef(id), updatedData);
  }

  const updateDoc = async (id, data) => {
    const docRef = getDocRef(id);
    const doc = await firebase.getDoc(docRef);
    const updatedData = { ...doc.data(), ...data };
    await firebase.setDoc(getDocRef(id), updatedData);
  }

  const updateField = async (id, fieldObj) => {
    const docRef = getDocRef(id);
    const doc = await firebase.getDoc(docRef);
    const updatedData = { ...doc.data(), ...fieldObj };
    await firebase.setDoc(getDocRef(id), updatedData);
  }

  const deleteDocument = async id => {
    await firebase.deleteDoc(getDocRef(id));
  }

  const getDocsForCurrentUserSub = (user, callback) => {
    const q = query(getCollection(), where("createdBy", "==", user.uid));
    const unsub = onSnapshot(q, (querySnapshot) => {
      callback(querySnapshot.docs);
    });
    return unsub;
  }

  const confirmAddress = async (inputValue) => {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json&polygon_geojson=1&addressdetails=1&limit=1`
    const responseString = await fetch(nominatimUrl);
    const response = await responseString.json();
    if (response && response.length > 0) {
      const address = response[0];
      return address;
    }
  }

  const getDocsByFieldSub = (field, value, callback) => {
    const q = query(getCollection(), where(field, "==", value));
    const unsub = onSnapshot(q, (querySnapshot) => {
      callback(querySnapshot.docs);
    });
    return unsub;
  }

  const getDocsByFieldsSub = (fieldValueArray, callback) => {
    const whereClause = fieldValueArray.map(x => where(x.field, "==", x.value));
    const q = query(getCollection(), ...whereClause);
    const unsub = onSnapshot(q, (querySnapshot) => {
      callback(querySnapshot.docs);
    });
    return unsub;
  }

  const getDocsByField = async (field, value) => {
    const q = query(getCollection(), where(field, "==", value));
    const snapshot = await getDocs(q);
    return snapshot.docs;
  }
  const getDocsByFields = async (fieldValueArray) => {
    const whereClause = fieldValueArray.map(x => where(x.field, "==", x.value));
    const q = query(getCollection(), ...whereClause);
    const snapshot = await getDocs(q);
    return snapshot.docs;
  }
  const getByOrgIdSub = (orgId, callback) => {
    return getDocsSub(docs => {
      const orgDocs = docs.filter(d => d.data().orgId === orgId && d.data().isDeleted !== true)
      callback(orgDocs);
    })
  }

  // const getDocsByCurrentUserFieldSub = (field, callback) => {
  //   return getCurrentSub(currentUser => {
  //     if (currentUser) {
  //       return getDocsByFieldSub(field, currentUser.id, callback);
  //     }
  //   })
  // }

  // const getDocsByCurrentUserFieldAndOtherFieldsSub = (userIdField, fieldValueArray, callback) => {
  //   return getCurrentSub(currentUser => {
  //     if (currentUser) {
  //       return getDocsByFieldsSub([{ field: userIdField, value: currentUser.id }, ...fieldValueArray], callback);
  //     }
  //   })
  // }


  return {
    // getDocsByCurrentUserFieldSub, 
    getDocsByFieldsSub,
    // getDocsByCurrentUserFieldAndOtherFieldsSub, 
    getDocsByFieldSub,
    getDocsByField,
    getDocsByFields,
    getByOrgIdSub,
    confirmAddress,
    createDoc,
    getDocRef,
    getCollection,
    getById,
    set,
    deleteDocument,
    getByIdSub,
    getDocuments,
    getDocsSub,
    getDocsForCurrentUserSub,
    updateDoc,
    updateField
  };
}
export default api;

