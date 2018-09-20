from rest_framework import serializers
from .models import Track, Point, Route, License


class TrackSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Track
        fields = ('license_plate', 'capacity')


class PointSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Point
        fields = ('name', 'latitude', 'longtitude')


class RouteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Route
        fields = ('name', 'points_array')


class LicenseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = License
        fields = ('track', 'route', 'number', 'start_date', 'end_date')
