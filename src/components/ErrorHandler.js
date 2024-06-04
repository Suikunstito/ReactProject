import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes enviar el error a un servicio de logging aquí
    console.error("Error boundary caught an error", error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    Alert.alert(
      "Error",
      "Something went wrong: " + error.toString(),
      [{ text: "OK" }]
    );
  }

  render() {
    if (this.state.error) {
      // Puedes renderizar cualquier UI fallback aquí
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Something went wrong</Text>
          <Button title="Try again" onPress={() => this.setState({ error: null, errorInfo: null })} />
        </View>
      );
    }

    return this.props.children; 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center'
  }
});

export default ErrorHandler;
