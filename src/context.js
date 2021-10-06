import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [cocktails, setCocktails] = useState([]); 

  const fetchDrinks = async () => {
    setLoading(true);
    try{ 
      const resp = await fetch(`${url}${searchTerm}`); 
      const data = await resp.json(); 
      const {drinks} = data; 
      // console.log(drinks); 
      // console.log(data);
      if(drinks) {
        const newCocktails = drinks.map(item => {
         const {
           idDrink, 
           strDrink, 
           strDrinkThumb,
           strAlcoholic, 
           strGlass
         } = item; 
         return {
           id: idDrink, 
           name: strDrink, 
           image: strDrinkThumb, 
           info: strAlcoholic, 
           glass: strGlass
         }
        });
        setCocktails(newCocktails); 
      } else {
        setCocktails([]); 
      }
      setLoading(false); 
    }catch(err) {
      console.log(err); 
      setLoading(false); 
    }
  }

  useEffect(() => {
    // console.log('use effect');
    fetchDrinks(); 
  }, [searchTerm])

  return (
  <AppContext.Provider 
    value={{
      loading,
      cocktails, 
      setSearchTerm,
      setCocktails
    }}>
      {children}
  </AppContext.Provider>
  ); 
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
