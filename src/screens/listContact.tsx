import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList,  Image, ToastAndroid, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../assets/styles/listContacs';
import Contacts from '../model/contact';
import { FetchContacts, FetchResetContact } from '../redux/action/contact.action';
import { TypeContactReducer, TypeState } from '../redux/reducer/contact.reducer';
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
    const contactState = useSelector((state: TypeContactReducer) => state.contactReducer.data);
    const loadingState = useSelector((state: TypeContactReducer) => state.contactReducer.loading);
    const messageState = useSelector((state: TypeContactReducer) => state.contactReducer.message);
    const errorState = useSelector((state: TypeContactReducer) => state.contactReducer.error);
    
    useEffect(() => {
        if (contactState.length == 0) dispatch(FetchContacts())
    }, [contactState])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{flexDirection:'row-reverse'}}>
                    <TouchableOpacity
                        style={{width:30}}
                        onPress={() => dispatch(FetchResetContact())}
                    >
                        <MaterialCommunityIcons name="reload" size={30} color='#37C8A9'/>
                    </TouchableOpacity>
                </View>
                {messageState ? ToastAndroid.show(messageState, 5) : errorState && ToastAndroid.show(`Something Went Wrong! \n${errorState}`, 5)}
                {loadingState ? <ActivityIndicator color='#0000ff' size='large'/> :
                contactState && (
                    <FlatList
                        style={styles.listCard}
                        data={contactState}
                        keyExtractor={item => item.id}
                        renderItem={({item})=> <RenderContact item={item}/>}
                    />
                )}
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