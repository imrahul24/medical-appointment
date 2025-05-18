from django.core.management.base import BaseCommand
from appointments.models import Doctor, Appointment
from datetime import date, time
import random

class Command(BaseCommand):
    help = 'Seed database with sample doctors and appointments'

    def handle(self, *args, **kwargs):
        # Clear existing data (optional)
        Appointment.objects.all().delete()
        Doctor.objects.all().delete()

        # Create doctors
        doctors_data = [
            ("Dr. John Doe", "Cardiology"),
            ("Dr. Jane Smith", "Neurology"),
            ("Dr. Alan Grant", "Pediatrics"),
            ("Dr. Lisa Ray", "Dermatology"),
            ("Dr. Mark Lee", "Orthopedics"),
            ("Dr. Sara White", "Psychiatry"),
            ("Dr. David Black", "Oncology"),
            ("Dr. Emma Green", "Gynecology"),
            ("Dr. Michael Brown", "Ophthalmology"),
            ("Dr. Linda Grey", "Gastroenterology"),
        ]

        doctors = []
        for name, specialization in doctors_data:
            doctor = Doctor.objects.create(name=name, specialization=specialization)
            doctors.append(doctor)

        # Create appointments - 2 for each doctor on different days and times
        patient_names = [
            "Alice Johnson", "Bob Brown", "Charlie Davis", "Diana Evans",
            "Ethan Harris", "Fiona Clark", "George King", "Hannah Lewis",
            "Ian Miller", "Julia Nelson"
        ]

        # We'll create two appointments per doctor
        appointment_dates = [date(2025, 5, 20), date(2025, 5, 21)]
        appointment_times = [time(10, 0), time(11, 30), time(14, 0), time(15, 30)]

        for i, doctor in enumerate(doctors):
            for j in range(2):  # 2 appointments each
                Appointment.objects.create(
                    patient_name=patient_names[(i * 2 + j) % len(patient_names)],
                    doctor=doctor,
                    date=appointment_dates[j % len(appointment_dates)],
                    time_slot=appointment_times[(i + j) % len(appointment_times)],
                )

        self.stdout.write(self.style.SUCCESS('Successfully seeded doctors and appointments!'))
