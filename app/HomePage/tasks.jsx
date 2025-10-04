import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useNavigation } from "expo-router";

export default function Profile() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation()
  const filterOptions = ["All", "Completed", "Pending"];
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(()=> {
    navigation.setOptions({ tabBarStyle: { display: filterOpen ? "none" : "flex" } });
  }, [filterOpen]);

  return (
    <View style={styles.container}>
      <Text>tasks Screen</Text>
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

});
