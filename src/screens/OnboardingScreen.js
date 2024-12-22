import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated, Text, TouchableOpacity, ImageBackground, Dimensions, Image, Platform, TextInput, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import sharkOnboardingDataFile from '../components/sharkOnboardingDataFile';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);

const fontOrbitronSemiBold = 'Orbitron-SemiBold';
const fontMontserratRegular = 'Montserrat-Regular';
const fontMontserratSemiBold = 'Montserrat-SemiBold';

const OnboardingScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [nickname, setNickname] = useState('');
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  useEffect(() => {
    const onChange = ({ window }) => {
      setDimensions(window);
    };

    const dimensionListener = Dimensions.addEventListener('change', onChange);

    return () => {
      dimensionListener.remove();
    };
  }, []);




  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToTheNextOnboard = () => {
    if (currentIndex < sharkOnboardingDataFile.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Home');
    }
  };

  const saveNickname = async () => {
    try {
      await AsyncStorage.setItem('nickname', nickname);
    } catch (e) {
      console.error('Failed to save the nickname.', e);
    }
  };

  const renderItem = ({ item }) => (
    <SafeAreaView style={{
      width: dimensions.width,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#06263D',
    }} >
      {currentIndex !== 3 && (

        <Image
          resizeMode="contain"
          source={require('../assets/images/onboardingImagesVerde/SharkOnboardingImage.png')}
          style={{
            marginBottom: 16,
            height: '55%',
            width: '70%',
          }}
        />
      )}
      {currentIndex === 3 ? (
        <View style={{
          width: '90%',
          alignSelf: 'center',
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: '#215174',
            width: 'auto',
            borderRadius: '50%',
            alignSelf: 'center',
            marginTop: '10%'
          }}>
            <Image
              source={require('../assets/images/SharkImage.png')}
              style={{
                width: dimensions.width * 0.56,
                height: dimensions.width * 0.56,
                alignSelf: 'center',
                zIndex: 50,
              }}
              resizeMode="contain"
            />
          </View>

          <Text
            style={{
              fontFamily: fontMontserratRegular,
              textAlign: "center",
              fontSize: dimensions.width * 0.037,
              fontWeight: 'ultralight',
              color: 'white',
              paddingBottom: 8,
              alignSelf: 'center',
              width: '90%',
              marginBottom: dimensions.height * 0.01,
              marginTop: dimensions.height * 0.03,
            }}
          >
            Enter your nickname
          </Text>

          <TextInput style={{
            backgroundColor: '#215174',
            width: '90%',
            borderRadius: dimensions.width * 0.05,
            paddingVertical: dimensions.width * 0.03,
            alignSelf: 'center',
            padding: dimensions.width * 0.04,
            marginTop: dimensions.height * 0.01,
            color: 'white',
            height: dimensions.height * 0.08,
          }}
            placeholder='your nickname'
            placeholderTextColor={'white'}
            placeholderStyle={{ color: 'white', paddingVertical: 30 }}
            value={nickname}
            onChangeText={setNickname}
            />
        </View>

      ) : (


        <View style={{
          alignItems: 'center',
          height: dimensions.width < 380 ? '25%' : '23%',
          zIndex: 0,
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#215174',
          marginTop: '-14%',
          borderRadius: '8%',
        }}>
          {currentIndex === 0 && (

            <Text
              style={{
                fontSize: dimensions.width * 0.07,
                fontFamily: fontOrbitronSemiBold,
                maxWidth: '90%',
                color: 'white',
                marginTop: 21,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {item.title}
            </Text>
          )}
          <Text
            style={{
              fontFamily: fontMontserratRegular,
              fontSize: dimensions.width < 400 ? dimensions.width * 0.04 : dimensions.width * 0.045,
              maxWidth: '60%',
              color: 'white',
              textAlign: 'center',
              marginTop: currentIndex === 0 ? 8 : '10%',

            }}>
            {item.description}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );

  return (
    <StyledView
      style={{ justifyContent: 'space-between', flex: 1, backgroundColor: '#06263D', alignItems: 'center', }}
    >
      <StyledView style={{ display: 'flex' }}>
        <FlatList
          data={sharkOnboardingDataFile}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          onViewableItemsChanged={viewableItemsChanged}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </StyledView>

      <StyledTouchableOpacity
      disabled={currentIndex === 3 && nickname.length === 0}
        onPress={() => {
          if (currentIndex === sharkOnboardingDataFile.length - 1) {
            navigation.navigate('Home');
          } else if (currentIndex === 3) {
            saveNickname();
            scrollToTheNextOnboard();
          }
          else scrollToTheNextOnboard();
        }}
        style={{
          bottom: '16%',
          alignSelf: 'center',
          backgroundColor: '#E10909',
          borderRadius: 9999,
          paddingHorizontal: 28,
          paddingVertical: 21,
          width: '50%',
          marginBottom: 40,
          opacity: currentIndex === 3 && nickname.length === 0 ? 0.5 : 1,
        }}
      >
        <Text
          style={{ 
            color: 'white', 
            fontFamily: fontMontserratSemiBold, 
            fontSize: sharkOnboardingDataFile.length - 1 ? 
              dimensions.width * 0.04 : dimensions.width * 0.05, 
            textAlign: 'center', fontWeight: 600 
            }}>
          {currentIndex === 0 ? 'Start' : currentIndex === 3 ? 'Save' : currentIndex === sharkOnboardingDataFile.length - 1 ? 'Start Challenge' : 'Next'}
        </Text>
      </StyledTouchableOpacity>

    </StyledView>
  );
};

export default OnboardingScreen;
