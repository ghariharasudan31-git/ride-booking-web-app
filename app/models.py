from django.db import models

# Create your models here.

class ridersdoc(models.Model):
    name=models.CharField(max_length=50)
    proof=models.FileField( upload_to="documents")

class passengerdoc(models.Model):
    name=models.CharField(max_length=50)
    email=models.EmailField(max_length=254)


class riders_dashboard (models.Model):
    pickuplocation=models.CharField (max_length=200)
    droplocation=models.CharField (max_length=200)
    distance = models.FloatField()
    time = models.IntegerField()
    fare = models.FloatField(default=0)
