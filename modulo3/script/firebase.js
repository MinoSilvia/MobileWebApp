/*ATAJOS AL DOM*/
/*Botones*/
var btnMenuLogin = document.getElementById('btnLogin');
var btnMenuSignOut = document.getElementById('btnSignOut');
var btnMenuChat = document.getElementById('btnChat');
var btnAboutSend = document.getElementById('btnAboutSend');
/*crear cuenta*/
var createUserFullName = document.getElementById('createUserFullName');
var createUserTeam = document.getElementById('createUserTeam');
var createUserEmail = document.getElementById('createUserEmail');
var createUserPassword = document.getElementById('createUserPassword');
var createUserButton = document.getElementById('createUserButton');
/*iniciar sesión*/
var logInEmail = document.getElementById('logInEmail');
var logInPassword = document.getElementById('logInPassword');
var logInButton = document.getElementById('logInButton');
var logInCheck = document.getElementById('logInCheck');
/*enviar mensaje*/
var chatWindow = document.getElementById('chatWindow');
var chatMessage = document.getElementById('chatMessage');
var chatSendMessageButton = document.getElementById('chatSendMessageButton');
/*chat*/
var chatID;
var chatSelected = document.getElementsByClassName('chatButton');

/*Datos del usuario activo*/
var userData = {
  fullName: '',
  team: ''
}

/*Añade event listeners*/
window.addEventListener('load', function () {
  /*Creación de cuenta*/
  createUserButton.addEventListener('click', function () {

    /*Crea la cuenta*/
    firebase.auth().createUserWithEmailAndPassword(createUserEmail.value, createUserPassword.value).then(function () {
      console.log('cuenta creada');
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function () {
        /*Inicia sesión*/
        firebase.auth().signInWithEmailAndPassword(createUserEmail.value, createUserPassword.value).then(function () {

          /*Actualiza los datos del usuario en la base de datos y los carga en una variable*/
          var user = firebase.auth().currentUser;
          firebase.database().ref('users/' + user.uid).push({
            fullName: createUserFullName.value,
            team: createUserTeam.value,
          });
          userData.fullName = createUserFullName.value;
          userData.team = createUserTeam.value;

          /*Muestra el index y el botón de cerrar sesión*/
          $('#btnLogin').addClass('d-none');
          $('#btnSignOut').removeClass('d-none');
          $('#btnBack').addClass('d-none');
          $('#login').addClass('d-none');
          $('#sign-up').addClass('d-none');
          $('#teams').addClass('d-none');
          $('#games').addClass('d-none');
          $('#about').addClass('d-none');
          $('#index').removeClass('d-none');
          actualDiv = 'index';
          Array.prototype.forEach.call(chatSelected, function (chat) {
            chatID = chat.getAttribute('id');
            $('#' + chatID).removeClass('d-none');
          });
          console.log('sesion iniciada');

        }).catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('Error al iniciar sesión.\nCódigo: ' + errorCode + '\nDescripción: ' + errorMessage);
        });
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Error al establecer persistencia.\nCódigo: ' + errorCode + '\nDescripción: ' + errorMessage);
      });
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Error al crear cuenta.\nCódigo: ' + errorCode + '\nDescripción: ' + errorMessage);
    });
  });

  /*Inicio de sesión*/
  logInButton.addEventListener('click', function () {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function () {
      firebase.auth().signInWithEmailAndPassword(logInEmail.value, logInPassword.value).then(function () {

        /*Carga los datos del usuario en una variable*/
        var userID = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userID).on('value', function (snapshot) {
          snapshot.forEach(function (u) {
            var user = u.val();
            userData.fullName = user.fullName;
            userData.team = user.team;
          });
        });

        /*Muestra el index y el botón de cerrar sesión*/ 
        $('#btnLogin').addClass('d-none');
        $('#btnSignOut').removeClass('d-none');
        $('#btnBack').addClass('d-none');
        $('#login').addClass('d-none');
        $('#sign-up').addClass('d-none');
        $('#teams').addClass('d-none');
        $('#games').addClass('d-none');
        $('#about').addClass('d-none');
        $('#index').removeClass('d-none');
        actualDiv = 'index';
        Array.prototype.forEach.call(chatSelected, function (chat) {
          chatID = chat.getAttribute('id');
          $('#' + chatID).removeClass('d-none');
        });
        console.log('sesion iniciada');

      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Error al iniciar sesión.\nCódigo: ' + errorCode + '\nDescripción: ' + errorMessage);
      });
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Error al establecer persistencia.\nCódigo: ' + errorCode + '\nDescripción: ' + errorMessage);
    });
  });

  /*Cierre de sesión*/
  btnMenuSignOut.addEventListener('click', function () {
    firebase.auth().signOut().then(function () {
      /*Muestra el index y oculta el botón de cerrar sesión */
      $('#btnLogin').removeClass('d-none');
      $('#btnSignOut').addClass('d-none');
      $('#btnBack').addClass('d-none');
      $('#login').addClass('d-none');
      $('#sign-up').addClass('d-none');
      $('#teams').addClass('d-none');
      $('#games').addClass('d-none');
      $('#about').addClass('d-none');
      $('#index').removeClass('d-none');
      actualDiv = 'index';
      Array.prototype.forEach.call(chatSelected, function (chat) {
        chatID = chat.getAttribute('id');
        $('#' + chatID).addClass('d-none');
      });
      console.log('sesión cerrada');
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Error al cerrar sesión.\nCódigo: ' + errorCode + '\nDescripción: ' + errorMessage);
    });
  });

  /*Enviar mensaje*/
  chatSendMessageButton.addEventListener('click', function () {
    firebase.database().ref('chat/' + chatID).push({
      fullName: userData.fullName,
      team: userData.team,
      message: chatMessage.value
    });
    /*MOSTRAR TODOS LOS MENSAJES VIEJOS*/
    firebase.database().ref('chat/' + chatID).on('value', function (snapshot) {
      var html = '';
      snapshot.forEach(function (e) {
        var element = e.val();
        var fullName = element.fullName;
        var team = element.team;
        var message = element.message;
        html += '<li class=\'list-group-item lime-green text-dark-blue border\'>Name: ' + fullName + '<br>Team: ' + team + '<br>Message: ' + message + '</li>';
        console.log(html);
      });
      chatWindow.innerHTML = html;
    });
    chatMessage.value = '';
  });

  /*Añade funcionalidad a los botones de chat*/
  Array.prototype.forEach.call(chatSelected, function (chat) {
    chat.addEventListener('click', function () {
      chatID = chat.getAttribute('id');
      /*MOSTRAR TODOS LOS MENSAJES VIEJOS*/
      firebase.database().ref('chat/' + chatID).on('value', function (snapshot) {
        var html = '';
        snapshot.forEach(function (e) {
          var element = e.val();
          var fullName = element.fullName;
          var team = element.team;
          var message = element.message;
          html += '<li class=\'list-group-item lime-green text-dark-blue border\'>Name: ' + fullName + '<br>Team: ' + team + '<br>Message: ' + message + '</li>';
          console.log(html);
        });
        chatWindow.innerHTML = html;
      });
      /*MUESTRA EL CHAT*/
      $('#btnLogin').addClass('d-none');
      $('#btnSignOut').addClass('d-none');
      $('#btnBack').removeClass('d-none');
      $('#login').addClass('d-none');
      $('#sign-up').addClass('d-none');
      $('#teams').addClass('d-none');
      $('#games').addClass('d-none');
      $('#about').addClass('d-none');
      $('#index').addClass('d-none');
      $('#chat').removeClass('d-none');
      actualDiv = 'chat';
    });
  });

  btnAboutSend.addEventListener('click', function () {
    alert('Mensaje enviado!');
    $('#about').addClass('d-none');
    $('#index').removeClass('d-none');
    actualDiv = 'index';
  });
}, false);

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    $('#btnLogin').addClass('d-none');
    $('#btnSignOut').removeClass('d-none');
    $('#btnBack').addClass('d-none');
    $('#login').addClass('d-none');
    $('#sign-up').addClass('d-none');
    $('#teams').addClass('d-none');
    $('#games').addClass('d-none');
    $('#about').addClass('d-none');
    $('#index').removeClass('d-none');
    actualDiv = 'index';
    alert('Logged In as ' + user.email);
    Array.prototype.forEach.call(chatSelected, function (chat) {
      chatID = chat.getAttribute('id');
      $('#' + chatID).removeClass('d-none');
    });
  } else if (!user) {
    $('#btnLogin').removeClass('d-none');
    $('#btnSignOut').addClass('d-none');
    $('#btnBack').addClass('d-none');
    $('#login').addClass('d-none');
    $('#sign-up').addClass('d-none');
    $('#teams').addClass('d-none');
    $('#games').addClass('d-none');
    $('#about').addClass('d-none');
    $('#index').removeClass('d-none');
    actualDiv = 'index';
  }
});
