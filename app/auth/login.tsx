import React, { useState } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const apiUrl = "https://keep.kevindupas.com/api"

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [debug, setDebug] = useState("");


    const handleLoading = async () => {
        if(!email || !password){
            Alert.alert("Erreur", "Veuillez replir tous les champs");
            return;
        }

        setLoading(true);
        setDebug("Démarre la connexion..")

        try {
            setDebug((prev) => prev + `Url de l'API: ${apiUrl}/login`)
            const reponse = await fetch(`${apiUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({ email, password}),
            });

            const rawText = await reponse.text();
            setDebug((prev) => prev + `Réponse brute: ${rawText.substring(0, 50)}...\n`);
            let data;
            try{
                data = JSON.parse(rawText);
                setDebug((prev) => prev + `Réponse parsé avec succés\n`);
            } catch(e) {

            }

            setDebug((prev) => prev + `Connexion réussie\n`);
            await signIn(data.access_token, data.user);
        } catch(e) {
            
        }
    }

    return (
        <SafeAreaView style={tw `flex-1 bg-white`}>
            <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            />

            <TextInput
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />

            <TouchableOpacity
            onPress={handleLoading}
            disabled={loading}
            >
                <Text>
                Connexion
                </Text>

            
            </TouchableOpacity>

            {debug ?(
                <View>
                    <Text>(debug)</Text>
                </View>
            ) : null }
        </SafeAreaView>
    )
}