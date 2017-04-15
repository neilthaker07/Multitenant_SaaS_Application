#Path in ec2 instance: /home/ec2-user

from pyVim.connect import SmartConnect

 
c = SmartConnect(host="52.52.67.116", user="ec2-user", pwd='')
 
print(c.CurrentTime())

'''


import subprocess
import sys

HOST = '52.52.67.116'

COMMAND="uname -a"

#ssh = subprocess.Popen(["ssh", "%s" % HOST, COMMAND],


# Ports are handled in ~/.ssh/config since we use OpenSSH
ssh = subprocess.Popen(["ssh", "%s" % HOST, COMMAND],
                       shell=False,
                       stdout=subprocess.PIPE,
                       stderr=subprocess.PIPE)
result = ssh.stdout.readlines()
if result == []:
    error = ssh.stderr.readlines()
    print >>sys.stderr, "ERROR: %s" % error
else:
    print result
'''