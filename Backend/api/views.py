from django.shortcuts import render, HttpResponse
from .models import Article
from .serializers import ArticleSerializer, ListingSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework import generics
from rest_framework import mixins 
from rest_framework import viewsets 
from django.shortcuts import get_object_or_404

from django.shortcuts import render 
import pyrebase

firebaseConfig = {
  'apiKey': "AIzaSyD2LyJPjaZDcGW05ZJDRdI1MP91QvhORx0",
  'authDomain': "hunger-warrior-a9839.firebaseapp.com",
  'projectId': "hunger-warrior-a9839",
  'storageBucket': "hunger-warrior-a9839.appspot.com",
  'messagingSenderId': "473158672655",
  'appId': "1:473158672655:web:d49b12ad8d4fab269e5e7a",
  'databaseURL' : 'https://hunger-warrior-a9839-default-rtdb.firebaseio.com/'
}

firebase = pyrebase.initialize_app(firebaseConfig)

auth = firebase.auth()
db = firebase.database() 

class OrderViewSet(viewsets.ViewSet):
    def list(self, request):
        email = request.GET.get('email')
        key = request.GET.get('id')
        orders = db.child("orders").get()
        
        for order in orders.each():
            order.val()['id'] = order.key() 
        
        if not key:
            if email:
                orders_arr = []
                for order in orders.each():
                    if order.val()['store_email'] == email or order.val()['ordered_by'] == email:
                        orders_arr.append(order.val())
                return Response(orders_arr, status = status.HTTP_200_OK)
            else:
                return Response(orders.val(), status = status.HTTP_200_OK)
        else:
            order = db.child("orders").child(key).get()
            return Response(order.val(), status = status.HTTP_200_OK)
           
        return Response(status = status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        db.child('orders').push(request.data)
        return Response(status = status.HTTP_200_OK)

    def put(self, request):
        key = request.GET.get('id')
        db.child("orders").child(key).update({"order_status" : request.data})
        return Response(status = status.HTTP_200_OK)


class ListingViewSet(viewsets.ViewSet):
    def list(self, request):
        if (request.GET.get('delete')):
            self.delete(request)
            return Response(status = status.HTTP_200_OK)

        email = request.GET.get('email')
        key = request.GET.get('id')
        listings = db.child("listings").get()
        for listing in listings.each():
            listing.val()['id'] = listing.key()
            
        if not key:
            listings_array = []
            if not email:
                return Response(listings.val(), status.HTTP_200_OK)
            else:
                for listing in listings.each():
                    if listing.val()['store_email'] == email:
                        listings_array.append(listing.val())
                return Response(listings_array, status = status.HTTP_200_OK)
        else:
            return Response(db.child("listings").child(key).get().val(), status = status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        key = request.GET.get('delete')
        print('key: ', key)
        db.child("listings").child(key).remove() 
        return Response(status = status.HTTP_200_OK)

    def create(self, request):
        db.child("listings").push(request.data)
        return Response(status = status.HTTP_201_CREATED)

class RequestViewSet(viewsets.ViewSet):
    def list(self, request):
        if (request.GET.get('delete')):
            self.delete(request)
            return Response(status = status.HTTP_200_OK)

        email = request.GET.get('email')
        key = request.GET.get('id')
        requests = db.child("requests").get()

        for request in requests.each():
            request.val()['id'] = request.key()

        if not key and key != 0:
            requests_array = [] 
            for request in requests.each():
                if request.val()['store_email'] == email or request.val()['shelter_email'] == email:
                    requests_array.append(request.val())

            return Response(requests_array, status = status.HTTP_200_OK)
        else:
            return Response(db.child('requests').child(key).get().val(), status = status.HTTP_200_OK)
        
        return Response(status = status.HTTP_404_NOT_FOUND)

    def create(self, request):
        try:
            db.child('requests').push(request.data)
            return Response(status = status.HTTP_201_CREATED)
        except:
            return Response(status = status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request):
        key = request.GET.get('delete')
        db.child("requests").child(key).remove()
        return Response(status = status.HTTP_200_OK)

    def put(self, request):
        key = request.GET.get('id')
        db.child("requests").child(key).update({"request_status" : request.data})
        return Response(status = status.HTTP_200_OK)


class LoginViewSet(viewsets.ViewSet):
    def create(self, request):
        email = request.data['email']
        password = request.data['password']
        print('email: ' , email)
        print('password: ', password)
        try:
            user = auth.sign_in_with_email_and_password(email, password)
            return Response(user, status = status.HTTP_200_OK)
        except:
            return Response(status = status.HTTP_404_NOT_FOUND)


class UsersViewSet(viewsets.ViewSet):
    def list(self, request):
        email = request.GET.get('email')
        users = db.child("users").get()
        stores_array = []
        if email:
            for user in users.each():
                if user.val()['email'] == email:
                    user.val()['id'] = user.key()
                    return Response(user.val(), status = status.HTTP_200_OK)
            return Response(status = status.HTTP_400_BAD_REQUEST)
        else:
            for user in users.each():
                if user.val()['type'] == 'Store':
                    user.val()['id'] = user.key()
                    stores_array.append(user.val())
            return Response(stores_array, status = status.HTTP_200_OK)

    def create(self, request):
        db.child('users').push(request.data) 

