import React, { Component } from 'react';
import axios from 'axios'
import {
    TextInput,
    ActivityIndicator,
    TouchableOpacity, 
    StyleSheet, 
    Text, 
    View, 
    Alert,
    ToastAndroid,

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { server, showError} from '../common'


export default class TokenVerify extends Component{

    //ANtes do render vai buscar o valor ao async storage do will mount
    componentDidMount = async () => {
        

        try{

            const json = await AsyncStorage.getItem('rtkn')
            const tkn = JSON.parse(json)

            //Alert.alert(tkn)
            axios.defaults.headers.common['Authorization'] = `Bearer ${tkn}`

            const res = await axios.get(`${server}/details`)

            const id_aluno = res.data.id_aluno
            //Alert.alert(JSON.stringify(res.data.id_aluno))
            //Alert.alert(JSON.stringify(res.data.success.token))

            if(id_aluno != null){

            this.props.navigation.navigate('Home')
            
            }else{

                this.props.navigation.navigate('Login')

            }

        } catch (err) {

            //showError(err)
            delete axios.defaults.headers.common['Authorization']
            this.props.navigation.navigate('Login')


        }


        //const json = await AsyncStorage.getItem('rtkn')
        //const tkn = JSON.parse(json)

        //Alert.alert(tkn)
        //Alert.alert(JSON.stringify(res.data.success.token))

        /*
        if(tkn != null) {

            axios.defaults.headers.common['Authorization'] = `Bearer ${tkn.token}`
            this.props.navigation.navigate('Home')


        }else{

            this.props.navigation.navigate('Login')

        }*/
    }

    render() {

        return(
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})