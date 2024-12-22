import { View, Text, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fontOrbitronSemiBold = 'Orbitron-SemiBold';
const fontMontserratRegular = 'Montserrat-Regular';
const fontMontserratSemiBold = 'Montserrat-SemiBold';

const HistoryScreen = () => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [challengeResults, setChallengeResults] = useState([]);

    useEffect(() => {
        const fetchChallengeResults = async () => {
            try {
                const results = await AsyncStorage.getItem('challengeResults');
                if (results !== null) {
                    setChallengeResults(JSON.parse(results));
                }
            } catch (error) {
                console.error('Error loading challenge results:', error);
            }
        };

        fetchChallengeResults();
    }, []);

    return (
        <SafeAreaView style={{ width: '100%', flex: 1 }}>
            <Text
                style={{
                    fontFamily: fontOrbitronSemiBold,
                    textAlign: 'center',
                    fontSize: dimensions.width < 380 ? dimensions.width * 0.05 : dimensions.width * 0.07,
                    fontWeight: 800,
                    color: 'white',
                    paddingBottom: 8,
                    marginTop: '5%',
                }}
            >
                Challenges log
            </Text>

            <ScrollView >
                <View style={{ marginBottom: dimensions.height * 0.16 }}>


                    {challengeResults
                        .slice()
                        .reverse()
                        .map((result, index) => (
                            <View
                                key={index}
                                style={{
                                    width: '90%',
                                    backgroundColor: 'white',
                                    alignSelf: 'center',
                                    borderRadius: dimensions.width * 0.055,
                                    marginTop: dimensions.height * 0.016,
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        alignSelf: 'center',
                                        paddingVertical: dimensions.width * 0.04,
                                        paddingHorizontal: dimensions.width * 0.04,
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            fontSize: dimensions.width * 0.04,
                                            paddingBottom: dimensions.width * 0.02,
                                            fontWeight: 800,
                                            fontFamily: fontMontserratSemiBold,
                                            color: '#06263D',
                                            paddingTop: dimensions.height * 0.019,
                                            paddingBottom: dimensions.height * 0.025,
                                        }}
                                    >
                                        {new Date(result.endDate).toLocaleDateString('uk-UA', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                    </Text>
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            fontSize: dimensions.width * 0.064,
                                            paddingBottom: dimensions.width * 0.02,
                                            fontWeight: 800,
                                            fontFamily: fontMontserratSemiBold,
                                            color: '#06263D',
                                        }}
                                    >
                                        Your challenge was:
                                    </Text>

                                    <Text
                                        style={{
                                            fontFamily: fontMontserratRegular,
                                            textAlign: 'center',
                                            fontSize: dimensions.width * 0.037,
                                            fontWeight: 400,
                                            color: '#444444',
                                            paddingHorizontal: dimensions.width * 0.04,
                                            marginTop: dimensions.height * 0.01,
                                        }}
                                    >
                                        {result.challengeDescrip}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignSelf: 'center',
                                        paddingBottom: dimensions.width * 0.03,
                                        justifyContent: 'center',
                                        width: '95%',
                                    }}
                                >
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            backgroundColor: result.result === 'Done' ? '#2ACD68' : '#F9332C',
                                            padding: 16,
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            borderRadius: dimensions.width * 0.07,
                                            marginBottom: dimensions.height * 0.03,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: fontMontserratSemiBold,
                                                textAlign: 'center',
                                                fontSize: dimensions.width * 0.04,
                                                fontWeight: 'bold',
                                                paddingHorizontal: dimensions.width * 0.05,
                                                color: 'white',
                                            }}
                                        >
                                            {result.result === 'Done' ? 'Done' : 'Lost'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HistoryScreen;