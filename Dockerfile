FROM ubuntu:latest

RUN apt-get update && \
        apt-get install -y software-properties-common && \
        add-apt-repository ppa:deadsnakes/ppa && \
        apt-get update -y  && \
        apt-get install -y build-essential python3.6 python3.6-dev python3-pip && \
        apt-get install -y git  && \
        apt-get install -y curl && \
        # update pip
        python3.6 -m pip install pip --upgrade && \
        python3.6 -m pip install wheel

RUN git clone https://github.com/sherlock-project/sherlock.git && \
        cd sherlock && \
        python3 -m pip install -r requirements.txt

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
        apt-get install -y nodejs
 
WORKDIR /sherlock

COPY package*.json ./

RUN npm install
COPY ./backend ./backend

ENV PORT=$PORT
CMD [ "node", "./backend/index.js" ]
