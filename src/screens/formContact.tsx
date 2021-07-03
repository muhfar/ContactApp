import React, { FC, useCallback, useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Contacts from '../model/contact';
import ImageSource from '../model/image';
import { useDispatch } from 'react-redux';
import { ResetContact } from '../redux/action/contact.action';
import { insertContact, updateContact } from '../service/contact';
import validateFormContact from '../validation/formContactValidation';
import styles from '../assets/styles/listContacs';

const FormContact: FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const [contactUser, setContactUser] = useState<Contacts>(new Contacts());
    const [imageSrc, setImageSrc] = useState<ImageSource>(new ImageSource());
    const [headingTitle, setHeadingTitle] = useState('Add New Contact');
    const [action, setAction] = useState('post');

    const uploadFile = async (uri: string, fileName: string) => {
        // Upload image & Get URL
        let reference = storage().ref('/images/'+fileName);
        
        try {
            await reference.putFile(uri);
            ToastAndroid.show('Image succesfully uploaded!', 5)
        } catch (error) {
            ToastAndroid.show('Something went wrong\nUpload image failed', 5)
        }
        const url = await reference.getDownloadURL()

        // Set Image URL to Contact
        let newContact = contactUser;
        newContact.photo = url;
        setContactUser(newContact);
    }

    useFocusEffect(useCallback(() => {
        if (action == 'put') {
            if (route.params) {
                setContactUser(route.params.item)
                setImageSrc({uri:route.params.item.photo, fileName: route.params.item.photo})
            }
        }
    }, [action]))

    useEffect(() => {
        if (contactUser) {
            setImageSrc({uri: contactUser.photo, fileName: ''})
        }

        if (route.params) {
            setHeadingTitle(route.params.titleHeading);
            setAction(route.params.action)
        }
    }, [])

    return (
        <View style={[styles.container, {paddingTop:40}]}>
            <Text style={styles.headingTitle}>{headingTitle}</Text>
            <View style={styles.formContact}>
                <TextInput 
                    style={styles.textInput}
                    placeholder='First Name'
                    onChangeText={(text) => {
                        let newContact = contactUser;
                        newContact.firstName = text
                        setContactUser(newContact)
                    }}
                    defaultValue={contactUser?.firstName}
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder='Last Name'
                    onChangeText={(text) => {
                        let newContact = contactUser;
                        newContact.lastName = text
                        setContactUser(newContact)
                    }}
                    defaultValue={contactUser?.lastName}
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder='Age'
                    onChangeText={(text) => {
                        let newContact = contactUser;
                        newContact.age = Number(text)
                        setContactUser(newContact)
                    }}
                    defaultValue={(contactUser?.age != undefined) ? String(contactUser?.age) : ''}
                    keyboardType='number-pad'
                />
                <TouchableOpacity
                    style={styles.btnSelectImage}
                    onPress={() => {
                        const options : ImagePicker.ImageLibraryOptions = {
                            mediaType: 'photo',
                        }

                        launchImageLibrary(options,response => {
                            if (response.assets) {
                                let source: ImageSource;
                                source = {uri: response.assets[0].uri, fileName: response.assets[0].fileName};
                                setImageSrc(source)
                                uploadFile(source.uri, source.fileName)
                            } else {
                                ToastAndroid.show('Something went wrong\nSelect image failed', 5)
                            }
                        })
                    }}
                >
                    <Text  style={styles.textLight}>Select Image</Text> 
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => {
                        if (validateFormContact(contactUser)) {
                                if (contactUser.photo != '') {
                                    if (action == 'put') {
                                        updateContact(contactUser)
                                        .then(response => {
                                            ToastAndroid.show(response?.message, 5);
                                            dispatch(ResetContact())
                                            navigation.navigate('listContact');
                                        })
                                        .catch(error => {
                                            ToastAndroid.show(`Something went wrong\n ${error}`, 5);
                                        })
                                    } else {
                                        insertContact(contactUser)
                                        .then(response => {
                                            ToastAndroid.show(response?.message, 5);
                                            dispatch(ResetContact())
                                            navigation.navigate('listContact');
                                        })
                                        .catch(error => {
                                            ToastAndroid.show(`Something went wrong\n ${error}`, 5);
                                        })
                                    }
                                } else {
                                    ToastAndroid.show('Please select an image!', 5)
                                }
                        } else {
                            ToastAndroid.show('Please fill the form!', 5)
                        }
                    }}
                >
                    <Text style={styles.textLight}>{(action == 'put') ? 'Update Contact' : 'Submit Contact'}</Text>
                </TouchableOpacity>
                {(imageSrc.uri != '' && imageSrc.uri != undefined && imageSrc.uri != 'N/A') ? (
                    <> 
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10}}>
                            <Text>Uploaded Image: </Text>
                            <Image source={{uri: imageSrc.uri}} style={styles.imageSrc}></Image>
                        </View>
                    </>
                ) : null}
            </View>
        </View>
    )
}

export default FormContact;