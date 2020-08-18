## Firestore Security Rules

The security rules set in the firestore cloud database are as follow (where I put `xxxxxxxxxxxxxxxxxxxxxxxxxxxxx` instead of my admin user uid):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow get, write : if request.auth != null && request.auth.uid == userId;
    }

    match /shopData/{data}{
      allow read;
      allow write: if request.auth != null && request.auth.uid == 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }

    match /messages/{document=**}{
      allow create: if request.auth != null;
      allow read: if request.auth != null && request.auth.uid == 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      allow write: if request.auth != null && request.auth.uid == 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }

    match /cartItems/{documentId}{
      allow read, write: if request.auth != null && request.auth.uid == 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      allow create: if request.auth != null && documentId.split('_')[0] == request.auth.uid && request.resource.data.userId == request.auth.uid
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId
    }
  }
}
```
\
Basically
 - anyone can create/modify/delete a user document which id is the same as the user's
 - the shop data can be read by anyone but only modified by the admin user
 - anyone can create a message document, but those can only be read/modified/deleted by the admin user
 - cartItem documents can be read and writte by the admin user, they can be created by users ony if the document's id starts with the id of the user and the document's userId field matches the id of the user and can be read/modified by users only if the document's userId matches the id of the user

 (`Note`: about the cartItems non-admin rules, the creation one is a bit more strict which makes sure that the documents have the right format and data, read/write relax it a bit since the reltionship between userId field and document is already garanteed by the creation rule.)