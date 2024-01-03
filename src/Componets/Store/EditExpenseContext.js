import React,{useState,useEffect} from "react";
 const EditExpenseContext=React.createContext({
    id:'',
    price: 0,
    description: "",
    category: "",
    setPrice: () => {},
    setDescription: () => {},
    setCategory: () => {},
    updatedData:"",
    setUpdatedData:()=>{},
 })

 export const EditExpenseProvider=(props)=>{
    const [id,setId] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [updatedData,setUpdatedData] = useState('');
  
    const contextValue = {
        id,
      price,
      description,
      category,
      updatedData,
      setId,
      setPrice,
      setDescription,
      setCategory,
      setUpdatedData,
    };
    useEffect(()=>{
        console.log("r",price)
    },[price,description,id,category])
    return <EditExpenseContext.Provider value={contextValue}>{props.children}</EditExpenseContext.Provider>
 }
export default EditExpenseContext