import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function Dashboard() {

    const [text, setText] = useState("");
    const [tasks, setTasks] = useState([])
    const [taskClicked, setTaskClicked] = useState(false);

    const addTask = async () => {
        if(text.trim() === '') return;
        setTasks(prev => [...prev, {text, completed: false}])
        setText("");

     // Add to Firestore
     try{
        await addDoc(collection(db, "tasks"), {text, completed: false});
        console.log("Task added to firestore");
     }
     catch(error){
        console.log("Error adding task to firestore", error);
     }
       }


  return (

    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text>Hi! User</Text>

        {/* Tasks Part Starts */}
        <View style={styles.taskList}>
          <Text>Stats</Text>
          <View style={styles.taskBar}>
            <View style={styles.tasks}>
              <Text style={styles.taskTitle}>Completed Tasks</Text>
              <Text>(count)</Text>
            </View>
            <View style={styles.tasks}>
              <Text style={styles.taskTitle}>Pending Tasks</Text>
              <Text>(count)</Text>
            </View>
            <View style={styles.tasks}>
              <Text style={styles.taskTitle}>Synced/Unsynced Data</Text>
              <Text>(data)</Text>
            </View>
          </View>
        </View>
        {/* Tasks Part Ends */}

        {/* QuickAction Part Starts */}
        <View style={styles.quickActions}>
          <Text>Quick Actions</Text>
          <View style={styles.menus}>
            <View style={styles.quickMenus}>
              <TouchableOpacity style={styles.newTask} onPress={()=> setTaskClicked(!taskClicked)}>
                <Text>New Task</Text>
                <Ionicons name="add-circle-outline" size={20} color="black" />
              </TouchableOpacity>

              {taskClicked && 
              <>
              <Modal visible={taskClicked}
              transparent={true}
              animationType="slide">
                <View style={{backgroundColor: "rgba(0,0,0,0.3)", flex:1, justifyContent: "center", alignItems: "center"}}>
                <View style={styles.cancelButton}>
                <TouchableOpacity onPress={()=> setTaskClicked(false)}>
                    <Ionicons name="close-circle-outline" size={30}/>
                </TouchableOpacity>
                </View>
                <View style={styles.modalStyle}>
                <View style={{width: '100%', alignItems: "center",justifyContent: "center"}}> 
                    <TextInput placeholder="Enter New Task" value={text} onChangeText={ setText}
                        style={{borderWidth:1, padding:5, width: '90%'}}/>
                    <TouchableOpacity style={styles.addTaskButton} onPress={ addTask}>
                        <Text>Add Task</Text>
                    </TouchableOpacity>
                </View>
                </View>
                </View>
              </Modal>
              </>}
            </View>
            <View style={styles.quickMenus}>
              <TouchableOpacity style={styles.newTask}>
                <Text>Open Camera</Text>
                <Ionicons name="camera-outline" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.quickMenus}>
              <TouchableOpacity style={styles.newTask}>
                <Text>Sync Now</Text>
                <Ionicons name="sync-outline" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* QuickAction Part Ends */}

        {/* Recent Activity Part Starts */}
        <View style={styles.recentFeed}>
          <Text>Recent Activity Feed</Text>
          <View style={styles.feedList}></View>
        </View>
        {/* Recent Activity Part Ends */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
  },
  mainContent: {
    flex: 1,
    margin: 10,
  },
  taskBar: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tasks: {
    backgroundColor: "#6adff9ff",
    minHeight: 60,
    maxHeight: 100,
    height: 80,
    minWidth: "20%",
    maxWidth: 200,
    width: 150,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    margin: 10,
    flexDirection: "column",
  },
  taskTitle: {
    fontSize: 15,
  },
  taskList: {
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    elevation: 5,
  },
  quickActions: {
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    elevation: 5,
    marginTop: 5,
  },
  newTask: {
    backgroundColor: "#f7f2f2ff",
    flexDirection: "row",
    gap: 15,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  quickMenus: {
    minHeight: 30,
    maxHeight: 80,
    height: "30%",
    minWidth: "20%",
    maxWidth: 150,
    width: "45%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  menus: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  recentFeed: {
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    elevation: 5,
    marginTop: 5,
  },
  cancelButton: {
    position: "absolute",
    top: 20,
    right: 20
  },
  modalStyle: {
    padding: 10,
    height: '30%',
    width:'90%',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  addTaskButton: {
    backgroundColor: "#a1f3b7ff",
    margin: 10,
    padding: 10,
    width: "30%"
  }
});
