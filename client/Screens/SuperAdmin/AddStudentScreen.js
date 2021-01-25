import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from "react-native";

function AddStudentScreen({navigation}) {
    const [student, setStudent] = useState({
        photo: '',
        name: '',
        address: '',
        email: '',
        birthdate: '',
        phone: '',
        course: '',
        dni: ''
    })
    const handleChange = (name, value) => {
        setStudent({...student, [name]: value})
    }

    return ( 
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title} >Datos del Alumno</Text>

                <View>
                    <TextInput style={styles.input} placeholder="Nombre" onChangeText={(value) => handleChange('name', value)}/>

                    <TextInput style={styles.input} placeholder="Curso" onChangeText={(value) => handleChange('course', value)}/>

                    <TextInput style={styles.input} placeholder="Email" onChangeText={(value) => handleChange('email', value)}/>

                    <TextInput style={styles.input} placeholder="Telefono" onChangeText={(value) => handleChange('phone', value)}/>

                    <TextInput style={styles.input} placeholder="Direccion" onChangeText={(value) => handleChange('address', value)}/>

                    <TextInput style={styles.input} placeholder="Fecha de Nacimiento" onChangeText={(value) => handleChange('birthdate', value)}/>
                    
                    <TextInput style={styles.input} placeholder="Foto" onChangeText={(value) => handleChange('photo', value)}/>

                    <TextInput style={styles.input} placeholder="DNI" onChangeText={(value) => handleChange('dni', value)}/>
                </View>
                <View>
                    <Button style={styles.button} title="Agregar Alumno" onPress={() => alert('Alumno agregado con exito!')} />
                </View>

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginTop: 2
    },
    title: {
        fontSize: 15,
        margin: 10
    },
    input: {
        height: 25,
        marginBottom: 20,
        padding: 10,
    },
    button: {
        backgroundColor: "skyblue"
    }

})

export default AddStudentScreen;