const customerId = document.querySelector('#cId').value;
const customermName = document.querySelector('#cName').value;

window.connection = new signalR
  .HubConnectionBuilder()
  .withUrl("/chathub")
  .build();

connection.start().then(() => {
  connection.send('join', customermName, customerId);
}).catch(function (err) {
  return console.error(err.toString());
});

connection.on('messageReceived', onMessageRecive);

function onMessageRecive(message) {
  console.log('signalR-main > msgReceived');

  if (!location.pathname.includes('chat-messaging')) {

    const msg = `<div class="newMsg">
      You have received a new message from
      <a href="/chat-messaging" class="text-info">
        ${message.customerName}, click here
      </a>
      to read and reply
    </div>`;

    displayPopupNotification(msg, 'success', false);
  }

}