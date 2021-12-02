from rest_framework import serializers
from .models import Article, Listing 

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article 
        fields = ['id', 'title', 'description']
        
class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['id', 'item_name', 'item_quantity', 'store_email', 'store_name']
