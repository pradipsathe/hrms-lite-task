from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Employee, Attendance
from .serializers import EmployeeSerializers, AttendanceSerializers
from rest_framework.response import Response


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

    def create(self, request, *args, **kwargs):
        employee = request.data.get('employee')
        date = request.data.get('date')

        attendance = Attendance.objects.filter(
            employee_id=employee,
            date=date
        ).first()

        if attendance:
            serializer = self.get_serializer(attendance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return super().create(request, *args, **kwargs)
