# SupportAlertApp
1- supportalertframwork (produce error message at kafka topic when application will get exception error): java springboot application(java 11).

2- supportalertkafkaserver (a node js application which consume message after produce message by supportalertframwork and send message through websocket to mobile aaplication): Node js application.
  * go to supportalertkafkaserver directory and run below command
  * npm install
  * node index
    
3- supportalertapp(a react native mobile application which show the alert message to support team member mobile)
  * go to supportalertapp directory and run below command
  * npm install
  * npm run android
