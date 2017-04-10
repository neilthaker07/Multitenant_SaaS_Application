#Path in ec2 instance: /home/ec2-user
import subprocess
import sys

HOST = '52.52.67.116'

COMMAND="uname -a"

#ssh = subprocess.Popen(["ssh", "%s" % HOST, COMMAND],


# Ports are handled in ~/.ssh/config since we use OpenSSH
ssh = subprocess.Popen(["ssh -i cmpe281-us-west-1.pem ec2-user@52.52.67.116"],
                       shell=False,
                       stdout=subprocess.PIPE,
                       stderr=subprocess.PIPE)
result = ssh.stdout.readlines()
if result == []:
    error = ssh.stderr.readlines()
    print >>sys.stderr, "ERROR: %s" % error
else:
    print result
