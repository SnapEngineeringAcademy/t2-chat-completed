
/* Initialize Firebase */
firebase.initializeApp({
  /* Fill in the following values based on your config. */
  apiKey: "AIzaSyDaUgTwXLHXjqKC9biMGREwhBjSgDxQP_w",
  authDomain: "snap-chat-5e987.firebaseapp.com",
  databaseURL: "https://snap-chat-5e987.firebaseio.com",
  projectId: "snap-chat-5e987",
  storageBucket: "snap-chat-5e987.appspot.com",
  messagingSenderId: "666247726244",
  appId: "1:666247726244:web:0b9041ade21ba6fa7f5231",
  measurementId: "G-0RFP9EW21C"
});

firebase.firestore().settings({
  timestampsInSnapshots: false
});

/* Define firebase refs */
const messagesRef = firebase.firestore().collection("messages");

/* Define DOM elements */
const messageInputDOM = document.getElementById("messageInput");
const namePickerDOM= document.getElementById("namePicker");
const messagesDOM = document.getElementById("messages");

/* Define global variables */
const sessionId = btoa(Math.random()).substring(0, 16);
let userName;

/* Define helper functions */
const scrollToBottom = (element) => {
  if (element) element.scrollTop = element.scrollHeight;
};

const createParagraph = (content) => {
  const newParagraph = document.createElement("p");

  if (content) {
    const contentEl = document.createTextNode(content);
    newParagraph.appendChild(contentEl);
  }

  return newParagraph;
};

const sendMessage = (message) => {
  messagesRef.add({
    message,
    time: firebase.firestore.Timestamp.now(),
    session: sessionId,
    name: userName || "Anonymous",
  });
};

const sendImage = (image) => {
  messagesRef.add({
    image,
    time: firebase.firestore.Timestamp.now(),
    session: sessionId,
    name: userName || "Anonymous",
  });
};

/* Setup message listener */
messagesRef.orderBy("time").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      const { session, name, image, message, time } = change.doc.data();

      const messageEl = document.createElement("div");
      messageEl.className = `message${session === sessionId ? " own" : ""}`;

      const nameEl = createParagraph(name);
      nameEl.className = "name";
      messageEl.appendChild(nameEl);

      const messageContentEl = document.createElement("div");
      messageContentEl.className = "messageContent";

      if (change.doc.data().image !== undefined) {
        const imageEl = document.createElement("img");
        imageEl.className = "image";
        imageEl.setAttribute("src", image);
        imageEl.setAttribute("height", "256px");
        messageContentEl.appendChild(imageEl);
      }

      if (change.doc.data().message !== undefined) {
        const msgTextEl = createParagraph(message);
        messageContentEl.appendChild(msgTextEl);
      }

      messageEl.appendChild(messageContentEl);

<<<<<<< HEAD
      // var timestampEl = createParagraph(time);
      // timestampEl.className = "timestamp";
      // messageEl.appendChild(timestampEl);
=======
      var timestampEl = createParagraph(time.toDate());
      timestampEl.className = "timestamp";
      messageEl.appendChild(timestampEl);
>>>>>>> 87a2bc33e455be2b9b14db6b2ec17a7e48449cc1

      messagesDOM.appendChild(messageEl);
    }
  });
  scrollToBottom(messagesDOM);
});

/* Setup event listeners */
namePickerDOM.addEventListener("click", () => {
  userName = prompt("What's your name?").substring(0, 16);
  namePickerDOM.parentNode.removeChild(namePickerDOM);
});

messageInputDOM.addEventListener("keydown", (event) => {
  if (event.which === 13 || event.keyCode === 13) {
    sendMessage(messageInputDOM.value);
    messageInputDOM.value = "";
  }
});

window.snapKitInit = setupBitmoji = () => {
  // Argument 1
  var bitmojiWebPickerIconClass = "my-bitmoji-stickerpicker-icon-target";

  // Argument 2
  var uiOptions = {
    onStickerPickCallback: function onStickerPickCallback(bitmojiImgURL) {
      sendImage(bitmojiImgURL)
    },
    webpickerPosition: "topLeft",
  };

  // Argument 3
  var loginParamsObj = {
    clientId: "4773fefc-a485-45aa-8c17-381ef991e94a",
    redirectURI: "http://localhost:8080",
    scopeList: [
      // the list of scopes you are approved for
      "user.bitmoji.avatar",
      "user.display_name",
    ],
  };

  // Mount Bitmoji Icon(s)
  snap.bitmojikit.mountBitmojiStickerPickerIcons(
    bitmojiWebPickerIconClass,
    uiOptions,
    loginParamsObj
  );
}
