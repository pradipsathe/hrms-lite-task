from rest_framework import serializers
from .models import Employee, Attendance

class EmployeeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        

class AttendanceSerializers(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'