import React, {useState, useEffect} from "react";
import { View, Text, ScrollView, TouchableWithoutFeedback  } from "react-native";
import styles from "./styles";
import { useMobileAd, fontOptions, sizeOptions, colors } from "../../providers/AdProviders"
import { Button, PaperProvider, TextInput } from "react-native-paper";
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/FontAwesome';
import ColorPicker from "../ColorPicker";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation } from '@react-navigation/native';
import { UseServices } from "../../services/imageservices";


const Form = () => {
  const navigation = useNavigation();
    const {
        //text
        productName, setProductName, 
        productDesc, setProductDesc,
        price, setPrice,
        website, setWebsite,
        contactNum, setContactNum,
        promo, setPromo,
        //discount, setDiscount,
        addDesc, setAddDesc,
        cta, setCta,
        //backgroundColors
        firstColor,
        setFirstColor,
        secondColor,
        setSecondColor,
        //font
        productNameFont,
        setProductNameFont,
        productDescFont, 
        setProductDescFont,
        contactNumFont, 
        setContactNumFont,
        priceFont, 
        setPriceFont,
        websiteFont, 
        setWebsiteFont,
        promoFont,
        setPromoFont,
        //discountFont,
        //setDiscountFont,
        ctaFont, 
        setCtaFont,
        //font sizes
        productNameSize,
        setProductNameSize,
        productDescSize, 
        setProductDescSize,
        contactNumSize, 
        setContactNumSize,
        priceSize, 
        setPriceSize,
        websiteSize, 
        setWebsiteSize,
        promoSize,
        setPromoSize,
        //discountSize,
        //setDiscountSize,
        ctaSize, 
        setCtaSize,
        //font color
        productNameColor,
        setProductNameColor,
        productDescColor, 
        setProductDescColor,
        contactNumColor, 
        setContactNumColor,
        priceColor, 
        setPriceColor,
        websiteColor, 
        setWebsiteColor,
        promoColor, 
        setPromoColor,
        //discountColor,
        //setDiscountColor,
        ctaColor, 
        setCtaColor,

        // top
        productNameTop, 
        setProductNameTop,
        productDescTop, 
        setProductDescTop,
        contactNumTop, 
        setContactNumTop,
        priceTop, 
        setPriceTop,
        websiteTop, 
        setWebsiteTop,
        promoTop, 
        setPromoTop,
        ctaTop, 
        setCtaTop,

        //left
        productNameLeft, 
        setProductNameLeft,
        productDescLeft, 
        setProductDescLeft,
        contactNumLeft, 
        setContactNumLeft,
        priceLeft, 
        setPriceLeft,
        promoLeft, 
        setPromoLeft,
        websiteLeft, 
        setWebsiteLeft,
        ctaLeft, 
        setCtaLeft,
    } = useMobileAd()

    const [formDataArray, setFormDataArray] = useState([]);
    const {
        pickLogoImg,
        pickProductImg,
        pickBackgroundImg,
        source,
        setSource,
    } = UseServices()

    const togglePickSource = () => {
      // Toggle between Camera, Library, and WordPress
      if (source === 'Camera') {
        setSource('Library');
      } else if (source === 'Library') {
        setSource('WP Media');
      } else {
        setSource('Camera');
      }
    };

    const getButtonColor = () => {
      // Define background colors for each source
      switch (source) {
        case 'Camera':
          return 'red';
        case 'Library':
          return 'green';
        case 'WP Media':
          return '#8B8000';
        default:
          return 'green';
      }
    };

    useEffect(() => {
      loadFormDataArray();
    }, []);

    const loadFormDataArray = async () => {
      try {
        const formDataJSON = await AsyncStorage.getItem('formData');
        if (formDataJSON !== null) {
          const parsedFormDataArray = JSON.parse(formDataJSON);
          setFormDataArray(parsedFormDataArray);
          console.log("Loaded:");
        }
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    };

    const saveAllFields = async () => {
      try {
        // Load existing data from AsyncStorage if available
        const existingDataJSON = await AsyncStorage.getItem('formData');
        let existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];
    
        // Create a new object with the current form data
        const formData = {
          productName,
          productDesc,
          contactNum,
          website,
          price,
          promo,
          cta,
          // Add other fields as needed
        };
    
        // Add the new form data object to the existing array
        existingData = [...existingData, formData];
    
        // Serialize and save the updated data
        const updatedDataJSON = JSON.stringify(existingData);
        await AsyncStorage.setItem('formData', updatedDataJSON);
    
        // Reload the form data array
        await loadFormDataArray();
    
        console.log('Form data saved successfully.');
        console.log(updatedDataJSON);
      } catch (error) {
        console.error('Error saving form data:', error);
      }
    };

    const removeSavedByIndex = async (index) => {
      try {
        const formDataJSON = await AsyncStorage.getItem('formData');
        if (formDataJSON !== null) {
          let formDataArray = JSON.parse(formDataJSON);
  
          if (Array.isArray(formDataArray) && formDataArray.length > 0) {
            formDataArray.splice(index, 1);
            await AsyncStorage.setItem('formData', JSON.stringify(formDataArray));
  
            setFormDataArray(formDataArray);
            // Update other state variables as needed...
            console.log(`Data at index ${index} removed successfully.`);
          }
        }
      } catch (error) {
        console.error(`Error removing data at index ${index}:`, error);
      }
    };

    const loadSavedByIndex = async (index) => {
      // Implement the logic to load data based on the index
      const formData = formDataArray[index];
      if (formData) {
        setProductName(formData.productName || '');
        setProductDesc(formData.productDesc || '');
        setContactNum(formData.contactNum || '');
        setWebsite(formData.website || '');
        setPrice(formData.price || '');
        setPromo(formData.promo || '');
        setCta(formData.cta || '');
        // Update other fields similarly
        console.log(`Loaded data at index ${index}:`, formData);
      }
    };

    const resetAllFields = () => {
      setProductName(''); // Set to an empty string
      setProductDesc(''); // Set to an empty string
      setContactNum(''); // Set to an empty string
      setWebsite(''); // Set to an empty string
      setPrice(''); // Set to an empty string
      setPromo(''); // Set to an empty string
      setCta(''); // Set to an empty string
      // Clear other fields similarly
      console.log('Input all cleared');
    };
  
    // Define your toggle visibility functions here
    const [isProductNameVisible, setProductNameVisible] = useState(false);
    const [isProductDescVisible, setProductDescVisible] = useState(false);
    const [isContactNumVisible, setContactNumVisible] = useState(false);
    const [isWebsiteVisible, setWebsiteVisible] = useState(false);
    const [isPriceVisible, setPriceVisible] = useState(false);
    const [isPromoVisible, setPromoVisible] = useState(false);
    const [isCtaVisible, setCtaVisible] = useState(false);

    const toggleProductNameVisibility = () => {
      setProductNameVisible(!isProductNameVisible);
    };

    const toggleProductDescVisibility = () => {
      setProductDescVisible(!isProductDescVisible);
    };

    const toggleContactNumVisibility = () => {
      setContactNumVisible(!isContactNumVisible);
    };

    const toggleWebsiteVisibility = () => {
      setWebsiteVisible(!isWebsiteVisible);
    };

    const togglePriceVisibility = () => {
      setPriceVisible(!isPriceVisible);
    };

    const togglePromoVisibility = () => {
      setPromoVisible(!isPromoVisible);
    };

    const toggleCtaVisibility = () => {
      setCtaVisible(!isCtaVisible);
    };

    const theme = {
        colors: {
            primary: '#007AFF',
        },
        roundness: 10
    };

  return(
    <PaperProvider theme={theme}>
    <View style = {styles.container}>
      <ScrollView       
        showsVerticalScrollIndicator={false}
        contentContainerStyle = {styles.inputContainer}>

        <View style={styles.fieldContainer}>
        <TouchableWithoutFeedback onPress={toggleProductNameVisibility}>
          <View style={styles.textIconContainer}>
          <TextInput 
            mode="outlined"
            style = {styles.input}
            label='Product Name'
            onChangeText={setProductName}
          />
            <Icon
              name={isProductNameVisible ? 'minus' : 'plus'}
              size={20}
              color="#000"
            />
          </View>
        </TouchableWithoutFeedback>
        {isProductNameVisible && (
          <View>
            <View style={styles.pickerContainer}>
              <Text style={styles.selectStyle}>Select Style</Text>
            <View style={styles.dropDown}>
              <Picker
                selectedValue={productNameFont}
                onValueChange={setProductNameFont}
              >
                {fontOptions.map((fontOptions) => (
                  <Picker.Item
                    key={fontOptions.value}
                    label={fontOptions.label}
                    value={fontOptions.value}
                  />
                ))}
              </Picker>         
            </View>
            <Text style={styles.selectSize}>Select Size</Text>
            <View style={styles.dropDown}>
              <Picker
                selectedValue={productNameSize}
                onValueChange={setProductNameSize}
              >
                {sizeOptions.map((sizeOptions) => (
                  <Picker.Item
                    key={sizeOptions.value}
                    label={sizeOptions.label}
                    value={sizeOptions.value}
                  />
                ))}
              </Picker>            
            </View>
            <View style={styles.colorPickerContainer}>
              <ColorPicker 
                  selectedColor={productNameColor}
                  setSelectedColor={setProductNameColor}
                  colorOptions={colors}/> 
            </View>
            </View>
            <View style={styles.positionContainer}>
              <TextInput 
                mode="outlined"
                keyboardType="numeric"
                style = {styles.positionInput}
                label= 'Top'
                onChangeText={(text) => setProductNameTop(parseFloat(text))}
              />
              <TextInput 
                mode="outlined"
                keyboardType="numeric"
                style = {styles.positionInput}
                label='Left'
                onChangeText={(text) => setProductNameLeft(parseFloat(text))}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.fieldContainer}>
        <TouchableWithoutFeedback onPress={toggleProductDescVisibility}>
          <View style={styles.textIconContainer}>
          <TextInput 
            mode="outlined"
            style = {styles.input}
            label='Product Description'
            onChangeText={setProductDesc}
          />
            <Icon
              name={isProductDescVisible ? 'minus' : 'plus'}
              size={20}
              color="#000"
            />
          </View>
        </TouchableWithoutFeedback>
        {isProductDescVisible && (
          <View>
            <View style={styles.pickerContainer}>
              <Text style={styles.selectStyle}>Select Style</Text>
            <View style={styles.dropDown}>
              <Picker
                selectedValue={productDescFont}
                onValueChange={setProductDescFont}
              >
                {fontOptions.map((fontOptions) => (
                  <Picker.Item
                    key={fontOptions.value}
                    label={fontOptions.label}
                    value={fontOptions.value}
                  />
                ))}
              </Picker>            
            </View>
            <Text style={styles.selectSize}>Select Size</Text>
            <View style={styles.dropDown}>
              <Picker
                selectedValue={productDescSize}
                onValueChange={setProductDescSize}
              >
                {sizeOptions.map((sizeOptions) => (
                  <Picker.Item
                    key={sizeOptions.value}
                    label={sizeOptions.label}
                    value={sizeOptions.value}
                  />
                ))}
              </Picker>            
            </View>   
            <View style={styles.colorPickerContainer}>
              <ColorPicker 
                  selectedColor={productDescColor}
                  setSelectedColor={setProductDescColor}
                  colorOptions={colors}/> 
            </View>   
            </View>
            <View style={styles.positionContainer}>
              <TextInput 
                mode="outlined"
                keyboardType="numeric"
                style = {styles.positionInput}
                label= 'Top'
                onChangeText={(text) => setProductDescTop(parseFloat(text))}
              />
              <TextInput 
                mode="outlined"
                keyboardType="numeric"
                style = {styles.positionInput}
                label='Left'
                onChangeText={(text) => setProductDescLeft(parseFloat(text))}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.fieldContainer}>
        <TouchableWithoutFeedback onPress={toggleContactNumVisibility}>
          <View style={styles.textIconContainer}>
          <TextInput 
            mode="outlined"
            keyboardType="numeric"
            style = {styles.input}
            label='Contact Number'
            onChangeText={setContactNum}
          />
            <Icon
              name={isContactNumVisible ? 'minus' : 'plus'}
              size={20}
              color="#000"
            />
          </View>
        </TouchableWithoutFeedback>
        {isContactNumVisible && (
          <View>
            <View style={styles.pickerContainer}>
              <Text style={styles.selectStyle}>Select Style</Text>
            <View style={styles.dropDown}>
              <Picker
                selectedValue={contactNumFont}
                onValueChange={setContactNumFont}
              >
                {fontOptions.map((fontOptions) => (
                  <Picker.Item
                    key={fontOptions.value}
                    label={fontOptions.label}
                    value={fontOptions.value}
                  />
                ))}
              </Picker>            
            </View>
            <Text style={styles.selectSize}>Select Size</Text>
            <View style={styles.dropDown}>
              <Picker
                selectedValue={contactNumSize}
                onValueChange={setContactNumSize}
              >
                {sizeOptions.map((sizeOptions) => (
                  <Picker.Item
                    key={sizeOptions.value}
                    label={sizeOptions.label}
                    value={sizeOptions.value}
                  />
                ))}
              </Picker>            
            </View>
            <View style={styles.colorPickerContainer}>
              <ColorPicker 
                  selectedColor={contactNumColor}
                  setSelectedColor={setContactNumColor}
                  colorOptions={colors}/> 
            </View>   
            </View>
            <View style={styles.positionContainer}>
              <TextInput 
                mode="outlined"
                keyboardType="numeric"
                style = {styles.positionInput}
                label= 'Top'
                onChangeText={(text) => setContactNumTop(parseFloat(text))}
              />
              <TextInput 
                mode="outlined"
                keyboardType="numeric"
                style = {styles.positionInput}
                label='Left'
                onChangeText={(text) => setContactNumLeft(parseFloat(text))}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.fieldContainer}>
        <TouchableWithoutFeedback onPress={togglePriceVisibility}>
          <View style={styles.textIconContainer}>
          <TextInput 
            mode="outlined"
            keyboardType="numeric"
            style = {styles.input}
            label='Price'
            onChangeText={setPrice}
          />
            <Icon
              name={isPriceVisible ? 'minus' : 'plus'}
              size={20}
              color="#000"
            />
          </View>
        </TouchableWithoutFeedback>
        {isPriceVisible && (
          <View>
            <View style={styles.pickerContainer}>
              <Text style={styles.selectStyle}>Select Style</Text>
            <View style={styles.dropDown}>
              <Picker
                selectedValue={priceFont}
                onValueChange={setPriceFont}
              >
                {fontOptions.map((fontOptions) => (
                  <Picker.Item
                    key={fontOptions.value}
                    label={fontOptions.label}
                    value={fontOptions.value}
                  />
                ))}
              </Picker>            
            </View>
            <Text style={styles.selectSize}>Select Size</Text>
            <View style={styles.dropDown}>
              <Picker
                selectedValue={priceSize}
                onValueChange={setPriceSize}
              >
                {sizeOptions.map((sizeOptions) => (
                  <Picker.Item
                    key={sizeOptions.value}
                    label={sizeOptions.label}
                    value={sizeOptions.value}
                  />
                ))}
              </Picker>            
            </View>
            <View style={styles.colorPickerContainer}>
              <ColorPicker 
                  selectedColor={priceColor}
                  setSelectedColor={setPriceColor}
                  colorOptions={colors}/> 
            </View>   
            </View>
            <View style={styles.positionContainer}>
              <TextInput 
                mode="outlined"
                keyboardType="numeric"
                style = {styles.positionInput}
                label= 'Top'
                onChangeText={(text) => setPriceTop(parseFloat(text))}
              />
              <TextInput 
                mode="outlined"
                keyboardType="numeric"
                style = {styles.positionInput}
                label='Left'
                onChangeText={(text) => setPriceLeft(parseFloat(text))}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.fieldContainer}>
        <TouchableWithoutFeedback onPress={toggleWebsiteVisibility}>
          <View style={styles.textIconContainer}>
          <TextInput 
            mode="outlined"
            style = {styles.input}
            label='Website'
            onChangeText={setWebsite}
          />
            <Icon
              name={isWebsiteVisible ? 'minus' : 'plus'}
              size={20}
              color="#000"
            />
          </View>
        </TouchableWithoutFeedback>
        {isWebsiteVisible && (
          <View>
            <View style={styles.pickerContainer}>
              <Text style={styles.selectStyle}>Select Style</Text>
            <View style={styles.dropDown}>
              <Picker
                selectedValue={websiteFont}
                onValueChange={setWebsiteFont}
              >
                {fontOptions.map((fontOptions) => (
                  <Picker.Item
                    key={fontOptions.value}
                    label={fontOptions.label}
                    value={fontOptions.value}
                  />
                ))}
              </Picker>            
            </View>
            <Text style={styles.selectSize}>Select Size</Text>
            <View style={styles.dropDown}>
              <Picker
                selectedValue={websiteSize}
                onValueChange={setWebsiteSize}
              >
                {sizeOptions.map((sizeOptions) => (
                  <Picker.Item
                    key={sizeOptions.value}
                    label={sizeOptions.label}
                    value={sizeOptions.value}
                  />
                ))}
              </Picker>            
            </View>
            <View style={styles.colorPickerContainer}>
              <ColorPicker 
                  selectedColor={websiteColor}
                  setSelectedColor={setWebsiteColor}
                  colorOptions={colors}/> 
            </View>   
            </View>
            <View style={styles.positionContainer}>
              <TextInput 
                mode="outlined"
                keyboardType="numeric"
                style = {styles.positionInput}
                label= 'Top'
                onChangeText={(text) => setWebsiteTop(parseFloat(text))}
              />
              <TextInput 
                mode="outlined"
                keyboardType="numeric"
                style = {styles.positionInput}
                label='Left'
                onChangeText={(text) => setWebsiteLeft(parseFloat(text))}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.fieldContainer}>
        <TouchableWithoutFeedback onPress={togglePromoVisibility}>
          <View style={styles.textIconContainer}>
          <TextInput 
            mode="outlined"
            style = {styles.input}
            label='Promo'
            onChangeText={setPromo}
          />
            <Icon
              name={isPromoVisible ? 'minus' : 'plus'}
              size={20}
              color="#000"
            />
          </View>
        </TouchableWithoutFeedback>
        {isPromoVisible && (
          <View>
            <View style={styles.pickerContainer}>
              <Text style={styles.selectStyle}>Select Style</Text>
            <View style={styles.dropDown}>
              <Picker
                selectedValue={promoFont}
                onValueChange={setPromoFont}
              >
                {fontOptions.map((fontOptions) => (
                  <Picker.Item
                    key={fontOptions.value}
                    label={fontOptions.label}
                    value={fontOptions.value}
                  />
                ))}
              </Picker>            
            </View>
            <Text style={styles.selectSize}>Select Size</Text>
            <View style={styles.dropDown}>
              <Picker
                selectedValue={promoSize}
                onValueChange={setPromoSize}
              >
                {sizeOptions.map((sizeOptions) => (
                  <Picker.Item
                    key={sizeOptions.value}
                    label={sizeOptions.label}
                    value={sizeOptions.value}
                  />
                ))}
              </Picker>            
            </View>
            <View style={styles.colorPickerContainer}>
              <ColorPicker 
                  selectedColor={promoColor}
                  setSelectedColor={setPromoColor}
                  colorOptions={colors}/> 
            </View>   
            </View>
            <View style={styles.positionContainer}>
              <TextInput 
                mode="outlined"
                keyboardType="numeric"
                style = {styles.positionInput}
                label= 'Top'
                onChangeText={(text) => setPromoTop(parseFloat(text))}
              />
              <TextInput 
                mode="outlined"
                keyboardType="numeric"
                style = {styles.positionInput}
                label='Left'
                onChangeText={(text) => setPromoLeft(parseFloat(text))}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.fieldContainer}>
        <TouchableWithoutFeedback onPress={toggleCtaVisibility}>
          <View style={styles.textIconContainer}>
          <TextInput 
            mode="outlined"
            style = {styles.input}
            label='Call to Action'
            onChangeText={setCta}
          />
            <Icon
              name={isCtaVisible ? 'minus' : 'plus'}
              size={20}
              color="#000"
            />
          </View>
        </TouchableWithoutFeedback>
        {isCtaVisible && (
          <View>
            <View style={styles.pickerContainer}>
              <Text style={styles.selectStyle}>Select Style</Text>
            <View style={styles.dropDown}>
              <Picker
                selectedValue={ctaFont}
                onValueChange={setCtaFont}
              >
                {fontOptions.map((fontOptions) => (
                  <Picker.Item
                    key={fontOptions.value}
                    label={fontOptions.label}
                    value={fontOptions.value}
                  />
                ))}
              </Picker>            
            </View>
            <Text style={styles.selectSize}>Select Size</Text>
            <View style={styles.dropDown}>
              <Picker
                selectedValue={ctaSize}
                onValueChange={setCtaSize}
              >
                {sizeOptions.map((sizeOptions) => (
                  <Picker.Item
                    key={sizeOptions.value}
                    label={sizeOptions.label}
                    value={sizeOptions.value}
                  />
                ))}
              </Picker>            
            </View>
            <View style={styles.colorPickerContainer}>
              <ColorPicker 
                  selectedColor={ctaColor}
                  setSelectedColor={setCtaColor}
                  colorOptions={colors}/> 
            </View>   
            </View>
            <View style={styles.positionContainer}>
              <TextInput 
                mode="outlined"
                keyboardType="numeric"
                style = {styles.positionInput}
                label= 'Top'
                onChangeText={(text) => setCtaTop(parseFloat(text))}
              />
              <TextInput 
                mode="outlined"
                keyboardType="numeric"
                style = {styles.positionInput}
                label='Left'
                onChangeText={(text) => setCtaLeft(parseFloat(text))}
              />
            </View>
          </View>
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={pickProductImg}>
          <Text style={styles.buttonText}>Change Product</Text>
        </Button>
        <Button
          style={[styles.buttonSource, { backgroundColor: getButtonColor() }]}
          title={`Choose Image from ${source === 'Library' ? 'WP Media' : source === 'Camera' ? 'Library' : 'Camera'}`}
          onPress={togglePickSource}>
          <Text style={styles.buttonText}>{source}</Text>
        </Button>
      </View>

      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={pickLogoImg}>
          <Text style={styles.buttonText}>Change Logo</Text>
        </Button>
        <Button
          style={[styles.buttonSource, { backgroundColor: getButtonColor() }]}
          title={`Choose Image from ${source === 'Library' ? 'WP Media' : source === 'Camera' ? 'Library' : 'Camera'}`}
          onPress={togglePickSource}>
          <Text style={styles.buttonText}>{source}</Text>
        </Button>
      </View>

      <Button
        mode="contained"
        style={styles.button}
        onPress={pickBackgroundImg}>
        <Text style={styles.buttonText}>Change Background</Text>
      </Button>

      <Text style={styles.pickerText1}>Select Background First Color</Text>
          <View style={styles.colorPickerContainer1}>
            <ColorPicker 
              selectedColor={firstColor}
              setSelectedColor={setFirstColor}
              colorOptions={colors}/> 
          </View>   

      <Text style={styles.pickerText1}>Select Background Second Color</Text>
        <View style={styles.colorPickerContainer1}>
          <ColorPicker 
            selectedColor={secondColor}
            setSelectedColor={setSecondColor}
            colorOptions={colors}/> 
          </View> 

          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('PostScreen')}>
            <Text style={styles.buttonText}>Create Post</Text>
          </Button>

          <Button style = {styles.button} onPress={saveAllFields}><Text style={styles.buttonText}>Save</Text></Button>
        {/*<Button style = {styles.button} onPress={loadLatestSaved}><Text style={styles.buttonText}>Load</Text></Button>*/}
        {/*<Button style = {styles.button} onPress={removeLatestSaved}><Text style={styles.buttonText}>Remove</Text></Button>*/}
        <Button style = {styles.button} onPress={resetAllFields}><Text style={styles.buttonText}>Reset</Text></Button>
        <View>
          <Text style={styles.savedText}>List of Saved Changes:</Text>
          {formDataArray.map((formData, index) => (
            <View style={styles.savedAdFields} key={index}>
              <Text style={styles.savedText}>This is the saved change at index {index}:</Text>
              <Text style={styles.savedText}>Product Name: {formData.productName}</Text>
              <Text style={styles.savedText}>Product Description: {formData.productDesc}</Text>
              <Text style={styles.savedText}>Contact Number: {formData.contactNum}</Text>
              <Text style={styles.savedText}>Website: {formData.website}</Text>
              <Text style={styles.savedText}>Price: {formData.price}</Text>
              <Text style={styles.savedText}>Promo: {formData.promo}</Text>
              <Text style={styles.savedText}>CTA: {formData.cta}</Text>
              {/* Add other fields as needed */}
              <Button style = {styles.button} onPress={() => loadSavedByIndex(index)}>
              <Text style={styles.buttonText}>Load</Text></Button>
              <Button style = {styles.button} onPress={() => removeSavedByIndex(index)} >
              <Text style={styles.buttonText}>Remove</Text></Button>
            </View>
          ))}
        </View>
        
      <View style={styles.space}/>  
      </ScrollView>
    </View>
    </PaperProvider>
    );
};

export default Form;