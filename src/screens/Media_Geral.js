/*Example of React Native Chart Kit*/
import * as React from 'react';
//import React
import { Text, View, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
//import Basic React Native Components
import { server, showError, server_teste} from '../common'
import axios from 'axios'
import Orientation from 'react-native-orientation-locker';
import commonStyles from '../commonStyles'





const initialState = {
    media_per: '',
    media: '',
    dif: ''
}

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
//import React Native chart Kit for different kind of Chart

export default class App extends React.Component {

    state = {
        ...initialState
    }

      

    componentDidMount = async () => {

        this.getMedia()
    }

    getMedia = async () => {
        try { 
            

            const res = await axios.get(`${server}/details`)

            const id_aluno = res.data.id_aluno

            const res_media = await axios.get(`${server}/aluno/media/` + id_aluno )
            this.setState({ media_per: res_media.data/20 }) 
            this.setState({ media: res_media.data }) 

            const dif_media = 20 - res_media.data

            this.setState({ dif: dif_media}) 

            //Alert.alert(JSON.stringify(res_media.data))

            //Alert.alert(JSON.stringify(this.state.media))
            //const temp = JSON.stringify(res.data)
            



        } catch(e) {
            showError(e)
        }
    }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>


          <Text style={styles.subtitle}>Média de Todos os Módulos</Text>
            
            <Text style={styles.input}>Média (0-20): {this.state.media}</Text>
            <Text style={styles.input}>Média (%): {this.state.media_per*100}</Text>

            {
            <ProgressChart
              data={{
                  
                    labels: ["Méd. 0-20:",], // optional
                    data: [this.state.media_per]  
 
              }}
              width={Dimensions.get('window').width - 26}
              height={250}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 20,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            /> }



            
            
{

        <PieChart
        data={[
            {
            name: 'Média',
            percentagem: Number(this.state.media),
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
            },
            {
            name: '',
            percentagem: Number(this.state.dif),
            color: 'transparent',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
            },
        ]}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
            borderRadius: 16,
            },
        }}
        style={{
            marginVertical: 8,
            borderRadius: 16,
        }}
        accessor="percentagem"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute //for the absolute number remove if you want percentage
        />
        }


          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
  },
  subtitle: {
    textAlign:'center',
    fontFamily: commonStyles.fontFamily,
    color: 'black',
    fontSize: 25,
    marginBottom: 15
},
input: {
    fontFamily: commonStyles.fontFamily,
    marginTop: 10,
    backgroundColor: '#14967c',
    textAlign: 'center'
},
});