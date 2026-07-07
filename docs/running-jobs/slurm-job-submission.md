# Guide to Slurm Job Submission

*An overview of the job submission process on the CCAST HPC cluster using Slurm.*

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [Guide to Slurm Job Submission](https://kb.ndsu.edu/it/157040). Formatting (headings, code blocks, tables, images) needs review before publishing.

## Introduction

This document will provide an overview of the job submission process on the CCAST HPC cluster using
[Slurm](https://slurm.schedmd.com/documentation.html) (Simple Linux Utility for Resource Management)
workload manager, which is a system that allows users to submit jobs to a queue for execution on the
cluster, and provides a way to manage and monitor the jobs. This document will cover how to submit a job
to the cluster, monitor the job status, and manage the job resources. Finally, we will provide some tips and
best practices for job submission on the CCAST cluster.

## Submitting aJob

The sbatch system receives requests for resources from users and fulfills those requests by assigning them
to available nodes in the cluster. The job submission process involves creating a job script that specifies the
resources required for the job, such as the number of nodes, cores, memory, and walltime (real time)
needed for the job. The job script also contains the commands that will be executed on the cluster, such as
changing directory locations, loading module software, or running commands. Jobs are submitted to the
Slurm scheduler using the job script.

## Simple Example

First, copy the following example directory to your scratch directory:
```bash
$ cp -r /mmfs1/thunder/projects/ccastest/examples/job_submission $SCRATCH
$ cd $SCRATCH/job_submission
```

The example job script job.slurm is a simple script that prints the hostname of the node that the job is
running on, and the number of cores assigned to the job:
```bash
#!/bin/bash
#SBATCH --job-name=MyFirstJob
#SBATCH --partition=compute
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --mem=1G
#SBATCH --time=00:05:00
#SBATCH --account=x-ccast-prj-training
cd $SLURM_SUBMIT_DIR
echo "Hello from $(hostname)"
echo "I am running on $SLURM_NTASKS CPU cores"
sleep 180
```

Here, we direct Slurm to allocate a single node and then provide one task (and by default, one CPU thread
will be assigned) a single gigabyte of memory, and run for a maximum of 5 minutes. As can be seen above,
this minimal job script specifies the job name, queue, resources, and walltime using what are called Slurm
directives and are used to specify the job requirements.
Explanation of directives:
- `--job-name`: Specifies the job name
- `--partition`: Specifies the queue to submit the job to
- `--nodes`: Number of nodes
- `--ntasks`: Number of tasks (cores)
- `--mem`: Memory per node
- `--time`: Walltime (HH:MM:SS)
- `--account`: Project account
Then, the job script also changes to the working directory specified by the SLURM_SUBMIT_DIR environment
variable, prints the hostname of the node, and the number of CPU cores assigned to the job. The job script
then sleeps for 3 minutes before exiting.
To submit the job to the cluster, use the sbatch command:
```bash
$ sbatch job.slurm
```

Support
The sbatch command submits the job script to the cluster and returns a job ID that can be used to monitor
the job status.
We can then monitor the job status in Slurm queue using the squeue command:
```bash
$ squeue --me
```

To see the expected start times of your queued jobs:
```bash
$ squeue --me --start
```

The above command will display the status of all jobs currently in the Slurm queue and submitted by the
user. The output will show the job ID, partition (queue), job name, status, and other information about the
job.
When the job finishes, the standard output will be written to a file with the name slurm-<job_id>.out by
default, where <job_id> is the job ID assigned by the batch system. The output file will contain the output
of the job script; any output from standard error printed by the job is saved to the same file, as Slurm
automatically combines stdout and stderr into a single file unless redirected. You can view the output by
using the less command:
```bash
$ less slurm-<job_id>.out
```

To separate standard output and error into two uniquely named files based on the job name and ID,
include the following directives in your SLURM job script: #SBATCH --output=%x.o%j #SBATCH --
error=%x.e%j where %x and %j are placeholders for the job name and job ID, respectively.

## Managing Job Resources

The job script specifies the resources required for the job, such as the number of nodes, cores, memory,
and walltime. It is important to specify the resources accurately to ensure that the job runs efficiently and
does not exceed the limits asked for. The resources specified in the job script are used by the Slurm sbatch
system to allocate resources to the job, and to enforce resource limits.

## Slurm Directives

The above example is the minimum required to submit a job to the cluster. However, there are many other
Slurm directives that can be used to specify additional job specifications. The following are some of the
most commonly used Slurm directives:

## Directive Description

```bash
#SBATCH --job-name Job name
#SBATCH --partition Queue name
#SBATCH --nodes Number of nodes
#SBATCH --ntasks Number of tasks/cores
#SBATCH --ntasks-per-node Number of tasks (MPI ranks) per node
#SBATCH --cpus-per-task Number of CPU cores per task (threads)
#SBATCH --gpus Number GPUs
#SBATCH --time Walltime (real time) required for the job
#SBATCH --mem Memory per node
#SBATCH --account Project group that the job belongs to
#SBATCH --mail-user Email address to send job status notifications
#SBATCH --mail-type=BEGIN,END,FAIL When to send notifications
#SBATCH --exclusive Exclusive access to the compute node(s)
#SBATCH --constraint  Node or GPU type
```

Slurm Directives
For more information on Slurm directives, refer to the Slurm Cheat Sheet
<https://slurm.schedmd.com/pdfs/summary.pdf> and the Slurm sbatch Directives
<https://slurm.schedmd.com/sbatch.html>
Select Resources
Defining the resources accurately in the job script is important to ensure that the job runs efficiently: a job
that requests more resources than it needs may be delayed in the queue because it is waiting for
resources that are not available, while a job that requests fewer resources than it needs may run out of
resources and fail, or run slower than expected.

## Useful Slurm Commands

sinfo Displays available partitions, their status, time limits, and node information.
sinfo -Nl Lists all nodes with detailed information, including state, availability, and features.
scontrol show nodes Shows comprehensive information about all compute nodes, including
allocated/idle CPUs, memory, and features.
```bash
squeue Displays all jobs that are currently running or waiting to run in the cluster.
squeue --me Shows only your submitted jobs.
```

scontrol update job <job_id> <parameter>=<value> Modifies job parameters such as TimeLimit,
JobName, or Partition (only available for pending jobs).
seff <job_id> Shows a summary of resource utilization efficiency for a completed job.

## Support

sacct --user=$USER --starttime now-90days Displays all jobs you have run in the last 90 days. To
display specific information you can use the --format flag to choose your output. A full list of
variables for the --format flag can be found with the --helpformat flag. For example, to view detailed
completed jobs information, you may use the following command: sacct --user=$USER --starttime
now-90days --format=JobID,JobName,Partition,Account,AllocCPUS,State,ExitCode,NodeList,Elapsed
For more details about Slurm common commands, please refer to Sheffield HPC Slurm Common
[Commands Guide](https://docs.hpc.shef.ac.uk/en/latest/referenceinfo/scheduler/SLURM/Commoncommands/index.html#gsc.tab=0) or the official Slurm documentation by running man <command> (e.g., man
```bash
sbatch, man squeue) on the cluster.
```

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
Monitor job status: Use the myjobs command to monitor the status of your jobs. This will help you
keep track of the progress of your jobs and identify any issues that may arise during the job
execution. watch squeue -u $USER is a useful command to monitor the status of your jobs in real time.

## FAQ

How do I cancel a job?
To cancel a job, use the scancel command followed by the job ID:
```bash
$ scancel <job_id>
```

How do I check the status of a job?
 To query the state of a job in the queue or running, use the following command:
$ squeue -j <job_id>
or for more details, use:
$ scontrol show job <job_id>
My job is stuck in the queue,what should I do?
CCAST is a shared computing resource, which means your job may need to wait in a queue behind other
users' jobs before resources become available. This is normal behavior—the scheduler manages jobs on a
first-come, first-served basis (with some priority adjustments).
If your job is waiting in the queue, check its status using the squeue --me command. If the job shows it's
waiting for resources, this typically means:
The requested resources (nodes, CPUs, memory) are currently in use by other jobs
Your job is queued behind others that were submitted earlier
You can check the status of CCAST nodes using the freenodes command to see which nodes are available
and which are busy.
Often, patience is the best course of action. Queue times can vary depending on cluster usage and the
resources you've requested. If your job is stuck for an unusually long time (several hours or more), you can
try:
Resubmitting the job with fewer resources (fewer nodes, less memory, or shorter time limits)
Checking if there are any errors in your submission script
My job has an [H] status,what does that mean?
The [H] status means that the job is on hold. This can happen if:
The job has been manually held by the user or the system administrator
The job is in the preemptable queue and has been preempted by another job, and is waiting to be
rescheduled when resources are available.
The job has been held because it has failed to start multiple times
In the last case, the best course of action is to use
```bash
$ scontrol show job <job_id>
```

to get more information about why the job is on hold, and to resubmit failed jobs after debugging what
caused the error.
How do I submit a job to a specific node?
To submit a job to a specific node, use the #SBATCH --nodelist directive followed by the node name:

## Support

```bash
#SBATCH --nodelist=node0001
```

This will submit the job to the node named node0001.
How do I run a job on a GPU node?
All of the following are required to run a job on a GPU node:

## Use the gpus queue

Request the number of GPUs you need with the #SBATCH --gpus directive
Optionally, request the type of GPU you need with the #SBATCH --constraint directive
Make sure your software is configured to use the GPUs, and change your job script to use the GPUs
as needed
How do I run a job on amulti-node cluster?
Use the #SBATCH --nodes directive to request the number of nodes you need
Use a parallel programming model like MPI to distribute the work across the nodes
How do I run a job that requires a large amount of memory?
Out of memory errors will produce output like this:
<job_id> Killed Cgroup mem limit exceeded
To avoid out of memory errors:
Use the mem directive to request the amount of memory you need
Run the command sinfo to list all available partitions (queues)
For very large jobs, use the bigmem queue
Make sure your software is configured to use the memory you requested
I would like to use an interactive session fordebugging,how do I do that?
To start an interactive session, use the interact command with the number of -c cores, -m memory (in GB),
and -g gpus to use:
```bash
$ interact -c 4 -m 1
```

This will start an interactive session with 4 cores and 1 GB of memory. You can then run your commands
interactively, and exit the session when you are done.
Error: sbatch: Bad GID for job execution
This error occurs when the job script specifies a group that the user is not a member of. To fix this error,
make sure that the group specified by #SBATCH --account is correct. You can view which groups you are a
member of with the groups command.
Can I run multiple jobs at the same time?
Yes, you can run multiple jobs at the same time. The batch system will allocate resources to each job based
on the resources requested in the job script. If you submit many jobs at once, they will be placed in the
queue and run as resources become available. In addition, the Slurm fairshare
<https://slurm.schedmd.com/fair_tree.html> system will ensure that each user gets a fair share of the cluster
resources, decreasing priority for users who have used a lot of resources recently. Feel free to submit as
many jobs as you need, but be aware that the more jobs you submit, the longer they may take to run.
How do I get more help?
If you have any questions or need help with job submission, you can contact the CCAST support team at
 CCAST Support <mailto:ndsu.ccast.support@ndsu.edu>
Keywords:

## CCAST, HPC, Job, SLURM, Submission, How-to, Tutorial, FAQ

Suggest keywords
Doc ID: 157040
Owned by: Sara T. in NDSU IT Knowledge Base
Created: 2025-12-03
Updated: 2026-06-23
Sites: NDSU IT Knowledge Base
[Helpful 0 Unhelpful 0 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=157040)
Support
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=157040)
Support
