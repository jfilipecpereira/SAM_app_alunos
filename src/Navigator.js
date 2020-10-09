import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Extra from './screens/Extra'
import Media_Disciplinas from './screens/Media_Disciplinas'
import Login from './screens/Login'
import Tabela_Notas from './screens/Tabela_Notas'
import Media_Geral from './screens/Media_Geral'
import TokenVerify from './screens/TokenVerify'
import commonStyles from './commonStyles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
//import Orientation from 'react-native-orientation';


/*
const drawerConfig = {
    initialRouteName: 'Media_Disciplinas',
    contentOptions: {
        labelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20
        },
        activeLabelStyle: {
            color: '#080',
            fontWeight: 'bold',
        }
    }
}

*/
/*
const drawerRoutes = {
    Main: {
        name: 'Main',
        screen: Main,
        navigationOptions: {
            title: 'Main'
        }
    },
    Media_Disciplinas: {
        name: 'Media_Disciplinas',
        screen: Media_Disciplinas,
        navigationOptions: {
            title: 'Média Disciplinas'
        }
    },

}

const drawerNavigator = createDrawerNavigator(drawerRoutes, drawerConfig)
createAppContainer(drawerNavigator)
*/

const menuConfig = {
    initialRouteName: 'Media_Disciplinas',
    tabBarOptions: {

        showLabel: true,


    }
}



const menuRoutes = {
    Tabela_Notas: {
        name: 'Tabela de Notas',
        screen: Tabela_Notas,
        navigationOptions: {
            title: 'Tabela de Notas',
            //Destrucute do parametro para obter a cor para associar ao icon, para mudar a cor do icon selecionado
            tabBarIcon: ({ tintColor }) => <Icon name='table-large' size={30} color={tintColor} />
        }
    },
    Media_Disciplinas: {
        name: 'Media_Disciplinas',
        screen: Media_Disciplinas,
        navigationOptions: {
            title: 'Média Disciplinas',
            tabBarIcon: ({ tintColor }) => <Icon name='chart-bar' size={30} color={tintColor} />
        }
    },
    Media_Geral: {
        name: 'Media_Geral',
        screen: Media_Geral,
        
        navigationOptions: {
            title: 'Média Geral',
            tabBarIcon: ({ tintColor }) => <Icon name='chart-arc' size={30} color={tintColor} />
        }
    },
    Extra: {
        name: 'Media_Geral',
        screen: Extra,
        navigationOptions: {
            title: 'Definições',
            tabBarIcon: ({ tintColor }) => <Icon name='format-list-bulleted' size={30} color={tintColor} />
        }
    },

}


const menuNavigator = createBottomTabNavigator(menuRoutes, menuConfig)



const mainRoutes = {
    Session:{
        name: 'Session',
        screen: TokenVerify,

    },
    Login: {

        name: 'Login',
        screen: Login

    },
    Home: {
        name: 'Home',
        screen: menuNavigator
    },
    

}

const mainNavigator = createSwitchNavigator(mainRoutes, { initialRouteName: 'Session' })

export default createAppContainer(mainNavigator)