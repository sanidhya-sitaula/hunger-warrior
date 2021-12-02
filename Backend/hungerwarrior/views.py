from django.shortcuts import render 
import pyrebase

firebaseConfig = {
  'apiKey': "AIzaSyD2LyJPjaZDcGW05ZJDRdI1MP91QvhORx0",
  'authDomain': "hunger-warrior-a9839.firebaseapp.com",
  'projectId': "hunger-warrior-a9839",
  'storageBucket': "hunger-warrior-a9839.appspot.com",
  'messagingSenderId': "473158672655",
  'appId': "1:473158672655:web:d49b12ad8d4fab269e5e7a"
}

firebase = pyrebase.initialize_app(firebaseConfig)

auth = firebase.auth()

#db = firebase.database() 
#auth = firebase.auth()
#storage = firebase.storage()




