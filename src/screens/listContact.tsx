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

const RenderContact: FC<{item: Contacts}> = ({item}) => {
    const navigation = useNavigation();

    return (    
        <View style={styles.card}>
            <TouchableOpacity
                onPress={() => navigation.navigate('detailContact', {id:item.id})}
            >
                <View style={styles.bodyCard}>
                    <Image style={styles.photoProfile} source={(item.photo != 'N/A' && item.photo != '') ? {uri:item.photo} : require('../assets/images/no_avatar.png')} />
                    <View>
                        <Text style={[styles.textPrimary, {fontSize: 18, fontWeight:'bold'}]}>{item.firstName} {item.lastName}</Text>
                        <Text style={styles.textPrimary}>{item.age} years old</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
                    renderItem={({item})=> <RenderContact item={item}/>}
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