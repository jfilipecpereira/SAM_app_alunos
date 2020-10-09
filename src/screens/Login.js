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
    ToastAndroid,
    
} from 'react-native';
import commonStyles from '../commonStyles'
import logoImage from '../../assets/imgs/logo.png'
import LoginInput from '../components/LoginInput'
import axios from 'axios'
import { server, showError} from '../common'
import AsyncStorage from '@react-native-community/async-storage'


export default class Login extends Component {


    state = {

        email: '',
        password: '',

    }

    onSignin = async () => {
 

                try{

                    const res = await axios.post(`${server}/login`, { 
                        email: this.state.email,
                        password: this.state.password

                    })

                    //Alert.alert(JSON.stringify(res.data.success))
                    //Alert.alert(JSON.stringify(res.data))
                    //Alert.alert(res.data)
                    //Alert.alert(JSON.stringify(res.data.success.token))

                    //Adiciona token aos cabeçalhos para q a partir de agora irá passar o token
                    //junto com o pedido http para garantir q as proximas serão feitas com o token q irá permitir a entrada
                    //axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.success.token}`
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data}`

                    //AsyncStorage.setItem('rtkn', JSON.stringify(res.data.success.token))
                    AsyncStorage.setItem('rtkn', JSON.stringify(res.data))

                    this.props.navigation.navigate('Home')

                    const res_detail = await axios.get(`${server}/details`)

                    const id_aluno = res_detail.data.id_aluno
                    //Alert.alert(JSON.stringify(res.data.id_aluno))
                    //Alert.alert(JSON.stringify(res.data.success.token))

                    if(id_aluno != null){

                        this.props.navigation.navigate('Home')
                    
                    }else{

                        Alert.alert('Versão da aplicação para alunos!')
                        this.props.navigation.navigate('Login')

                    }

                } catch (err) {

                    Alert.alert('Erro!', 'Email ou Password Incorretos!')


                }

    }

    


    
    /*validaEmail = async (text) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
        return false;
        }else{
            return true
        }
        }
    */
    
    render() {

        
        return(

            <View style={styles.background}>
                <View style={styles.imgContainer}>
                <Image source={logoImage} style={styles.logo}/>
                </View>
                <View style={styles.formContainer}>
                <Text style={styles.subtitle}> Autenticação - Alunos</Text>

                    <LoginInput icon='at' keyboardType='email-address' placeholder='Email' style={styles.input}
                    value={this.state.email} onChangeText={email => this.setState({ email })} />

                    
                    <LoginInput icon='lock' secureTextEntry={true} placeholder='Password' style={styles.input}
                    value={this.state.password} onChangeText={password => this.setState({ password })} />

                    <TouchableOpacity onPress={this.onSignin}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>



        )


    }


}


const styles = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',    
    },
    imgContainer: {

        alignItems: 'center',
        marginBottom: 20,
    
    },
    logo: {

        width: 320,
        height: 100

    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center'

    },
    formContainer: {
        backgroundColor: 'rgba(128,128,128,0.8)',
        width: '90%',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        marginTop: 10,
        backgroundColor: 'white',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#080',
        padding: 10,
        marginTop: 15,
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        
    }


});