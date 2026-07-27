from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(ridersdoc),
admin.site.register(passengerdoc),
admin.site.register(riders_dashboard)
