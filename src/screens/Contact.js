import React from 'react'
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
    Alert,
    ActivityIndicator,
    Image,
} from 'react-native';
import firebase from 'react-native-firebase'
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import { Formik } from 'formik'
import * as Yup from 'yup'
const Contact = () => {
    const input = React.createRef();
    return (
        <Formik
            initialValues={{ email: '', name: '', message: '' }}
            onSubmit={values => { }}>
            {formikProps => (
                <KeyboardAwareView>
                    <View>
                        <Input
                            icon={
                                <Icon
                                    name="users"
                                    size={15}
                                    color="white"
                                />
                            }
                            ref={input}
                            placeholder='Your name'
                            errorStyle={{ color: 'red' }}
                            errorMessage='ENTER A VALID ERROR HERE'
                        />
                        <Input
                            icon={
                                <Icon
                                    name="mail"
                                    size={15}
                                    color="white"
                                />
                            }
                            ref={input}
                            placeholder='Email'
                            errorStyle={{ color: 'red' }}
                            errorMessage='ENTER A VALID ERROR HERE'
                        />
                        <Input
                            ref={input}
                            placeholder='Your message'
                            errorStyle={{ color: 'red' }}
                            multiline={true}
                            numberOfLines={10}
                            errorMessage='ENTER A VALID ERROR HERE'
                        />
                    </View>
                </KeyboardAwareView>
            )}
        </Formik>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textareaContainer: {
        height: 180,
        padding: 5,
        backgroundColor: '#F5FCFF',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
    },
});
export default Contact
