const view = {}
view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'registerPage':
            document.getElementById('app').innerHTML = component.registerPage
            document.getElementById('Login-btn').addEventListener('click', () => { view.setActiveScreen('loginPage') })
            const registerForm = document.getElementById('register-form')
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const data = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value,
                }
                controller.register(data)
            })
            break;
        case 'loginPage':
            document.getElementById('app').innerHTML = component.loginPage
            document.getElementById('Register-btn').addEventListener('click', () => { view.setActiveScreen('registerPage') })
            const loginForm = document.getElementById('login-form')
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const data = {
                    email: loginForm.email.value,
                    password: loginForm.password.value,
                }
                controller.login(data)

            })

            break;
        case 'chatPage':
            document.getElementById('app').innerHTML = component.chatPage
            document.getElementById('create-conversation').addEventListener('click', () => {
                console.log('nhan vao day')
                view.setActiveScreen('createNewChatPage')
            })
            model.listenConversationChange()
            model.getConversations()
            //document.getElementById('wellcome-user').innerHTML=` Wellcome ${model.currentUser.displayName} to Chat-app`
            const sendMessageForm = document.getElementById('send-message-form')
            sendMessageForm.addEventListener('submit', async (e) => {

                //const response = await firebase.firestore().collection('conversations').doc(docId).get()
                // const conversation = getOneDocument(response)
                // console.log(conversation.users)
                e.preventDefault()
                // console.log(sendMessageForm.message.value)
                const message = {
                    content: sendMessageForm.message.value,
                    owner: model.currentUser.email,
                    createdAt: new Date().toISOString()
                }



                if (sendMessageForm.message.value.trim() !== '') {
                    model.addMessage(message)


                }
                sendMessageForm.message.value = ``


            })

            break;
        case 'createNewChatPage':
            document.getElementById('app').innerHTML = component.createNewChatPage
            const createNewChatForm = document.getElementById('create-conversation-form')
            createNewChatForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const data = {
                    title: createNewChatForm.title.value,
                    email: createNewChatForm.email.value,
                }
                if(controller.createNewChat(data)===false){
                    view.setActiveScreen('chatPage')
                }
               
            })
            const redirectToChat=document.getElementById('redirect-to-chat')
            redirectToChat.addEventListener('click',()=>{
                view.setActiveScreen('chatPage')
            })
            break;



    }
}
view.setErrorMessage = (elementId, content) => {
    document.getElementById(elementId).innerText = content
}

view.addMessage = (message) => {
    const messageWrapper = document.createElement('div')
    messageWrapper.classList.add('message')
    // console.log(model.currentUser.email)
    if (message.owner === model.currentUser.email) {
        messageWrapper.classList.add('mine')
        messageWrapper.innerHTML = `
        <div class="content"> ${message.content}</div>`
    } else {
        messageWrapper.classList.add('their')
        messageWrapper.innerHTML = `
        <div class="owner">${message.owner}</div>
        <div class="content"> ${message.content}</div>`
    }

    // console.log(messageWrapper)
    document.querySelector('.list-message').appendChild(messageWrapper)
    document.querySelector('.list-message').scrollTop = messageWrapper.offsetHeight + messageWrapper.offsetTop
}

function checkMessage(message) {
    let space_number = 0
    console.log('check number ' + message.length)
    for (let index = 0; index < message.length; index++) {
        if (message[index] === ' ') {
            space_number = space_number + 1
        }
    }
    if (space_number === message.length) {
        return false
    } else {
        return true
    }
}
view.showCurrentConversation = () => {
    document.querySelector('.list-message').innerHTML = ''
    for (message of model.currentConversation.messages) {
        view.addMessage(message)
    }
    document.querySelector('.conversation-title').innerHTML = model.currentConversation.title
    view.scrollToEndElement()
}
view.scrollToEndElement = () => {
    const element = document.querySelector(".list-message")
    element.scrollTop = element.scrollHeight
}
view.showConversations = () => {
    for (conversation of model.conversations) {
        view.addConversation(conversation)
    }
}
view.addConversation = (conversation) => {
    const conversationWrapper = document.createElement('div')
    conversationWrapper.classList.add('conversation')
    conversationWrapper.classList.add('cursor-pointer')
    if (conversation.id === model.currentConversation.id) {
        conversationWrapper.classList.add('current')
    }
    conversationWrapper.innerHTML = `
        <div class="left-conversation-title">${conversation.title}</div>
        <div class="num-of-user">${conversation.users.length} users</div>`
    document.querySelector('.list-conversations').appendChild(conversationWrapper)
    conversationWrapper.addEventListener('click', () => {
        console.log(conversation.title)
        model.currentConversation = model.conversations.filter(item => item.id === conversation.id)[0]
        view.showCurrentConversation()
        document.querySelector('.conversation.current').classList.remove('current')
        conversationWrapper.classList.add('current')
    })
}


