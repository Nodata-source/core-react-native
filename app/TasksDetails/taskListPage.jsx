import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { db } from "../../firebaseConfig";
{/* directly query, where from firebase option*/}

export default function TaskListPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation()
  const filterOptions = ["All", "Completed", "Pending"];
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [task, setTask] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

// later on use querysnapshot for real time updations

const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    const tasks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
    console.log("tasks", tasks);
    setTask(tasks);
};

  useEffect(()=>{
  fetchTasks();
  }, []);

  useEffect(()=> {
    navigation.setOptions({ tabBarStyle: { display: filterOpen ? "none" : "flex" } });
  }, [filterOpen]);

  const deleteTask = async (id) => {
    try{
        await deleteDoc(doc(db, "tasks", id));
        setTask(prev => prev.filter(item => item.id !== id));
    }
    catch(error){
        console.log("Error deleting task:", error);
    }
  }

  const markCompleted = async (id) => {
    try{
        await updateDoc(doc(db, "tasks", id), {completed:true});
        setTask(prev => 
            prev.map(item => 
            item.id === id ? {...item, completed: true} : item
            )
        );
    }
    catch(error){
        console.log("Error marking task completed", error);
    }
  };
  
  const filteredTasks = task.filter(item => {
    if(selectedFilter === "All") return true;
    if(selectedFilter === "Completed") return item.completed;
    if(selectedFilter === "Pending") return !item.completed;
  }). filter(item => item.text.toLowerCase(). includes(searchText.toLocaleLowerCase()));

  const onRefresh = async() => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  }

  return (
    <View style={styles.container}>
      <Text>tasks Screen</Text>

      {/* Filter and Modal starts */}
      <View style={styles.centerContent}>
        <View style={styles.searchBar}>
          <TextInput placeholder="Search" value={searchText} onChangeText={setSearchText} />
          {searchText.trim() === "" && (
          <TouchableOpacity onPress={() => setFilterOpen(!filterOpen)}>
            <Ionicons name="filter-outline" size={24} />
          </TouchableOpacity>
          )}
          </View>
          </View>

              <Modal
                visible={filterOpen}
                transparent={true}
                animationType="slide"
              >
                  <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback onPress={() => setFilterOpen(false)}>
                        <View style={{flex:1}}/>
                    </TouchableWithoutFeedback>
                      <View style={styles.bottomSheet}>
                        <Text>Filter by</Text>

                        {/* Add your filter content here */}
                        {filterOptions.map((option,idx) => (
                            <TouchableOpacity key={option}
                            style={{ flexDirection: "row", marginVertical: 8 }}
                            onPress={()=> setSelectedFilter(option)}
                            >
                                <Ionicons
                                name={selectedFilter === option ? "radio-button-on" : "radio-button-off"}
                                size={24}
                                color={selectedFilter === option ? "#4257F0" : "#888"}
                                />
                                <Text style={{marginLeft: 10}}>{option}</Text>
                            </TouchableOpacity>
                            
                        ))}
                      </View>
                  </View>
              </Modal>

              {/* Filter and Modal Ends */}

              <View style={styles.mainContent}>
                <View style={styles.taskList}>
                    <SwipeListView data={filteredTasks} keyExtractor={(item)=> item.id}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    renderItem={({item}) => (
                        <View style={styles.tableStyle}>
                        <Text style={{fontSize: 15, fontWeight: "bold"}}>{item.text}</Text>
                        <TouchableOpacity>
                            <Ionicons name= {item.completed ? "checkmark-done-circle-outline" : "alert-circle-outline"} size={24} color={item.completed ? "green" : "red"}/>
                        </TouchableOpacity>
                         </View>
                    )}
                    renderHiddenItem={({ item }, rowMap) => (
                        <View style={{flex:1, flexDirection: "row", justifyContent: "space-between", marginVertical: 10,backgroundColor: "#FFFFFF80", borderRadius: 8, padding:10}}>
                            {/* Right swipe( leftopenvalue - mark completed) */}
                            <View style={{flex:1, alignItems: "flex-start", justifyContent: "center"}}>
                        <TouchableOpacity onPress={()=>markCompleted(item.id)}>
                            <Ionicons name= "checkmark-done-circle-outline" size={24} color= "green"/>
                        </TouchableOpacity>
                        </View>

                        {/* Left swipe( rightopenvalue - delete) */}
                            <View style={{flex:1, alignItems: "flex-end", justifyContent: "center"}}>
                        <TouchableOpacity onPress={()=>deleteTask(item.id)}>
                            <Ionicons name="trash-outline" size={24} color="red"/>
                        </TouchableOpacity>
                        </View>
                        </View>
                        )}
                        rightOpenValue={-75}
                        leftOpenValue={75}
                        onRowOpen={(rowKey, rowMap, toValue) => {
                            if(toValue == -75){
                                deleteTask(rowKey);
                            }
                            else if(toValue == 75){
                                markCompleted(rowKey);
                                if(rowMap[rowKey]) rowMap[rowKey].closeRow();
                            }
                        }} 
                     />

                            
                </View>
              </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    width: "90%",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    width: "90%",
    gap: "70%",
    padding: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end", // Align children to bottom
  },
  bottomSheet: {
    height: "50%", // Half the screen
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    // alignItems: "center",
    // Optional: shadow for elevation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    gap: 15,
  },
  mainContent: {
    backgroundColor: "#e5a0a0ff",
    height: '85%',
    width: '90%',
    // alignItems: "center",
    // justifyContent: "center",
  },
  tableStyle: {
    flexDirection: "row",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "100%",
    height: 50,
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  taskList: {
    padding: 10,
    width: '100%',
    height: '100%'
  },
  rowBack: {
  alignItems: "center",
  backgroundColor: "#ffdddd",
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end",
  paddingRight: 15,
  marginVertical: 10,
  borderRadius: 8,
},

});


TaskListPage.options = {
  title: "Task List",
};