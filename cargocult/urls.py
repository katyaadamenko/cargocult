from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

from .views import (
    IndexView,
    TrackViewSet,
    PointViewSet,
    RouteViewSet,
    LicenseViewSet,
    OrdersView,
    FileUploadView,
)


router = routers.DefaultRouter()
router.register(r'tracks', TrackViewSet)
router.register(r'points', PointViewSet)
router.register(r'routes', RouteViewSet)
router.register(r'licences', LicenseViewSet)


urlpatterns = [
    url(r'^index/$', IndexView.as_view()),
    url(r'^api/', include(router.urls)),
    url(r'^api/orders/$', OrdersView.as_view()),
    url(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^upload/(?P<filename>[^/]+)$', FileUploadView.as_view()),

    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
