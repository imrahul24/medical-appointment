from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Doctor, Appointment
from .serializers import DoctorSerializer, AppointmentSerializer

class DoctorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['doctor', 'date']
    
