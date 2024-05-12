FROM python
RUN pip install Flask
RUN pip install Flask-CORS
RUN pip install requests
RUN pip install mysql-connector-python