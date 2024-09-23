import data from './data.json'
const dummyApi=(user)=>{
    if(data[user]){
        return Promise.resolve(data[user].role)
    }
    return Promise.reject("invalid user")
}
const saveUSerInfo=(data)=>{
    localStorage.setItem("cred",JSON.stringify(data))
}
const login=(username,password)=>{
    return dummyApi(username,password)
         .then((role)=>{
            saveUSerInfo({
                username,
                password
            });
            return{
                status:'success',
                data:password
            }
         })
}
export{
    login
}