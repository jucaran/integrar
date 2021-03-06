import React, { useState } from "react";
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as WebBrowser from "expo-web-browser";
import { ReactNativeFile } from "apollo-upload-client";
import { useMutation } from "@apollo/client";
import { CREATE_STUDENTS_WITH_CSV } from "./graphql";
import { GET_STUDENTS } from "../screens/SuperAdmin/SuperAdminListStudents";
import { Card } from "react-native-paper";
import CenterView from "./CenterView";
import { GET_STUDENTS_BY_COURSE } from "../screens/SuperAdmin/ListStudentsByCourse";
import { LOCAL_IP } from "@env";

export default function CreateStudentsWithCsv({ navigation, route }) {
  const id = route.params?.params.id;
  // console.log("route.params: ", route.params)
  const [sendFile, { data, loading, error }] = useMutation(
    CREATE_STUDENTS_WITH_CSV
  );

  const [file, setFile] = useState();
  const [typeError, setTypeError] = useState();

  const pickFile = async () => {
    try {
      const filePicked = await DocumentPicker.getDocumentAsync();

      if (filePicked.type !== "cancel") {
        // We check if the file is .csv if thats not the case we show an error
        if (filePicked.name.slice(-3) !== "csv")
          setTypeError("Por favor, seleccionar un archivo .csv");
        else {
          // If the file is .csv we clear the errors and set the state with a native file
          setTypeError(null);
          const nativeFile = new ReactNativeFile({
            uri: filePicked.uri,
            name: filePicked.name,
            type: "text/csv",
          });

          setFile(nativeFile);
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  if (loading)
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        {console.log(error)}
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );

  if (data?.status)
    return (
      <View style={styles.center}>
        <Text>Archivo enviado correctamente</Text>
      </View>
    );

  if (data && !data.status)
    return (
      <View style={styles.center}>
        <Text>Archivo enviado correctamente</Text>
      </View>
    );

  return (
    <View style={styles.center}>
      {/* This img should be clicable and opened in a modal pero ni idea como hacer eso :( */}

      <Text style={styles.title}>Subir Alumnos con archivo .CSV</Text>
      <Text>Ejemplo:</Text>
      <TouchableHighlight
        onPress={() =>
          WebBrowser.openBrowserAsync(
            `http://${LOCAL_IP}:4000/download/CSVtemplate`
          )
        }
      >
        <Image
          style={styles.normalSize}
          source={require("../assets/ejemplocsv.png")}
        />
      </TouchableHighlight>
      <View style={styles.exampleVw}>
        <Card style={styles.box}>
          <View style={styles.instructionBox}>
            <Text style={styles.underline}>Instrucciones:</Text>
            {/* <Card.Divider /> */}
            <Text style={styles.intruction}>El archivo debe ser .csv</Text>
            <Text style={styles.intruction}>
              La primera fila debe contener solo los titulos de los campos
            </Text>
            <Text style={styles.intruction}>
              Deben estar acomodados en el orden propuesto y sin usar comas
            </Text>
          </View>
        </Card>
      </View>

      {/* If the file is not .csv we show a error message */}
      {typeError && <Text style={{ color: "red" }}>{typeError}</Text>}
      {file ? (
        <></>
      ) : (
        <TouchableHighlight onPress={pickFile} style={styles.btnPick}>
          <Text style={styles.btnPickTxt}>Seleccionar .csv a subir</Text>
        </TouchableHighlight>
      )}
      {file ? (
        <View style={styles.file}>
          <Text style={styles.fileTxt}>Archivo seleccionado:</Text>
          <Text style={styles.fileTxt}>{file.name}</Text>
          <Image source={require("../assets/tenor.gif")} style={styles.img} />
        </View>
      ) : (
        <></>
      )}
      {file ? (
        <TouchableHighlight
          style={styles.btnUp}
          onPress={
            () =>
              // First we check that we have a correct file and then we send it
              file &&
              sendFile({
                variables: { file, courseId: id ? id : null },
                refetchQueries: [
                  { query: GET_STUDENTS },
                  { query: GET_STUDENTS_BY_COURSE, variables: { _id: id } },
                ],
              }) //.navigation.pop()
          }
        >
          <Text style={styles.btnUpTxt}>SUBIR .CSV</Text>
        </TouchableHighlight>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = new StyleSheet.create({
  normalSize: {
    marginBottom: 20,
    width: 300,
    height: 60,
    resizeMode: "center",
  },
  title: {
    marginBottom: 10,
    textDecorationLine: "underline",
    fontSize: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEE2E9",
    //minHeight: "100%",
  },
  underline: {
    color: "black",
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 6,
  },
  btnPick: {
    backgroundColor: "#E97820",
    width: 300,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    margin: 10,
  },
  btnPickTxt: {
    fontSize: 16,
    color: "#F5EFEA",
  },
  btnUp: {
    backgroundColor: "darkgreen",
    width: 300,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    margin: 10,
  },
  btnUpTxt: {
    fontSize: 16,
    color: "#F5EFEA",
  },
  img: {
    width: 60,
    height: 60,
    margin: 20,
  },
  file: {
    justifyContent: "center",
    alignItems: "center",
  },
  fileTxt: {
    color: "#272727",
    fontSize: 15,
    margin: 2,
  },

  exampleImg: {
    marginBottom: 20,
    width: 300,
    height: 60,
    resizeMode: "center",
  },
  box: {
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  instructionBox: {
    padding: 10,
  },
  intruction: {
    marginBottom: 10,
  },
});

// marginLeft
