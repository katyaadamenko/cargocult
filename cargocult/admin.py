from django.contrib import admin

from .models import (
    Track,
    Point,
    Route,
    License,
)


admin.site.register(Track)
admin.site.register(Point)
admin.site.register(Route)
admin.site.register(License)
