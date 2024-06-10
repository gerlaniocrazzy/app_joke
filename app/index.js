// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);

  
  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://v2.jokeapi.dev/joke/Dark?lang=en');
      if (response.data.type === 'single') {
        setJoke(response.data.joke);
      } else {
        setJoke(`${response.data.setup} ... ${response.data.delivery}`);
      }
    } catch (error) {
      setJoke('Failed to fetch a joke.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <Text>Loading...</Text> : <Text style={styles.joke}>{joke}</Text>}
      <Button title="Próxima piada" onPress={fetchJoke} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  joke: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
