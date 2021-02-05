import React from "react";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";

export const GET_CLASS_BY_ID = gql`
  query GetClassById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
      homework
    }
  }
`;

const FilesFromHomework = ({ navigation, route }) => {
  const _id = route.params?.id;
  const { data, loading, error } = useQuery(GET_CLASS_BY_ID, {
    variables: { _id },
  });

  if (loading) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  if (error) {
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  }

  if (data) {
    // console.log("Data en tarea ", data);
    const clase = data.classes[0];

    return (
      <View style={styles.cont}>
        <TouchableHighlight
          style={styles.touch}
          activeOpacity={0.6}
          onPress={() =>
            navigation.navigate("UploadClassFile", {
              params: { id: clase._id },
            })
          }
        >
          <Text style={styles.touchText}>Agregar Tareas</Text>
        </TouchableHighlight>
        <Text style={styles.name}>Archivos de la {clase.name}</Text>
        {clase.length ? (
          <FlatList
            data={clase.homework}
            renderItem={({ item }) => {
              return (
                <Card key={item._id} style={styles.card}>
                  <View style={styles.cardIn}>
                    <Text style={styles.cardText}>{item.name}</Text>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      style={styles.onPress}
                    >
                      <Text style={styles.img}>X</Text>
                    </TouchableHighlight>
                  </View>
                </Card>
              );
            }}
            keyExtractor={({ _id }) => _id}
          />
        ) : (
          <CenterView>
            <Text>No hay archivos agregados para esta clase</Text>
          </CenterView>
        )}
      </View>
    );
    // return (
    //   <View style={styles.cont}>

    //     <Text>Tarea</Text>
    //     {clase.homework ? (
    //       <Text>{clase.homework}</Text>
    //     ) : (
    //       <TouchableHighlight
    //         style={styles.button}
    //         activeOpacity={0.6}
    //         onPress={
    //           (() => navigation.navigate("UploadNomeworkFile"), { params: { _id: clase._id } })
    //         }
    //       >
    //         <Text style={styles.buttonText}>Agregar Tarea</Text>
    //       </TouchableHighlight>
    //     )}
    //   </View>
    // );
  }
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    padding: 5,
  },
  button: {
    margin: 5,
    backgroundColor: "#00aadd",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    alignItems: "flex-start",
    color: "white",
  },
  touchText: {
    marginTop: 15,
    marginBottom: 15,
    // fontFamily: "roboto",
    fontSize: 20,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  name: {
    marginBottom: 5,
    marginLeft: 12,
    fontWeight: "bold",
    fontSize: 15,
    alignItems: "flex-start",
  },
  touch: {
    justifyContent: "flex-start",
    marginLeft: 12,
  },
});

export default FilesFromHomework;
