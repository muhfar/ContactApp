import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { FC, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ListRenderItem, Image, ToastAndroid, Alert, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../assets/styles/listContacs';
import Contacts from '../model/contact';
import { AddContacts, DeleteContact, ResetContact } from '../redux/action/contact.action';
import { TypeContactReducer } from '../redux/reducer/contact.reducer';
import { deleteContact, getContact } from '../service/contact';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DeleteBtn:FC<{item: Contacts}> = ({item}) => {
    const dispatch = useDispatch();

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
                        deleteContact(item)
                        .then(response => {
                            dispatch(DeleteContact(item))
                            ToastAndroid.show(response?.message, 5)
                        })
                        .catch((error) => {
                            ToastAndroid.show(`Something Went Wrong! \n${error}`, 5);
                        })
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
            <Text style={styles.textLight}>Delete <MaterialCommunityIcons name="delete" size={16}/></Text>
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
            <Text style={styles.textLight}>Edit <MaterialCommunityIcons name="pencil" size={16}/></Text>
        </TouchableOpacity>
    )
}

const renderContact: ListRenderItem<Contacts> = ({item}) => {
    return (
        <View style={styles.card}>
            <View style={styles.bodyCard}>
                <Image style={styles.photoProfile} source={(item.photo != 'N/A' && item.photo != '') ? {uri:item.photo} : require('../assets/images/no_avatar.png')} />
                <View>
                    <Text style={[styles.textPrimary, {fontSize: 18, fontWeight:'bold'}]}>{item.firstName} {item.lastName}</Text>
                    <Text style={styles.textPrimary}>{item.age} years old</Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <EditBtn item={item} />
                <DeleteBtn item={item} />
            </View>
        </View>
        
    )
}

const ListContact: FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const contactState = useSelector((state: TypeContactReducer) => state.contactReducer);
    
    useEffect(() => {
        if (contactState.length == 0) {
            getContact()
            .then(res => {
                dispatch(AddContacts(res.data))
            })
            .catch(error => {
                ToastAndroid.show(error.message, 5)
            })
        }
    }, [contactState])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{flexDirection:'row-reverse'}}>
                    <TouchableOpacity
                        style={{width:30}}
                        onPress={() => dispatch(ResetContact())}
                    >
                        <MaterialCommunityIcons name="reload" size={30} color='#37C8A9'/>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.listCard}
                    data={contactState}
                    keyExtractor={item => item.id}
                    renderItem={renderContact}
                />
                <View style={{flexDirection:'row-reverse'}}>
                    <TouchableOpacity
                        style={{width:50}}
                        onPress={() => navigation.navigate('formContact')}
                    >
                        <MaterialCommunityIcons name="plus-circle" size={50} color='#37C8A9'/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ListContact