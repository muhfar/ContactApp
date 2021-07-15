import React, { FC, useCallback, useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ToastAndroid, ScrollView, ActivityIndicator } from 'react-native';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Contacts from '../model/contact';
import ImageSource from '../model/image';
import { useDispatch } from 'react-redux';
import { FetchResetContact, FetchUpdateContact } from '../redux/action/contact.action';
import { insertContact } from '../service/contact';
import validateFormContact from '../validation/formContactValidation';
import styles from '../assets/styles/listContacs';

const FormContact: FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const [contactUser, setContactUser] = useState<Contacts>(new Contacts());
    const [imageSrc, setImageSrc] = useState<ImageSource>(new ImageSource());
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [headingTitle, setHeadingTitle] = useState('Add New Contact');
    const [action, setAction] = useState('post');

    const uploadFile = async (uri: string, fileName: string) => {
        // Upload image & Get URL
        let reference = storage().ref('/images/'+fileName);
        
        try {
            await reference.putFile(uri);
            ToastAndroid.show('Image successfully uploaded!', 5)
        } catch (error) {
            ToastAndroid.show('Something went wrong\nUpload image failed', 5)
        }
        const url = await reference.getDownloadURL();
        setImageSrc({uri: url, fileName: fileName});

        // Set Image URL to Contact
        let newContact = contactUser;
        newContact.photo = url;
        setContactUser(newContact);
        setIsUploadingImage(false);
    }

    const selectImageHandler = ()  => {
        setIsUploadingImage(true);
        const options : ImagePicker.ImageLibraryOptions = {
            mediaType: 'photo',
        }

        launchImageLibrary(options,response => {
            if (response.assets) {
                let source: ImageSource;
                source = {uri: response.assets[0].uri, fileName: response.assets[0].fileName};
                uploadFile(source.uri, source.fileName)
            } else if (response.didCancel) {
                setIsUploadingImage(false);
                ToastAndroid.show('Please pick an image', 5)
            } else {
                setIsUploadingImage(false);
                ToastAndroid.show('Something went wrong\nSelect image failed', 5)
            }
        })
    }

    const submitFormHandler = () => {
        const msg = validateFormContact(contactUser)
        if (msg == '') {
            setIsSubmitting(true)
            if (action == 'put') {
                dispatch(FetchUpdateContact(contactUser));
                navigation.navigate('listContact');
            } else {
                insertContact(contactUser)
                .then(response => {
                    ToastAndroid.show(response?.message!, 5);
                    dispatch(FetchResetContact());
                    navigation.goBack();
                })
                .catch(error => {
                    ToastAndroid.show(`Something went wrong\n ${error}`, 5);
                })
            }
        } else {
            ToastAndroid.show(msg, 5);
        }
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
        <ScrollView style={[styles.container, {paddingTop:40}]}>
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
                    onPress={() => selectImageHandler()}
                    disabled={isUploadingImage || isSubmitting}
                >
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                        {isUploadingImage && <ActivityIndicator size='small' color='#FFF' />}
                        <Text style={styles.textLight}>Select Image</Text> 
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => submitFormHandler()}
                    disabled={isUploadingImage || isSubmitting}
                >
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                        {isSubmitting && <ActivityIndicator size='small' color='#FFF' />}
                        <Text style={styles.textLight}>{(action == 'put') ? 'Update Contact' : 'Submit Contact'}</Text>
                    </View>
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
        </ScrollView>
    )
}

export default FormContact;