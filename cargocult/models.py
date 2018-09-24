from django.db import models
from django.contrib.postgres.fields import ArrayField


class Track(models.Model):
    license_plate = models.CharField("Номерной знак", max_length=10, blank=True, null=True)
    capacity = models.FloatField("Вместимость")


class Point(models.Model):
    name = models.CharField("Название", max_length=200)
    latitude = models.FloatField("Широта")
    longitude = models.FloatField("Долгота")


class Route(models.Model):
    name = models.CharField("Название маршрута", max_length=200, blank=True, null=True)
    points_array = ArrayField(models.IntegerField())


class License(models.Model):
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    number = models.CharField("Номер", max_length=10)
    start_date = models.DateField("Дата выдачи")
    end_date = models.DateField("Дата окончания")
    remaining_trips = models.IntegerField("Число оставшихся поездок", default=10)
