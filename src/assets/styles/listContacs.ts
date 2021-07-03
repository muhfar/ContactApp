import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', 
    },
    content: {
        flex: 1, 
        marginTop: 40,
        padding: 20,
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    listCard: {
        marginVertical: 20,
        marginHorizontal: 20
    },
    card: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 2,
    },
    bodyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    photoProfile: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 10
    },
    btnMenu: {
        flex:1,
        backgroundColor: '#eee', 
        borderRadius:5, 
        alignItems:'center', 
        justifyContent: 'space-between',
        padding:5,
        marginHorizontal: 5,
    },
    textPrimary: {
        color: '#379EC8'
    },
    textLight: {
        color: '#fff'
    },
    headingTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 10,
        textTransform:'uppercase',
    },
    formContact: {
        alignItems: 'center',
        margin: 30,
        padding: 20,
        borderColor: '#111',
        borderWidth: 1,
        borderRadius: 10,
    },
    textInput: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#aaa',
        fontSize: 16,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    btnSelectImage: {
        backgroundColor: '#3756C8',
        padding: 10,
        marginVertical: 10,
        width: 120,
        alignItems: 'center',
        borderRadius: 10,
    },
    btnSubmit: {
        backgroundColor: '#3756C8',
        marginVertical: 10,
        padding: 10,
        width: 120,
        alignItems: 'center',
        borderRadius: 10,
    },
    imageSrc: {
        width: 80,
        height: 80,
    }
})

export default styles