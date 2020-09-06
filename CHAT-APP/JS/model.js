// nhiệm vụ tương tác với database
const model = {}
model.currentUser = undefined
model.register = async (data) => { // khai báo sử dụng đồng bộ async
    try {
        const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password) // await đặt trước câu lệnh cần trả về từ server
        console.log(response)
        firebase.auth().currentUser.updateProfile({
            displayName: data.firstName + ' ' + data.lastName
        })

        firebase.auth().currentUser.sendEmailVerification()
        alert('Please verify by email to complete sign up')
    } catch (err) {
        console.log(err)
        alert(err)
    }

}
model.login = (data) => {
    try {
        response = firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        // console.log(response)
        // if(response.user.emailVerified===false){
        //     alert('Please verify by email to complete sign up')
        // } else{
        //     //alert(' Wellcome to Chat app')
        //     model.currentUser={
        //         email: response.user.email,
        //         displayName:response.user.displayName
        //     }
        //     view.setActiveScreen('chatPage')
        // }
    } catch (err) {
        console.log(err)
        alert(err.message)
    }

}
model.getConversations = async () => {
    const response = await firebase.firestore().collection('conversations').where('users', 'array-contains', model.currentUser.email).get()
    model.conversations = getManyDocument(response)
    if (model.conversations.length > 0) {
        model.currentConversation = model.conversations[0]
        view.showCurrentConversation()
        view.showConversations()
    }
}
model.addMessage = (message) => {
    dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    }
    firebase.firestore().collection('conversations').doc(model.currentConversation.id).update(dataToUpdate)
}
model.listenConversationChange = () => {
    let isFirstRun = true
    firebase.firestore().collection('conversations').where('users', 'array-contains', model.currentUser.email).onSnapshot((snapshot) => {
        if (isFirstRun === true) {
            isFirstRun = false
            return
        }
        console.log(snapshot)
        for (oneChange of snapshot.docChanges()) {
            const docData = getOneDocument(oneChange.doc)
            if (docData.id === model.currentConversation.id) {
                model.currentConversation = docData
                view.addMessage(
                    model.currentConversation.messages[
                    model.currentConversation.messages.length - 1
                    ]
                )
                view.scrollToEndElement()
            }
            for (let i = 0; i < model.conversations.length; i++) {
                if (model.conversations[i].id === docData.id) {
                    model.conversations[i] = docData
                }
            }

        }

    })
}
model.addConversation = async (data) => {
    console.log('vào chửa')
    const user=[model.currentUser.email,data.email]
    newConversation = {
        createdAt: new Date().toISOString(),
        title: data.title,
        messages:[],
        users: user
    }
    newUser={
        users: firebase.firestore.FieldValue.arrayUnion(data.email)
    }
    const response2 = await firebase.firestore().collection('conversations').where('title', '==', data.title).get()
    model.newConversation = getManyDocument(response2)
    console.log(model.newConversation)
    if (model.newConversation.length > 0) {
        firebase.firestore().collection('conversations').doc(model.newConversation[0].id).update(newUser)
    }else{
        const response2 = await firebase.firestore().collection('conversations').add(newConversation)
    }

    
}