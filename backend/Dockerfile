FROM node:20-alpine

RUN mkdir "backend"
WORKDIR /backend
COPY . .
RUN ls

RUN npm install
RUN npm run setup_prisma
ENV HOST=0.0.0.0
EXPOSE 3000

CMD npm run dev
