# CCAST FAQ

*Frequently Asked Questions (FAQs)*

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [CCAST FAQ](https://kb.ndsu.edu/it/133763). Formatting (headings, code blocks, tables, images) needs review before publishing.

## Getting started

How can I get a CCAST account?
Please apply for a CCAST account by filling out this form
<https://ndstate.co1.qualtrics.com/jfe/form/SV_38fPeq2WmhMYHv7> .
How do I acknowledge CCAST?
You are required to include the following statement (or a close variant) in all research outputs (papers,
presentations, theses, etc.) that have used CCAST resources: "This work used resources of the Center for
Computationally Assisted Science and Technology (CCAST) at North Dakota State University, which were
made possible in part by National Science Foundation Major Research Instrumentation (MRI) Award No.
2019077."
How do I login to CCAST?
You can login to CCAST via
Secure Shell (SSH) at prime.ccast.ndsu.edu or thunder.ccast.ndsu.edu
Web browser at https://ondemand.ccast.ndsu.edu
[See here for more details.](https://kb.ndsu.edu/130346)
Iforgot mypassword. Canyou reset it forme?
No, CCAST is a service provider only and does not have the ability to reset passwords. Follow the
[instructions in this article](https://kb.ndsu.edu/104555) to reset your password. If that doesn’t work,
contact [the NDSU IT Service Center](https://www.ndsu.edu/it/help/) .
Howmuch does CCAST cost to use?
The basic level of services is free of charge to NDSU faculty, staff, and students as well as certain external
collaborators (upon approval of CCAST’s Executive Director). You won’t receive any surprise bill for services
from CCAST. Faculty members may purchase dedicated computing capacity for their research program if
they need, but many users are able to get by with the resources that are freely available.
What is the difference between“Thunder” and“Thunder Prime”?Which one should I use?
“Thunder” and “Thunder Prime” are CCAST’s two High-Performance Computing (HPC) clusters.
[Thunder](https://kb.ndsu.edu/page.php?id=128285) is an Intel-based cluster, procured in 2013 and
expanded several times up until 2020. Since 2020, no new hardware or software is being installed in
Thunder, but it is still functional and performant for many types of computational research.
[Thunder Prime](https://kb.ndsu.edu/page.php?id=128284) is an AMD-based cluster, procured in 2020 and
expanded in 2022. It is NDSU’s flagship HPC cluster, containing roughly 9,000 CPU cores and 50 Nvidia
Ampere GPUs. All new hardware and software installations are targeted for Thunder Prime.
Both clusters share the same 2 PB GPFS file system, allowing for data to be used in computations on
either cluster.
Whether to use Thunder or Thunder Prime depends on the specific requirements of the user’s workload,
including considerations such as CPU architecture, required number of cores, memory capacity, and GPU
utilization. For more [details, please see the Thunder](https://kb.ndsu.edu/page.php?id=128285) and Thunder
[Prime](https://kb.ndsu.edu/page.php?id=128284) system description pages.
What is the Linux command fordoing X?
A basic list of Linux commands is available here
<https://kb.ndsu.edu/images/group406/107680/CCAST_Reference_Card.pdf> .
A cheat sheet specifically for the PBS Pro batch scheduler can be found here
<https://kb.ndsu.edu/images/group406/107680/CCAST_PBSPro_Cheat_Sheet.pdf> .
In addition, most commands on the system have a manual page, which can be accessed from the
command line using man <command>. For instance, the manual page for the ls command can be accessed
using man ls. The full online manual for Linux [is also available at die.net](https://linux.die.net/man/) .
Doyou provide any training or resources forpeople who are new to HPC?
Yes, CCAST provides training workshops each semester covering the fundamentals of HPC, from beginner
to intermediate. Keep an eye out for announcements on the CCAST user mailing list and other academic
department mailing lists.

## Support

We also have a section on “Research Computing and Support” in the NDSU IT Knowledge Base (KB). See
here for a listing [of our articles and tutorials](https://kb.ndsu.edu/search.php?cat=9114) .
How can I get help?
The best way to get help is to email  ndsu.ccast.support@ndsu.edu <mailto:ndsu.ccast.support@ndsu.edu> .
If you are facing a specific issue, please provide a detailed description of the problem, including
screenshots, error messages, and/or text output if available. If the issue is related to a failed or problematic
batch job or interactive session, please also provide the job/session ID.

## Data storage and transfer

Howmuch data can I store on CCAST?
CCAST has the following default limits for data storage:
Home (/mmfs1/home/$USER): 200GB
Scratch (/mmfs1/scratch/$USER): 20TB
Projects (/mmfs1/projects/<project_owner>): 1TB
When you first log into the CCAST system, your current disk usage is displayed. You can also check your
disk usage [by logging into Open OnDemand](https://ondemand.ccast.ndsu.edu) at selecting “Utilities >
Disk Usage” from the navbar.
How do I transfer files between my local machine and CCAST?
If connecting to CCAST using a text terminal (e.g., PuTTY, PowerShell, Bash) you can use the Secure Copy
[(scp](https://linux.die.net/man/1/scp) ) command to transfer files. If connecting via web browser (Open
[OnDemand](https://ondemand.ccast.ndsu.edu) ), you can use the “Files” app to view and transfer files.
There are also a number of graphical file transfer clients, such as WinSCP
<[https://winscp.net/eng/index.php> or FileZilla](https://filezilla-project.org/) . For larger transfers, you
[can use the Globus](https://kb.ndsu.edu/121457) file transfer service.
For more information on transferring files, please see the Transferring Files
<https://kb.ndsu.edu/107680#2_3> section of the CCAST User Guide.
I used up all my storage space. Can I have more?
No, home and scratch quotas are fixed for all users and cannot be increased.
However, if you are a project owner on CCAST (faculty and certain staff), you may request an increase to
your project space by completing the appropriate quota increase request form
<https://ndstate.co1.qualtrics.com/jfe/form/SV_0eMYpqTxlFCgcPY> .
Can I share datawith otherusers of CCAST?
Yes, data on CCAST can be shared within project directories among members of the same project group.
You can either add a user to a project group you own, or request to be added to someone else’s project
directory. Requests for project group changes should be submitted to  ndsu.ccast.support@ndsu.edu
<mailto:ndsu.ccast.support@ndsu.edu> . Ideally, these are initiated by the project group owner, but they can
also be initiated by another person with the project owner copied for approval.

## Running jobs

How do I submit a job on CCAST?
Jobs are defined by “job scripts” and are submitted using the qsub command. A successfully submitted job
will be assigned a job ID, which can be used to check the status of the job. Examples of job scripts for
popular software packages can be found in /mmfs1/projects/ccastest/examples/.
Users can also submit interactive jobs using the interact command. This launches an interactive terminal
session on a compute node. Different options can be specified for interact to adjust the number of CPU
cores, amount of memory, and other attributes. See interact -h for a list of valid options.
For more information on submitting jobs, [please see the Running Jobs](https://kb.ndsu.edu/107680#4)
section of the CCAST User Guide.
How can I see what resources are currently available?
The freenodes command shows which nodes are available and how many free resources they each have.
There are several optional arguments that can be provided to freenodes that provide more or less
information. Run freenodes -h to show the help menu.
What is aqueue?Which one should I submit my job to?
A queue refers to a collection of nodes that have similar characteristics, or accept similar types of jobs. The
following queues can accommodate what most users need:
default: Primary queue for CPU jobs. Many nodes belong to the default queue.
gpus: Contains nodes that have GPUs installed. If you need a GPU, you have to submit to this queue.
interactive: Nodes that can run interactive sessions, either in the terminal or via Open OnDemand.
preemptible: Contains every node in the cluster, but jobs submitted to this queue can be
interrupted at any time, without warning.
condo queues: Contain nodes owned by individual research groups. Not available for use by regular
users, except via the preemptible queue.
[Please see the Running Jobs](https://kb.ndsu.edu/107680#4) section of the CCAST User Guide for more
information.
What is the maximum amount of resources I can request for a job?
Maximums for each resource type depend on the queue you are submitting to, but for most queues, the
following maximum limits apply:
CPU cores: 128
Support
Memory: 1000GB
GPUs: 4
Walltime: 168:00:00 (168 hours, or 7 days)
Nodes: as many as are available in the queue
Keep in mind, however, that just because you request a certain number of resources does not mean your
code will be able to use all those resources. For example, if you are running a code that is single-threaded
(i.e., can only use one CPU core), it will not run any faster whether you request one core or 100 cores.
Similarly, if your code is not built to use GPUs, requesting a GPU will not accelerate your code.
If your code can use multiple cores/GPUs, or even multiple nodes (e.g., MPI codes), then you can request
multiple of these types of resources. However, the more resources you request, the longer it will take the
scheduler to find those resources, meaning your job may wait in the queue for a longer period of time.
How do I specify aproject group for a job submission?
Each job requires a project group to be defined for submission, which can be specified by setting the
following option in your job script:
```bash
#PBS -W group_list=<project_group>
```

To see which project groups you are a member of, you can run the myprojects command in the terminal, or
click on “My Project Groups” in the [“Utilities” menu on Open OnDemand](https://ondemand.ccast.ndsu.edu)
.
How can I check the status of my job?
You can check on the status of a job using the qstat command. When run by itself (no additional
arguments), qstat lists all jobs currently in the queue.
To restrict the output to only your own jobs, run qstat -u $USER. To get output for only a single job, run
```bash
qstat <jobID>.
```

Can I run multiple jobs at once?
Yes, users can run multiple jobs simultaneously. The maximum is 250 concurrent jobs per user.
Can I request a specific CPU or GPU architecture formy job?
Yes, you can add the following options to your job’s select statement:
For CPU architecture: plist=<cpu_model>
For GPU architecture: glist=<gpu_model>
To find which CPU and GPU architectures are available, run freenodes -cg and look at the options available
in the “CPU” and “GPU” columns, respectively.
How can I troubleshoot a failed job?
If your job fails, first look in the job’s working directory (usually the directory where the job was submitted)
for any output or error files. These files often contain messages or progress reports that may indicate what
the job was doing when it failed, along with any errors it may have encountered.
If the issue is not clear based on the output files, or if your job didn’t produce any output files, you can
contact  ndsu.ccast.support@ndsu.edu <mailto:ndsu.ccast.support@ndsu.edu> for assistance. Be sure to
include the job ID, a copy of the job script, and a description of the problem you are facing.
How do I cancel one of my jobs?
Use the qdel (queue delete) command and specify the ID of the job you want to delete:
```bash
qdel <jobID>
```

My job has been waiting in the queue for a long time.Why isn’t it running?
You may have requested a very large amount of resources and the scheduler has to wait for other jobs to
finish before enough resources will be available to run your job. Or you may have submitted a resource
request that is impossible to fulfill on any combination of nodes (e.g., requesting 200 CPU cores per node,
when the largest node only has 128 CPU cores).
Run qstat -fx <job ID> to get detailed information about your job, and look for the “comment” field at the
bottom. If you see an error that says “Can never run”, you need to double check your resource request and
modify it to something more reasonable.
If you’re not sure what the problem is, contact  ndsu.ccast.support@ndsu.edu
<mailto:ndsu.ccast.support@ndsu.edu> for help.
How can I make my job run faster?
First, make sure you are differentiating between queue time. If your job is taking a long time to finish
because it is waiting in the queue a long time before running, see the previous FAQ for tips on reducing
your wait time.
If your job is taking a long time to run, and wait time is not the issue, look at the documentation for your
software to see if it can take advantage of parallel processing. Many software packages have additional
options to specify a number of CPU cores to use. This is the easiest way to speed up a process. Your
software may also be able to take advantage of multiple nodes, using something like MPI. Again, read the
documentation to see the recommended implementation.
If neither of the above are options with your software, you may still be able to speed up your code if you
can break the problem into smaller pieces, and process each of those pieces in a separate job.

## Software

Support
How can I checkwhich software packages are available on CCAST?
Software on CCAST is made available through a “modules” system. To see a list of available software
modules, run:
```bash
module avail
```

If you want to search for a particular piece of software, you can supply a keyword. For example:
```bash
module avail python
```

How do I load a software module?
If your software is available on CCAST via a module, you can load it with the following command:
```bash
module load <software/version>
```

The version portion is optional, but recommended. If you do not specify a version, the system will load the
latest version of the software, which may change if a newer version is installed.
I don’t see the software I need in the modules list. Canyou install it forme?
If a package is generally useful to a large portion of the user community, or is needed by several different
research groups, CCAST staff may be able to install it for you. Please email  ndsu.ccast.support@ndsu.edu
<mailto:ndsu.ccast.support@ndsu.edu> with your software installation request, including information such as
the name of the software, a link to the software’s website, and a brief description of your use case.
Can I install myown software on CCAST?
Yes, many software packages can be installed in your home directory or your principal investigator’s
project directory without administrative privileges (i.e. without sudo) using the available compilers and
libraries. It is your responsibility to make sure that for any software you install yourself, you are complying
with the applicable license (whether open-source or commercial) and that use of the software is
consistent with NDSU IT acceptable use policies.

## Common error messages (and how to fix them)

“Disk quota exceeded”
This error indicates one of your storage directories is full and cannot store any more data. You can check
your disk usage [by logging into Open OnDemand](https://ondemand.ccast.ndsu.edu) and selecting “Disk
Usage” from the “Utilities” menu.
If you are over your quota in one of your personal directories (i.e. home or scratch), you will need to either
delete files from the directory to free up space, or migrate some of your files to a different location, such as
a project directory.
If you are a project owner and you are exceeding your project directory quota, you may be eligible for a
quota increase. Request an increase by filling out this form
<https://ndstate.co1.qualtrics.com/jfe/form/SV_0eMYpqTxlFCgcPY> .
“Permission denied” (when installing software)
This means you are trying to install something in a location you do not have permission to modify, such as
a global system directory. For many software packages, you can choose an alternative install directory that
you own, such as your home or project directory. Read the documentation for the particular software you
are installing to determine the relevant option(s) needed to change the install location.
“qsub: Bad GID for job execution”
This error indicates that you are submitting a job with a project group that you are not a member of. To
see which project groups you are a member of, you can run the myprojects command in the terminal, or
click on “My Project Groups” in the [“Utilities” menu on Open OnDemand](https://ondemand.ccast.ndsu.edu)
. Then make sure you specify one of these groups in your job script:
```bash
#PBS -W group_list=<project_group>
```

“qsub: Job rejected due to undefined group list”
This error means you neglected to specify a project group for job submission. See the previous question for
instructions on how to properly specify a project group in your job script.
Keywords:
CCAST, Frequently Asked Questions, FAQ, FAQs, getting started, getting help, support, data storage, running jobs,
error messages
Suggest keywords
Doc ID: 133763 Support
Owned by: Nick D. in NDSU IT Knowledge Base
Created: 2023-12-29
Updated: 2026-06-23
Sites: NDSU IT Knowledge Base
Clean URL: https://kb.ndsu.edu/it/ccast-faq
[Helpful 0 Unhelpful 0 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=133763)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=133763)
Support
