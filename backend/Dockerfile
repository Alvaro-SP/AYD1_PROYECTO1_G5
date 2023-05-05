# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster


# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]

# ! docker build -t alvarosp24/back_analisis:latest . --no-cache --force-rm
# ! docker run -d -p 5000:5000 alvarosp24/back_analisis:latest