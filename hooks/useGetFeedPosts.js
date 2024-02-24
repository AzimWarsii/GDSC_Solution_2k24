import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts ] = useState();

	//useEffect(() => {
		const getFeedPosts = async () => {
			setIsLoading(true);
			const q = query(collection(firestore, "posts"),);
			try {
				const querySnapshot = await getDocs(q);
				const feedPosts = [];

				querySnapshot.forEach((doc) => {
					feedPosts.push({ id: doc.id, ...doc.data() });
				});

				feedPosts.sort((a, b) => b.createdAt - a.createdAt);
				setPosts(feedPosts);
			} catch (error) {
				alert(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		
	//}, []);

	return { isLoading, posts , getFeedPosts };
};

export default useGetFeedPosts;
