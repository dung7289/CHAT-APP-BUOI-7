window.onload = () =>{
    var firebaseConfig = {
        apiKey: "AIzaSyDdNRd4Nf_7GJrJea6jaWbOxBKA169oxSU",
        authDomain: "chat-app-ci47.firebaseapp.com",
        databaseURL: "https://chat-app-ci47.firebaseio.com",
        projectId: "chat-app-ci47",
        storageBucket: "chat-app-ci47.appspot.com",
        messagingSenderId: "867430652676",
        appId: "1:867430652676:web:c64cb123f373345e238e51"
    };
    firebase.initializeApp(firebaseConfig)
    console.log(firebase.app())
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            console.log(user)
            model.currentUser={
                displayName: user.displayName,
                email: user.email
            }
            if(user.emailVerified){
                view.setActiveScreen('chatPage') 
            }else{
                alert('Please veryfy your email')
                firebase.auth().signOut()
                view.setActiveScreen('loginPage')
            }
            
        }
        else{
            view.setActiveScreen('registerPage')
        }
    })
    // templateFirestore()
}

const templateFirestore=async()=>{
    // get one document
    const docId='es0tkrxcobmFXrt3Hi8o'
    const response=await firebase.firestore().collection('users').doc(docId).get()
    // console.log(response)
    const user=getOneDocument(response)
    console.log(user)
    // get many document
    const responseMany= await firebase.firestore().collection('users').where('age','>',25).get()
    console.log(getManyDocument(responseMany))

    // create: thêm phần tử mới
    const dataToCreate={
        age:23,
        name: 'Nguyễn Tiến Đạt'
    }

    // update data
    const idToUpdate='ziCIKQFeam4Hngdxo7Uk'
    const dataToUpdate={
        name: 'update',
        phone: firebase.firestore.FieldValue.arrayUnion('0912')// thêm vào phần tử array, không có thì thêm, có rồi thì thôi

    }
    firebase.firestore().collection('users').doc(idToUpdate).update(dataToUpdate)

    // delete
    const idToDelete='YjQGgY8wAX8YIy9pJ64a'
    firebase.firestore().collection('users').doc(idToDelete).delete()

  

    

}

const getOneDocument=(response)=>{
    const data =response.data()
    data.id=response.id
    return data
}
const getManyDocument=(response)=>{
    const listData=[]
    for (const doc of response.docs) {
        listData.push(getOneDocument(doc))
    }
    return listData
}