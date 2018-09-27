from django.views.generic.base import TemplateView
from django.views import View
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from rest_framework import viewsets, views
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response

from .models import Track, Point, Route, License
from .serializers import TrackSerializer, PointSerializer, RouteSerializer, LicenseSerializer
from .parsers import parse


class IndexView(TemplateView):
    template_name = 'index.html'


class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer

    def perform_create(self, serializer):
        serializer.save()


class PointViewSet(viewsets.ModelViewSet):
    queryset = Point.objects.all()
    serializer_class = PointSerializer

    def perform_create(self, serializer):
        serializer.save()


class RouteViewSet(viewsets.ModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer

    def perform_create(self, serializer):
        serializer.save()


class LicenseViewSet(viewsets.ModelViewSet):
    queryset = License.objects.all()
    serializer_class = LicenseSerializer

    def perform_create(self, serializer):
        serializer.save()


class FileUploadView(views.APIView):
    parser_classes = (FileUploadParser,)

    def put(self, request, filename, format=None):
        file = request.data['file']
        fs = FileSystemStorage()
        fs.save(filename, file)
        return Response(status=204)


class OrdersView(View):
    def get(self, request, *args, **kwargs):
        orders = parse(u"Москва (регион), Россия", u"Санкт-Петербург (регион), Россия")
        print(orders)
        return JsonResponse({ 'orders': orders })
