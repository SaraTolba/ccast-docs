# CCAST User Guide

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [CCAST User Guide](https://kb.ndsu.edu/it/107680). Formatting (headings, code blocks, tables, images) needs review before publishing.

This User Guide provides essential information about advanced research computing resources at CCAST/NDSU and how to use them. A mustread document for all CCAST users.
1. Introduction, Context, and Qualifications 
2. Getting Started 
3. Research Computing Resources 
4. Running Jobs 
1.Introduction, Context, and Qualifications
The Center for [Computationally Assisted Science and Technology](https://www.ndsu.edu/ccast) (CCAST; pronounced "c-cast") provides
advanced cyberinfrastructure for research and education at NDSU and beyond. CCAST develops, manages, brokers, and operates highperformance (HPC), cloud, and interactive computing resources, and educates researchers on proper and efficient use of the resources and on
other topics of interest to the computational science and engineering community.
We use UNIX/Linux. The basic level of services is FREE of charge to NDSU faculty, staff, and students as well as certain external collaborators
(upon approval of CCAST's Executive Director). Additional services are available for a fee.
1.1 Acknowledging CCAST
Users are required to include the following statement (or a close variant) in all research outputs (papers, presentations, theses, etc.) that have
used CCAST resources: "This work used resources of the Center for Computationally Assisted Science and Technology (CCAST) at North Dakota
State University, which were made possible in part by National Science Foundation Major Research Instrumentation (MRI) Award No. 2019077."
The wording is subject to change; e.g., when we need to acknowledge specific funding sources that support certain CCAST resources. Please
check this section again for possible updates every time you need to include the acknowledgment statement.
1.2 Reporting requirements
Users, usually through their Principal Investigators (PIs; i.e., sponsors of their CCAST accounts), are required to report any research outputs and
activities that have been enabled by the use of CCAST resources. Reporting items often include publications, presentations, grant applications,
patents, theses, etc.
1.3 CCAST usage policies
Users are required to carefully read and [comply with CCAST Usage Policies](https://kb.ndsu.edu/107744) .
1.4 How can you get help?
Read this User Guide carefully [and check the CCAST website](https://www.ndsu.edu/ccast) and related Knowledge Base articles
<https://kb.ndsu.edu/search.php?q=&cat=9114> before contacting us. If you still cannot find answers to your questions, send an e-mail to
 ndsu.ccast.support@ndsu.edu <mailto:ndsu.ccast.support@ndsu.edu> .
In the e-mail, describe the issues, clearly state your questions, and provide a copy of the error messages and job submission script, the IDs of
your failed jobs, the name of the code, the name [of the cluster (e.g., Thunder](https://kb.ndsu.edu/thunder-cluster) or Thunder Prime
<https://kb.ndsu.edu/thunder-prime-cluster> ), and any other info (including input and output files) that may help debug the issues.
Please do not directly contact CCAST individual staff for technical support as this bypasses our tracking system to avoid dropped calls.
1.5 Aboutthis document
This document will be updated often since hardware specifications, system administration practice, etc. are subject to changes.
2. Getting Started
2.1 Applying for an account
To be [able to access to Thunder](https://kb.ndsu.edu/page.php?id=128285) [and Thunder Prime](https://kb.ndsu.edu/page.php?id=128284) –the
two HPC clusters at CCAST–you need to have an active account with us. Please apply for a CCAST account if you have not already done so. A link
to the online application form is [available on the CCAST website](https://www.ndsu.edu/ccast) .
2.2 Connecting to CCAST's HPC clusters
[See Logging into CCAST](https://kb.ndsu.edu/130346) .
2.3 Transferring files
Between a [Windows computer and Thunder: WinSCP](https://winscp.net) client should be used. Download (for free) and install it, then open
the application. In the "WinSCP Login" window, enter the hostname thunder.ccast.ndsu.edu (Thunder) or prime.ccast.ndsu.edu (Thunder Prime)
as well as your username and password, then click on "Login".
Once logged in, you will see a screen with two panels: the left shows files on your computer and the right shows your files on Thunder or
Thunder Prime (usually your HOME directory, but you can double-click on the address bar and change the location). You can then easily drag
and drop files between your computer and Thunder or Thunder Prime.
Between a Mac/Linux computer and Thunder: To transfer files from Thunder/Thunder Prime to your computer: scp [[username@hostname]:
[source-file]] [[destination]]. Example (for Thunder Prime): scp username@prime.ccast.ndsu.edu:/mmfs1/home/username/myfile.txt
/home/mycomputer/myfile.txt
To transfer files from your computer to Thunder/Thunder Prime: scp [[source-file]] [[username@hostname]:[destination]]. Example (for
Thunder Prime): scp myfile.txt username@prime.ccast.ndsu.edu:/mmfs1/home/username.
2.4 Learning UNIX/Linux and HPC
Users are strongly recommended to attend the CCAST [Advanced Research Computing Training Program](https://kb.ndsu.edu/ccast-training) ,
offered every semester, as well as other special training events. Specialized training for individual researchers/research groups is also available.
Contact CCAST for more information.
There are also lots of free training materials out there on the Internet. We recommend the following:
[+ UNIX/Linux Tutorial for Beginners](https://info-ee.surrey.ac.uk/Teaching/Unix/)
+ [HPC Training Materials at LLNL](https://hpc.llnl.gov/training/tutorials)
See [also the CCAST Reference Card](https://kb.ndsu.edu//images/group406/107680/CCAST_Reference_Card.pdf) for a list of the most useful Linux
commands and tricks. Tutorials for certain applications on Thunder/Thunder Prime can be found in our Knowledge Base articles
<https://kb.ndsu.edu/search.php?q=&cat=9114> .
3. Research Computing Resources
3.1 Hardware
[CCAST’s Thunder Cluster](https://kb.ndsu.edu/page.php?id=128285) [and Thunder Prime Cluster](https://kb.ndsu.edu/page.php?id=128284) currently
have a combination of over 13,000 CPU cores and 100 GPUs in total. There are several big-memory nodes on each cluster. To check which nodes
are currently free or partially free on Thunder or Thunder Prime, execute the command freenodes (run freenodes --help to see all available
options). The information will help you make the right choice when you request computing resources for your jobs.
3.2 Software
There are many software programs installed on Thunder and Thunder Prime. Most are available to all CCAST users; some, e.g., ANSYS, VASP, etc.,
available only to those who have valid licenses and other authorized users. Software are usually organized as modules; to check available
modules, execute module avail. You can also install software for yourself. Contact CCAST at  ndsu.ccast.support@ndsu.edu
<mailto:ndsu.ccast.support@ndsu.edu> if you need help.
3.3 Storage space
Once logged in, you are in your HOME directory: /mmfs1/thunder/home/username (Thunder) or /mmfs1/home/username (Thunder Prime). The default
allocation for HOME is 200GB per user and cannot be increased. Data in HOME is backed up periodically to tape, so it is a reliable storage
area. Do NOT use your HOME directory for data or job input/output. Running jobs out of HOME is highly discouraged due to both performance
and space considerations.
Each research group usually has a PROJECTS directory; the full path is /mmfs1/thunder/projects/PI-username (Thunder) or /mmfs1/projects/PIusername (Thunder Prime) where PI-username is usually the username of the Principal Investigator (PI). The default allocation for PROJECTS is
currently 5TB per PI (effective 10/01/2025 and in effect until further notice). This area has a larger storage space and is backed up periodically to
tape. All researchers working under the PI can store and share data in this space.
Data backup and restore: CCAST runs backups of HOME and PROJECTS data regularly. Currently, daily backups are performed nightly and
retained at most for 365 days. Requests for backup retrievals should be made within 30 days of file creation/modification for richer restore
options as all 30-day versions of the file may be available. Restore requests made later than the 30-days, but under 365 days of file
creation/modification, will be satisfied with the last backed-up version of the file available. Note that this practice is subject to change, and
when a change occurs, this section will be updated.
Each regular user has a SCRATCH directory: /mmfs1/thunder/scratch/username (Thunder) or /mmfs1/scratch/username (Thunder Prime). It is
designed as a place for working directories for jobs. Please submit your jobs from this directory. The default quota for SCRATCH is 20TB per user.
Note that SCRATCH data is NOT backed up, and the systems are currently set up to automatically DELETE files in SCRATCH that have not been
accessed in 60 days. Deleted files from SCRATCH--either automatically or accidentally--cannot be recovered.
PROJECTS space beyond the basic level is available for a fee. Contact CCAST for more information if you are interested.
3.4 Compute Condominium
Researchers can purchase condo nodes using equipment purchase funds from their grants or other available funds. These PI-owned compute
nodes are attached to CCAST’s Thunder Prime cluster to take advantage of the existing infrastructure. Contact CCAST if you have questions
regarding the condominium model.
4. Running Jobs
Once you logged in to a CCAST HPC cluster, you are on one of its login nodes. Login nodes have limited resources and are intended only for
basic tasks such as transferring data, managing files, compiling software, editing scripts, and checking on or managing jobs. DO NOT run your
jobs on the login nodes!
Jobs must be submitted to a queue system, which is monitored by a job scheduler, using a job script. The job scheduler currently used on the
Thunder and [Thunder Prime clusters is OpenPBS](https://www.altair.com/pbs-professional/) . The scheduler handles job submission requests
and assigns jobs to specific compute nodes available at the time.
To be able to run your jobs and run them efficiently, you need to have some basic knowledge of the application you are using. This includes
whether the application is serial (i.e., runs on only one CPU core) or parallel (i.e., can run on multiple CPU cores). If it is parallel, what is the
underlying parallel programming model: shared-memory (e.g., using OpenMP, Pthreads, etc.), distributed-memory (e.g., using MPI), or hybrid?
You need such information to determine how you would like to request resources for your jobs.
4.1 Sample inputfiles and job scripts
If you are new to running jobs on Thunder and/or Thunder Prime or if it has been a while since the last time you ran an application, it is highly
recommended that you first run some sample jobs we provide before running your own jobs. Users can copy sample input files and job scripts
for various applications from /mmfs1/thunder/projects/ccastest/examples (Thunder) or /mmfs1/projects/ccastest/examples (Thunder Prime).
More job examples for more applications will be added as they become available. Please check this directory frequently for the latest version of
the job scripts.
A job submission script (also referred to as a "PBS job script" or "PBS script") to run a serial job is given below as an example:
#!/bin/bash
#PBS -q default
#PBS -N test
#PBS -l select=1:mem=1gb:ncpus=1
#PBS -l walltime=08:00:00
#PBS -W group_list=x-ccast-prj-<prjname>

cd $PBS_O_WORKDIR

./my-serial-program
For any job script, you need to replace prjname with your project group name. If you do not know your prjname, on Thunder or Thunder Prime,
execute the command id or groups and look for the name x-ccast-prj-... Also, if you are not sure how to select a value for mem, set it to the
value of M*ncpus, where M = 1 or 2gb. Keep in mind that CCAST resources are shared among many users. Only request what you actually need.
A PBS job script is simply a text file in your working directory. The easiest way to create the file is to copy an appropriate sample PBS job script
from /mmfs1/thunder/projects/ccastest/examples (Thunder) or /mmfs1/projects/ccastest/examples (Thunder Prime) and then modify it as
needed using some text editor such as nano (for novice Linux users), emacs, or vi (for more experienced users). See also the PBS Cheat Sheet
<https://kb.ndsu.edu//images/group406/107680/CCAST_PBSPro_Cheat_Sheet.pdf> .
4.2 Queue policies on Thunder and Thunder Prime
Different types of queues on Thunder are given below. Users can also find info [about the queues on Thunder](https://kb.ndsu.edu/thundercluster) [or Thunder Prime](https://kb.ndsu.edu/thunder-prime-cluster) by executing qstat -q.

## Route Queue

Execution
Queue
Walltime (hours) Authorized Group
default
def-short 24
users who belong a project group other than
x-ccast-prj-training
def-medium 72
def-long 168
gpus 168
preemptible -
bigmem
bm-short 24
bm-long 168
training 24 users in the project group x-ccast-prj-training
condo01, condo02, etc. - authorized condo users only
4.3 Launching and monitoring jobs
After preparing a suitable job script (with the filename job.pbs, for instance), see Sec. 4.1, you can submit the job by typing: qsub job.pbs. This
will assign your job to the queue. Depending on the available resources, it may or may not start immediately. To check the status of your job(s),
type qstat -u $USER. If you want to kill the job, use the command qdel ID, where ID is the ID of the job you want to kill. For more useful PBS
commands and options, [see the PBS Cheat Sheet](https://kb.ndsu.edu//images/group406/107680/CCAST_PBSPro_Cheat_Sheet.pdf) .
4.4 How to get yourwork done faster?
If you use software packages developed by others, be mindful of the parameters used in your input files. A small tuning of the parameters can
significantly improve computational efficiency. If you write and run your own code, see if it can be optimized to make it run faster or parallelize
it if it is not yet parallel.
When running parallel jobs, a question arises: How many cores/nodes should you request for the jobs? Note: the requested resources in the
sample PBS job scripts we provide are not optimized for your jobs! Also note that, if you want to get your jobs done faster, simply adding a lot
more cores/nodes is rarely the answer! You should do some scaling tests to identify the optimal number of cores/nodes for your jobs.
When you have many similar parallel jobs, we recommend that you run a first few jobs with different numbers of CPU cores. By looking the
computing time needed to finish the jobs vs. the number of cores, you'll have a pretty good idea of how many cores you should choose for the
remaining jobs. Contact CCAST for help with improving your job efficiency and speeding up your research process.

## See Also

[CCAST Usage Policies](https://kb.ndsu.edu/page.php?id=107744)
[Advanced Research Computing Training Program](https://kb.ndsu.edu/page.php?id=107964)
Internship [Program in Advanced Research Computing](https://kb.ndsu.edu/page.php?id=108110)
Keywords:
ccast hpc computing "research computing" thunder "thunder prime" cloud "cloud computing" "interactive
computing" user-guide "user guide" guide cyberinfrastructure computational
Suggest keywords
Doc ID: 107680
Owned by: Nick D. in NDSU IT Knowledge Base
Created: 2020-12-08
Updated: 2025-10-03
Sites: NDSU IT Knowledge Base
Clean URL: https://kb.ndsu.edu/it/ccast-user-guide
[Helpful 13 Unhelpful 1 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=107680)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=107680)
