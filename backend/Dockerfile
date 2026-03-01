# Use official Python image
FROM python:3.11-slim

# Prevent Python from writing .pyc files
ENV PYTHONDONTWRITEBYTECODE=1

# Ensure output is flushed straight to terminal
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system dependencies (for PostgreSQL)
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (better caching)
COPY requirements.txt .

# Upgrade pip
RUN pip install --upgrade pip

# Install dependencies
RUN pip install -r requirements.txt

# Copy entire project
COPY . .

# Set Python path
ENV PYTHONPATH=/app

# Expose Django port
EXPOSE 8000

RUN python manage.py collectstatic --noinput
# Run Gunicorn
CMD sh -c "gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT"