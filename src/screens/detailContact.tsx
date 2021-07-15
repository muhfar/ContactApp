import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ToastAndroid, ScrollView, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../assets/styles/listContacs';
import Contacts from '../model/contact';
import { DeleteContact, FetchDeleteContact, ResetContact } from '../redux/action/contact.action';
import { TypeContactReducer } from '../redux/reducer/contact.reducer';
import { deleteContact, getContactById } from '../service/contact';

const DeleteBtn:FC<{item: Contacts}> = ({item}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const deleteHandler = (item: Contacts) => {
        Alert.alert(
            `Delete ${item.firstName, item.lastName}`,
            'Are you sure want to delete this data?',
            [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        dispatch(FetchDeleteContact(item));
                        navigation.goBack();
                    }
                }
            ]
        )
    }
    return (
        <TouchableOpacity 
            style={[styles.btnMenu, {backgroundColor: '#C86137'}]}
            onPress={() => deleteHandler(item)}
        >
            <Text style={[styles.textLight, {fontSize: 16}]}>Delete <MaterialCommunityIcons name="delete" size={16}/></Text>
        </TouchableOpacity>
    )
}

const EditBtn:FC<{item: Contacts}> = ({item}) => {
    const navigation = useNavigation();

    const editHandler = (item: Contacts) => {
        navigation.navigate('formContact', {action: 'put', titleHeading: 'Edit Contact', item })
    }
    return (
        <TouchableOpacity 
            style={[styles.btnMenu, {backgroundColor: '#3756C8'}]}
            onPress={() => editHandler(item)}
        >
            <Text style={[styles.textLight, {fontSize: 16}]}>Edit <MaterialCommunityIcons name="pencil" size={16}/></Text>
        </TouchableOpacity>
    )
}

const DetailContact:FC = () => {
    const route = useRoute();
    const [contactId, setContactId] = useState('');
    const [contactUser, setContactUser] = useState<Contacts>(new Contacts());

    useFocusEffect(useCallback(() => {
        if (contactId) {
            getContactById(contactId)
            .then(res => {
                setContactUser(res.data);
            })
            .catch(error => {
                ToastAndroid.show(`Something Went Wrong! \n${error}`, 5);
            })
        }
    }, [contactId]))

    useEffect(() => {
        if (route.params) {
            setContactId(route.params.id)
        }
    }, [])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.bgHeader}>
                <Image source={{uri: contactUser.photo}} style={[styles.photoProfile, styles.profilePicHeader, ]}></Image>
            </View>
            <View style={{paddingVertical: 20, paddingHorizontal: 50}}>
                <View style={styles.detailGroup}>
                    <Text style={[styles.textPrimary, styles.textDetail]}>First Name: </Text>
                    <Text style={styles.textDetail}>{contactUser.firstName}</Text>
                </View>
                <View style={styles.detailGroup}>
                    <Text style={[styles.textPrimary, styles.textDetail]}>Last Name: </Text>
                    <Text style={styles.textDetail}>{contactUser.lastName}</Text>
                </View>
                <View style={styles.detailGroup}>
                    <Text style={[styles.textPrimary, styles.textDetail]}>Age: </Text>
                    <Text style={styles.textDetail}>{contactUser.age}</Text>
                </View>
                <View style={{flexDirection:'row', paddingVertical: 20}}>
                    <EditBtn item={contactUser} />
                    <DeleteBtn item={contactUser} />
                </View>
            </View>
        </ScrollView>
    )
}

export default DetailContact