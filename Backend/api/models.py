from django.db import models

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length = 100)
    description = models.TextField()

    def __str__(self):
        return self.title

class Listing(models.Model):
    item_name = models.CharField(max_length = 200)
    item_quantity = models.IntegerField()
    store_email = models.CharField(max_length = 100)
    store_name = models.CharField(max_length = 200)

