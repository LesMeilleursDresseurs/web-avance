FROM node:20-alpine

RUN mkdir "frontend"
WORKDIR /frontend
COPY . .
RUN ls

RUN npm install
ENV HOST=0.0.0.0
EXPOSE 5173

CMD npm run dev -- --public 0.0.0.0:8080
