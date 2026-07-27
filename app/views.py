from django.shortcuts import render,redirect


# Create your views here.

from django.contrib.auth.models import User
from django.contrib.auth  import login,logout,authenticate
from django.http import HttpResponse
from .models import *



def home(request):
    return render (request,"home.html")

#def passenger(request):
 #   return render (request,"passenger.html")


def rider(request):
    return render (request,"rider.html")




def passenger(request):
    if request.method=="POST":
        u=request.POST["name"]
        p=request.POST["pass"]
        User.objects.create_user(username=u,password=p)
        return redirect("passengerlogin")

        
    return render (request,"register.html")


def passengerlogin(request):
    if request.method=="POST":
        u=request.POST["name"]
        p=request.POST["pass"]
        v=authenticate(username=u,password=p)
        if v is not None:
            login(request,v)
            return redirect ('selectloc')
        else:
            return HttpResponse("try again")
    return render (request,"login.html")


def selectloc(request):
    if request.method=="POST":
        riders_dashboard.objects.create(
        pickuplocation=request.POST["pick"],
        droplocation=request.POST["drop"],
        distance=request.POST["distancein"],
        time=request.POST["timein"],
        fare=request.POST["farein"]
        )
        return render(request,"success.html")

    
    return render(request,"passenger.html")