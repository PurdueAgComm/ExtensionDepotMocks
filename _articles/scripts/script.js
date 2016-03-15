/*
Script.js is meant to hold your site or application code. Again, this isn’t always the
best solution as larger teams and or larger, more feature rich projects can really benefit
from breaking out application code into module or feature specific files. For smaller
sites, simpler applications, and initial prototyping, however, dropping your work into
script.js makes sense. A simplified example might look something like the following:
*/


/*
Name:			Messaging
Author:			Adam Brooks
Description:	Manage the page messages.
*/
var Messaging = function () {
	/*
		Private
	*/

	// Store a message.
	function Message (intMessageID, strMessage, strCssClass, datModifyDate) {
		this.intMessageID = intMessageID;
		this.strMessage = strMessage;
		this.strCssClass = strCssClass;
		this.datModifyDate = datModifyDate;
	}

	// Variable Declarations
	var _messages = [];

	// Add a message to the list of messages.
	function AddMessage (strMessage) {
		AddMessage(strMessage, '');
	}

	// Add a message to the list of messages.
	function AddMessage (strMessage, strCssClass) {
		// Calculate the next message ID.
		var id = MaxMessageID() + 1;
			
		// Add the message to the message list.
		var msg = new Message(id, strMessage, strCssClass, new Date());
		_messages.push(msg);

		// Save the messages for later use.
		try {
			SaveMessages();
		} catch (e) {
			throw e;
		}

		// Display the message.
		DisplayMessage(msg);
	}

	// Remove a specific message.
	function ClearMessage(intMessageID) {
		if (_messages && _messages.length > 0) {
			for (var i = 0; i < _messages.length; i++) {
				if (_messages[i].intMessageID == intMessageID) {
					_messages.splice(i, 1);
					break;
				}
			}
		}

		try {
			SaveMessages();
		} catch (e) {
			throw e;
		}

		DisplayMessages();
	}

	// Clear all messages.
	function ClearMessages () {
		_messages = [];
		obj.Properties.messageContainer.html('');

		try {
			SaveMessages();
		} catch (e) {
			throw e;
		}
	}

	// Display a message.
	function DisplayMessage(message) {
		var clearLink = '';
		var timestamp = '';
		var output = '';

		if (message) {
			if (obj.Properties.blnDisplayClose) {
				clearLink = '<a href="JavaScript:Messaging.ClearMessage(' + message.intMessageID + ');" title="Clear Message" class="clearLink"><img src="images/CloseWhiteBtn.png" alt="" /></a>';
			}

			if (obj.Properties.blnDisplayTimestamp) {
				timestamp = '<span class="timestamp">' + FormatTime(message.datModifyDate) + '</span>';
			}

			output = obj.Properties.messageContainer.html() + '<div class="message' + (message.strCssClass && message.strCssClass != '' ? ' ' + message.strCssClass : '') + '"><div class="messageInfo">' + timestamp + clearLink + '</div><p>' + message.strMessage + '</p></div>';
		}

		obj.Properties.messageContainer.html(output);
	}

	// Display the list of messages.
	function DisplayMessages () {
		obj.Properties.messageContainer.html('');

		if (_messages && _messages.length > 0) {
			for (var i = 0; i < _messages.length; i++) {
				DisplayMessage(_messages[i]);
			}
		}
	}

	// Format the time.
	function FormatTime(date) {
		var d = new Date(date);
		var hours = (d.getHours() < 10 ? '0' : '') + d.getHours();
		var minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
		var intSeconds = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
		var ampm = hours >= 12 ? 'pm' : 'am';
		var hours = hours % 12;

		hours = hours ? hours : 12;		// The hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		strTime = hours + ':' + minutes + ":" + intSeconds + ' ' + ampm;

		return strTime;
	}

	// Initialize the object.
	function Init() {
		if (obj.Properties.messageContainer) {
			try {
				// Load the existing messages.
				LoadMessages();
			} catch (e) {
				throw e;
			}
		} else {
			throw new Error('The message container has not been set.');
		}
	}

	// Load any messages that may have been stored by a previous page or session.
	function LoadMessages() {
		// Retrieve the saved files.
		if (StorageAvailable()) {
			try {
				if (localStorage['messages']) {
					_messages = JSON.parse(localStorage['messages']);
					_messages.sort(MessageCompare);

					DisplayMessages();
				}
			} catch (e) {
				throw e;
			}
		}
	}

	// Return the larged ID in the list of messages.
	function MaxMessageID () {
		var max = 0;

		if (_messages && _messages.length > 0) {
			$.each(_messages, function (i) {
				if (_messages[i].intMessageID > max) {
					max = _messages[i].intMessageID;
				}
			});
		}

		return max;
	}

	// Compare two messages.
	function MessageCompare(a, b) {
		return (a.datModifyDate > b.datModifyDate) ? 1 : ((b.datModifyDate > a.datModifyDate) ? -1 : 0);
	}

	// Save the messages for later use.
	function SaveMessages() {
		if (StorageAvailable()) {
			try {
				localStorage.messages = JSON.stringify(_messages);
			} catch (e) {
				throw e;
			}
		}
	}

	// Check for HTML5 storage.
	function StorageAvailable() {
		try {
			return obj.Properties.blnStoreMessages && 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}


	/*
		Public
	*/
	var obj = {
		Properties: {
			blnDisplayClose: true,
			blnDisplayTimestamp: true,
			blnStoreMessages: true,
			messageContainer: null
		},
		AddMessage: AddMessage,
		ClearMessage: ClearMessage,
		ClearMessages: ClearMessages,
		DisplayMessage: DisplayMessage,
		DisplayMessages: DisplayMessages,
		Init: Init,
		MaxMessageID: MaxMessageID
	};
	return obj;
}();

