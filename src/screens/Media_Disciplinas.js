import * as React from 'react';
//import React
import { Text, View, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
//import Basic React Native Components
import Orientation from 'react-native-orientation-locker';
import commonStyles from '../commonStyles'


import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
//import React Native chart Kit for different kind of Chart
import { server, showError, server_teste} from '../common'
import axios from 'axios'


const initialState = {
    disciplinas: [],
    notas: [],
}


export default class App extends React.Component {
  
    
    state = {
        ...initialState
    }
  


    componentDidMount = async () => {

        //this.getIdAluno()
        this.getNotasDisciplinas()

        /*
        //The getOrientation method is async. It happens sometimes that
        //you need the orientation at the moment the js starts running on device.
        //getInitialOrientation returns directly because its a constant set at the
        //beginning of the js code.
        var initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            Orientation.lockToLandscape()
        } else {
          //do other stuff
        }*/

    }


    /*
    getIdAluno = async () => {
        try { 
            
            //delete axios.defaults.headers.common['Authorization']  
            const res = await axios.get(`${server}/details`)

            const id = res.data.id_aluno
            
            this.setState({ id_aluno: id })

            //Alert.alert(this.state.id_aluno)

        } catch(e) {
            showError(e)
        }
    }
    */

    getNotasDisciplinas = async () => {
        try { 
            
            const res = await axios.get(`${server}/details`)

            const id_aluno = res.data.id_aluno
/*
            fetch("http://pm.paroquiaprado.pt/public/api/aluno/barras/")
                .then(response => response.json())
                .then((responseJson)=> {
                this.setState({ disciplinas: responseJson })
                   // this.setState({
                //disciplinas: responseJson
                //})
            }).catch(error=>console.log(error)) //to catch the errors if any~

            Alert.alert(this.state.disciplinas.data) 
            */
            
            //delete axios.defaults.headers.common['Authorization']  
            const res_notas = await axios.get(`${server}/aluno/barras/` + id_aluno )
            this.setState({ notas: res_notas.data.data }) 
            this.setState({ disciplinas: res_notas.data.labels })
            //Alert.alert(JSON.stringify(this.state.notas))
            
        } catch(e) {
            showError(e)
        }
    }
    
  
    render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>

          <Text style={styles.subtitle}>Média de Todos as Disciplinas</Text>

            <BarChart
              data={{
                labels: this.state.disciplinas,
                datasets: [
                  {
                    data: this.state.notas,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 16}
              height={250}
              yAxisLabel={''}
              fromZero
              withInnerLines={true}
              chartConfig={{
                backgroundColor: '#14967c',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginTop: 25,
                marginVertical: 8,
                borderRadius: 16,
              }}
            />

            

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
});