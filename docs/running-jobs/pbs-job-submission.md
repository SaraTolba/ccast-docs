# Guide to Job Submission

*An overview of the job submission process on the CCAST HPC cluster.*

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [Guide to Job Submission](https://kb.ndsu.edu/it/137530). Formatting (headings, code blocks, tables, images) needs review before publishing.

## Introduction

This document will provide an overview of the job submission process on the CCAST HPC cluster. The
CCAST cluster uses the Portable Batch System (PBS) for job submission, which is a system that allows
users to submit jobs to a queue for execution on the cluster, and provides a way to manage and monitor
the jobs. This document will cover how to submit a job to the cluster, monitor the job status, and manage
the job resources. Finally, we will provide some tips and best practices for job submission on the CCAST
cluster.

## Submitting aJob

The batch system receives requests for resources from users and fulfills those requests by assigning them
to available nodes in the cluster. The job submission process involves creating a job script that specifies the
resources required for the job, such as the number of nodes, cores, memory, and walltime (real time)
needed for the job. The job script also contains the commands that will be executed on the cluster, such as
changing directory locations, loading module software, or running commands.

## Simple Example

First, copy the following example directory to your scratch directory:
```bash
$ cp /mmfs1/projects/ccastest/examples/job_submission $SCRATCH
$ cd $SCRATCH/job_submission
```

The example job script job.pbs is a simple script that prints the hostname of the node that the job is
running on, and the number of cores assigned to the job:
```bash
#!/bin/bash
#PBS -N MyFirstJob
#PBS -q training
#PBS -l select=1:ncpus=1:mem=1gb
#PBS -l walltime=05:00
#PBS -W group_list=x-ccast-prj-training
cd $PBS_O_WORKDIR
echo "Hello from $HOSTNAME"
echo "I am running on $NCPUS CPU cores"
sleep 180
exit 0
```

As can be seen above, this minimal job script specifies the job name, queue, resources, and walltime.
These are called PBS directives and are used to specify the job requirements. The #PBS -N MyFirstJob
directive specifies the name of the job, the #PBS -q training directive specifies the queue to submit the
job to, the #PBS -l select=1:ncpus=1:mem=1gb directive specifies the number of nodes, cores, and memory
required for the job, and the #PBS -l walltime=05:00 directive specifies the walltime (real time) needed for
the job. Finally, the #PBS -W group_list=x-ccast-prj-training directive specifies the project group that the
job belongs to.
Then, the job script also changes to the working directory specified by the PBS_O_WORKDIR environment
variable, prints the hostname of the node, and the number of CPU cores assigned to the job. The job script
then sleeps for 3 minutes before exiting.
To submit the job to the cluster, use the qsub command:
```bash
$ qsub job.pbs
```

The qsub command submits the job script to the cluster, and returns a job ID that can be used to monitor
the job status.
We can then monitor the job status using the qstat command:
```bash
$ qstat -u $USER
```

Support
The above command will display the status of all jobs submitted by the user. The output will show the job
ID, job name, queue, status, and other information about the job. Alternatively you can use the job ID with
the -fx flags to get the most detailed information possible about a job.
```bash
$ qstat -fx <job_id>
```

When the job finishes, the standard output will be written to a file with the name job.o<job_id> by default,
where <job_id> is the job ID assigned by the batch system. The output file will contain the output of the
job script; any output from standard error printed by the job are saved to job.e<job_id>. You can view the
output by using the less command:
```bash
$ less job.o<job_id>
```

Managing Job Resources
The job script specifies the resources required for the job, such as the number of nodes, cores, memory,
and walltime. It is important to specify the resources accurately to ensure that the job runs efficiently and
does not exceed the limits asked for. The resources specified in the job script are used by the batch system
to allocate resources to the job, and to enforce resource limits.

## PBS Directives

The above example is the minimum required to submit a job to the cluster. However, there are many other
PBS directives that can be used to specify additional job specifications. The following are some of the most
commonly used PBS directives:

## Directive Description

```bash
#PBS -N Job name
#PBS -q Queue name
#PBS -l select Resources required for the job
#PBS -l walltime Walltime (real time) required for the job
#PBS -W group_list Project group that the job belongs to
#PBS -M Email address to send job status notifications
#PBS -a Send email notifications when the job is aborted
#PBS -b Send email notifications when the job begins
#PBS -e Send email notifications when the job ends
```

PBS Directives
For more information on PBS directives, refer to the PBS Cheat Sheet
<https://kb.ndsu.edu/images/group406/107680/CCAST_PBSPro_Cheat_Sheet.pdf> and the CCAST User Guide
<https://kb.ndsu.edu/page.php?id=107680> .

## Select Resources

The resources that can be specified in the job script include:

## Resource Description

select Number of nodes required for the job
ncpus Number of CPU cores required for the job
mem Amount of memory required for the job
walltime Walltime (real time) required for the job
ngpus Number of GPU cores required for the job (requires gpus queue)
place Placement of the job on the nodes (e.g., scatter or pack)
plist Processor generation type for the job
glist GPU type required for the job (Thunder Prime has l4, a10, a40, and a100 GPUs)
PBS Resource Options
Defining the resources accurately is important to ensure that the job runs efficiently: a job that requests
more resources than it needs may be delayed in the queue because it is waiting for resources that are not
available, while a job that requests fewer resources than it needs may run out of resources and fail, or run
slower than expected.

## Best Practices

The following are some best practices for job submission on the CCAST cluster:
Request only the resources you need: Specify the resources required for the job. If you are not sure
how many resources you need, start with a small number and increase as needed. Some software,
especially using MPI, may even slow down if you request too many resources for the job.
Understand the software capabilities: Scientific software ranges from serial single-threaded
applications to parallel multi-threaded applications capable of advanced parallelism and hardware
acceleration. Take the time to familiarize yourself with the software you are using and what options
are available to you to use it efficiently.
Run test jobs: Before submitting a large job to the cluster, run a test job to ensure that the job script
is correct and that the job runs as expected. This will help you identify any issues with the job script
before submitting a large job.
Monitor job status: Use the qstat command to monitor the status of your jobs. This will help you
keep track of the progress of your jobs and identify any issues that may arise during the job
Support
execution. watch qstat -u $USER is a useful command to monitor the status of your jobs in real time.

## FAQ

How do I cancel a job?
To cancel a job, use the qdel command followed by the job ID:
```bash
$ qdel <job_id>
```

How do I check the status of a job?
To check the status of a job, use the qstat command followed by the job ID:
```bash
$ qstat -fx <job_id>
```

My job is stuck in the queue,what should I do?
If your job is stuck in the queue, check the status of the job using the qstat command. If the job is waiting
for resources, it may be because the resources requested by the job are not available.
You can check the status of CCAST nodes using the freenodes command. This will show you which nodes
are available and which nodes are busy. Additional flags, such as -g for GPU type, will generate additional
columns, showing glist varibles per node.
Often, patience is the best course of action. If the job is still stuck after a long time, you can try
resubmitting the job with fewer resources.
My job has an [H] status,what does that mean?
The [H] status means that the job is on hold. This can happen if:
The job has been manually held by the user or the system administrator
The job is in the preemptable queue and has been preempted by another job, and is waiting to be
rescheduled when resources are available.
The job has been held because it has failed to start multiple times
In the last case, the best course of action is to use
```bash
$ qstat -fx <job_id>
```

to get more information about why the job is on hold, and to resubmit failed jobs after debugging what
caused the error.
How do I submit a job to a specific node?
To submit a job to a specific node, use the #PBS -l directive followed by the node name:
```bash
#PBS -l select=1:ncpus=1:mem=1gb:host=cmp0001
```

This will submit the job to the node named cmp0001.
How do I run a job on a GPU node?
All of the following are required to run a job on a GPU node:

## Use the gpus queue

Request the number of GPUs you need with the ngpus directive
Optionally, request the type of GPU you need with the glist directive
Make sure your software is configured to use the GPUs, and change your job script to use the GPUs
as needed
How do I run a job on amulti-node cluster?
Use the select directive to request the number of nodes you need
Use a parallel programming model like MPI to distribute the work across the nodes
How do I run a job that requires a large amount of memory?
Out of memory errors will produce output like this:
<job_id> Killed Cgroup mem limit exceeded
To avoid out of memory errors:
Use the mem directive to request the amount of memory you need
For very large jobs, use the bigmem queue
Make sure your software is configured to use the memory you requested
I would like to use an interactive session fordebugging,how do I do that?
To start an interactive session, use the interact command with the number of -c cores, -m memory (in GB),
and -g gpus to use:
```bash
$ interact -c 4 -m 1
```

This will start an interactive session with 4 cores and 1 GB of memory. You can then run your commands
interactively, and exit the session when you are done. Support
Error: qsub: Bad GID for job execution
This error occurs when the job script specifies a group that the user is not a member of. To fix this error,
make sure that the group specified by #PBS -W is correct. You can view which groups you are a member of
with the groups command.
Can I run multiple jobs at the same time?
Yes, you can run multiple jobs at the same time. The batch system will allocate resources to each job based
on the resources requested in the job script. If you submit many jobs at once, they will be placed in the
queue and run as resources become available. In addition, the PBS fairshare
<https://altair.com/docs/default-source/resource-library/basic-fairshare-for-altair-pbs-professional.pdf>
system will ensure that each user gets a fair share of the cluster resources, decreasing priority for users
who have used a lot of resources recently. Feel free to submit as many jobs as you need, but be aware that
the more jobs you submit, the longer they may take to run.
How do I get more help?
If you have any questions or need help with job submission, you can contact the CCAST support team at
 CCAST Support <mailto:ndsu.ccast.support@ndsu.edu>
Keywords:

## CCAST, HPC, Job, Submission, How-to, Tutorial, FAQ

Suggest keywords
Doc ID: 137530
Owned by: Stephen S. in NDSU IT Knowledge Base
Created: 2024-05-28
Updated: 2026-06-17
Sites: NDSU IT Knowledge Base
[Helpful 1 Unhelpful 0 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=137530)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=137530)
Support
