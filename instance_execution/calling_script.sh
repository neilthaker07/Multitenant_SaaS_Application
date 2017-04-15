scp -i /home/neil/Desktop/cmpe281-us-west-1.pem example.seq blackbox.seq commons-logging-1.0.3.jar diagram.preferences jhall-2.0.2.jar jlfgr-1.0.jar Makefile ZREADME.md ec2-user@ec2-52-52-67-116.us-west-1.compute.amazonaws.com:/home/ec2-user

SCRIPT="ls; java -Dzanthan.prefs=diagram.preferences -jar sequence-10.0.jar --headless example.seq"

ssh -i /home/neil/Desktop/cmpe281-us-west-1.pem ec2-user@ec2-52-52-67-116.us-west-1.compute.amazonaws.com "${SCRIPT}"

scp -i /home/neil/Desktop/cmpe281-us-west-1.pem ec2-user@ec2-52-52-67-116.us-west-1.compute.amazonaws.com:/home/ec2-user/example.png /home/neil/Neil_Work/MS_SJSU/CT_281/node_personal_project/multitenant-app-281/
