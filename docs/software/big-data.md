# Running Big Data on HPC Clusters

*A tutorial on running Spark on HPC clusters*

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [Running Big Data on HPC Clusters](https://kb.ndsu.edu/it/107851). Formatting (headings, code blocks, tables, images) needs review before publishing.

This document describes how users can run big [data jobs with Apache Spark](https://spark.apache.org/) on CCAST's
<https://www.ndsu.edu/ccast> Thunder/Thunder Prime cluster with Python, Java, and R as examples.
1. Introduction to Big Data
[Big Data](https://en.wikipedia.org/wiki/Big_data) is a field that treats ways to analyze, systematically extract information from, or otherwise
deal with data sets that are too large or complex to be dealt with by traditional data-processing application software. Big Data challenges
include capturing data, data storage, data analysis, search, sharing, transfer, visualization, querying, updating, information privacy and data
source.
In response to such challenges, various software are [developed such as Apache Hadoop](https://hadoop.apache.org/) , Quoble, and MongoDB
etc. In this article, Apache Spark is introduced, which includes running examples with different programming languages on HPC clusters.
Apache Spark is an open-source distributed framework that not only quickly performs processing tasks on very large data sets, but also
distributes data processing tasks across multiple computers.
2. Running Spark jobs on Thunder
2.1 Spark job with Python on CPUs
The example with word counts function (Spark_Python_example) is in the following directory:
/mmfs1/thunder/projects/ccastest/examples (on Thunder).
/mmfs1/projects/ccastest/examples (on Thunder Prime)--Apache Spark is not available on Thunder Prime at the moment. Please check again in a few weeks.
Copy the example file Spark_Python_example from examples location to your SCRATCH directory (You need to run jobs from here, NOT from
your home directory!).
```bash
$ cp -rf /mmfs1/thunder/projects/ccastest/examples/Spark_Python_example $SCRATCH/Spark_Python_example (on Thunder)
$ cp -rf /mmfs1/projects/ccastest/examples/Spark_Python_example $SCRATCH/Spark_Python_example (on Thunder Prime)
```

Go to your SCRATCH directory:
```bash
$ cd $SCRATCH
```

Get into example directory:
```bash
$ cd Spark_Python_example
```

Modify the run-spark.pbs file as needed (using a text editor such as vi, nano, or emacs):
```bash
#!/bin/bash
#PBS -q default
#PBS -N pyspark_test
#PBS -l select=3:ncpus=2:mem=1gb
#PBS -l walltime=00:60:00
#PBS -j oe
```

##replace "x-ccast-prj" below with "x-ccast-prj-[your project group name]"
```bash
#PBS -W group_list=x-ccast-prj
```

#Spark/2.4.3 is on Thunder, replace it with spark for Thunder Prime.
```bash
module load Spark/2.4.3
cd ${PBS_O_WORKDIR}
```

#name of your Spark script (accepts Java, Scala, Python, or R scripts)
SparkScript=sparkscript.py
#amount of memory to allocate to the Spark Driver (units K, M, or G)
DriverMemory=100M
#set directory for log files and scratch work
#this location should be cleaned periodically to save disk space
#replace mmfs1/thunder with mmfs1 for Thunder Prime
logdir=/mmfs1/thunder/scratch/${USER}/sparklogs/$PBS_JOBID
#start run-spark script (do not edit this line)
run-spark.sh ${SparkScript} ${DriverMemory} ${logdir} ${NCPUS}
Submit the PBS script to the queue:
```bash
$ qsub run-spark.pbs
```

The result of job is in the directory which name is wordcounts that is in the same directory with run-spark.pbs directory.
2.2 Spark jobs with Java on CPUs
The example with an ElasticNet model to implement linear regression (Spark_Java_example) is in the following directory:
/mmfs1/thunder/projects/ccastest/examples (on Thunder).
/mmfs1/projects/ccastest/examples (on Thunder Prime).
Copy the example file Spark_Java_example from examples location to your SCRATCH directory (You need to run jobs from here, NOT from your
home directory!).
```bash
$ cp -rf /mmfs1/thunder/projects/ccastest/examples/Spark_Java_example $SCRATCH/Spark_Java_example (on Thunder).
$ cp -rf /mmfs1/projects/ccastest/examples/Spark_Java_example $SCRATCH/Spark_Java_example (on Thunder Prime).
```

Go to your SCRATCH directory:
```bash
$ cd $SCRATCH
```

Get into example directory:
```bash
$ cd Spark_Java_example
```

Modify the run-spark.pbs file as needed (using a text editor such as vi, nano, or emacs):
```bash
#!/bin/bash
#PBS -q default
#PBS -N javaspark_test
```

##change "select", "ncpus", and "mem" if needed
```bash
#PBS -l select=3:ncpus=2:mem=1gb
#PBS -l walltime=00:60:00
```

##replace "x-ccast-prj" below with "x-ccast-prj-[your project group name]"
```bash
#PBS -W group_list=x-ccast-prj
```

#replace Spark/2.4.3 with spark for Thunder Prime
```bash
module load Spark/2.4.3
module load java/jdk
cd ${PBS_O_WORKDIR}
```

#name of your Spark script (accepts Java, Scala, Python, or R scripts)
#also, include any arguments (or class in the case of java)
SparkScript="--class org.apache.spark.examples.ml.JavaLinearRegressionWithElasticNetEx$
#amount of memory to allocate to the Spark Driver (units K, M, or G)
DriverMemory=100M
#set directory for log files and scratch work
#this location should be cleaned periodically to save disk space
#replace mmfs1/thunder with mmfs1 for Thunder Prime
logdir=/mmfs1/thunder/scratch/${USER}/sparklogs/$PBS_JOBID
#start run-spark script (do not edit this line)
run-spark.sh "${SparkScript}" ${DriverMemory} ${logdir} ${NCPUS}
```bash
cd ${PBS_O_WORKDIR}
```

Submit the PBS script to the queue:
```bash
$ qsub run-spark.pbs
```

The output is in the file which name is spark_output.txt that is in the same directory with run-spark.pbs directory.
2.3 Spark jobs with R on CPUs
The example that shows the “flights” information (Spark_R_example) is in the following directory:
/mmfs1/thunder/projects/ccastest/examples (on Thunder).
/mmfs1/projects/ccastest/examples (on Thunder Prime).
Copy the example file Spark_R_example from examples location to your SCRATCH directory (You need to run jobs from here, NOT from your
home directory!).
```bash
$ cp -rf /mmfs1/thunder/projects/ccastest/examples/Spark_R_example $SCRATCH/Spark_R_example (on Thunder).
$ cp -rf /mmfs1/projects/ccastest/examples/Spark_R_example $SCRATCH/Spark_R_example (on Thunder Prime).
```

Go to your SCRATCH directory:
```bash
$ cd $SCRATCH
```

Get into example directory:
```bash
$ cd Spark_R_example
```

Modify the run-spark.pbs file as needed (using a text editor such as vi, nano, or emacs):
```bash
#!/bin/bash
#PBS -q default
#PBS -N rspark_test
#PBS -l select=3:ncpus=2:mem=1gb
#PBS -l walltime=00:60:00
#PBS -l place=scatter
```

##replace "x-ccast-prj" below with "x-ccast-prj-[your project group name]"
```bash
#PBS -W group_list=x-ccast-prj
```

#replace Spark/2.4.3 with spark for Thunder Prime
```bash
module load Spark/2.4.3
module load java/jdk
```

#name of your Spark script (accepts Java, Scala, Python, or R scripts)
#also, include any arguments (or class in the case of java)
SparkScript="data-manipulation.R flights.csv"
#amount of memory to allocate to the Spark Driver (units K, M, or G)
DriverMemory=100M
#set directory for log files and scratch work
#this location should be cleaned periodically to save disk space
#replace mmfs1/thunder with mmfs1 for Thunder Prime
logdir=/mmfs1/thunder/scratch/${USER}/sparklogs/$PBS_JOBID
#start run-spark script (do not edit this line)
run-spark.sh "${SparkScript}" ${DriverMemory} ${logdir} ${NCPUS}
Submit the PBS script to the queue:
```bash
$ qsub run-spark.pbs
```

The result of job is in the file which name is spark_output.txt that is in the same directory with run-spark.pbs directory.

## See Also

[CCAST User Guide](https://kb.ndsu.edu/page.php?id=107680)
Keywords:
ccast hpc "big data" software spark cpu parallelism computing "parallel computing" "data analysis"
Suggest keywords
Doc ID: 107851
Owned by: Khang H. in NDSU IT Knowledge Base
Created: 2020-12-15
Updated: 2021-11-22
Sites: NDSU IT Knowledge Base
[Helpful 0 Unhelpful 0 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=107851)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=107851)
