from django.urls import path 
from .views import *
urlpatterns = [
    path("",home,name="home"),
    path("passenger/",passenger,name="passenger"),
    path("rider/",rider,name="rider"),
    path("passengerlogin/",passengerlogin,name="passengerlogin")
    ,
    path("selectloc/",selectloc,name="selectloc")
]
