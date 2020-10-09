import React, { Component } from 'react';
import {
    Modal,
    TextInput,
    TouchableOpacity, 
    StyleSheet, 
    Text, 
    View, 
    ImageBackground,
    Alert,
    Image,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { server, showError, server_teste} from '../common'
import logoImage from '../../assets/imgs/logo.png'


const initialState = {
    email: '',
    letras: '',
    nome: ''
}

 export default class Profile extends Component {

    state = {
        ...initialState
    }


    componentDidMount = async () => {

        this.getUserData()

    }


    logout = async () => {

            try {
              await AsyncStorage.removeItem('rtkn');
              delete axios.defaults.headers.common['Authorization']
              this.props.navigation.navigate('Session')
              return true;
            }
            catch(exception) {
              return false;
            }

    }

    getUserData = async () => {


        try { 
            
            const res = await axios.get(`${server}/details`)
    
            this.setState({ nome: res.data.nome }) 
            this.setState({ email: res.data.email }) 
            this.setState({ letras: res.data.letras }) 

            //this.setState({ disciplinas: res_notas.data.labels })
            //Alert.alert(JSON.stringify(this.state.notas))

        } catch(e) {
            showError(e)
        }


}


    render() {


        const options = { email: this.state.email, secure: true}

        return(

            <View style={styles.container}>
                <Avatar
                size="large" rounded
                title={this.state.letras}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}/>

            <Text style={styles.name}>{this.state.nome}</Text>
            <Text style={styles.email}>{this.state.email}</Text>
            <TouchableOpacity onPress={this.logout} style={styles.button}>
               <Text style={styles.btntxt}> <Icon name='logout' size={30} /> Logout </Text>
            </TouchableOpacity>

            <View style={styles.imgContainer}>
                    <Image source={logoImage} style={styles.logo}/>
            </View>
            </View>

        )

    }
 }

 const styles = StyleSheet.create({   
    container: {     
        flex: 1,     
        alignItems: 'center',     
        justifyContent: 'center',  
        backgroundColor: 'rgba(0,0,0,0.7)',
    },    
    name: {  
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',   
        marginTop: 10,     
        fontSize: 30,
        fontWeight: 'bold',
    },
    email: {     
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',   
        marginTop: 10,     
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {     
        marginTop: 20,     
        padding: 10,
        backgroundColor: 'rgba(5,88,80,0.9)',
        borderRadius: 10,
        textAlign: 'center'
    },
    btntxt: {   
        fontFamily: commonStyles.fontFamily,     
        fontSize: 20,     
        color: 'white',
    },
    imgContainer: {

        alignItems: 'center',
        marginTop: 160,
    
    },
    logo: {

        width: 320,
        height: 100

    },
});