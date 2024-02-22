import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";


const useGetDrives = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [drive, setDrives ] = useState();

	//useEffect(() => {
		const getDrives = async () => {
			setIsLoading(true);
			const q = query(collection(firestore, "drives"),);
			try {
				const querySnapshot = await getDocs(q);
				const feedDrives = [];

				querySnapshot.forEach((doc) => {
					feedDrives.push({ id: doc.id, ...doc.data() });
				});

				feedDrives.sort((a, b) => b.createdAt - a.createdAt);
				setDrives(feedDrives);
			} catch (error) {
				alert(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		
	//}, []);
    

	return { isLoading, drive , getDrives };
};

export default useGetDrives;
