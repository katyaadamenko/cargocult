from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers

from .views import (
    TrackViewSet,
    PointViewSet,
    RouteViewSet,
    LicenseViewSet,
    OrdersView,
)


router = routers.DefaultRouter()
router.register(r'tracks', TrackViewSet)
router.register(r'points', PointViewSet)
router.register(r'routes', RouteViewSet)
router.register(r'licences', LicenseViewSet)


urlpatterns = [
    url(r'orders/$', OrdersView.as_view()),

    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^add_file/', add_file),
    url(r'index/', IndexView.as_view())
]
