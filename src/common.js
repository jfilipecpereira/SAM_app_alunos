import {Alert, Platform } from 'react-native';

//const server = 'http://isam.escolaeuropeia.com/isam/public/api'

const server = 'http://pm.paroquiaprado.pt/public/api'
const server_teste = 'http://tp3pm.000webhostapp.com/myslim/api/cidades'

function showError(err){

    Alert.alert('Ocorreu um Erro!', `Mensagem: ${err}`)

}

export { server, showError, server_teste }