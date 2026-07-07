# Running MATLAB on HPC Clusters

*A tutorial on running serial and parallel MATLAB jobs on CPUs and GPUs*

!!! info "Migration note"
    This page was auto-converted from the NDSU Knowledge Base article [Running MATLAB on HPC Clusters](https://kb.ndsu.edu/it/107852). Formatting (headings, code blocks, tables, images) needs review before publishing.

## Introduction

A tutorial on running serial and parallel MATLAB jobs on CPUs and GPUs on CCAST clusters.
[MATLAB](https://www.mathworks.com/products/matlab.html) is a high-level programming language and
numerical computing environment developed by MathWorks. It is used for numerical computation,
machine learning, and visualization. MATLAB is available to all CCAST users who are affiliated with North
Dakota State University. There are multiple MATLAB versions installed on CCAST systems. On Thunder or
Thunder Prime, check all available software modules by typing:
```bash
$ module avail matlab
```

There are two ways to run MATLAB: one uses batch mode on Thunder or Thunder Prime, and the other
[one is via Open OnDemand](https://ondemand.ccast.ndsu.edu/) . That latter allows you to run MATLAB
interactively and graphically. In this document, we only discuss running serial and parallel MATLAB jobs on
CPUs and GPUs via batch mode.
A MATLAB job needs MATLAB scripts that you intend to run and a job submission script to submit it to the
job scheduler (PBS Pro on Thunder or Thunder Prime). See the CCAST User Guide
<https://kb.ndsu.edu/ccast-user-guide> for more information on running jobs on CCAST systems in general.

## Example files

All the source codes and job submission scripts discussed in this document can be found in the following
compressed file: /mmfs1/thunder/projects/ccastest/examples/MATLAB_Tutorial_examples.tar.gz (on
Thunder)
/mmfs1/projects/ccastest/examples/MATLAB_Tutorial_examples.tar.gz (on Thunder Prime)
To copy the examples to your SCRATCH directory:
# on Thunder
```bash
$ cp /mmfs1/thunder/projects/ccastest/examples/MATLAB_Tutorial_examples.tar.gz $SCRATCH
```

# on Thunder Prime
```bash
$ cp /mmfs1/projects/ccastest/examples/MATLAB_Tutorial_examples.tar.gz $SCRATCH
```

Then, extract the files:
```bash
$ cd $SCRATCH
$ tar -xvf MATLAB_Tutorial_examples.tar.gz
```

Running serial jobs on CPUs
In the following, we examine a few MATLAB examples:
Example 1: HelloWorld !
In this simple example, the system prints the phrase “Hello World !” in the output file.
```bash
$ cd $SCRATCH/MATLAB_Tutorial_examples/MATLAB_example_1_HelloWorld
```

The MATLAB script: HelloWorld.m
% display information
fprintf(Hello World !\n\n)
The job submission script: matlab_job.pbs
```bash
#!/bin/bash
#PBS -q default
#PBS -N test
```

## serial jobs: only 1 processor core is requested
```bash
#PBS -l select=1:mem=2gb:ncpus=1
#PBS -l walltime=00:10:00
```

## replace 'x-ccast-prj' below with 'x-ccast-prj-[your project group name]'
```bash
#PBS -W group_list=x-ccast-prj
```

## if you require a specific version of MATLAB, replace "module load matlab" below
```bash
module load matlab
cd $PBS_O_WORKDIR
```

## change the input filename as needed
matlab -nodesktop -nodisplay -r "run HelloWorld.m"
exit 0
Note that the above job submission script requires the group_list variable to be set to your project group
name.
To submit the job:
```bash
$ qsub matlab_job.pbs
```

To check the status of all jobs you are running (It may show nothing if the job has been completed):
```bash
$ qstat -u $USER
```

The job will produce an output file named test.o<job_id>, where <job_id> is the job ID number. The
expected output is:
 < M A T L A B (R) >
 Copyright 1984-2020 The MathWorks, Inc.

## R2020a Update 3 (9.8.0.1396136) 64-bit (glnxa64)

 May 27, 2020
To get started, type doc.
For product information, visit www.mathworks.com.
Hello World !
Example 2: Summing the elements of avector
In this example, the job creates a vector outside of a loop and uses the vector index to do the sum
operation of a vector. Then, the system prints the sum value in the output file.
```bash
cd $SCRATCH/MATLAB_Tutorial_examples/MATLAB_example_2_Sum
```

The MATLAB script: sum.m
z = 0;
xAll = 0:0.1:10000; % create a vector outside of a loop
for i= 1:length(xAll)
 x = xAll(i);
 z = z + x;
end
fprintf('%f\n', z);
% Copyright 2010 - 2014 The MathWorks, Inc.
The job submission script: matlab_job.pbs
```bash
#!/bin/bash
#PBS -q default
#PBS -N test
```

## serial jobs: only 1 processor core is requested
```bash
#PBS -l select=1:mem=2gb:ncpus=1
#PBS -l walltime=00:10:00
```

## replace "x-ccast-prj" below with "x-ccast-prj-[your project group name]"
```bash
#PBS -W group_list=x-ccast-prj
```

## if you require a specific version of MATLAB, replace "module load matlab" below
```bash
module load matlab
cd $PBS_O_WORKDIR
```

## change the input filename as needed
matlab -nodesktop -nodisplay -r "run sum.m"
exit 0
The above script requests a single node for at most 10 minutes, with 2 GB of RAM. After editing the job
submission script as needed (editing the line “#PBS -W”), to submit this job:
```bash
$ qsub matlab_job.pbs
```

The expected output is:
 < M A T L A B (R) >
 Copyright 1984-2020 The MathWorks, Inc.

## R2020a Update 3 (9.8.0.1396136) 64-bit (glnxa64)

 May 27, 2020
To get started, type doc.
For product information, visit www.mathworks.com.
500005000.000000
Running parallel jobs on CPUs
[MATLAB parallelism](https://www.mathworks.com/discovery/matlab-multicore.html) includes implicit multithreaded parallelism and explicit parallelism. In this section, we will discuss how to run parallel jobs on
CPUs.

## Implicit parallelism

MATLAB contains internal mechanisms that enable some code to run much faster by automatically
parallelizing arithmetic and logical operations on data. This is called implicit parallelism (multi-threaded or
built-in multi-threading) since we do not need to explicitly tell MATLAB to parallelize the operations.
Implicit parallelization relies on the fact many operations are independent of each other and can therefore
be processed in parallel.
For implicit parallel computation, vector operation is the necessary trigger, but it is not sufficient. The
application or algorithm, and the amount of computation also help MATLAB to determine whether an
application will be performed with multi-threads. This link
<https://www.mathworks.com/matlabcentral/answers/95958-which-matlab-functions-benefit-from-multithreadedcomputation> provides more information on conditions of implicit parallelism. Such parallelism is
implemented by multi-threaded computations that are executed within a single node. Therefore, on
Thunder or Thunder Prime, you should only select one node to enable implicit parallelism.
Example 3: Matrix Multiplication
This job executes multiplication operations by multiplying a matrix by another matrix. In this example,
implicit parallelism is triggered. This can be observed by log in to the compute node and check the CPU
usage. On Thunder or Thunder Prime, to check the name of the compute node, you can execute:
```bash
$ cd $SCRATCH/MATLAB_Tutorial_examples/MATLAB_example_3_Multiplication
```

The MATLAB script: matrix_multiplication.m
n = 5000; % set matrix size
A = rand(n); % create random matrix
B = rand(n); % create another random matrix
tic % calculate the elapsed time using tic and toc
C = A \* B; % matrix multiplication
time=toc; % calculate the elapsed time using tic and toc
disp(['Processing time: ' num2str(time)] 's'); % display running time (unit: second)
The job submission script: matlab_job.pbs
```bash
#!/bin/bash
#PBS -q default
#PBS -N test
```

##change the ncpus number to run the job in implicit parallel
```bash
#PBS -l select=1:mem=4gb:ncpus=1
#PBS -l walltime=00:30:00
```

##replace "x-ccast-prj" below with "x-ccast-prj-[your project group name]"
```bash
#PBS -W group_list=x-ccast-prj
```

## to run on Thunder Prime, replace "module load matlab/R2020a" below with "module load matlab/R2021a"
```bash
module load matlab/R2020a
cd $PBS_O_WORKDIR
```

##change the input filename as needed
matlab -nodesktop -nodisplay -r "run matrix_multiplication.m"
exit 0
To submit this job:
```bash
$ qsub matlab_job.pbs
```

The expected output is:
 < M A T L A B (R) >
 Copyright 1984-2020 The MathWorks, Inc.

## R2020a Update 3 (9.8.0.1396136) 64-bit (glnxa64)

 May 27, 2020
To get started, type doc.
For product information, visit www.mathworks.com.
Processing time: 6.8422s
To observe implicit parallel computing performance, when different numbers of cores are selected, you
might get results like:

## Cores number (ncpus) Processing time

1 6.84 s
2 2.56 s
3 1.88 s
4 1.66 s
5 1.33 s
6 1.17 s
7 0.98 s
8 0.99 s
Implicit parallel performance scaling.
The results show the relationship between the processing time and the number of cores allocated. The
running time will not decrease monotonously with the increase of the number of cores. Users need to
decide the number of selected cores according to the actual situation of the project.

## Explicit parallelism

Explicit parallelism is characterized by the presence of explicit constructs in the programming language,
aimed at describing the way in which the parallel computation will take place. In explicit parallelism,
several instances of MATLAB simultaneously execute a single MATLAB command or function.
[The Parallel Computing Toolbox](https://www.mathworks.com/help/parallel-computing/getting-started-withparallel-computing-toolbox.html) describes the explicit parallelism and lets you use parallel-enabled
functions in MATLAB and other toolboxes. For more details on running your code in explicit parallelism,
see [Choose a Parallel Computing Solution](https://www.mathworks.com/help/parallel-computing/choosing-aparallel-computing-solution.html) .
A common way to initiate a parallel computation in MATLAB is to use a parfor loop: parfor executes forloop iterations in parallel on workers in a parallel pool. For more information, please see Decide When to
[Use parfor.](https://www.mathworks.com/help/parallel-computing/decide-when-to-use-parfor.html)
Example 4: Getting eigenvalues of square matrices
This job performs N trials of computing the largest eigenvalue for a M-by-M random matrix using parfor
and outputs its processing time.
```bash
$ cd $SCRATCH/MATLAB_Tutorial_examples/MATLAB_example_4_MatrixEigenvalue
```

The MATLAB script: parfor.m
% Performs N trials of computing the largest eigenvalue for an M-by-M random matrix
gcp; % open parallel pool if none is open
M=500; % number of rows and columns of each matrix
N=12000; % number of trials
tic; % calculate the elapsed time using tic and toc
a = zeros(N,1); % initialize output vector
parfor i = 1:N % use parallel processing by running parfor in a parallel pool
a(i) = max(eig(rand(M))); % vector of largest eigenvalues
end
time = toc; % calculate the elapsed time using tic and toc
disp(['Parallel processing time: ' num2str(time)] 's'); % display running time
poolobj = gcp('nocreate'); % Get current parallel pool
delete(poolobj); % Shutting down parallel pool
The job submission script: matlab_job.pbs
```bash
#!/bin/bash
#PBS -q default
#PBS -N test
#PBS -l select=1:mem=8gb:ncpus=5
#PBS -l walltime=00:30:00
```

##replace "x-ccast-prj" below with "x-ccast-prj-[your project group name]"
```bash
#PBS -W group_list=x-ccast-prj
```

##to run on Thunder Prime, replace "module load matlab/R2020a" below with "module load matlab/R2021a"
```bash
module load matlab/R2020a
cd $PBS_O_WORKDIR
```

##change the input filename as needed
matlab -nodesktop -nosplash -nodisplay -r "run parfor.m"
exit 0
To submit this job:
```bash
$ qsub matlab_job.pbs
```

The expected output is:
 < M A T L A B (R) >
 Copyright 1984-2020 The MathWorks, Inc.

## R2020a Update 3 (9.8.0.1396136) 64-bit (glnxa64)

 May 27, 2020
To get started, type doc.
For product information, visit www.mathworks.com.
Starting parallel pool (parpool) using the 'local' profile ...
Connected to the parallel pool (number of workers: 5).
Parallel processing time: 33.9835s
Parallel pool using the 'local' profile is shutting down.
To observe explicit parallel computing performance, a different number of cores are selected, and you
might get results like:

## Number of workers (ncpus) Processing time

1 192.5 s
2 72.8 s
3 65.5 s
4 49.4 s
5 34.0 s
Explicit parallel performance scaling
Example 5:for-loop and parfor-loop
```bash
$ cd $SCRATCH/MATLAB_Tutorial_examples/MATLAB_example_5_for_CompareLoops
```

This example job also performs N trials of computing the largest eigenvalue for an M-by-M random matrix,
but it addresses another two problems. First, this job compares processing time between for-loop
processing and parfor-loop processing. Second, when your code includes files that call other files, you
need to use addpath to add the working directory into your MATLAB search path.
The MATLAB script: ex_compare.m
% set pathToData with your current work directory
% pathToData = [CURRENT_WORKDIR];
addpath(pathToData);
tic; a1 = ex_for(500,1200); t1 = toc; % calculate a1 using for-loop
gcp; % open parallel pool if none is open
tic; a2 = ex_parfor (500,1200); t2 = toc; % calculate a2 using parfor-loop
% Compare processing times
disp(['For-loop processing time: ' num2str(t1) 's'])
disp(['Parfor-loop processing time: ' num2str(t2) 's'])
% Shutting down parallel pool
poolobj = gcp('nocreate'); % get current parallel pool
delete(poolobj); % shutting down parallel pool
% Copyright 2010 - 2014 The MathWorks, Inc.
Which calls two functions: ex_parfor.m and ex_for.m
ex_parfor.m
function a = ex_parfor(M, N)
a = zeros(N,1);
parfor i = 1:N
vi a(i) = max(eig(rand(M)));
end
ex_for.m
function a = ex_for(M, N)
a = zeros(N,1);
for i = 1:N
a(i) = max(eig(rand(M)));
end
Job submission script: matlab_job.pbs
```bash
#!/bin/bash
#PBS -q default
#PBS -N test
#PBS -l select=1:mem=8gb:ncpus=2
#PBS -l walltime=00:30:00
```

##replace "x-ccast-prj" below with "x-ccast-prj-[your project group name]"
```bash
#PBS -W group_list=x-ccast-prj
```

##to run on Thunder Prime, replace "module load matlab/R2020a" below with "module load matlab/R2021a"
```bash
module load matlab/R2020a
cd $PBS_O_WORKDIR
```

##pass $PBS_O_WORKDIR to MATLAB to add directories into MATLAB search path
sed -i "1c pathToData = '$PBS_O_WORKDIR';" compare.m
##change the input filename as needed
matlab -nodesktop -nosplash -nodisplay -r "run compare.m"
exit 0
To submit this job:
```bash
$ qsub matlab_job.pbs
```

The expected output is:
 < M A T L A B (R) >
 Copyright 1984-2020 The MathWorks, Inc.

## R2020a Update 3 (9.8.0.1396136) 64-bit (glnxa64)

 May 27, 2020
To get started, type doc.
For product information, visit www.mathworks.com.
Starting parallel pool (parpool) using the 'local' profile ...
Connected to the parallel pool (number of workers: 2).
For-loop processing time: 141.6204s
Parfor-loop processing time: 72.8218s
Parallel pool using the 'local' profile is shutting down.
This job compares processing time between for-loop and parfor-loop under the same workload. The
results show that parfor-loop processing time is much less than for-loop processing time.

## Running MATLAB on GPUs

A GPU, designed to quickly render high-resolution images and video concurrently, and can also be used
for non-graphical tasks such as machine learning and scientific computation due to its ability to perform
parallel operations on multiple sets of data. MATLAB provides tools to run functions on a GPU, including
gpuArray for transferring input data and calling gather to retrieve output data from the GPU. Many
functions in MATLAB and other toolboxes are automatically enabled on a GPU if they support GPUenabled computing, including fast Fourier transform fft, matrix multiplication mtimes, left matrix division
mldivide, and hundreds of others. For more information, please see Accelerate Your Code by Running It on
[a GPU.](https://www.mathworks.com/help/parallel-computing/gpu-computing.html)
Example 6: Filter amatrix
```bash
$ cd $SCRATCH/MATLAB_Tutorial_examples/MATLAB_example_6_GPU_MatrixFilter
```

This job filters a matrix on GPU using the filter function and returns the processing time on GPU.
The MATLAB script: matrix_filter.m
A = magic(5000); % magic(n) returns an n-by-n matrix
f = ones(1,20)/20; % create array of all ones
% Filter a matrix on GPU
AonGPU = gpuArray(A); % create an array stored on the GPU
tic; % calculate the elapsed time using tic and toc
BonGPU = filter(f, 1, AonGPU); % do filter operation on GPU
C=gather(BonGPU); % convert back to a numeric array on the CPU
wait(gpuDevice) % wait for GPU calculation to complete
tCompGpu = toc; % calculate the elapsed time using tic and toc
disp([' Processing time on GPU: ' num2str(tCompGpu) 's']) % display processing time
% Copyright 2014 The MathWorks, Inc.
The job submission script: matlab_job.pbs
```bash
#!/bin/bash
#PBS -q gpus
#PBS -N test
#PBS -l select=1:ncpus=1:mem=4gb:ngpus=1
#PBS -l walltime=00:20:00
```

##change “x-ccast-prj” to “x-ccast-prj-[your project group name]"
```bash
#PBS -W group_list=x-ccast-prj
```

##to run on Thunder Prime, replace "module load matlab/R2020a" below with "module load matlab/R2021a"
```bash
module load matlab/R2020a
cd $PBS_O_WORKDIR
```

##change the input filename as needed
matlab -nodesktop -nodisplay -r "run matrix_filter.m"
exit 0
To submit this job:
```bash
$ qsub matlab_job.pbs
```

The expected output is:
 < M A T L A B (R) >
 Copyright 1984-2020 The MathWorks, Inc.

## R2020a Update 3 (9.8.0.1396136) 64-bit (glnxa64)

 May 27, 2020
To get started, type doc.
For product information, visit www.mathworks.com.
Processing time on GPU: 3.9936s
From the output, you can see the computation time of filter function on GPU.
For more information on parallel computing, see the MATLAB website.
<https://www.mathworks.com/help/parallel-computing/getting-started-with-parallel-computing-toolbox.html>
See Also
[CCAST User Guide](https://kb.ndsu.edu/page.php?id=107680)
Keywords:
ccast hpc thunder thunder-prime matlab parallelism "implicit parallelism"
Suggest keywords
Doc ID: 107852
Owned by: Khang H. in NDSU IT Knowledge Base
Created: 2020-12-15
Updated: 2024-05-10
Sites: NDSU IT Knowledge Base
[Helpful 2 Unhelpful 0 Comment](https://kb.ndsu.edu/feedback.php?action=2&help=comment&id=107852)
[Suggest new doc](https://kb.ndsu.edu/feedback.php?action=2&help=suggest&id=107852)
