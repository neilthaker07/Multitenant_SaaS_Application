uploadedfileWithPath="$1"
uploadedfilename="$2"
pngFile="$3"

scp -i /home/neil/Desktop/cmpe281-us-west-1.pem $uploadedfileWithPath ec2-user@ec2-52-52-67-116.us-west-1.compute.amazonaws.com:/home/ec2-user

SCRIPT="ls; java -Dzanthan.prefs=diagram.preferences -jar sequence-10.0.jar --headless $uploadedfilename"

ssh -i /home/neil/Desktop/cmpe281-us-west-1.pem ec2-user@ec2-52-52-67-116.us-west-1.compute.amazonaws.com "${SCRIPT}"

scp -i /home/neil/Desktop/cmpe281-us-west-1.pem ec2-user@ec2-52-52-67-116.us-west-1.compute.amazonaws.com:/home/ec2-user/$pngFile /home/neil/Neil_Work/MS_SJSU/CT_281/node_personal_project/multitenant-app-281/multitenant/public/images
