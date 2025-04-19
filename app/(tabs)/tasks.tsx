import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

// Remplace cette URL par l'endpoint de ton API de tâches
const tasksApiUrl = "https://keep.kevindupas.com/api/tasks";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    console.log(tasksApiUrl);
    try {
      const response = await fetch(tasksApiUrl);
      const data = await response.json();
      console.log("Réponse API :", data);
      setTasks(data.tasks || data); // s'adapte si les tâches sont dans `tasks` ou directement dans `data`
    } catch (error) {
      console.error("Erreur de chargement :", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTask = ({ tasks }: { item: Task }) => (
    <TouchableOpacity style={styles.taskCard}>
      <Text style={styles.taskTitle}>{tasks.title}</Text>
      <Text style={styles.taskStatus}>
        Statut : {tasks.completed ? "✔️ Terminée" : "❌ En cours"}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      renderItem={renderTask}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.grid}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    padding: 10,
  },
  taskCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#e0f7e9",
    padding: 12,
    borderRadius: 8,
    minHeight: 100,
    justifyContent: "center",
    elevation: 3,
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
  taskStatus: {
    fontSize: 14,
    color: "#333",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});