import * as React from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';
import { app, auth } from "../../firebase/firebase"
import { getFirestore, doc, setDoc, updateDoc , arrayUnion } from "firebase/firestore";
import { useNavigation } from '@react-navigation/core'
import uuid from 'react-native-uuid';

const CreateOrder: React.FC = () => {
    const [caption, setCaption] = React.useState<string>('');
    const [category, setCategory] = React.useState<string>('');
    const [locationFrom, setLocationFrom] = React.useState<string>('');
    const [locationTo, setLocationTo] = React.useState<string>('');
    const [weight, setWeight] = React.useState<string>('');
    const db = getFirestore(app);
    const navigation = useNavigation();




    const SubmitOrder = async () => {
        if (caption === '' || weight === '' || locationFrom === '' || locationTo === '' || category === '') {
            console.log('not entered all inp');
            // setVisible(true); // Assuming setVisible is defined elsewhere in the actual code
            return;
        }
        const uid = uuid.v4()
        await setDoc( doc ( db, "drives", uid), {
            amount: parseFloat(weight) * 100,
            assignedAt: "",
            assignedTo: "",
            caption: caption,
            category: category,
            comments: [],
            createdAt: "",
            createdBy: auth.currentUser?.uid,
            imageURL: "",
            likes: [],
            locationFrom: locationFrom,
            locationTo: locationTo,
            mate: '',
            mateEmail: '',
            paymentID: '',
            user: '',
            userEmail: '',
            weight: parseFloat(weight),
            status: "pending",
        }).then(() => {
            updateDoc(doc(db, "users", auth.currentUser?.uid), {  drives: arrayUnion(uid) })
            //navigation.replace("orderScreen");
        });
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18, justifyContent: 'center', alignItems: 'center' }}>Create a Drive</Text>
            <TextInput value={caption} onChangeText={setCaption} placeholder='Caption' style={styles.input}></TextInput>
            <TextInput value={category} onChangeText={setCategory} placeholder='Category' style={styles.input}></TextInput>
            <TextInput value={locationFrom} onChangeText={setLocationFrom} placeholder='From' style={styles.input}></TextInput>
            <TextInput value={locationTo} onChangeText={setLocationTo} placeholder='To' style={styles.input}></TextInput>
            <TextInput value={weight} onChangeText={setWeight} placeholder='Weight in kg' style={styles.input}></TextInput>
            <Button title="Create Drive" style={styles.actionButtonGroup} onPress={SubmitOrder} />
        </View>
    );
}

export default CreateOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start', // Changed 'left' to 'flex-start' to fix TypeScript error
        margin: 30
    },
    blueBox: {
        padding: 40,
        width: '100%',
        height: 365,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#133BB7',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButtonGroup: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        margin: 30,
        borderRadius: 10
    },
    input: {
        height: 50,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'gray',
        borderRadius: 5,
        width: '100%' // Removed duplicate width property
    },
})

