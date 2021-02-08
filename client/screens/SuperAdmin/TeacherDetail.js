import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import { Card } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";

export const GET_TEACHER_BY_ID = gql`
  query GetTeacherById($_id: ID) {
    teachers(_id: $_id) {
      _id
      name
      lastname
      dni
      email
      whatsapp
      address
      birthday
      picture
      subjects {
        _id
        name
        course {
          _id
          name
        }
      }
    }
  }
`;

function TeacherDetail({ route }) {
  const { _id } = route.params;
  const { data, loading, error } = useQuery(GET_TEACHER_BY_ID, {
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
    const teacher = data.teachers[0];

    return (
      // <ScrollView>
      <CenterView>
        <View style={styles.centerView}>
          <View style={styles.card}>
            <UserAvatar
              size={100}
              name={`${teacher.name} ${teacher.lastname}`}
              style={styles.user}
              src={`${teacher.picture}`}
            />
            <Text style={styles.textName}>
              {`${teacher.name} ${teacher.lastname}`}
            </Text>
            <Text style={styles.textRole}>Profesor</Text>
            <View style={styles.input}>
              <Text style={styles.touch}>Correo: {`${teacher.email}`}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.touch}>DNI: {`${teacher.dni}`}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.touch}>
                Dirección: {`${teacher.address}`}
              </Text>
            </View>
            
            <View style={styles.input}>
              <Text style={styles.touch}>Fecha: {`${teacher.birthday}`}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.touch}>
                Materias:{" "}
                {teacher.subjects?.length > 0 ? (
                  teacher.subjects.map((subject, i) => {
                    return (
                      <Text key={i} style={styles.description}>
                        {subject.name}: {subject.course.name}
                        {"  "} 
                      </Text>
                    );
                  })
                ) : (
                  <></>
                )}
              </Text>
            </View>
          </View>
        </View>
      </CenterView>
      // </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  principal: {
    backgroundColor: "white",
  },
  touchText: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 16,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  touch: {
    justifyContent: "flex-start",
    marginTop: 5,
    marginBottom: 5,
  },
  card: {
    width: `100%`,
    height: 150,
    margin: 5,
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
  },
  cardcount: {
    width: `100%`,
    height: 50,
    alignItems: "center",
    flexDirection: "column",
  },
  count: {
    fontSize: 20,
    color: "#2290CD",
    marginTop: 10,
    marginLeft: 10,
    fontWeight: "bold",
  },
  user: {
    backgroundColor: "#2290CD",
    width: 140,
    height: 140,
    borderRadius: 100,
    marginTop: 20,
  },
  textName: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
  },
  textRole: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
  },
  input: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: 300,
    padding: 10,
    paddingBottom: 10,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 15,
  },
});

export default TeacherDetail;
