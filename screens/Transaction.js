import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import {BarCodeScanner} from "expo-barcode-scanner"
import *as permissions from "expo-permissions"

export default class TransactionScreen extends Component {
  constructor(props){
    super(props)
    this.state = {domState: "normal",
  hasCameraPermisions: null,
  scanned : false,
  scannedData:""
}
  }
  getCameraPermisions = async domState=>{
    const{status} = await Permissions.askAsync(permissions.CAMERA)
    this.setState({
      hasCameraPermisions:status === "granted",
      domState:domState,
      scanned:false
    })
  }
  handleBarCodeScanned = async({type,data})=>{
    this.setState({
      scannedData:data,
      domStata:"normal",
      scanned:true,
    })
  }
  render() {
    const{domState,hasCameraPermisions,scannedData,scanned}=this.state
    if(domState === "scanner"){
      return(<BarCodeScanner onBarCodeScanned = {scanned?undefined:this.handleBarCodeScanned}/>)
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{hasCameraPermisions?scannedData:"request for camera permisions"}</Text>
        <TouchableOpacity style ={styles.button}onPress = {()=>this.getCameraPermisions("scanner")}>
          <Text style = {styles.buttonText}>Scan QR code </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  button:{
    width:"43%",
    height:55,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#f4ad20",
    borderRadius:15,
  },
  buttonText:{
    fontSize : 24,
    color:"#ffffff",

  }
});
