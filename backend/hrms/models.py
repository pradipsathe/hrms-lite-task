from django.db import models

# Create your models here.
class Employee(models.Model):
    employee_id = models.CharField(max_length=20, unique=True)
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=50)
    
    def __str__(self):
        return self.full_name
    
class Attendance(models.Model):
    STATUS_CHOICE = [
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    ]
    
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="attendances")
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICE)
    
    class Meta:
        unique_together = ('employee', 'date')
        
    def __str__(self):
        return f"{self.employee.full_name} - {self.date} - {self.status}"
