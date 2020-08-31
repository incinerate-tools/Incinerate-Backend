FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g
COPY . .
ENV PORT=443
ENV HTTP_PORT=80
ENV STORAGE=/filestorage/
EXPOSE 80
EXPOSE 443

RUN apt-get update
RUN apt-get install -y redis-server python3 python3-pip libgirepository1.0-dev gcc libcairo2-dev pkg-config python3-dev gir1.2-gtk-3.0 python3-mutagen python3-gi-cairo gir1.2-poppler-0.18 gir1.2-gdkpixbuf-2.0 gir1.2-rsvg-2.0 ffmpeg libimage-exiftool-perl bubblewrap
RUN pip3 install mat2

CMD npm start