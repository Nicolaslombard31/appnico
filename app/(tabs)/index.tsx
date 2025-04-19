import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

const apiUrl = "https://keep.kevindupas.com/api/notes";

export default function NotesScreen() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    console.log(apiUrl);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("Réponse API :", data);
      setNotes(data.notes); // ou peut-être data directement
    } catch (error) {
      console.error("Erreur de chargement :", error);
    } finally {
      setLoading(false);
    }
  };
  

  const renderNote = ({ item }) => (
    <TouchableOpacity style={styles.noteCard}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteContent} numberOfLines={3}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <FlatList
      data={notes}
      renderItem={renderNote}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2} // <= pour affichage en grille
      contentContainerStyle={styles.grid}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    padding: 10,
  },
  noteCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    minHeight: 120,
    justifyContent: "space-between",
    elevation: 3,
  },
  noteTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  noteContent: {
    fontSize: 14,
    color: "#555",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
