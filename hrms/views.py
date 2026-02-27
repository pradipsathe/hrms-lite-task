from django.shortcuts import render
from rest_framework import viewsets
from .models import Employee, Attendance
from .serializers import EmployeeSerializers, AttendanceSerializers
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializers
    
class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializers
    
    def get_queryset(self):
        employee_id = self.request.query_params.get('employee_id')
        if employee_id:
            return self.queryset.filter(employee_id=employee_id)
        return self.queryset
