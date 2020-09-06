const component = {}
component.wellcomPage=`<h1> Wellcome to my chat app</h1>`
component.registerPage=`<div class="register-container">
<form id="register-form">
    <div class="register-header">MindX Chat</div>
    <div class="name-wrapper">
        <div class="input-wrapper">
            <input type="text" placeholder="First Name" name="firstName">
            <div class="error" id="first-name-error"></div>
        </div>
        <div class="input-wrapper">
            <input type="text" placeholder="Last Name" name="lastName">
            <div class="error" id="last-name-error"></div>
        </div>
    </div>
    
    <div class="input-wrapper">
        <input type="email" placeholder="Email" name="email">
        <div class="error" id="email-error"></div>
    </div>
    <div class="input-wrapper">
        <input type="password" placeholder=" Password" name="password">
        <div class="error" id="password-error"></div>
    </div>
    <div class="input-wrapper">
        <input type="password" placeholder="Confirm Password" name="confirmPassword">
        <div class="error" id="confirm-password-error"></div>
    </div>
    <div class="form-action">
        <div> Already have an acount? <span class="cursor-pointer" id="Login-btn">Login</span></div>
        <button class="btn cursor-pointer"  type="submit">Register</button>
    </div>
</form>
</div>`
component.loginPage=`<div class="login-container">
<form id="login-form">
    <div class="register-header">MindX Chat</div>
    <div class="input-wrapper">
        <input type="email" placeholder="Email" name="email">
        <div class="error" id="email-error"></div>
    </div>
    <div class="input-wrapper">
        <input type="password" placeholder=" Password" name="password">
        <div class="error" id="password-error"></div>
    </div>
    <div class="form-action">
        <div> Don't have an acount? <span class="cursor-pointer" id="Register-btn">Register</span></div>
        <button class="btn cursor-pointer"  type="submit">Login</button>
    </div>
</form>
</div>`
component.chatPage=`<div class="chat-container">
<div class="header">
    MindX Chat
</div>
<div class="main">
    <div class="aside-left">
        <div class="create-conversation">
            <button class="btn cursor-pointer" id="create-conversation"> + New Conversation</button>
        </div>
        <div class="list-conversations">
            
        </div>
    </div>
    <div class="conversation-detail">
        <div class="conversation-title"> First conversation</div>
        <div class="list-message">
          
        </div>
        <form id="send-message-form"> 
            <div class="input-wrapper">
                <input type="text" placeholder=" Type a message" name="message"></input>
                <button type="submit"><i class="fa fa-send-o" style="font-size:30px"></i></button>
            </div>
        </form>
    </div>
</div>
</div>`
component.createNewChatPage=`<div class="create-conversation-wrapper">
    <div class="header">
        MindX Chat
    </div>
    <div class="main">

        <form id="create-conversation-form" style=" width:60%; margin:auto; margin-top:20px">
            <h4>Create a new conversation</h4>
            <div class="input-wrapper">
                <input type="text" placeholder=" Conversation name" name="title"></input>
                <div class="error" id="create-conversation-title-error"></div>
            </div>
            <div class="input-wrapper">
                <input type="text" placeholder=" Friend email" name="email"></input>
                <div class="error" id="create-conversation-email-error"></div>
            </div>
            <div>
                <button class="btn" type="submit">Save</button>
                <button class="btn btn-bg-light" type="button" id="redirect-to-chat">Cancel</button>
            </div>
        </form>

    </div>
`