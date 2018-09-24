from rest_framework import viewsets
# from .forms import UploadFileForm
from .models import Track, Point, Route, License
from .serializers import TrackSerializer, PointSerializer, RouteSerializer, LicenseSerializer
from django.views.generic.base import TemplateView


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


# def add_file(request):
#     if request.method == 'POST':
#         form = UploadFileForm(request.POST, request.FILES)
#         if form.is_valid():
#
#             add_file_v2(request.FILES['file'], version=2,
#                         description=request.POST['description'],
#                         dolphin_name=request.POST['dolphin_name'],
#                         datetime=request.POST['datetime'])
#
#             return HttpResponseRedirect(reverse(get_file_list))
#     else:
#         form = UploadFileForm()
#     return render(request, 'add.html', {'form': form})
