FROM ubuntu:14.04

RUN apt-get update
RUN apt-get install -y \
    php5 \
    python \
    python-pip
RUN pip install requests

ADD api.php .
ADD api.py .
ADD index.html .

CMD php -S 0.0.0.0:$PORT