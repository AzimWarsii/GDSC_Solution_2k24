import { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc, collection, getDocs, query, where } from "firebase/firestore";
import { app, auth } from '../firebase/firebase';


const useEditProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false);


	const editProfile = async (newUserName) => {
		if (isUpdating || !auth) return;
		setIsUpdating(true);

	
		const userDocRef = doc(firestore, "users", auth.uid);


		try {
			
			

			const q = query(collection(firestore, "users"), where("uid", "==", auth.uid));
				const querySnapshot = await getDocs(q);
				let userDoc;
				querySnapshot.forEach((doc) => {
					userDoc = doc.data();
				});


			const updatedUser = {
				...userDoc,
				username: newUserName || auth.username,
				
			};

			await updateDoc(userDocRef, updatedUser);

			
		} catch (error) {
			console.log(error);
		}
		finally{
			
			
		}
	};

	return { editProfile, isUpdating };
};

export default useEditProfile;
