## Express
 a web framework for Node.js used to create HTTP web servers. Express provides an easy-to-use API to interact with the webserver.

## Express-session
an HTTP server-side framework used to create and manage a session middleware. This tutorial is all about sessions. Thus Express-session library will be the main focus.

* secret - a random unique string key used to authenticate a session. It is stored in an environment variable and can’t be exposed to the public. The key is usually long and randomly generated in a production environment.

* resave - takes a Boolean value. It enables the session to be stored back to the session store, even if the session was never modified during the request. This can result in a race situation in case a client makes two parallel requests to the server. Thus modification made on the session of the first request may be overwritten when the second request ends. The default value is true. However, this may change at some point. false is a better alternative.

* saveUninitialized - this allows any uninitialized session to be sent to the store. When a session is created but not modified, it is referred to as uninitialized.

* cookie: { maxAge: oneDay } - this sets the cookie expiry time. The browser will delete the cookie after the set duration elapses. The cookie will not be attached to any of the requests in the future. In this case, we’ve set the maxAge to a single day as computed by the following arithmetic.


## Cookie-parser
used to parse cookie header to store data on the browser whenever a session is established on the server-side.

## Sequence of events

To create a session, the user will submit the credentials. The server will verify these credentials received in the request’s body with the username and the password for the existing user.

If the credentials are valid:
* The user will be granted the necessary access.
* The server will create a temporary user session with a random string known as a session ID to identify that session.
* The server will send a cookie to the client’s browser. The session ID is going to be placed inside this cookie.

Once the client browser saves this cookie, it will send that cookie along with each subsequent request to the server. The server will validate the cookie against the session ID. If the validation is successful, the user is granted access to the requested resources on the server.

If the credentials are invalid, the server will not grant this user access to the resources. No session will be initialized, and no cookie will be saved.


connect.sid=s:-h5paVRooj0fS-J2plpK1xCvy4qbTerv.cffWmx9CMCb5sp7T2fnKyVbRxy+1mWDQUoa2PC4/SHo
# heading1

## heading2

* item1
* item2










