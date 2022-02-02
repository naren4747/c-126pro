import * as React from "react";
import {Button,View,Image,Platform} from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"

GetPermissons=async()=>{
    if(Platform.OS !== "web"){
        const {status}=await Permissions.askAsync(Permissions.CAMERA_ROLL)

        if(status !== "granted"){
            alert("sorry we need Camera Roll Permission to make this work")
        }
    }
}



export default class PickImage extends React.Component{
    state={
        image:null
    }

    componentDidMount(){
        this.GetPermissons()
    }


    UploadImage=async(uri)=>{
        const data=new FormData()
        let fileName=uri.split("/")[uri.split("/").length-1]
        let type= `image/${uri.split(".")[uri.split(".").length-1]}`
        const fileToUpload={
            uri:uri,
            name:fileName,
            type:type
        }
        data.append("digit",fileToUpload)
        fetch(" ",{
            method:"POST",
            body:data,
            headers:{"content-type":"multipart/form-data"}
        })
        .then((response)=>{response.json()})
        .then((result)=>{console.log("success:",result)})
        .catch((error)=>{console.error(error)})

    }
    _pickImage=async()=>{
        try{
            let result=await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,
                aspect:[4,3],
                quality:1
            })
    
            if(!result.cancelled){
                this.setState({
                    image:result.data
                })
                console.log(result.uri)
                this.uploadImage(result.uri)
            }
        }
        catch(error){
            console.log(error)
        }
        }
    
}